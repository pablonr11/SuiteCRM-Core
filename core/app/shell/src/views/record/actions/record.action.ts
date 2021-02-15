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

import {ActionData, ActionHandler} from '@app-common/actions/action.model';
import {RecordViewStore} from '@views/record/store/record-view/record-view.store';
import {ViewMode} from '@app-common/views/view.model';

export interface RecordActionData extends ActionData {
    store: RecordViewStore;
}

export interface RecordActionHandlerMap {
    [key: string]: RecordActionHandler;
}

export abstract class RecordActionHandler extends ActionHandler {

    abstract modes: ViewMode[];

    getStatus(store: RecordViewStore): string {
        return '';
    }

    abstract run(data: RecordActionData): void;

    abstract shouldDisplay(store: RecordViewStore): boolean;
}