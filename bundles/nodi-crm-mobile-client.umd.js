(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common/http'), require('@angular/core')) :
	typeof define === 'function' && define.amd ? define('@nodi/crm-mobile-client', ['exports', '@angular/common/http', '@angular/core'], factory) :
	(factory((global.nodi = global.nodi || {}, global.nodi['crm-mobile-client'] = {}),global.ng.common.http,global.ng.core));
}(this, (function (exports,http,core) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */
var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};
function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}








function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

var CustomHttpUrlEncodingCodec = /** @class */ (function (_super) {
    __extends(CustomHttpUrlEncodingCodec, _super);
    function CustomHttpUrlEncodingCodec() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomHttpUrlEncodingCodec.prototype.encodeKey = function (k) {
        k = _super.prototype.encodeKey.call(this, k);
        return k.replace(/\+/gi, '%2B');
    };
    CustomHttpUrlEncodingCodec.prototype.encodeValue = function (v) {
        v = _super.prototype.encodeValue.call(this, v);
        return v.replace(/\+/gi, '%2B');
    };
    return CustomHttpUrlEncodingCodec;
}(http.HttpUrlEncodingCodec));
var BASE_PATH = new core.InjectionToken('basePath');
var COLLECTION_FORMATS = {
    'csv': ',',
    'tsv': '   ',
    'ssv': ' ',
    'pipes': '|'
};
var Configuration = /** @class */ (function () {
    function Configuration(configurationParameters) {
        if (configurationParameters === void 0) { configurationParameters = {}; }
        this.apiKeys = configurationParameters.apiKeys;
        this.username = configurationParameters.username;
        this.password = configurationParameters.password;
        this.accessToken = configurationParameters.accessToken;
        this.basePath = configurationParameters.basePath;
        this.withCredentials = configurationParameters.withCredentials;
    }
    Configuration.prototype.selectHeaderContentType = function (contentTypes) {
        var _this = this;
        if (contentTypes.length == 0) {
            return undefined;
        }
        var type = contentTypes.find((function (x) { return _this.isJsonMime(x); }));
        if (type === undefined) {
            return contentTypes[0];
        }
        return type;
    };
    Configuration.prototype.selectHeaderAccept = function (accepts) {
        var _this = this;
        if (accepts.length == 0) {
            return undefined;
        }
        var type = accepts.find((function (x) { return _this.isJsonMime(x); }));
        if (type === undefined) {
            return accepts[0];
        }
        return type;
    };
    Configuration.prototype.isJsonMime = function (mime) {
        var jsonMime = new RegExp('^(application\/json|[^;/ \t]+\/[^;/ \t]+[+]json)[ \t]*(;.*)?$', 'i');
        return mime != null && (jsonMime.test(mime) || mime.toLowerCase() === 'application/json-patch+json');
    };
    return Configuration;
}());
var CampaignAdminService = /** @class */ (function () {
    function CampaignAdminService(httpClient, basePath, configuration) {
        this.httpClient = httpClient;
        this.basePath = "http://localhost:5000";
        this.defaultHeaders = new http.HttpHeaders();
        this.configuration = new Configuration();
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }
    CampaignAdminService.prototype.canConsumeForm = function (consumes) {
        var e_1, _a;
        var form = "multipart/form-data";
        try {
            for (var consumes_1 = __values(consumes), consumes_1_1 = consumes_1.next(); !consumes_1_1.done; consumes_1_1 = consumes_1.next()) {
                var consume = consumes_1_1.value;
                if (form === consume) {
                    return true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (consumes_1_1 && !consumes_1_1.done && (_a = consumes_1.return)) _a.call(consumes_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return false;
    };
    CampaignAdminService.prototype.getCampaign = function (contentLanguage, id, observe, reportProgress) {
        if (observe === void 0) { observe = "body"; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (contentLanguage === null || contentLanguage === undefined) {
            throw new Error("Required parameter contentLanguage was null or undefined when calling getCampaign.");
        }
        if (id === null || id === undefined) {
            throw new Error("Required parameter id was null or undefined when calling getCampaign.");
        }
        var headers = this.defaultHeaders;
        if (contentLanguage !== undefined && contentLanguage !== null) {
            headers = headers.set("Content-Language", String(contentLanguage));
        }
        if (this.configuration.apiKeys["Authorization"]) {
            headers = headers.set("Authorization", this.configuration.apiKeys["Authorization"]);
        }
        var httpHeaderAccepts = ["application/json"];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.basePath + "/api/adm/campaigns/" + encodeURIComponent(String(id)), {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    CampaignAdminService.prototype.getCampaings = function (xDeviceHash, contentLanguage, offset, limit, term, sort, observe, reportProgress) {
        if (observe === void 0) { observe = "body"; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (xDeviceHash === null || xDeviceHash === undefined) {
            throw new Error("Required parameter xDeviceHash was null or undefined when calling getCampaings.");
        }
        if (contentLanguage === null || contentLanguage === undefined) {
            throw new Error("Required parameter contentLanguage was null or undefined when calling getCampaings.");
        }
        var queryParameters = new http.HttpParams({
            encoder: new CustomHttpUrlEncodingCodec()
        });
        if (offset !== undefined && offset !== null) {
            queryParameters = queryParameters.set("offset", ((offset)));
        }
        if (limit !== undefined && limit !== null) {
            queryParameters = queryParameters.set("limit", ((limit)));
        }
        if (term !== undefined && term !== null) {
            queryParameters = queryParameters.set("term", ((term)));
        }
        if (sort !== undefined && sort !== null) {
            queryParameters = queryParameters.set("sort", ((sort)));
        }
        var headers = this.defaultHeaders;
        if (xDeviceHash !== undefined && xDeviceHash !== null) {
            headers = headers.set("X-Device-Hash", String(xDeviceHash));
        }
        if (contentLanguage !== undefined && contentLanguage !== null) {
            headers = headers.set("Content-Language", String(contentLanguage));
        }
        if (this.configuration.apiKeys["Authorization"]) {
            headers = headers.set("Authorization", this.configuration.apiKeys["Authorization"]);
        }
        var httpHeaderAccepts = ["application/json"];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.basePath + "/api/adm/campaigns", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    CampaignAdminService.prototype.saveCampaign = function (xDeviceHash, contentLanguage, body, observe, reportProgress) {
        if (observe === void 0) { observe = "body"; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (xDeviceHash === null || xDeviceHash === undefined) {
            throw new Error("Required parameter xDeviceHash was null or undefined when calling saveCampaign.");
        }
        if (contentLanguage === null || contentLanguage === undefined) {
            throw new Error("Required parameter contentLanguage was null or undefined when calling saveCampaign.");
        }
        var headers = this.defaultHeaders;
        if (xDeviceHash !== undefined && xDeviceHash !== null) {
            headers = headers.set("X-Device-Hash", String(xDeviceHash));
        }
        if (contentLanguage !== undefined && contentLanguage !== null) {
            headers = headers.set("Content-Language", String(contentLanguage));
        }
        if (this.configuration.apiKeys["Authorization"]) {
            headers = headers.set("Authorization", this.configuration.apiKeys["Authorization"]);
        }
        var httpHeaderAccepts = [];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }
        var consumes = [];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }
        return this.httpClient.post(this.basePath + "/api/adm/campaigns", body, {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    CampaignAdminService.prototype.updateCampaign = function (xDeviceHash, contentLanguage, id, body, observe, reportProgress) {
        if (observe === void 0) { observe = "body"; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (xDeviceHash === null || xDeviceHash === undefined) {
            throw new Error("Required parameter xDeviceHash was null or undefined when calling updateCampaign.");
        }
        if (contentLanguage === null || contentLanguage === undefined) {
            throw new Error("Required parameter contentLanguage was null or undefined when calling updateCampaign.");
        }
        if (id === null || id === undefined) {
            throw new Error("Required parameter id was null or undefined when calling updateCampaign.");
        }
        var headers = this.defaultHeaders;
        if (xDeviceHash !== undefined && xDeviceHash !== null) {
            headers = headers.set("X-Device-Hash", String(xDeviceHash));
        }
        if (contentLanguage !== undefined && contentLanguage !== null) {
            headers = headers.set("Content-Language", String(contentLanguage));
        }
        if (this.configuration.apiKeys["Authorization"]) {
            headers = headers.set("Authorization", this.configuration.apiKeys["Authorization"]);
        }
        var httpHeaderAccepts = [];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }
        var consumes = [];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }
        return this.httpClient.put(this.basePath + "/api/adm/campaigns/" + encodeURIComponent(String(id)), {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    return CampaignAdminService;
}());
CampaignAdminService.decorators = [
    { type: core.Injectable },
];
CampaignAdminService.ctorParameters = function () { return [
    { type: http.HttpClient },
    { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
    { type: Configuration, decorators: [{ type: core.Optional }] }
]; };
var CampaignApplicationService = /** @class */ (function () {
    function CampaignApplicationService(httpClient, basePath, configuration) {
        this.httpClient = httpClient;
        this.basePath = 'http://localhost:5000';
        this.defaultHeaders = new http.HttpHeaders();
        this.configuration = new Configuration();
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }
    CampaignApplicationService.prototype.canConsumeForm = function (consumes) {
        var e_2, _a;
        var form = 'multipart/form-data';
        try {
            for (var consumes_2 = __values(consumes), consumes_2_1 = consumes_2.next(); !consumes_2_1.done; consumes_2_1 = consumes_2.next()) {
                var consume = consumes_2_1.value;
                if (form === consume) {
                    return true;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (consumes_2_1 && !consumes_2_1.done && (_a = consumes_2.return)) _a.call(consumes_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return false;
    };
    CampaignApplicationService.prototype.getAllCategories = function (xDeviceHash, contentLanguage, offset, limit, term, sort, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (xDeviceHash === null || xDeviceHash === undefined) {
            throw new Error('Required parameter xDeviceHash was null or undefined when calling getAllCategories.');
        }
        if (contentLanguage === null || contentLanguage === undefined) {
            throw new Error('Required parameter contentLanguage was null or undefined when calling getAllCategories.');
        }
        var queryParameters = new http.HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
        if (offset !== undefined && offset !== null) {
            queryParameters = queryParameters.set('offset', ((offset)));
        }
        if (limit !== undefined && limit !== null) {
            queryParameters = queryParameters.set('limit', ((limit)));
        }
        if (term !== undefined && term !== null) {
            queryParameters = queryParameters.set('term', ((term)));
        }
        if (sort !== undefined && sort !== null) {
            queryParameters = queryParameters.set('sort', ((sort)));
        }
        var headers = this.defaultHeaders;
        if (xDeviceHash !== undefined && xDeviceHash !== null) {
            headers = headers.set('X-Device-Hash', String(xDeviceHash));
        }
        if (contentLanguage !== undefined && contentLanguage !== null) {
            headers = headers.set('Content-Language', String(contentLanguage));
        }
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.basePath + "/api/app/campaigns/categories", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    CampaignApplicationService.prototype.getAppCampaings = function (xDeviceHash, contentLanguage, offset, limit, term, sort, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (xDeviceHash === null || xDeviceHash === undefined) {
            throw new Error('Required parameter xDeviceHash was null or undefined when calling getAppCampaings.');
        }
        if (contentLanguage === null || contentLanguage === undefined) {
            throw new Error('Required parameter contentLanguage was null or undefined when calling getAppCampaings.');
        }
        var queryParameters = new http.HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
        if (offset !== undefined && offset !== null) {
            queryParameters = queryParameters.set('offset', ((offset)));
        }
        if (limit !== undefined && limit !== null) {
            queryParameters = queryParameters.set('limit', ((limit)));
        }
        if (term !== undefined && term !== null) {
            queryParameters = queryParameters.set('term', ((term)));
        }
        if (sort !== undefined && sort !== null) {
            queryParameters = queryParameters.set('sort', ((sort)));
        }
        var headers = this.defaultHeaders;
        if (xDeviceHash !== undefined && xDeviceHash !== null) {
            headers = headers.set('X-Device-Hash', String(xDeviceHash));
        }
        if (contentLanguage !== undefined && contentLanguage !== null) {
            headers = headers.set('Content-Language', String(contentLanguage));
        }
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.basePath + "/api/app/campaigns", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    CampaignApplicationService.prototype.getCampaingByCategoryId = function (xDeviceHash, contentLanguage, categoryId, offset, limit, term, sort, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (xDeviceHash === null || xDeviceHash === undefined) {
            throw new Error('Required parameter xDeviceHash was null or undefined when calling getCampaingByCategoryId.');
        }
        if (contentLanguage === null || contentLanguage === undefined) {
            throw new Error('Required parameter contentLanguage was null or undefined when calling getCampaingByCategoryId.');
        }
        if (categoryId === null || categoryId === undefined) {
            throw new Error('Required parameter categoryId was null or undefined when calling getCampaingByCategoryId.');
        }
        var queryParameters = new http.HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
        if (offset !== undefined && offset !== null) {
            queryParameters = queryParameters.set('offset', ((offset)));
        }
        if (limit !== undefined && limit !== null) {
            queryParameters = queryParameters.set('limit', ((limit)));
        }
        if (term !== undefined && term !== null) {
            queryParameters = queryParameters.set('term', ((term)));
        }
        if (sort !== undefined && sort !== null) {
            queryParameters = queryParameters.set('sort', ((sort)));
        }
        var headers = this.defaultHeaders;
        if (xDeviceHash !== undefined && xDeviceHash !== null) {
            headers = headers.set('X-Device-Hash', String(xDeviceHash));
        }
        if (contentLanguage !== undefined && contentLanguage !== null) {
            headers = headers.set('Content-Language', String(contentLanguage));
        }
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.basePath + "/api/app/campaigns/categories/" + encodeURIComponent(String(categoryId)), {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    return CampaignApplicationService;
}());
CampaignApplicationService.decorators = [
    { type: core.Injectable },
];
CampaignApplicationService.ctorParameters = function () { return [
    { type: http.HttpClient },
    { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
    { type: Configuration, decorators: [{ type: core.Optional }] }
]; };
var CategoriesAdminService = /** @class */ (function () {
    function CategoriesAdminService(httpClient, basePath, configuration) {
        this.httpClient = httpClient;
        this.basePath = 'http://localhost:5000';
        this.defaultHeaders = new http.HttpHeaders();
        this.configuration = new Configuration();
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }
    CategoriesAdminService.prototype.canConsumeForm = function (consumes) {
        var e_3, _a;
        var form = 'multipart/form-data';
        try {
            for (var consumes_3 = __values(consumes), consumes_3_1 = consumes_3.next(); !consumes_3_1.done; consumes_3_1 = consumes_3.next()) {
                var consume = consumes_3_1.value;
                if (form === consume) {
                    return true;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (consumes_3_1 && !consumes_3_1.done && (_a = consumes_3.return)) _a.call(consumes_3);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return false;
    };
    CategoriesAdminService.prototype.deleteCategory = function (contentLanguage, id, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (contentLanguage === null || contentLanguage === undefined) {
            throw new Error('Required parameter contentLanguage was null or undefined when calling deleteCategory.');
        }
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteCategory.');
        }
        var headers = this.defaultHeaders;
        if (contentLanguage !== undefined && contentLanguage !== null) {
            headers = headers.set('Content-Language', String(contentLanguage));
        }
        if (this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.delete(this.basePath + "/api/adm/categories/" + encodeURIComponent(String(id)), {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    CategoriesAdminService.prototype.getCategories = function (contentLanguage, offset, limit, term, sort, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (contentLanguage === null || contentLanguage === undefined) {
            throw new Error('Required parameter contentLanguage was null or undefined when calling getCategories.');
        }
        var queryParameters = new http.HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
        if (offset !== undefined && offset !== null) {
            queryParameters = queryParameters.set('offset', ((offset)));
        }
        if (limit !== undefined && limit !== null) {
            queryParameters = queryParameters.set('limit', ((limit)));
        }
        if (term !== undefined && term !== null) {
            queryParameters = queryParameters.set('term', ((term)));
        }
        if (sort !== undefined && sort !== null) {
            queryParameters = queryParameters.set('sort', ((sort)));
        }
        var headers = this.defaultHeaders;
        if (contentLanguage !== undefined && contentLanguage !== null) {
            headers = headers.set('Content-Language', String(contentLanguage));
        }
        if (this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.basePath + "/api/adm/categories", {
            params: queryParameters,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    CategoriesAdminService.prototype.getCategory = function (contentLanguage, id, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (contentLanguage === null || contentLanguage === undefined) {
            throw new Error('Required parameter contentLanguage was null or undefined when calling getCategory.');
        }
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getCategory.');
        }
        var headers = this.defaultHeaders;
        if (contentLanguage !== undefined && contentLanguage !== null) {
            headers = headers.set('Content-Language', String(contentLanguage));
        }
        if (this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        return this.httpClient.get(this.basePath + "/api/adm/categories/" + encodeURIComponent(String(id)), {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    CategoriesAdminService.prototype.saveCategory = function (contentLanguage, body, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (contentLanguage === null || contentLanguage === undefined) {
            throw new Error('Required parameter contentLanguage was null or undefined when calling saveCategory.');
        }
        var headers = this.defaultHeaders;
        if (contentLanguage !== undefined && contentLanguage !== null) {
            headers = headers.set('Content-Language', String(contentLanguage));
        }
        if (this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.post(this.basePath + "/api/adm/categories", {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    CategoriesAdminService.prototype.updateCategory = function (contentLanguage, id, body, observe, reportProgress) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (contentLanguage === null || contentLanguage === undefined) {
            throw new Error('Required parameter contentLanguage was null or undefined when calling updateCategory.');
        }
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling updateCategory.');
        }
        var headers = this.defaultHeaders;
        if (contentLanguage !== undefined && contentLanguage !== null) {
            headers = headers.set('Content-Language', String(contentLanguage));
        }
        if (this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }
        var httpHeaderAccepts = [
            'application/json'
        ];
        var httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.put(this.basePath + "/api/adm/categories/" + encodeURIComponent(String(id)), {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    return CategoriesAdminService;
}());
CategoriesAdminService.decorators = [
    { type: core.Injectable },
];
CategoriesAdminService.ctorParameters = function () { return [
    { type: http.HttpClient },
    { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
    { type: Configuration, decorators: [{ type: core.Optional }] }
]; };
var APIS = [CampaignAdminService, CampaignApplicationService, CategoriesAdminService];
var ApiModule = /** @class */ (function () {
    function ApiModule(parentModule, http$$1) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http$$1) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
                'See also https://github.com/angular/angular/issues/20575');
        }
    }
    ApiModule.forRoot = function (configurationFactory) {
        return {
            ngModule: ApiModule,
            providers: [{ provide: Configuration, useFactory: configurationFactory }]
        };
    };
    return ApiModule;
}());
ApiModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [],
                declarations: [],
                exports: [],
                providers: [
                    CampaignAdminService,
                    CampaignApplicationService,
                    CategoriesAdminService
                ]
            },] },
];
ApiModule.ctorParameters = function () { return [
    { type: ApiModule, decorators: [{ type: core.Optional }, { type: core.SkipSelf }] },
    { type: http.HttpClient, decorators: [{ type: core.Optional }] }
]; };
var ModelConfig = {
    'Campaign': {
        'title': {
            'label': 'label.title', 'widget': 'string',
            'attr': {
                'required': { 'value': true, 'message': 'label.required' }, 'maxLength': { 'value': 15, 'message': 'label.maxlength' }, 'minLength': { 'value': 5, 'message': 'label.minLength' },
            }
        },
        'summary': {
            'label': 'label.summary', 'widget': 'string',
            'attr': {
                'required': { 'value': true, 'message': 'label.required' },
            }
        },
        'detail': {
            'label': 'label.detail', 'widget': 'string',
            'attr': {}
        },
        'isShownHomePage': {
            'label': 'label.isShownHomePage', 'widget': 'checkbox',
            'attr': {}
        },
        'order': {
            'label': 'label.order', 'widget': 'integer',
            'attr': {}
        },
        'coverImage': {
            'label': 'label.coverImage', 'widget': 'string',
            'attr': {}
        },
        'brandId': {
            'label': 'label.brandId', 'widget': 'string',
            'attr': {}
        },
        'categoryId': {
            'label': 'label.categoryId', 'widget': 'string',
            'attr': {}
        },
        'validity': {
            'attr': {}
        },
    },
    'CampaignCategoriesSummary': {
        'id': {
            'attr': {}
        },
        'title': {
            'attr': {}
        },
    },
    'CampaignList': {
        'id': {
            'attr': {}
        },
        'title': {
            'attr': {}
        },
        'isShownHomePage': {
            'attr': {}
        },
        'order': {
            'attr': {}
        },
        'brandName': {
            'attr': {}
        },
        'categoryName': {
            'attr': {}
        },
        'validity': {
            'attr': {}
        },
    },
    'CampaignSummary': {
        'id': {
            'attr': {}
        },
        'title': {
            'attr': {}
        },
        'summary': {
            'attr': {}
        },
        'detail': {
            'attr': {}
        },
        'isShownHomePage': {
            'attr': {}
        },
        'order': {
            'attr': {}
        },
        'coverImage': {
            'attr': {}
        },
        'brandName': {
            'attr': {}
        },
        'category': {
            'attr': {}
        },
        'validity': {
            'attr': {}
        },
    },
    'CategoriesSummary': {
        'id': {
            'attr': {}
        },
        'name': {
            'attr': {}
        },
    },
    'CategoryListResponse': {
        'id': {
            'attr': {}
        },
        'name': {
            'attr': {}
        },
    },
    'CategoryRequest': {
        'id': {
            'attr': {}
        },
        'name': {
            'label': 'label.title', 'widget': 'string',
            'attr': {
                'required': { 'value': true, 'message': 'label.required' },
            }
        },
    },
    'CategoryResponse': {
        'id': {
            'attr': {}
        },
        'name': {
            'attr': {}
        },
    },
    'CreatedReponse': {
        'id': {
            'attr': {}
        },
    },
    'DateRange': {
        'from': {
            'attr': {}
        },
        'to': {
            'attr': {}
        },
    },
    'ErrorReponse': {
        'code': {
            'attr': {}
        },
        'message': {
            'attr': {}
        },
    },
};

exports.APIS = APIS;
exports.CampaignAdminService = CampaignAdminService;
exports.CampaignApplicationService = CampaignApplicationService;
exports.CategoriesAdminService = CategoriesAdminService;
exports.BASE_PATH = BASE_PATH;
exports.COLLECTION_FORMATS = COLLECTION_FORMATS;
exports.Configuration = Configuration;
exports.ApiModule = ApiModule;
exports.ModelConfig = ModelConfig;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=nodi-crm-mobile-client.umd.js.map
