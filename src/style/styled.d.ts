import "styled-components";
import type { AppTheme } from "./theme";

declare module "styled-components" {
  // Extensão necessária para que o DefaultTheme reconheça os tokens da aplicação.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends AppTheme {}
}
