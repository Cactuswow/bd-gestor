import type { Observable } from 'rxjs'

export function toPromise<T>(observable: Observable<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    observable.subscribe(resolve, reject)
  })
}
