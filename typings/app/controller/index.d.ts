// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportPost from '../../../app/controller/post';
import ExportTags from '../../../app/controller/tags';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    post: ExportPost;
    tags: ExportTags;
    user: ExportUser;
  }
}
