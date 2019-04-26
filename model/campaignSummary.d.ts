/**
 * CRM Service Api
 * This is a sample server of MySki Miles Cfa services. For this sample, you can use the `access-token` to test the authorization filters.
 *
 * OpenAPI spec version: 1.0.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */ import { CategoriesSummary } from './categoriesSummary';
import { DateRange } from './dateRange';
export interface CampaignSummary {
    id?: string;
    title?: string;
    summary?: string;
    detail?: string;
    isShownHomePage?: boolean;
    order?: number;
    coverImage?: string;
    brandName?: string;
    category?: Array<CategoriesSummary>;
    validity?: DateRange;
}