// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportRecords from '../../../app/controller/records';
import ExportTags from '../../../app/controller/tags';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    records: ExportRecords;
    tags: ExportTags;
    user: ExportUser;
  }
}
