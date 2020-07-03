import {Component, OnInit} from '@angular/core';
import {ICreateOrderRequest, IMoney, IPurchaseUnit, IUnitAmount} from 'ngx-paypal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'd4d4-shop';
  public payPalConfig;
  private showSuccess: boolean;
  private showCancel: boolean;
  private showError: boolean;

  ngOnInit(): void {
    this.payPalConfig = {
      currency: 'GBP',
      clientId: 'AXDr09HjWmo-t_55o-VG4K8kIvMu8RElxjxkKYgLlrns96FF4dyCkLwXpoeJFf6qUBjrxmbAkfgpD2wX',
      createOrderOnClient: (data) => {
        return {
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
            }]
          }]
        };
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

  private resetStatus = () => {
  };
}
