// 
// Copyright (c) Microsoft and contributors.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// 
// See the License for the specific language governing permissions and
// limitations under the License.
// 

import cm = require('../../agent/common');
import ifm = require('../../agent/api/interfaces');

export class TestFeedbackChannel implements cm.IFeedbackChannel {
	public agentUrl: string;
	public taskUrl: string;
	public taskApi: ifm.ITaskApi;
	public jobInfo: cm.IJobInfo;	
	public enabled: boolean;

	private _webConsole: string[];
	private _records: any;
	private _logPages: any;

	constructor() {
		this._webConsole = [];
		this._records = {};
		this._logPages = {};
	}


	public drain(callback: (err: any) => void): void {
		callback(null);
	}

	public queueLogPage(page: cm.ILogPageInfo): void {
		if (!this._logPages.hasOwnProperty(page.logInfo.recordId)) {
			this._logPages[page.logInfo.recordId] = [];
		}

		this._logPages[page.logInfo.recordId].push(page);
	}

	public queueConsoleLine(line: string): void {
		this._webConsole.push(line);
	}

	public queueConsoleSection(line: string): void {
		this._webConsole.push('[section] ' + line);
	}

	public setCurrentOperation(recordId: string, operation: string): void {
		this._getFromBatch(recordId).currentOperation = operation;
	}

	public setName(recordId: string, name: string): void {
		this._getFromBatch(recordId).name = name;
	}

	public setStartTime(recordId: string, startTime: Date): void {
		this._getFromBatch(recordId).startTime = startTime;
	}

	public setFinishTime(recordId: string, finishTime: Date): void {
		this._getFromBatch(recordId).finishTime = finishTime;
	}

	public setState(recordId: string, state: ifm.TimelineRecordState): void {
		this._getFromBatch(recordId).state = state;
	}

	public setResult(recordId: string, result: ifm.TaskResult): void {
		this._getFromBatch(recordId).result = result;
	}

	public setType(recordId: string, type: string): void {
		this._getFromBatch(recordId).type = type;
	}

	public setParentId(recordId: string, parentId: string): void {
		this._getFromBatch(recordId).parentId = parentId;
	}

	public setWorkerName(recordId: string, workerName: string): void {
		this._getFromBatch(recordId).workerName = workerName;
	}

	public setLogId(recordId: string, logRef: ifm.TaskLogReference): void {
		this._getFromBatch(recordId).log = logRef;
	}

	public updateJobRequest(poolId: number, lockToken: string, jobRequest: ifm.TaskAgentJobRequest, callback: (err: any) => void): void {
		callback(null);
	}

	public printConsole(): void {
		console.log(this._webConsole);
	}

	public printRecords(): void {
		console.log(JSON.stringify(this._records));
	}

	public printLogPages(): void {
		console.log(JSON.stringify(this._logPages));
	}

	private _getFromBatch(recordId: string) {
		if (!this._records.hasOwnProperty(recordId)) {
			this._records[recordId] = {};
		}

		return this._records[recordId];
	}
}