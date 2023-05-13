import axios from 'axios';
import * as dotenv from 'dotenv';
import { format } from 'date-fns';

dotenv.config();

const token = process.env.IFOOD_TOKEN;
const date: Date = new Date('2023-01-01');

let page: number = 0;
let orders: any = [];
let shouldFetch: boolean = true;
let ordersCount: number = 0;
let totalAmount: number = 0;
let currentValue: number = 0;

async function calculateTotal() {
  while (shouldFetch) {
    let lastOrderCreatedAt;
    let newOrders: any = await fetchOrders(page);

    const filteredOrders = newOrders?.filter(
      (order: any) => new Date(order.createdAt).getTime() > date.getTime()
    );

    if (filteredOrders.length === 0) {
      break;
    }

    lastOrderCreatedAt = filteredOrders[filteredOrders.length - 1].createdAt;

    filteredOrders?.forEach((order: any) => {
      currentValue = order?.bag?.total?.valueWithDiscount;
      totalAmount += currentValue ?? 0;
      ordersCount++;
    });

    totalAmount += currentValue;
    orders = orders.concat(filteredOrders);

    const formatedLastOrderCreatedAt = format(new Date(lastOrderCreatedAt), 'dd/MM/yyyy');

    console.log(
      `Total gasto desde ${formatedLastOrderCreatedAt}: ${formatAmount(totalAmount / 100)} \n`
    );

    if (filteredOrders.length !== newOrders.length) {
      break;
    }

    page += 1;
  }

  const lastCreatedAt = orders[orders.length - 1].createdAt;
  const formatedCreatedAt = format(new Date(lastCreatedAt), 'dd/MM/yyyy');

  console.log(`${ordersCount} pedidos desde ${formatedCreatedAt}.`);
  console.log(`Total gasto: ${formatAmount(totalAmount / 100)}.`);
}

function formatAmount(amount: number) {
  let Brl = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  return Brl.format(amount);
}

async function fetchOrders(page: number) {
  try {
    const response = await axios(
      `https://marketplace.ifood.com.br/v4/customers/me/orders?page=${page}&size=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response.data;
  } catch (error) {
    throw new Error('Erro ao fazer requisição. Verifique o token informado!');
  }
}

calculateTotal();
