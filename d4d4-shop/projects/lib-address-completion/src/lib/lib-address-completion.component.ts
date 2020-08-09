import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {BehaviorSubject} from 'rxjs';
import {MapsAPILoader} from '@agm/core';

import {
  AutocompletePrediction,
  AutocompletionRequest,
  LibAddressCompletionService,
  PlaceDetailsRequest,
  PlaceResult,
  PlacesServiceStatus,
} from './lib-address-completion.service';

@Component({
  selector: 'lib-address-completion',
  templateUrl: './lib-address-completion.component.html',
  styleUrls: ['./lib-address-completion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LibAddressCompletionComponent implements OnInit, AfterViewInit {

  @ViewChild('map') mapEle: ElementRef;
  public addressForm: FormGroup;
  public addressFormModel = {
    term: [''],
    address: '',
  };
  public addressFormModelSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public autocompleteResults: AutocompletePrediction[];
  @Output() addressSelected: EventEmitter<PlaceResult> =
    new EventEmitter<PlaceResult>();
  private autocompleteRequest: AutocompletionRequest = {
    input: '',
    types: ['address']
  };
  private placeDetailsRequest: PlaceDetailsRequest;
  private placesService;
  private autocompleteService;
  private map;

  constructor(private fb: FormBuilder,
              private addressService: LibAddressCompletionService,
              private cd: ChangeDetectorRef,
              private mapsAPILoader: MapsAPILoader) {
  }

  ngOnInit(): void {
    this.addressForm = this.fb.group(this.addressFormModel);
  }

  ngAfterViewInit(): void {
    this.mapsAPILoader.load()
      .then(() => {
        this.autocompleteService = this.addressService.getAutocompleteService();
        this.map = this.addressService.getMap(this.mapEle.nativeElement);
        this.placesService = this.addressService.getPlacesService(this.map);
      });
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
      (predictions: AutocompletePrediction[],
       status: PlacesServiceStatus) => {
        if (status === this.addressService.getPlacesServiceStatusOK()) {
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
      (placeResult: PlaceResult,
       placesServiceStatus: PlacesServiceStatus) => {
        if (placesServiceStatus !== this.addressService.getPlacesServiceStatusOK()) {
          return;
        }
        this.autocompleteResults = undefined;
        this.addressForm.reset();
        this.addressFormModel.address = placeResult && placeResult.formatted_address;
        this.addressFormModelSubject.next(this.addressFormModel);
        this.addressSelected.emit(placeResult);
      });
  }

}
