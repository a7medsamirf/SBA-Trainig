type Callbacks<T, R = unknown> = {
  onStart?: () => R;
  onEnd?: (reference: R) => void;
  onSuccess?: (result: T) => void;
  onError?: (result: T) => void;
};

export const withCallbacks = <Args extends any[], T extends any, R = unknown>(
  fn: (...args: Args) => Promise<T>,
  callbacks?: Callbacks<T, R>
): ((...args: Args) => Promise<T>) => {
  return async (...args: Args): Promise<T> => {
    const promise = fn(...args);

    const reference = callbacks?.onStart?.();
    const result = await promise;

    console.log("🚀 ~ return ~ result:", result);

    if (!!reference) {
      callbacks?.onEnd?.(reference);
    }

    if ((result as any)?.succeeded) {
      callbacks?.onSuccess?.(result);
    }

    if (!(result as any)?.succeeded) {
      callbacks?.onError?.(result);
    }

    return promise;
  };
};
