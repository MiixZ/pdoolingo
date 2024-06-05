export interface Data {
  success: boolean;
  data: any;
  error?: {
    message: string;
  };
}
