import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';

import {ICreateOrderRequest, IMoney, IPurchaseUnit, IUnitAmount} from 'ngx-paypal';
import AutocompletePrediction = google.maps.places.AutocompletePrediction;
import AutocompletionRequest = google.maps.places.AutocompletionRequest;
import PlaceDetailsRequest = google.maps.places.PlaceDetailsRequest;
import PlaceResult = google.maps.places.PlaceResult;
import PlacesServiceStatus = google.maps.places.PlacesServiceStatus;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'd4d4-shop';
  @ViewChild('map') mapEle: ElementRef;
  public payPalConfig;
  public autocompleteResults: AutocompletePrediction[];
  public addressForm;
  public addressFormModel = {
    term: [''],
    address: '',
  };
  public paypalOrder = {
    intent: 'CAPTURE',
    application_context: {
      shipping_preference: 'NO_SHIPPING'
    },
    purchase_units: [{
      amount: {
        currency_code: 'GBP',
        value: '20.00',
        breakdown: {
          item_total: {
            currency_code: 'GBP',
            value: '15.00'
          },
          shipping: {
            currency_code: 'GBP',
            value: '5.00'
          }
        }
      } as IUnitAmount,
      items: [{
        name: '37mm Zip-Pull Dogtag',
        quantity: '1',
        category: 'PHYSICAL_GOODS',
        unit_amount: {
          currency_code: 'GBP',
          value: '15.00',
        },
      }],
      shipping: {
        address: {
          streetNumber: '',
          route: '',
          address_line_1: '',
          address_line_2: '',
          admin_area_2: '',
          postal_code: '',
          country_code: ''
        }
      }
    }]
  };
  private showSuccess: boolean;
  private showCancel: boolean;
  private showError: boolean;
  private autocompleteService;
  private autocompleteRequest: AutocompletionRequest = {
    input: '',
    types: ['address']
  };
  private placesService;
  private placeDetailsRequest: PlaceDetailsRequest;
  private map;

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.autocompleteService = new google.maps.places.AutocompleteService();
    this.addressForm = this.fb.group(this.addressFormModel);
    this.payPalConfig = {
      currency: 'GBP',
      clientId: 'AXDr09HjWmo-t_55o-VG4K8kIvMu8RElxjxkKYgLlrns96FF4dyCkLwXpoeJFf6qUBjrxmbAkfgpD2wX',
      createOrderOnClient: () => {
        return this.paypalOrder;
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this.showCancel = true;

      },
      onError: err => {
        console.log('OnError', err);
        this.showError = true;
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
        this.resetStatus();
      },
      intent: 'CAPTURE',
      note_to_payer: 'Check your address please',
      purchase_units: [{
        amount: {
          breakdown: {
            discount: {
              currency_code: 'GBP',
              value: '0'
            } as IMoney,
            handling: {
              breakdown: null,
              currency_code: null,
              value: null,
            },
            insurance: null,
            item_total: {
              breakdown: null,
              currency_code: null,
              value: null
            },
            shipping: {
              breakdown: null,
              currency_code: 'GBP',
              value: '5.00'
            },
            shipping_discount: null,
            tax_total: null
          },
          currency_code: 'GBP',
          value: '15.00',
        },
        custom_id: 'cid_001',
        description: 'Zipper / unzipper aid',
        invoice_id: 'inv_001',
        items: [{
          category: null,
          description: null,
          name: null,
          quantity: null,
          sku: null,
          tax: null,
          unit_amount: null
        }],
        payee: {
          email_address: null,
          merchant_id: null
        },
        payment_instruction: {
          disbursement_mode: null,
          platform_fees: []
        },
        reference_id: null,
        shipping: null,
        soft_descriptor: null
      } as IPurchaseUnit]
    } as ICreateOrderRequest;
  }

  ngAfterViewInit(): void {
    this.map = new google.maps.Map(this.mapEle.nativeElement, {});
    this.placesService = new google.maps.places.PlacesService(this.map);
  }

  resetStatus = () => {
  }

  public onAutocompleteInput(e): void {
    this.autocompleteRequest.input = e.currentTarget.value;
    if (!this.autocompleteRequest.input) {
      return;
    }
    if (this.autocompleteRequest.input.length <= 2) {
      return;
    }
    this.autocompleteService.getPlacePredictions(
      this.autocompleteRequest,
      (predictions: AutocompletePrediction[], status: PlacesServiceStatus) => {
        if (status === PlacesServiceStatus.OK) {
          this.autocompleteResults = predictions;
          this.cd.detectChanges();
        }
      });
  }

  public onPlaceIdSelect(selectedPlaceId: string): void {
    if (!selectedPlaceId) {
      return;
    }
    this.placeDetailsRequest = {
      placeId: selectedPlaceId,
      fields: ['formatted_address', 'address_components']
    };
    this.placesService.getDetails(this.placeDetailsRequest,
      (placeResult: PlaceResult, placesServiceStatus: PlacesServiceStatus) => {
        if (placesServiceStatus !== PlacesServiceStatus.OK) {
          return;
        }
        this.autocompleteResults = undefined;
        this.addressForm.reset();
        this.addressFormModel.address = placeResult && placeResult.formatted_address;
        this.paypalOrder.purchase_units[0].shipping.address.streetNumber = placeResult &&
          placeResult.address_components &&
          placeResult.address_components.find(
            (component) => {
              return component.types.indexOf('street_number') > -1;
            })?.short_name;
        this.paypalOrder.purchase_units[0].shipping.address.route = placeResult &&
          placeResult.address_components &&
          placeResult.address_components.find(
            (component) => {
              return component.types.indexOf('route') > -1;
            })?.short_name;
        this.paypalOrder.purchase_units[0].shipping.address.address_line_1 = placeResult &&
          placeResult.address_components &&
          placeResult.address_components.find(
            (component) => {
              return component.types.indexOf('address_line_1') > -1;
            })?.short_name;
        this.paypalOrder.purchase_units[0].shipping.address.address_line_2 = placeResult &&
          placeResult.address_components &&
          placeResult.address_components.find(
            (component) => {
              return component.types.indexOf('address_line_2') > -1;
            })?.short_name;
        this.paypalOrder.purchase_units[0].shipping.address.admin_area_2 = placeResult &&
          placeResult.address_components &&
          placeResult.address_components.find(
            (component) => {
              return component.types.indexOf('administrative_area_level_2') > -1;
            })?.short_name;
        this.paypalOrder.purchase_units[0].shipping.address.postal_code = placeResult &&
          placeResult.address_components &&
          placeResult.address_components.find(
            (component) => {
              return component.types.indexOf('postal_code') > -1;
            })?.short_name;
        this.paypalOrder.purchase_units[0].shipping.address.country_code = placeResult &&
          placeResult.address_components &&
          placeResult.address_components.find(
            (component) => {
              return component.types.indexOf('country') > -1;
            })?.short_name;
        this.paypalOrder = {...this.paypalOrder};
        this.cd.detectChanges();
      });
  }

}
