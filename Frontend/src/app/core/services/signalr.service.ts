import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from '@microsoft/signalr';
import { Order } from '../../shared/models/order';
@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  hubUrl = environment.hubUrl;
  hubConnection?: HubConnection;
  orderSignal = signal<Order | null>(null);
  // headers: {
  //   Authorization: `Bearer ${token}`,
  // },
  createHubConnection() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl, {
        accessTokenFactory: () => token,
      })
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR connection established'))
      .catch((err) => console.error('SignalR connection error: ', err));

    this.hubConnection.on('OrderCompleteNotification', (order) => {
      order.buyerEmail = order.BuyerEmail;
      order.id = order.Id;
      order.shipToAddress = order.ShipToAddress;
      order.deliveryMethod = order.DeliveryMethod;
      order.shippingPrice = order.ShippingPrice;
      order.subtotal = order.Subtotal;
      order.total = order.Total;
      order.status = order.Status;
      order.orderDate = order.OrderDate;
      this.orderSignal.set(order);
    });
  }
  stopHubConnection() {
    if (this.hubConnection?.state === HubConnectionState.Connected) {
      this.hubConnection.stop().catch((error) => console.log(error));
    }
  }
}
