/**
 * SuiteCRM is a customer relationship management program developed by SalesAgility Ltd.
 * Copyright (C) 2021 SalesAgility Ltd.
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License version 3 as published by the
 * Free Software Foundation with the addition of the following permission added
 * to Section 15 as permitted in Section 7(a): FOR ANY PART OF THE COVERED WORK
 * IN WHICH THE COPYRIGHT IS OWNED BY SALESAGILITY, SALESAGILITY DISCLAIMS THE
 * WARRANTY OF NON INFRINGEMENT OF THIRD PARTY RIGHTS.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * In accordance with Section 7(b) of the GNU Affero General Public License
 * version 3, these Appropriate Legal Notices must retain the display of the
 * "Supercharged by SuiteCRM" logo. If the display of the logos is not reasonably
 * feasible for technical reasons, the Appropriate Legal Notices must display
 * the words "Supercharged by SuiteCRM".
 */

import {ValidatorInterface} from '@services/record/validation/validator.Interface';
import {AbstractControl} from '@angular/forms';
import {Record} from '@app-common/record/record.model';
import {ViewFieldDefinition} from '@app-common/metadata/metadata.model';
import {Injectable} from '@angular/core';
import {NumberFormatter} from '@services/formatters/number/number-formatter.service';
import {StandardValidationErrors, StandardValidatorFn} from '@app-common/services/validators/validators.model';

export const currencyValidator = (formatter: NumberFormatter): StandardValidatorFn => (
    (control: AbstractControl): StandardValidationErrors | null => {

        const invalid = formatter.validateFloatUserFormat(control.value);
        return invalid ? {
            currencyValidator: {
                valid: false,
                format: formatter.getFloatUserFormatPattern(),
                message: {
                    labelKey: 'LBL_VALIDATION_ERROR_CURRENCY_FORMAT',
                    context: {
                        value: control.value,
                        expected: formatter.toUserFormat('1000.50')
                    }
                }
            },
        } : null;
    }
);


@Injectable({
    providedIn: 'root'
})
export class CurrencyValidator implements ValidatorInterface {

    constructor(protected formatter: NumberFormatter) {
    }

    applies(record: Record, viewField: ViewFieldDefinition): boolean {
        if (!viewField || !viewField.fieldDefinition) {
            return false;
        }

        return viewField.type === 'currency';
    }

    getValidator(viewField: ViewFieldDefinition): StandardValidatorFn[] {

        if (!viewField || !viewField.fieldDefinition) {
            return [];
        }

        return [currencyValidator(this.formatter)];
    }
}