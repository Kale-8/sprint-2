import { of } from 'rxjs';
import { TransformInterceptor } from '../src/common/interceptors/transform.interceptor';
import { TimingInterceptor } from '../src/common/interceptors/timing.interceptor';

const ctx: any = { switchToHttp: () => ({ getRequest: () => ({ method: 'GET', originalUrl: '/' }) }) };
const handler = (data: any) => ({ handle: () => of(data) });

describe('Interceptors', () => {
  it('TransformInterceptor wraps response', (done) => {
    const i = new TransformInterceptor();
    i.intercept(ctx, handler({ ok: true })).subscribe((result) => {
      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('meta');
      done();
    });
  });

  it('TimingInterceptor passes through', (done) => {
    const i = new TimingInterceptor();
    i.intercept(ctx, handler({ ok: true })).subscribe((result) => {
      expect(result).toEqual({ ok: true });
      done();
    });
  });
});


