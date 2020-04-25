/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

import { IConnectionAdapter } from '../adapter';
import { Connection }         from 'amqplib';
import {
  IMessageParameterTransformer,
  IMessageTransformer
} from '../transformer';
import {
  IListener,
  IPublishSubscribe,
  IRpc,
  IWorker
} from '../amqp';

export interface IAmqp extends IConnectionAdapter {
  /**
   * @throws MissingConnectionException
   */
  createListener(queue: string): IListener;
  getListener(queue: string): IListener | undefined;
  /**
   * @throws MissingConnectionException
   */
  createRpc(queue: string): IRpc;
  getRpc(queue: string): IRpc | undefined;
  /**
   * @throws MissingConnectionException
   */
  createWorker(queue: string): IWorker;
  getWorker(queue: string): IWorker | undefined;
  /**
   * @throws MissingConnectionException
   */
  createPublisherAndSubscriber(exchange: string): IPublishSubscribe;
  getPublisherAndSubscriber(exchange: string): IPublishSubscribe | undefined;
}

export type AmqpMethodConstructor<T> = (new (
  queue:                       string,
  connection:                  Connection,
  messageParameterTransformer: IMessageParameterTransformer,
  messageTransformer:          IMessageTransformer,
  consumeMessageTransformer:   IMessageTransformer
) => T);
