namespace NodeJS {
  interface ProcessEnv {
    APP_NAME?: Readonly<string>;
    APP_HOST?: Readonly<string>;
    APP_PORT?: Readonly<number>;

    SMTP_HOST?: Readonly<string>;
    SMTP_PORT?: Readonly<number>;
    SMTP_FROM?: Readonly<string>;
    SMTP_SECURE?: Readonly<boolean>;
    SMTP_USER?: Readonly<string>;
    SMTP_PASS?: Readonly<string>;

    JWT_SECRET?: Readonly<string>;
    JWT_EXPIRE_TIME?: Readonly<string>;
    JWT_REFRESH_SECRET?: Readonly<string>;
    JWT_REFRESH_EXPIRE_TIME?: Readonly<string>;

    TIMEZONE?: string;
  }
}
