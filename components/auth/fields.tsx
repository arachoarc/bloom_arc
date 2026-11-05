/**
 * 응답이 오지 않는 요청이 버튼을 영원히 "처리 중"으로 묶지 않도록 시간 제한을 건다.
 * 시간이 지나면 예외를 던지므로 호출하는 쪽에서 catch로 처리한다.
 */
export function withTimeout<T>(promise: Promise<T>, ms = 15000): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("timeout")), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      },
    );
  });
}

/** 회원 화면 공통 입력칸. 알림받기 폼(Notify)과 같은 모양을 쓴다. */
export function Field({
  id,
  label,
  error,
  ...input
}: {
  id: string;
  label: string;
  error?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="mt-5 first:mt-0">
      <label htmlFor={id} className="block text-sm font-bold text-ink/80">
        {label}
      </label>
      <input
        id={id}
        name={id}
        aria-invalid={error || undefined}
        className={`mt-2 block min-h-13 w-full rounded-2xl bg-white px-4 text-base text-ink ring-2 outline-none placeholder:text-ink/35 focus:ring-aqua ${
          error ? "ring-pink-deep" : "ring-ink/10"
        }`}
        {...input}
      />
    </div>
  );
}

export function FormError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} role="alert" className="mt-4 text-[13px] font-medium text-pink-deep">
      {children}
    </p>
  );
}
