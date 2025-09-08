import "@testing-library/jest-dom";
import { TextEncoder } from "util";
//eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).TextEncoder = TextEncoder;
import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();
