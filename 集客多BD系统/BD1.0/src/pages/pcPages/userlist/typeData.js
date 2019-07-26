import React from 'react';
// import { ERR_OK, baseUrl } from "../../../axios/config";

export const mockTableData = [
    {
        title: '序号',
        dataIndex: 'userId',
        key: 'col01',
        width: 80,
    },
    {
        title: '账号',
        dataIndex: 'username',
        key: 'col02',
        // width: 100,
    },
    {
        title: '姓名',
        dataIndex: 'realName',
        key: 'col07',
        // width: 100,
    },
    {
        title: '所属渠道',
        dataIndex: 'channelName',
        key: 'col03',
        // width: 50,
    },
    {
        title: '职级',
        dataIndex: 'roleName',
        key: 'col04',
        // width: 50,
    },
    {
        title: '从属',
        dataIndex: 'regionTeamName',
        key: 'col05',
        // width: 100,
    },
    {
        title: '客户人数',
        dataIndex: 'customerCount',
        key: 'col06',
    },
    {
        title: '本月剩余试用经销商名额',
        dataIndex: 'customerCount',
        key: 'col08',
    }
]

// export const mocklist = [
//     {
//         title: '商品主图',
//         dataIndex: 'imageURL',
//         key: 'col01',
//         render: (text, score) => {
//             return (
//                 <img src={baseUrl + score.imagePath} alt="" style={{ width: '30px', height: '30px' }} />
//             )
//         }
//     },
//     {
//         title: '分类名称',
//         dataIndex: 'name',
//         key: 'col02',
//         width: 100,
//     },
//     {
//         title: '状态',
//         dataIndex: 'status',
//         key: 'col04',
//         width: 50,
//     },
//     {
//         title: '排序',
//         dataIndex: 'sort',
//         key: 'col05',
//         width: 50,
//     },
//     {
//         title: '分类标签',
//         dataIndex: 'tagNames',
//         key: 'col08',
//         width: 100,
//     },
//     {
//         title: '创建时间',
//         dataIndex: 'createTime',
//         key: 'col010',
//         width: 100,
//     },
//     {
//         title: '操作',
//         dataIndex: 'action',
//         key: 'col013',
//     }
// ]