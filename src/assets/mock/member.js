import { LikeType } from "@/common/enums";

export const memberList = [
  {
    memberId: 1,
    nickName: "保羅",
    like: LikeType.Food,
  },
  {
    memberId: 2,
    nickName: "傑克",
    like: LikeType.Sport,
  },
  {
    memberId: 3,
    nickName: "傑森",
    like: LikeType.Animal,
  },
];

export const loginInfo = {
  name: "潔西卡",
  img: "",
  likes: [
    {
      like: LikeType.Sport,
      value: "游泳,跑步",
    },
    {
      like: LikeType.Food,
      value: "各種巧克力口味的甜點",
    },
    {
      like: LikeType.Animal,
      value: "貓,狗",
    },
  ],
};
