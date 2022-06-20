import { LikeType } from "@/common/enums";

export const memberList = [
  {
    memberId: 1,
    nickName: "保羅",
    like: LikeType.food,
  },
  {
    memberId: 2,
    nickName: "傑克",
    like: LikeType.sports,
  },
  {
    memberId: 3,
    nickName: "傑森",
    like: LikeType.animal,
  },
];

export const loginInfo = {
  name: "潔西卡",
  img: "",
  likes: [
    {
      Type: LikeType.sport,
      value: "游泳,跑步",
    },
    {
      Type: LikeType.food,
      value: "各種巧克力口味的甜點",
    },
    {
      Type: LikeType.animal,
      value: "貓,狗",
    },
  ],
};
