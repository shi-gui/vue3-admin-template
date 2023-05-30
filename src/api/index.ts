import request from '@/http/index';

/**
 * @desc  用户项目分组--新增
 * @param name -string
 * @returns
 */
export const addGroupName = (name: string) => {
  return request({
    url: 'cloud/parking-business/business/app/projectGroup/add',
    method: 'post',
    data: {
      name
    }
  });
};
