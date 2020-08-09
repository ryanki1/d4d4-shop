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
import {google} from 'google-maps';
import {MapsAPILoader} from '@agm/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'lib-address-complete',
  template: `
    <form [formGroup]="addressForm">
      <div class="grid mdc-layout-grid">
        <div *ngIf="!!(addressFormModelSubject | async).address"
             class="mdc-layout-grid__inner">
          <span>Selected address: </span>
          <br/>
          {{(addressFormModelSubject | async).address}}
        </div>
        <div *ngIf="!(addressFormModelSubject | async).address"
             class="mdc-layout-grid__inner">
          <span>Please select an address: </span>
        </div>
        <div class="mdc-layout-grid__inner">
          <input (keypress)="onAutocompleteInput($event)"
                 formControlName="term"
                 matInput
                 placeholder="4 Ever Strawberryfields, Liverpool, UK"
                 type="text"/>
        </div>
      </div>
      <mat-selection-list *ngIf="!!autocompleteResults"
                          [multiple]="false">
        <mat-list-option
          (click)="onPlaceIdSelect(result['place_id'])"
          *ngFor="let result of autocompleteResults">
          {{result.description}}
        </mat-list-option>
      </mat-selection-list>
    </form>
    <div #map></div>
  `,
  styles: ['form {width: 100%;}',
    '.grid input {width: 100%;}',
    'mat-list {cursor: pointer;}',
    'mat-list-option {color: black !important;}',
    'mat-list-option:hover {background-color: cornflowerblue;}',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LibAddressCompleteComponent implements OnInit, AfterViewInit {

  @ViewChild('map') mapEle: ElementRef;
  public addressForm: FormGroup;
  public addressFormModel = {
    term: [''],
    address: '',
  };
  public addressFormModelSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public autocompleteResults: google.maps.places.AutocompletePrediction[];
  @Output() addressSelected: EventEmitter<google.maps.places.PlaceResult> = new EventEmitter<google.maps.places.PlaceResult>();
  private autocompleteRequest: google.maps.places.AutocompletionRequest = {
    input: '',
    types: ['address']
  };
  private placeDetailsRequest: google.maps.places.PlaceDetailsRequest;
  private placesService;
  private autocompleteService;
  private map;

  constructor(private fb: FormBuilder,
              private mapsAPILoader: MapsAPILoader,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.addressForm = this.fb.group(this.addressFormModel);
  }

  ngAfterViewInit(): void {
    this.mapsAPILoader.load()
      .then(() => {
        this.autocompleteService = new google.maps.places.AutocompleteService();
        this.map = new google.maps.Map(this.mapEle.nativeElement, {});
        this.placesService = new google.maps.places.PlacesService(this.map);
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
      (predictions: google.maps.places.AutocompletePrediction[],
       status: google.maps.places.PlacesServiceStatus) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.autocompleteResults = predictions;
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
      (placeResult: google.maps.places.PlaceResult,
       placesServiceStatus: google.maps.places.PlacesServiceStatus) => {
        if (placesServiceStatus !== google.maps.places.PlacesServiceStatus.OK) {
          return;
        }
        this.autocompleteResults = undefined;
        this.addressForm.reset();
        this.addressFormModel.address = placeResult && placeResult.formatted_address;
        this.addressFormModelSubject.next(this.addressFormModel);
        this.addressSelected.emit(placeResult);
        this.cd.detectChanges();
      });
  }

}
