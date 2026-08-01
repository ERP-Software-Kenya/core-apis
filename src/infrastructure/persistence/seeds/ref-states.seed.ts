import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { FindOptionsWhere, Repository, DataSource } from "typeorm";
import { BaseSeed } from "../../../common";
import { StateEntity } from "../entities";

@Injectable()
export class RefStatesSeed extends BaseSeed<StateEntity> {
  public get version(): number { return 1; }
  public get seedingData(): Partial<StateEntity>[] {
    return [
  {
    "id": 1,
    "name": "Southern Nations, Nationalities, and Peoples' Region",
    "countryId": 70,
    "countryCode": "ET",
    "fipsCode": "54",
    "iso2": "SN",
    "latitude": 6.5156911,
    "longitude": 36.954107
  },
  {
    "id": 2,
    "name": "Somali Region",
    "countryId": 70,
    "countryCode": "ET",
    "fipsCode": "52",
    "iso2": "SO",
    "latitude": 6.6612293,
    "longitude": 43.7908453
  },
  {
    "id": 3,
    "name": "Amhara Region",
    "countryId": 70,
    "countryCode": "ET",
    "fipsCode": "46",
    "iso2": "AM",
    "latitude": 11.3494247,
    "longitude": 37.9784585
  },
  {
    "id": 4,
    "name": "Tigray Region",
    "countryId": 70,
    "countryCode": "ET",
    "fipsCode": "53",
    "iso2": "TI",
    "latitude": 14.0323336,
    "longitude": 38.3165725
  },
  {
    "id": 5,
    "name": "Oromia Region",
    "countryId": 70,
    "countryCode": "ET",
    "fipsCode": "51",
    "iso2": "OR",
    "latitude": 7.5460377,
    "longitude": 40.6346851
  },
  {
    "id": 6,
    "name": "Afar Region",
    "countryId": 70,
    "countryCode": "ET",
    "fipsCode": "45",
    "iso2": "AF",
    "latitude": 11.7559388,
    "longitude": 40.958688
  },
  {
    "id": 7,
    "name": "Harari Region",
    "countryId": 70,
    "countryCode": "ET",
    "fipsCode": "50",
    "iso2": "HA",
    "latitude": 9.314866,
    "longitude": 42.1967716
  },
  {
    "id": 8,
    "name": "Dire Dawa",
    "countryId": 70,
    "countryCode": "ET",
    "fipsCode": "48",
    "iso2": "DD",
    "latitude": 9.6008747,
    "longitude": 41.850142
  },
  {
    "id": 9,
    "name": "Benishangul-Gumuz Region",
    "countryId": 70,
    "countryCode": "ET",
    "fipsCode": "47",
    "iso2": "BE",
    "latitude": 10.7802889,
    "longitude": 35.5657862
  },
  {
    "id": 10,
    "name": "Gambela Region",
    "countryId": 70,
    "countryCode": "ET",
    "fipsCode": "49",
    "iso2": "GA",
    "latitude": 7.9219687,
    "longitude": 34.1531947
  },
  {
    "id": 11,
    "name": "Addis Ababa",
    "countryId": 70,
    "countryCode": "ET",
    "fipsCode": "44",
    "iso2": "AA",
    "latitude": 8.9806034,
    "longitude": 38.7577605
  },
  {
    "id": 12,
    "name": "Petnjica Municipality",
    "countryId": 147,
    "countryCode": "ME",
    "fipsCode": "23",
    "iso2": "23",
    "latitude": 42.935348,
    "longitude": 20.0211449
  },
  {
    "id": 13,
    "name": "Bar Municipality",
    "countryId": 147,
    "countryCode": "ME",
    "fipsCode": "02",
    "iso2": "02",
    "latitude": 42.1278119,
    "longitude": 19.140438
  },
  {
    "id": 14,
    "name": "Danilovgrad Municipality",
    "countryId": 147,
    "countryCode": "ME",
    "fipsCode": "07",
    "iso2": "07",
    "latitude": 42.58357,
    "longitude": 19.140438
  },
  {
    "id": 15,
    "name": "Rožaje Municipality",
    "countryId": 147,
    "countryCode": "ME",
    "fipsCode": "17",
    "iso2": "17",
    "latitude": 42.8408389,
    "longitude": 20.1670628
  },
  {
    "id": 16,
    "name": "Plužine Municipality",
    "countryId": 147,
    "countryCode": "ME",
    "fipsCode": "15",
    "iso2": "15",
    "latitude": 43.1593384,
    "longitude": 18.8551484
  },
  {
    "id": 17,
    "name": "Nikšić Municipality",
    "countryId": 147,
    "countryCode": "ME",
    "fipsCode": "12",
    "iso2": "12",
    "latitude": 42.7997184,
    "longitude": 18.7600963
  },
  {
    "id": 18,
    "name": "Šavnik Municipality",
    "countryId": 147,
    "countryCode": "ME",
    "fipsCode": "18",
    "iso2": "18",
    "latitude": 42.9603756,
    "longitude": 19.140438
  },
  {
    "id": 19,
    "name": "Plav Municipality",
    "countryId": 147,
    "countryCode": "ME",
    "fipsCode": "13",
    "iso2": "13",
    "latitude": 42.6001337,
    "longitude": 19.9407541
  },
  {
    "id": 20,
    "name": "Pljevlja Municipality",
    "countryId": 147,
    "countryCode": "ME",
    "fipsCode": "14",
    "iso2": "14",
    "latitude": 43.2723383,
    "longitude": 19.2831531
  },
  {
    "id": 21,
    "name": "Berane Municipality",
    "countryId": 147,
    "countryCode": "ME",
    "fipsCode": "03",
    "iso2": "03",
    "latitude": 42.8257289,
    "longitude": 19.9020509
  },
  {
    "id": 22,
    "name": "Mojkovac Municipality",
    "countryId": 147,
    "countryCode": "ME",
    "fipsCode": "11",
    "iso2": "11",
    "latitude": 42.9688018,
    "longitude": 19.5211063
  },
  {
    "id": 23,
    "name": "Andrijevica Municipality",
    "countryId": 147,
    "countryCode": "ME",
    "fipsCode": "01",
    "iso2": "01",
    "latitude": 42.7362477,
    "longitude": 19.7859556
  },
  {
    "id": 24,
    "name": "Gusinje Municipality",
    "countryId": 147,
    "countryCode": "ME",
    "fipsCode": "22",
    "iso2": "22",
    "latitude": 42.5563455,
    "longitude": 19.8306051
  },
  {
    "id": 25,
    "name": "Bijelo Polje Municipality",
    "countryId": 147,
    "countryCode": "ME",
    "fipsCode": "04",
    "iso2": "04",
    "latitude": 43.0846526,
    "longitude": 19.7115472
  },
  {
    "id": 26,
    "name": "Kotor Municipality",
    "countryId": 147,
    "countryCode": "ME",
    "fipsCode": "10",
    "iso2": "10",
    "latitude": 42.5740261,
    "longitude": 18.6413145
  },
  {
    "id": 27,
    "name": "Podgorica Municipality",
    "countryId": 147,
    "countryCode": "ME",
    "fipsCode": "16",
    "iso2": "16",
    "latitude": 42.3693834,
    "longitude": 19.2831531
  },
  {
    "id": 28,
    "name": "Old Royal Capital Cetinje",
    "countryId": 147,
    "countryCode": "ME",
    "fipsCode": "16",
    "iso2": "06",
    "latitude": 42.3930959,
    "longitude": 18.9115964
  },
  {
    "id": 29,
    "name": "Tivat Municipality",
    "countryId": 147,
    "countryCode": "ME",
    "fipsCode": "19",
    "iso2": "19",
    "latitude": 42.42348,
    "longitude": 18.7185184
  },
  {
    "id": 30,
    "name": "Budva Municipality",
    "countryId": 147,
    "countryCode": "ME",
    "fipsCode": "05",
    "iso2": "05",
    "latitude": 42.314072,
    "longitude": 18.8313832
  },
  {
    "id": 31,
    "name": "Kolašin Municipality",
    "countryId": 147,
    "countryCode": "ME",
    "fipsCode": "09",
    "iso2": "09",
    "latitude": 42.7601916,
    "longitude": 19.4259114
  },
  {
    "id": 32,
    "name": "Žabljak Municipality",
    "countryId": 147,
    "countryCode": "ME",
    "fipsCode": "21",
    "iso2": "21",
    "latitude": 43.1555152,
    "longitude": 19.1226018
  },
  {
    "id": 33,
    "name": "Ulcinj Municipality",
    "countryId": 147,
    "countryCode": "ME",
    "fipsCode": "20",
    "iso2": "20",
    "latitude": 41.9652795,
    "longitude": 19.3069432
  },
  {
    "id": 34,
    "name": "Kunene Region",
    "countryId": 152,
    "countryCode": "NA",
    "fipsCode": "32",
    "iso2": "KU",
    "latitude": -19.4086317,
    "longitude": 13.914399
  },
  {
    "id": 35,
    "name": "Kavango West Region",
    "countryId": 152,
    "countryCode": "NA",
    "fipsCode": "41",
    "iso2": "KW",
    "latitude": -18.271048,
    "longitude": 18.4276047
  },
  {
    "id": 36,
    "name": "Kavango East Region",
    "countryId": 152,
    "countryCode": "NA",
    "fipsCode": "40",
    "iso2": "KE",
    "latitude": -18.271048,
    "longitude": 18.4276047
  },
  {
    "id": 37,
    "name": "Oshana Region",
    "countryId": 152,
    "countryCode": "NA",
    "fipsCode": "37",
    "iso2": "ON",
    "latitude": -18.4305064,
    "longitude": 15.6881788
  },
  {
    "id": 38,
    "name": "Hardap Region",
    "countryId": 152,
    "countryCode": "NA",
    "fipsCode": "30",
    "iso2": "HA",
    "latitude": -24.2310134,
    "longitude": 17.668887
  },
  {
    "id": 39,
    "name": "Omusati Region",
    "countryId": 152,
    "countryCode": "NA",
    "fipsCode": "36",
    "iso2": "OS",
    "latitude": -18.4070294,
    "longitude": 14.8454619
  },
  {
    "id": 40,
    "name": "Ohangwena Region",
    "countryId": 152,
    "countryCode": "NA",
    "fipsCode": "33",
    "iso2": "OW",
    "latitude": -17.5979291,
    "longitude": 16.8178377
  },
  {
    "id": 41,
    "name": "Omaheke Region",
    "countryId": 152,
    "countryCode": "NA",
    "fipsCode": "35",
    "iso2": "OH",
    "latitude": -21.8466651,
    "longitude": 19.1880047
  },
  {
    "id": 42,
    "name": "Oshikoto Region",
    "countryId": 152,
    "countryCode": "NA",
    "fipsCode": "38",
    "iso2": "OT",
    "latitude": -18.4152575,
    "longitude": 16.912251
  },
  {
    "id": 43,
    "name": "Erongo Region",
    "countryId": 152,
    "countryCode": "NA",
    "fipsCode": "29",
    "iso2": "ER",
    "latitude": -22.2565682,
    "longitude": 15.4068079
  },
  {
    "id": 44,
    "name": "Khomas Region",
    "countryId": 152,
    "countryCode": "NA",
    "fipsCode": "21",
    "iso2": "KH",
    "latitude": -22.6377854,
    "longitude": 17.1011931
  },
  {
    "id": 45,
    "name": "Karas Region",
    "countryId": 152,
    "countryCode": "NA",
    "fipsCode": "31",
    "iso2": "KA",
    "latitude": -26.8429645,
    "longitude": 17.2902839
  },
  {
    "id": 46,
    "name": "Otjozondjupa Region",
    "countryId": 152,
    "countryCode": "NA",
    "fipsCode": "39",
    "iso2": "OD",
    "latitude": -20.5486916,
    "longitude": 17.668887
  },
  {
    "id": 47,
    "name": "Zambezi Region",
    "countryId": 152,
    "countryCode": "NA",
    "fipsCode": "28",
    "iso2": "CA",
    "latitude": -17.8193419,
    "longitude": 23.9536466
  },
  {
    "id": 48,
    "name": "Ashanti Region",
    "countryId": 83,
    "countryCode": "GH",
    "fipsCode": "02",
    "iso2": "AH",
    "latitude": 6.7470436,
    "longitude": -1.5208624
  },
  {
    "id": 49,
    "name": "Western Region",
    "countryId": 83,
    "countryCode": "GH",
    "fipsCode": "09",
    "iso2": "WP",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 50,
    "name": "Eastern Region",
    "countryId": 83,
    "countryCode": "GH",
    "fipsCode": "05",
    "iso2": "EP",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 51,
    "name": "Northern Region",
    "countryId": 83,
    "countryCode": "GH",
    "fipsCode": "06",
    "iso2": "NP",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 52,
    "name": "Central Region",
    "countryId": 83,
    "countryCode": "GH",
    "fipsCode": "04",
    "iso2": "CP",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 53,
    "name": "Brong-Ahafo Region",
    "countryId": 83,
    "countryCode": "GH",
    "fipsCode": "03",
    "iso2": "BA",
    "latitude": 7.9559247,
    "longitude": -1.6760691
  },
  {
    "id": 54,
    "name": "Greater Accra Region",
    "countryId": 83,
    "countryCode": "GH",
    "fipsCode": "01",
    "iso2": "AA",
    "latitude": 5.8142836,
    "longitude": 0.0746767
  },
  {
    "id": 55,
    "name": "Upper East Region",
    "countryId": 83,
    "countryCode": "GH",
    "fipsCode": "10",
    "iso2": "UE",
    "latitude": 10.7082499,
    "longitude": -0.9820668
  },
  {
    "id": 56,
    "name": "Volta Region",
    "countryId": 83,
    "countryCode": "GH",
    "fipsCode": "08",
    "iso2": "TV",
    "latitude": 6.5781373,
    "longitude": 0.4502368
  },
  {
    "id": 57,
    "name": "Upper West Region",
    "countryId": 83,
    "countryCode": "GH",
    "fipsCode": "11",
    "iso2": "UW",
    "latitude": 10.2529757,
    "longitude": -2.1450245
  },
  {
    "id": 58,
    "name": "San Marino",
    "countryId": 192,
    "countryCode": "SM",
    "fipsCode": "07",
    "iso2": "07",
    "latitude": 43.94236,
    "longitude": 12.457777
  },
  {
    "id": 59,
    "name": "Acquaviva",
    "countryId": 192,
    "countryCode": "SM",
    "fipsCode": "01",
    "iso2": "01",
    "latitude": 41.8671597,
    "longitude": 14.7469479
  },
  {
    "id": 60,
    "name": "Chiesanuova",
    "countryId": 192,
    "countryCode": "SM",
    "fipsCode": "02",
    "iso2": "02",
    "latitude": 45.4226172,
    "longitude": 7.6503854
  },
  {
    "id": 61,
    "name": "Borgo Maggiore",
    "countryId": 192,
    "countryCode": "SM",
    "fipsCode": "06",
    "iso2": "06",
    "latitude": 43.9574882,
    "longitude": 12.4552546
  },
  {
    "id": 62,
    "name": "Faetano",
    "countryId": 192,
    "countryCode": "SM",
    "fipsCode": "04",
    "iso2": "04",
    "latitude": 43.9348967,
    "longitude": 12.4896554
  },
  {
    "id": 63,
    "name": "Montegiardino",
    "countryId": 192,
    "countryCode": "SM",
    "fipsCode": "08",
    "iso2": "08",
    "latitude": 43.9052999,
    "longitude": 12.4810542
  },
  {
    "id": 64,
    "name": "Domagnano",
    "countryId": 192,
    "countryCode": "SM",
    "fipsCode": "03",
    "iso2": "03",
    "latitude": 43.9501929,
    "longitude": 12.4681537
  },
  {
    "id": 65,
    "name": "Serravalle",
    "countryId": 192,
    "countryCode": "SM",
    "fipsCode": "09",
    "iso2": "09",
    "latitude": 44.7232084,
    "longitude": 8.8574005
  },
  {
    "id": 66,
    "name": "Fiorentino",
    "countryId": 192,
    "countryCode": "SM",
    "fipsCode": "05",
    "iso2": "05",
    "latitude": 43.9078337,
    "longitude": 12.4581209
  },
  {
    "id": 67,
    "name": "Tillabéri Region",
    "countryId": 160,
    "countryCode": "NE",
    "fipsCode": "09",
    "iso2": "6",
    "latitude": 14.6489525,
    "longitude": 2.1450245
  },
  {
    "id": 68,
    "name": "Dosso Region",
    "countryId": 160,
    "countryCode": "NE",
    "fipsCode": "03",
    "iso2": "3",
    "latitude": 13.1513947,
    "longitude": 3.4195527
  },
  {
    "id": 69,
    "name": "Zinder Region",
    "countryId": 160,
    "countryCode": "NE",
    "fipsCode": "07",
    "iso2": "7",
    "latitude": 15.1718881,
    "longitude": 10.2600125
  },
  {
    "id": 70,
    "name": "Maradi Region",
    "countryId": 160,
    "countryCode": "NE",
    "fipsCode": "04",
    "iso2": "4",
    "latitude": 13.8018074,
    "longitude": 7.4381355
  },
  {
    "id": 71,
    "name": "Agadez Region",
    "countryId": 160,
    "countryCode": "NE",
    "fipsCode": "01",
    "iso2": "1",
    "latitude": 20.6670752,
    "longitude": 12.0718281
  },
  {
    "id": 72,
    "name": "Diffa Region",
    "countryId": 160,
    "countryCode": "NE",
    "fipsCode": "02",
    "iso2": "2",
    "latitude": 13.6768647,
    "longitude": 12.7135121
  },
  {
    "id": 73,
    "name": "Tahoua Region",
    "countryId": 160,
    "countryCode": "NE",
    "fipsCode": "06",
    "iso2": "5",
    "latitude": 16.0902543,
    "longitude": 5.3939551
  },
  {
    "id": 74,
    "name": "Mqabba",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "06",
    "iso2": "33",
    "latitude": 35.8444143,
    "longitude": 14.4694186
  },
  {
    "id": 75,
    "name": "San Ġwann",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "54",
    "iso2": "49",
    "latitude": 35.9077365,
    "longitude": 14.4752416
  },
  {
    "id": 76,
    "name": "Żurrieq",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "54",
    "iso2": "68",
    "latitude": 35.8216306,
    "longitude": 14.4810648
  },
  {
    "id": 77,
    "name": "Luqa",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "30",
    "iso2": "25",
    "latitude": 35.8582865,
    "longitude": 14.4868883
  },
  {
    "id": 78,
    "name": "Marsaxlokk",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "33",
    "iso2": "28",
    "latitude": 35.8411699,
    "longitude": 14.5393097
  },
  {
    "id": 79,
    "name": "Qala",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "33",
    "iso2": "42",
    "latitude": 36.0388628,
    "longitude": 14.318101
  },
  {
    "id": 80,
    "name": "Żebbuġ Malta",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "33",
    "iso2": "66",
    "latitude": 35.8764648,
    "longitude": 14.439084
  },
  {
    "id": 81,
    "name": "Xgħajra",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "33",
    "iso2": "63",
    "latitude": 35.8868282,
    "longitude": 14.5472391
  },
  {
    "id": 82,
    "name": "Kirkop",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "28",
    "iso2": "23",
    "latitude": 35.8437862,
    "longitude": 14.4854324
  },
  {
    "id": 83,
    "name": "Rabat",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "28",
    "iso2": "46",
    "latitude": 33.9715904,
    "longitude": -6.8498129
  },
  {
    "id": 84,
    "name": "Floriana",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "28",
    "iso2": "09",
    "latitude": 45.4952185,
    "longitude": -73.7139576
  },
  {
    "id": 85,
    "name": "Żebbuġ Gozo",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "28",
    "iso2": "65",
    "latitude": 36.0716403,
    "longitude": 14.245408
  },
  {
    "id": 86,
    "name": "Swieqi",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "28",
    "iso2": "57",
    "latitude": 35.9191182,
    "longitude": 14.4694186
  },
  {
    "id": 87,
    "name": "Saint Lawrence",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "50",
    "iso2": "50",
    "latitude": 38.9578056,
    "longitude": -95.2565689
  },
  {
    "id": 88,
    "name": "Birżebbuġa",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "05",
    "iso2": "05",
    "latitude": 35.8135989,
    "longitude": 14.5247463
  },
  {
    "id": 89,
    "name": "Mdina",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "05",
    "iso2": "29",
    "latitude": 35.888093,
    "longitude": 14.4068357
  },
  {
    "id": 90,
    "name": "Santa Venera",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "05",
    "iso2": "54",
    "latitude": 35.8902201,
    "longitude": 14.4766974
  },
  {
    "id": 91,
    "name": "Kerċem",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "05",
    "iso2": "22",
    "latitude": 36.0447939,
    "longitude": 14.2250605
  },
  {
    "id": 92,
    "name": "Għarb",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "05",
    "iso2": "14",
    "latitude": 36.068909,
    "longitude": 14.2018098
  },
  {
    "id": 93,
    "name": "Iklin",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "05",
    "iso2": "19",
    "latitude": 35.9098774,
    "longitude": 14.4577732
  },
  {
    "id": 94,
    "name": "Santa Luċija",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "05",
    "iso2": "53",
    "latitude": 35.856142,
    "longitude": 14.50436
  },
  {
    "id": 95,
    "name": "Valletta",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "05",
    "iso2": "60",
    "latitude": 35.8989085,
    "longitude": 14.5145528
  },
  {
    "id": 96,
    "name": "Msida",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "05",
    "iso2": "34",
    "latitude": 35.8956388,
    "longitude": 14.4868883
  },
  {
    "id": 97,
    "name": "Birkirkara",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "04",
    "iso2": "04",
    "latitude": 35.8954706,
    "longitude": 14.4665072
  },
  {
    "id": 98,
    "name": "Siġġiewi",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "04",
    "iso2": "55",
    "latitude": 35.8463742,
    "longitude": 14.4315746
  },
  {
    "id": 99,
    "name": "Kalkara",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "04",
    "iso2": "21",
    "latitude": 35.8914242,
    "longitude": 14.5320278
  },
  {
    "id": 100,
    "name": "St. Julian\"s",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "35",
    "iso2": "48",
    "latitude": 42.2122513,
    "longitude": -85.8917127
  },
  {
    "id": 101,
    "name": "Victoria",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "46",
    "iso2": "45",
    "latitude": 28.8052674,
    "longitude": -97.0035982
  },
  {
    "id": 102,
    "name": "Mellieħa",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "46",
    "iso2": "30",
    "latitude": 35.9523529,
    "longitude": 14.3500975
  },
  {
    "id": 103,
    "name": "Tarxien",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "58",
    "iso2": "59",
    "latitude": 35.8672552,
    "longitude": 14.5116405
  },
  {
    "id": 104,
    "name": "Sliema",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "58",
    "iso2": "56",
    "latitude": 35.9110081,
    "longitude": 14.502904
  },
  {
    "id": 105,
    "name": "Ħamrun",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "58",
    "iso2": "18",
    "latitude": 35.8861237,
    "longitude": 14.4883442
  },
  {
    "id": 106,
    "name": "Għasri",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "58",
    "iso2": "16",
    "latitude": 36.0668075,
    "longitude": 14.2192475
  },
  {
    "id": 107,
    "name": "Birgu",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "58",
    "iso2": "03",
    "latitude": 35.8879214,
    "longitude": 14.522562
  },
  {
    "id": 108,
    "name": "Balzan",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "02",
    "iso2": "02",
    "latitude": 35.8957414,
    "longitude": 14.4534065
  },
  {
    "id": 109,
    "name": "Mġarr",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "02",
    "iso2": "31",
    "latitude": 35.9189327,
    "longitude": 14.3617343
  },
  {
    "id": 110,
    "name": "Attard",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "01",
    "iso2": "01",
    "latitude": 35.8904967,
    "longitude": 14.4199322
  },
  {
    "id": 111,
    "name": "Qrendi",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "01",
    "iso2": "44",
    "latitude": 35.8328488,
    "longitude": 14.4548621
  },
  {
    "id": 112,
    "name": "Naxxar",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "01",
    "iso2": "38",
    "latitude": 35.9317518,
    "longitude": 14.4315746
  },
  {
    "id": 113,
    "name": "Gżira",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "01",
    "iso2": "12",
    "latitude": 35.905897,
    "longitude": 14.4953338
  },
  {
    "id": 114,
    "name": "Xagħra",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "01",
    "iso2": "61",
    "latitude": 36.050845,
    "longitude": 14.267482
  },
  {
    "id": 115,
    "name": "Paola",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "39",
    "iso2": "39",
    "latitude": 38.5722353,
    "longitude": -94.8791294
  },
  {
    "id": 116,
    "name": "Sannat",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "54",
    "iso2": "52",
    "latitude": 36.0192643,
    "longitude": 14.2599437
  },
  {
    "id": 117,
    "name": "Dingli",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "07",
    "iso2": "07",
    "latitude": 35.8627309,
    "longitude": 14.3850107
  },
  {
    "id": 118,
    "name": "Gudja",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "07",
    "iso2": "11",
    "latitude": 35.8469803,
    "longitude": 14.502904
  },
  {
    "id": 119,
    "name": "Qormi",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "43",
    "iso2": "43",
    "latitude": 35.8764388,
    "longitude": 14.4694186
  },
  {
    "id": 120,
    "name": "Għargħur",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "43",
    "iso2": "15",
    "latitude": 35.9220569,
    "longitude": 14.4563176
  },
  {
    "id": 121,
    "name": "Xewkija",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "43",
    "iso2": "62",
    "latitude": 36.0299236,
    "longitude": 14.2599437
  },
  {
    "id": 122,
    "name": "Ta\" Xbiex",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "59",
    "iso2": "58",
    "latitude": 35.8991448,
    "longitude": 14.4963519
  },
  {
    "id": 123,
    "name": "Żabbar",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "59",
    "iso2": "64",
    "latitude": 35.8724715,
    "longitude": 14.5451354
  },
  {
    "id": 124,
    "name": "Għaxaq",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "59",
    "iso2": "17",
    "latitude": 35.8440359,
    "longitude": 14.516009
  },
  {
    "id": 125,
    "name": "Pembroke",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "40",
    "iso2": "40",
    "latitude": 34.6801626,
    "longitude": -79.1950373
  },
  {
    "id": 126,
    "name": "Lija",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "29",
    "iso2": "24",
    "latitude": 49.180076,
    "longitude": -123.103317
  },
  {
    "id": 127,
    "name": "Pietà",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "29",
    "iso2": "41",
    "latitude": 42.21862,
    "longitude": -83.734647
  },
  {
    "id": 128,
    "name": "Marsa",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "29",
    "iso2": "26",
    "latitude": 34.0319587,
    "longitude": -118.4455535
  },
  {
    "id": 129,
    "name": "Fgura",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "29",
    "iso2": "08",
    "latitude": 35.8738269,
    "longitude": 14.5232901
  },
  {
    "id": 130,
    "name": "Għajnsielem",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "11",
    "iso2": "13",
    "latitude": 36.0247966,
    "longitude": 14.2802961
  },
  {
    "id": 131,
    "name": "Mtarfa",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "11",
    "iso2": "35",
    "latitude": 35.8895125,
    "longitude": 14.3951953
  },
  {
    "id": 132,
    "name": "Munxar",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "11",
    "iso2": "36",
    "latitude": 36.0288058,
    "longitude": 14.2250605
  },
  {
    "id": 133,
    "name": "Nadur",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "11",
    "iso2": "37",
    "latitude": 36.0447019,
    "longitude": 14.2919273
  },
  {
    "id": 134,
    "name": "Fontana",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "11",
    "iso2": "10",
    "latitude": 34.0922335,
    "longitude": -117.435048
  },
  {
    "id": 135,
    "name": "Żejtun",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "11",
    "iso2": "67",
    "latitude": 35.8548714,
    "longitude": 14.5363969
  },
  {
    "id": 136,
    "name": "Senglea",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "11",
    "iso2": "20",
    "latitude": 35.8873041,
    "longitude": 14.5167371
  },
  {
    "id": 137,
    "name": "Marsaskala",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "32",
    "iso2": "27",
    "latitude": 35.860364,
    "longitude": 14.5567876
  },
  {
    "id": 138,
    "name": "Cospicua",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "32",
    "iso2": "06",
    "latitude": 35.8806753,
    "longitude": 14.5218338
  },
  {
    "id": 139,
    "name": "St. Paul\"s Bay",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "35",
    "iso2": "51",
    "latitude": 35.936017,
    "longitude": 14.3966503
  },
  {
    "id": 140,
    "name": "Mosta",
    "countryId": 135,
    "countryCode": "MT",
    "fipsCode": "35",
    "iso2": "32",
    "latitude": 35.9141504,
    "longitude": 14.4228427
  },
  {
    "id": 141,
    "name": "Mangystau Region",
    "countryId": 112,
    "countryCode": "KZ",
    "fipsCode": "09",
    "iso2": "MAN",
    "latitude": 44.590802,
    "longitude": 53.8499508
  },
  {
    "id": 142,
    "name": "Kyzylorda Region",
    "countryId": 112,
    "countryCode": "KZ",
    "fipsCode": "14",
    "iso2": "KZY",
    "latitude": 44.6922613,
    "longitude": 62.6571885
  },
  {
    "id": 143,
    "name": "Almaty Region",
    "countryId": 112,
    "countryCode": "KZ",
    "fipsCode": "01",
    "iso2": "ALM",
    "latitude": 45.0119227,
    "longitude": 78.4229392
  },
  {
    "id": 144,
    "name": "North Kazakhstan Region",
    "countryId": 112,
    "countryCode": "KZ",
    "fipsCode": "16",
    "iso2": "SEV",
    "latitude": 54.1622066,
    "longitude": 69.9387071
  },
  {
    "id": 145,
    "name": "Akmola Region",
    "countryId": 112,
    "countryCode": "KZ",
    "fipsCode": "03",
    "iso2": "AKM",
    "latitude": 51.916532,
    "longitude": 69.4110494
  },
  {
    "id": 146,
    "name": "Pavlodar Region",
    "countryId": 112,
    "countryCode": "KZ",
    "fipsCode": "11",
    "iso2": "PAV",
    "latitude": 52.2878444,
    "longitude": 76.9733453
  },
  {
    "id": 147,
    "name": "Jambyl Region",
    "countryId": 112,
    "countryCode": "KZ",
    "fipsCode": "17",
    "iso2": "ZHA",
    "latitude": 44.2220308,
    "longitude": 72.3657967
  },
  {
    "id": 148,
    "name": "West Kazakhstan Province",
    "countryId": 112,
    "countryCode": "KZ",
    "fipsCode": "07",
    "iso2": "ZAP",
    "latitude": 49.5679727,
    "longitude": 50.8066616
  },
  {
    "id": 149,
    "name": "Turkestan Region",
    "countryId": 112,
    "countryCode": "KZ",
    "fipsCode": "10",
    "iso2": "YUZ",
    "latitude": 43.3666958,
    "longitude": 68.4094405
  },
  {
    "id": 150,
    "name": "Karaganda Region",
    "countryId": 112,
    "countryCode": "KZ",
    "fipsCode": "12",
    "iso2": "KAR",
    "latitude": 47.9022182,
    "longitude": 71.7706807
  },
  {
    "id": 151,
    "name": "Aktobe Region",
    "countryId": 112,
    "countryCode": "KZ",
    "fipsCode": "04",
    "iso2": "AKT",
    "latitude": 48.7797078,
    "longitude": 57.9974378
  },
  {
    "id": 152,
    "name": "Almaty",
    "countryId": 112,
    "countryCode": "KZ",
    "fipsCode": "02",
    "iso2": "ALA",
    "latitude": 43.2220146,
    "longitude": 76.8512485
  },
  {
    "id": 153,
    "name": "Atyrau Region",
    "countryId": 112,
    "countryCode": "KZ",
    "fipsCode": "06",
    "iso2": "ATY",
    "latitude": 47.1076188,
    "longitude": 51.914133
  },
  {
    "id": 154,
    "name": "East Kazakhstan Region",
    "countryId": 112,
    "countryCode": "KZ",
    "fipsCode": "15",
    "iso2": "VOS",
    "latitude": 48.7062687,
    "longitude": 80.7922534
  },
  {
    "id": 155,
    "name": "Baikonur",
    "countryId": 112,
    "countryCode": "KZ",
    "fipsCode": "08",
    "iso2": "BAY",
    "latitude": 45.9645851,
    "longitude": 63.3052428
  },
  {
    "id": 156,
    "name": "Nur-Sultan",
    "countryId": 112,
    "countryCode": "KZ",
    "fipsCode": "05",
    "iso2": "AST",
    "latitude": 51.1605227,
    "longitude": 71.4703558
  },
  {
    "id": 157,
    "name": "Kostanay Region",
    "countryId": 112,
    "countryCode": "KZ",
    "fipsCode": "13",
    "iso2": "KUS",
    "latitude": 51.5077096,
    "longitude": 64.0479073
  },
  {
    "id": 158,
    "name": "Kakamega County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "20",
    "iso2": "11",
    "latitude": 0.307894,
    "longitude": 34.7740793
  },
  {
    "id": 159,
    "name": "Kisii County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "25",
    "iso2": "16",
    "latitude": -0.677334,
    "longitude": 34.779603
  },
  {
    "id": 160,
    "name": "Central Province",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "01",
    "iso2": "200",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 161,
    "name": "Busia County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "13",
    "iso2": "04",
    "latitude": 0.4346506,
    "longitude": 34.2421597
  },
  {
    "id": 162,
    "name": "North Eastern Province",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "06",
    "iso2": "500",
    "latitude": 7.7853051,
    "longitude": 81.4278984
  },
  {
    "id": 163,
    "name": "Embu County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "15",
    "iso2": "06",
    "latitude": -0.6560477,
    "longitude": 37.7237678
  },
  {
    "id": 164,
    "name": "Laikipia County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "29",
    "iso2": "20",
    "latitude": 0.3606063,
    "longitude": 36.7819505
  },
  {
    "id": 165,
    "name": "Nandi District",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "40",
    "iso2": "32",
    "latitude": 0.1835867,
    "longitude": 35.1268781
  },
  {
    "id": 166,
    "name": "Lamu County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "30",
    "iso2": "21",
    "latitude": -2.2355058,
    "longitude": 40.4720004
  },
  {
    "id": 167,
    "name": "Kirinyaga County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "24",
    "iso2": "15",
    "latitude": -0.6590565,
    "longitude": 37.3827234
  },
  {
    "id": 168,
    "name": "Bungoma County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "12",
    "iso2": "03",
    "latitude": 0.5695252,
    "longitude": 34.5583766
  },
  {
    "id": 169,
    "name": "Uasin Gishu District",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "52",
    "iso2": "44",
    "latitude": 0.5527638,
    "longitude": 35.3027226
  },
  {
    "id": 170,
    "name": "Isiolo County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "18",
    "iso2": "09",
    "latitude": 0.3524352,
    "longitude": 38.4849923
  },
  {
    "id": 171,
    "name": "Kisumu County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "26",
    "iso2": "17",
    "latitude": -0.0917016,
    "longitude": 34.7679568
  },
  {
    "id": 172,
    "name": "Coast Province",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "02",
    "iso2": "300",
    "latitude": 39.1373305,
    "longitude": -76.7294144
  },
  {
    "id": 173,
    "name": "Kwale County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "28",
    "iso2": "19",
    "latitude": -4.1816115,
    "longitude": 39.4605612
  },
  {
    "id": 174,
    "name": "Kilifi County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "23",
    "iso2": "14",
    "latitude": -3.5106508,
    "longitude": 39.9093269
  },
  {
    "id": 175,
    "name": "Narok County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "41",
    "iso2": "33",
    "latitude": -1.104111,
    "longitude": 36.0893406
  },
  {
    "id": 176,
    "name": "Taita–Taveta County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "41",
    "iso2": "39",
    "latitude": -3.3160687,
    "longitude": 38.4849923
  },
  {
    "id": 177,
    "name": "Western Province",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "09",
    "iso2": "800",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 178,
    "name": "Muranga County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "38",
    "iso2": "29",
    "latitude": -0.7839281,
    "longitude": 37.0400339
  },
  {
    "id": 179,
    "name": "Rift Valley Province",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "08",
    "iso2": "700",
    "latitude": 11.4098737,
    "longitude": 41.2808577
  },
  {
    "id": 180,
    "name": "Nyeri County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "44",
    "iso2": "36",
    "latitude": -0.4196915,
    "longitude": 37.0400339
  },
  {
    "id": 181,
    "name": "Baringo County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "10",
    "iso2": "01",
    "latitude": 0.8554988,
    "longitude": 36.0893406
  },
  {
    "id": 182,
    "name": "Wajir County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "54",
    "iso2": "46",
    "latitude": 1.6360475,
    "longitude": 40.3088626
  },
  {
    "id": 183,
    "name": "Trans-Nzoia District",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "50",
    "iso2": "42",
    "latitude": 1.0566667,
    "longitude": 34.9506625
  },
  {
    "id": 184,
    "name": "Machakos County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "31",
    "iso2": "22",
    "latitude": -1.5176837,
    "longitude": 37.2634146
  },
  {
    "id": 185,
    "name": "Tharaka Nithi County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "49",
    "iso2": "41",
    "latitude": -0.2964851,
    "longitude": 37.7237678
  },
  {
    "id": 186,
    "name": "Siaya County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "46",
    "iso2": "38",
    "latitude": -0.0617328,
    "longitude": 34.2421597
  },
  {
    "id": 187,
    "name": "Mandera County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "33",
    "iso2": "24",
    "latitude": 3.5737991,
    "longitude": 40.958688
  },
  {
    "id": 188,
    "name": "Makueni County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "32",
    "iso2": "23",
    "latitude": -2.2558734,
    "longitude": 37.8936663
  },
  {
    "id": 189,
    "name": "Eastern Province",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "03",
    "iso2": "400",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 190,
    "name": "Migori County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "36",
    "iso2": "27",
    "latitude": -0.9365702,
    "longitude": 34.4198243
  },
  {
    "id": 191,
    "name": "Nairobi",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "05",
    "iso2": "110",
    "latitude": -1.2920659,
    "longitude": 36.8219462
  },
  {
    "id": 192,
    "name": "Nyandarua County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "43",
    "iso2": "35",
    "latitude": -0.1803855,
    "longitude": 36.5229641
  },
  {
    "id": 193,
    "name": "Kericho County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "21",
    "iso2": "12",
    "latitude": -0.1827913,
    "longitude": 35.4781926
  },
  {
    "id": 194,
    "name": "Marsabit County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "34",
    "iso2": "25",
    "latitude": 2.4426403,
    "longitude": 37.9784585
  },
  {
    "id": 195,
    "name": "Homa Bay County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "17",
    "iso2": "08",
    "latitude": -0.6220655,
    "longitude": 34.3310364
  },
  {
    "id": 196,
    "name": "Garissa County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "16",
    "iso2": "07",
    "latitude": -0.4532293,
    "longitude": 39.6460988
  },
  {
    "id": 197,
    "name": "Kajiado County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "19",
    "iso2": "10",
    "latitude": -2.0980751,
    "longitude": 36.7819505
  },
  {
    "id": 198,
    "name": "Meru County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "35",
    "iso2": "26",
    "latitude": 0.3557174,
    "longitude": 37.8087693
  },
  {
    "id": 199,
    "name": "Kiambu County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "22",
    "iso2": "13",
    "latitude": -1.0313701,
    "longitude": 36.8680791
  },
  {
    "id": 200,
    "name": "Mombasa County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "37",
    "iso2": "28",
    "latitude": -3.9768291,
    "longitude": 39.7137181
  },
  {
    "id": 201,
    "name": "Elgeyo-Marakwet County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "37",
    "iso2": "05",
    "latitude": 1.0498237,
    "longitude": 35.4781926
  },
  {
    "id": 202,
    "name": "Vihiga District",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "53",
    "iso2": "45",
    "latitude": 0.0767553,
    "longitude": 34.7077665
  },
  {
    "id": 203,
    "name": "Nakuru District",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "39",
    "iso2": "31",
    "latitude": -0.3030988,
    "longitude": 36.080026
  },
  {
    "id": 204,
    "name": "Nyanza Province",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "07",
    "iso2": "600",
    "latitude": -0.0889894,
    "longitude": 34.7717912
  },
  {
    "id": 205,
    "name": "Tana River County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "48",
    "iso2": "40",
    "latitude": -1.6518468,
    "longitude": 39.6518165
  },
  {
    "id": 206,
    "name": "Turkana County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "51",
    "iso2": "43",
    "latitude": 3.3122477,
    "longitude": 35.5657862
  },
  {
    "id": 207,
    "name": "Samburu County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "45",
    "iso2": "37",
    "latitude": 1.2154506,
    "longitude": 36.954107
  },
  {
    "id": 208,
    "name": "West Pokot County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "55",
    "iso2": "47",
    "latitude": 1.6210076,
    "longitude": 35.3905046
  },
  {
    "id": 209,
    "name": "Nyamira District",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "42",
    "iso2": "34",
    "latitude": -0.5669405,
    "longitude": 34.9341234
  },
  {
    "id": 210,
    "name": "Bomet County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "11",
    "iso2": "02",
    "latitude": -0.8015009,
    "longitude": 35.3027226
  },
  {
    "id": 211,
    "name": "Kitui County",
    "countryId": 113,
    "countryCode": "KE",
    "fipsCode": "27",
    "iso2": "18",
    "latitude": -1.6832822,
    "longitude": 38.3165725
  },
  {
    "id": 212,
    "name": "Bié Province",
    "countryId": 7,
    "countryCode": "AO",
    "fipsCode": "02",
    "iso2": "BIE",
    "latitude": -12.5727907,
    "longitude": 17.668887
  },
  {
    "id": 213,
    "name": "Huambo Province",
    "countryId": 7,
    "countryCode": "AO",
    "fipsCode": "08",
    "iso2": "HUA",
    "latitude": -12.5268221,
    "longitude": 15.5943388
  },
  {
    "id": 214,
    "name": "Zaire Province",
    "countryId": 7,
    "countryCode": "AO",
    "fipsCode": "16",
    "iso2": "ZAI",
    "latitude": -6.5733458,
    "longitude": 13.1740348
  },
  {
    "id": 215,
    "name": "Cunene Province",
    "countryId": 7,
    "countryCode": "AO",
    "fipsCode": "07",
    "iso2": "CNN",
    "latitude": -16.2802221,
    "longitude": 16.1580937
  },
  {
    "id": 216,
    "name": "Cuanza Sul",
    "countryId": 7,
    "countryCode": "AO",
    "fipsCode": "06",
    "iso2": "CUS",
    "latitude": -10.595191,
    "longitude": 15.4068079
  },
  {
    "id": 217,
    "name": "Cuanza Norte Province",
    "countryId": 7,
    "countryCode": "AO",
    "fipsCode": "05",
    "iso2": "CNO",
    "latitude": -9.2398513,
    "longitude": 14.6587821
  },
  {
    "id": 218,
    "name": "Benguela Province",
    "countryId": 7,
    "countryCode": "AO",
    "fipsCode": "01",
    "iso2": "BGU",
    "latitude": -12.8003744,
    "longitude": 13.914399
  },
  {
    "id": 219,
    "name": "Moxico Province",
    "countryId": 7,
    "countryCode": "AO",
    "fipsCode": "14",
    "iso2": "MOX",
    "latitude": -13.4293579,
    "longitude": 20.3308814
  },
  {
    "id": 220,
    "name": "Lunda Sul Province",
    "countryId": 7,
    "countryCode": "AO",
    "fipsCode": "18",
    "iso2": "LSU",
    "latitude": -10.2866578,
    "longitude": 20.7122465
  },
  {
    "id": 221,
    "name": "Bengo Province",
    "countryId": 7,
    "countryCode": "AO",
    "fipsCode": "19",
    "iso2": "BGO",
    "latitude": -9.1042257,
    "longitude": 13.7289167
  },
  {
    "id": 222,
    "name": "Luanda Province",
    "countryId": 7,
    "countryCode": "AO",
    "fipsCode": "20",
    "iso2": "LUA",
    "latitude": -9.035088,
    "longitude": 13.2663479
  },
  {
    "id": 223,
    "name": "Lunda Norte Province",
    "countryId": 7,
    "countryCode": "AO",
    "fipsCode": "17",
    "iso2": "LNO",
    "latitude": -8.3525022,
    "longitude": 19.1880047
  },
  {
    "id": 224,
    "name": "Uíge Province",
    "countryId": 7,
    "countryCode": "AO",
    "fipsCode": "15",
    "iso2": "UIG",
    "latitude": -7.1736732,
    "longitude": 15.4068079
  },
  {
    "id": 225,
    "name": "Huíla Province",
    "countryId": 7,
    "countryCode": "AO",
    "fipsCode": "09",
    "iso2": "HUI",
    "latitude": -14.9280553,
    "longitude": 14.6587821
  },
  {
    "id": 226,
    "name": "Cuando Cubango Province",
    "countryId": 7,
    "countryCode": "AO",
    "fipsCode": "04",
    "iso2": "CCU",
    "latitude": -16.4180824,
    "longitude": 18.8076195
  },
  {
    "id": 227,
    "name": "Malanje Province",
    "countryId": 7,
    "countryCode": "AO",
    "fipsCode": "12",
    "iso2": "MAL",
    "latitude": -9.8251183,
    "longitude": 16.912251
  },
  {
    "id": 228,
    "name": "Cabinda Province",
    "countryId": 7,
    "countryCode": "AO",
    "fipsCode": "03",
    "iso2": "CAB",
    "latitude": -5.0248749,
    "longitude": 12.3463875
  },
  {
    "id": 229,
    "name": "Gasa District",
    "countryId": 26,
    "countryCode": "BT",
    "fipsCode": "23",
    "iso2": "GA",
    "latitude": 28.0185886,
    "longitude": 89.9253233
  },
  {
    "id": 230,
    "name": "Tsirang District",
    "countryId": 26,
    "countryCode": "BT",
    "fipsCode": "07",
    "iso2": "21",
    "latitude": 27.032207,
    "longitude": 90.1869644
  },
  {
    "id": 231,
    "name": "Wangdue Phodrang District",
    "countryId": 26,
    "countryCode": "BT",
    "fipsCode": "07",
    "iso2": "24",
    "latitude": 27.4526046,
    "longitude": 90.0674928
  },
  {
    "id": 232,
    "name": "Haa District",
    "countryId": 26,
    "countryCode": "BT",
    "fipsCode": "10",
    "iso2": "13",
    "latitude": 27.2651669,
    "longitude": 89.1705998
  },
  {
    "id": 233,
    "name": "Zhemgang District",
    "countryId": 26,
    "countryCode": "BT",
    "fipsCode": "18",
    "iso2": "34",
    "latitude": 27.076975,
    "longitude": 90.8294002
  },
  {
    "id": 234,
    "name": "Lhuntse District",
    "countryId": 26,
    "countryCode": "BT",
    "fipsCode": "11",
    "iso2": "44",
    "latitude": 27.8264989,
    "longitude": 91.135302
  },
  {
    "id": 235,
    "name": "Punakha District",
    "countryId": 26,
    "countryCode": "BT",
    "fipsCode": "15",
    "iso2": "23",
    "latitude": 27.6903716,
    "longitude": 89.8879304
  },
  {
    "id": 236,
    "name": "Trashigang District",
    "countryId": 26,
    "countryCode": "BT",
    "fipsCode": "19",
    "iso2": "41",
    "latitude": 27.2566795,
    "longitude": 91.7538817
  },
  {
    "id": 237,
    "name": "Paro District",
    "countryId": 26,
    "countryCode": "BT",
    "fipsCode": "13",
    "iso2": "11",
    "latitude": 27.4285949,
    "longitude": 89.4166516
  },
  {
    "id": 238,
    "name": "Dagana District",
    "countryId": 26,
    "countryCode": "BT",
    "fipsCode": "08",
    "iso2": "22",
    "latitude": 27.0322861,
    "longitude": 89.8879304
  },
  {
    "id": 239,
    "name": "Chukha District",
    "countryId": 26,
    "countryCode": "BT",
    "fipsCode": "06",
    "iso2": "12",
    "latitude": 27.0784304,
    "longitude": 89.4742177
  },
  {
    "id": 240,
    "name": "Bumthang District",
    "countryId": 26,
    "countryCode": "BT",
    "fipsCode": "05",
    "iso2": "33",
    "latitude": 27.641839,
    "longitude": 90.6773046
  },
  {
    "id": 241,
    "name": "Thimphu District",
    "countryId": 26,
    "countryCode": "BT",
    "fipsCode": "20",
    "iso2": "15",
    "latitude": 27.4712216,
    "longitude": 89.6339041
  },
  {
    "id": 242,
    "name": "Mongar District",
    "countryId": 26,
    "countryCode": "BT",
    "fipsCode": "12",
    "iso2": "42",
    "latitude": 27.2617059,
    "longitude": 91.2891036
  },
  {
    "id": 243,
    "name": "Samdrup Jongkhar District",
    "countryId": 26,
    "countryCode": "BT",
    "fipsCode": "17",
    "iso2": "45",
    "latitude": 26.8035682,
    "longitude": 91.5039207
  },
  {
    "id": 244,
    "name": "Pemagatshel District",
    "countryId": 26,
    "countryCode": "BT",
    "fipsCode": "14",
    "iso2": "43",
    "latitude": 27.002382,
    "longitude": 91.3469247
  },
  {
    "id": 245,
    "name": "Trongsa District",
    "countryId": 26,
    "countryCode": "BT",
    "fipsCode": "14",
    "iso2": "32",
    "latitude": 27.5002269,
    "longitude": 90.5080634
  },
  {
    "id": 246,
    "name": "Samtse District",
    "countryId": 26,
    "countryCode": "BT",
    "fipsCode": "16",
    "iso2": "14",
    "latitude": 27.0291832,
    "longitude": 89.0561532
  },
  {
    "id": 247,
    "name": "Sarpang District",
    "countryId": 26,
    "countryCode": "BT",
    "fipsCode": "09",
    "iso2": "31",
    "latitude": 26.9373041,
    "longitude": 90.4879916
  },
  {
    "id": 248,
    "name": "Tombouctou Region",
    "countryId": 134,
    "countryCode": "ML",
    "fipsCode": "08",
    "iso2": "6",
    "latitude": 21.0526706,
    "longitude": -3.743509
  },
  {
    "id": 249,
    "name": "Ségou Region",
    "countryId": 134,
    "countryCode": "ML",
    "fipsCode": "05",
    "iso2": "4",
    "latitude": 13.8394456,
    "longitude": -6.0679194
  },
  {
    "id": 250,
    "name": "Koulikoro Region",
    "countryId": 134,
    "countryCode": "ML",
    "fipsCode": "07",
    "iso2": "2",
    "latitude": 13.8018074,
    "longitude": -7.4381355
  },
  {
    "id": 251,
    "name": "Ménaka Region",
    "countryId": 134,
    "countryCode": "ML",
    "fipsCode": "07",
    "iso2": "9",
    "latitude": 15.9156421,
    "longitude": 2.396174
  },
  {
    "id": 252,
    "name": "Kayes Region",
    "countryId": 134,
    "countryCode": "ML",
    "fipsCode": "03",
    "iso2": "1",
    "latitude": 14.0818308,
    "longitude": -9.9018131
  },
  {
    "id": 253,
    "name": "Bamako",
    "countryId": 134,
    "countryCode": "ML",
    "fipsCode": "01",
    "iso2": "BKO",
    "latitude": 12.6392316,
    "longitude": -8.0028892
  },
  {
    "id": 254,
    "name": "Sikasso Region",
    "countryId": 134,
    "countryCode": "ML",
    "fipsCode": "06",
    "iso2": "3",
    "latitude": 10.8905186,
    "longitude": -7.4381355
  },
  {
    "id": 255,
    "name": "Mopti Region",
    "countryId": 134,
    "countryCode": "ML",
    "fipsCode": "04",
    "iso2": "5",
    "latitude": 14.6338039,
    "longitude": -3.4195527
  },
  {
    "id": 256,
    "name": "Taoudénit Region",
    "countryId": 134,
    "countryCode": "ML",
    "fipsCode": "04",
    "iso2": "10",
    "latitude": 22.6764132,
    "longitude": -3.9789143
  },
  {
    "id": 257,
    "name": "Kidal Region",
    "countryId": 134,
    "countryCode": "ML",
    "fipsCode": "10",
    "iso2": "8",
    "latitude": 18.7986832,
    "longitude": 1.8318334
  },
  {
    "id": 258,
    "name": "Gao Region",
    "countryId": 134,
    "countryCode": "ML",
    "fipsCode": "09",
    "iso2": "7",
    "latitude": 16.9066332,
    "longitude": 1.5208624
  },
  {
    "id": 259,
    "name": "Southern Province",
    "countryId": 183,
    "countryCode": "RW",
    "fipsCode": "15",
    "iso2": "05",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 260,
    "name": "Western Province",
    "countryId": 183,
    "countryCode": "RW",
    "fipsCode": "14",
    "iso2": "04",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 261,
    "name": "Eastern Province",
    "countryId": 183,
    "countryCode": "RW",
    "fipsCode": "11",
    "iso2": "02",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 262,
    "name": "Kigali district",
    "countryId": 183,
    "countryCode": "RW",
    "fipsCode": "12",
    "iso2": "01",
    "latitude": -1.9440727,
    "longitude": 30.0618851
  },
  {
    "id": 263,
    "name": "Northern Province",
    "countryId": 183,
    "countryCode": "RW",
    "fipsCode": "13",
    "iso2": "03",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 264,
    "name": "Belize District",
    "countryId": 23,
    "countryCode": "BZ",
    "fipsCode": "01",
    "iso2": "BZ",
    "latitude": 17.5677679,
    "longitude": -88.4016041
  },
  {
    "id": 265,
    "name": "Stann Creek District",
    "countryId": 23,
    "countryCode": "BZ",
    "fipsCode": "05",
    "iso2": "SC",
    "latitude": 16.8116631,
    "longitude": -88.4016041
  },
  {
    "id": 266,
    "name": "Corozal District",
    "countryId": 23,
    "countryCode": "BZ",
    "fipsCode": "03",
    "iso2": "CZL",
    "latitude": 18.1349238,
    "longitude": -88.2461183
  },
  {
    "id": 267,
    "name": "Toledo District",
    "countryId": 23,
    "countryCode": "BZ",
    "fipsCode": "06",
    "iso2": "TOL",
    "latitude": 16.2491923,
    "longitude": -88.864698
  },
  {
    "id": 268,
    "name": "Orange Walk District",
    "countryId": 23,
    "countryCode": "BZ",
    "fipsCode": "04",
    "iso2": "OW",
    "latitude": 17.760353,
    "longitude": -88.864698
  },
  {
    "id": 269,
    "name": "Cayo District",
    "countryId": 23,
    "countryCode": "BZ",
    "fipsCode": "02",
    "iso2": "CY",
    "latitude": 17.0984445,
    "longitude": -88.9413865
  },
  {
    "id": 270,
    "name": "Príncipe Province",
    "countryId": 193,
    "countryCode": "ST",
    "fipsCode": "01",
    "iso2": "P",
    "latitude": 1.6139381,
    "longitude": 7.4056928
  },
  {
    "id": 271,
    "name": "São Tomé Province",
    "countryId": 193,
    "countryCode": "ST",
    "fipsCode": "02",
    "iso2": "S",
    "latitude": 0.3301924,
    "longitude": 6.733343
  },
  {
    "id": 272,
    "name": "Havana Province",
    "countryId": 56,
    "countryCode": "CU",
    "fipsCode": "02",
    "iso2": "03",
    "latitude": 23.0540698,
    "longitude": -82.345189
  },
  {
    "id": 273,
    "name": "Santiago de Cuba Province",
    "countryId": 56,
    "countryCode": "CU",
    "fipsCode": "15",
    "iso2": "13",
    "latitude": 20.2397682,
    "longitude": -75.9927652
  },
  {
    "id": 274,
    "name": "Sancti Spíritus Province",
    "countryId": 56,
    "countryCode": "CU",
    "fipsCode": "14",
    "iso2": "07",
    "latitude": 21.9938214,
    "longitude": -79.4703885
  },
  {
    "id": 275,
    "name": "Granma Province",
    "countryId": 56,
    "countryCode": "CU",
    "fipsCode": "09",
    "iso2": "12",
    "latitude": 20.3844902,
    "longitude": -76.6412712
  },
  {
    "id": 276,
    "name": "Mayabeque Province",
    "countryId": 56,
    "countryCode": "CU",
    "fipsCode": "MA",
    "iso2": "16",
    "latitude": 22.8926529,
    "longitude": -81.9534815
  },
  {
    "id": 277,
    "name": "Pinar del Río Province",
    "countryId": 56,
    "countryCode": "CU",
    "fipsCode": "01",
    "iso2": "01",
    "latitude": 22.4076256,
    "longitude": -83.8473015
  },
  {
    "id": 278,
    "name": "Isla de la Juventud",
    "countryId": 56,
    "countryCode": "CU",
    "fipsCode": "04",
    "iso2": "99",
    "latitude": 21.7084737,
    "longitude": -82.8220232
  },
  {
    "id": 279,
    "name": "Holguín Province",
    "countryId": 56,
    "countryCode": "CU",
    "fipsCode": "12",
    "iso2": "11",
    "latitude": 20.7837893,
    "longitude": -75.8069082
  },
  {
    "id": 280,
    "name": "Villa Clara Province",
    "countryId": 56,
    "countryCode": "CU",
    "fipsCode": "16",
    "iso2": "05",
    "latitude": 22.4937204,
    "longitude": -79.9192702
  },
  {
    "id": 281,
    "name": "Las Tunas Province",
    "countryId": 56,
    "countryCode": "CU",
    "fipsCode": "13",
    "iso2": "10",
    "latitude": 21.0605162,
    "longitude": -76.9182097
  },
  {
    "id": 282,
    "name": "Ciego de Ávila Province",
    "countryId": 56,
    "countryCode": "CU",
    "fipsCode": "07",
    "iso2": "08",
    "latitude": 21.9329515,
    "longitude": -78.5660852
  },
  {
    "id": 283,
    "name": "Artemisa Province",
    "countryId": 56,
    "countryCode": "CU",
    "fipsCode": "AR",
    "iso2": "15",
    "latitude": 22.7522903,
    "longitude": -82.9931607
  },
  {
    "id": 284,
    "name": "Matanzas Province",
    "countryId": 56,
    "countryCode": "CU",
    "fipsCode": "03",
    "iso2": "04",
    "latitude": 22.5767123,
    "longitude": -81.3399414
  },
  {
    "id": 285,
    "name": "Guantánamo Province",
    "countryId": 56,
    "countryCode": "CU",
    "fipsCode": "10",
    "iso2": "14",
    "latitude": 20.1455917,
    "longitude": -74.8741045
  },
  {
    "id": 286,
    "name": "Camagüey Province",
    "countryId": 56,
    "countryCode": "CU",
    "fipsCode": "05",
    "iso2": "09",
    "latitude": 21.2167247,
    "longitude": -77.7452081
  },
  {
    "id": 287,
    "name": "Cienfuegos Province",
    "countryId": 56,
    "countryCode": "CU",
    "fipsCode": "08",
    "iso2": "06",
    "latitude": 22.2379783,
    "longitude": -80.365865
  },
  {
    "id": 288,
    "name": "Jigawa State",
    "countryId": 161,
    "countryCode": "NG",
    "fipsCode": "39",
    "iso2": "JI",
    "latitude": 12.228012,
    "longitude": 9.5615867
  },
  {
    "id": 289,
    "name": "Enugu State",
    "countryId": 161,
    "countryCode": "NG",
    "fipsCode": "47",
    "iso2": "EN",
    "latitude": 6.536353,
    "longitude": 7.4356194
  },
  {
    "id": 290,
    "name": "Kebbi State",
    "countryId": 161,
    "countryCode": "NG",
    "fipsCode": "40",
    "iso2": "KE",
    "latitude": 11.4942003,
    "longitude": 4.2333355
  },
  {
    "id": 291,
    "name": "Benue State",
    "countryId": 161,
    "countryCode": "NG",
    "fipsCode": "26",
    "iso2": "BE",
    "latitude": 7.3369024,
    "longitude": 8.7403687
  },
  {
    "id": 292,
    "name": "Sokoto State",
    "countryId": 161,
    "countryCode": "NG",
    "fipsCode": "51",
    "iso2": "SO",
    "latitude": 13.0533143,
    "longitude": 5.3222722
  },
  {
    "id": 293,
    "name": "Federal Capital Territory",
    "countryId": 161,
    "countryCode": "NG",
    "fipsCode": "11",
    "iso2": "FC",
    "latitude": 8.8940691,
    "longitude": 7.1860402
  },
  {
    "id": 294,
    "name": "Kaduna State",
    "countryId": 161,
    "countryCode": "NG",
    "fipsCode": "23",
    "iso2": "KD",
    "latitude": 10.3764006,
    "longitude": 7.7094537
  },
  {
    "id": 295,
    "name": "Kwara State",
    "countryId": 161,
    "countryCode": "NG",
    "fipsCode": "30",
    "iso2": "KW",
    "latitude": 8.9668961,
    "longitude": 4.3874051
  },
  {
    "id": 296,
    "name": "Oyo State",
    "countryId": 161,
    "countryCode": "NG",
    "fipsCode": "32",
    "iso2": "OY",
    "latitude": 8.1573809,
    "longitude": 3.6146534
  },
  {
    "id": 297,
    "name": "Yobe State",
    "countryId": 161,
    "countryCode": "NG",
    "fipsCode": "44",
    "iso2": "YO",
    "latitude": 12.293876,
    "longitude": 11.4390411
  },
  {
    "id": 298,
    "name": "Kogi State",
    "countryId": 161,
    "countryCode": "NG",
    "fipsCode": "41",
    "iso2": "KO",
    "latitude": 7.7337325,
    "longitude": 6.6905836
  },
  {
    "id": 299,
    "name": "Zamfara State",
    "countryId": 161,
    "countryCode": "NG",
    "fipsCode": "57",
    "iso2": "ZA",
    "latitude": 12.1221805,
    "longitude": 6.2235819
  },
  {
    "id": 300,
    "name": "Kano State",
    "countryId": 161,
    "countryCode": "NG",
    "fipsCode": "29",
    "iso2": "KN",
    "latitude": 11.7470698,
    "longitude": 8.5247107
  },
  {
    "id": 301,
    "name": "Nasarawa State",
    "countryId": 161,
    "countryCode": "NG",
    "fipsCode": "56",
    "iso2": "NA",
    "latitude": 8.4997908,
    "longitude": 8.1996937
  },
  {
    "id": 302,
    "name": "Plateau State",
    "countryId": 161,
    "countryCode": "NG",
    "fipsCode": "49",
    "iso2": "PL",
    "latitude": 9.2182093,
    "longitude": 9.5179488
  },
  {
    "id": 303,
    "name": "Abia State",
    "countryId": 161,
    "countryCode": "NG",
    "fipsCode": "45",
    "iso2": "AB",
    "latitude": 5.4527354,
    "longitude": 7.5248414
  },
  {
    "id": 304,
    "name": "Akwa Ibom State",
    "countryId": 161,
    "countryCode": "NG",
    "fipsCode": "21",
    "iso2": "AK",
    "latitude": 4.9057371,
    "longitude": 7.8536675
  },
  {
    "id": 305,
    "name": "Bayelsa State",
    "countryId": 161,
    "countryCode": "NG",
    "fipsCode": "52",
    "iso2": "BY",
    "latitude": 4.7719071,
    "longitude": 6.0698526
  },
  {
    "id": 306,
    "name": "Lagos",
    "countryId": 161,
    "countryCode": "NG",
    "fipsCode": "05",
    "iso2": "LA",
    "latitude": 6.5243793,
    "longitude": 3.3792057
  },
  {
    "id": 307,
    "name": "Borno State",
    "countryId": 161,
    "countryCode": "NG",
    "fipsCode": "27",
    "iso2": "BO",
    "latitude": 11.8846356,
    "longitude": 13.1519665
  },
  {
    "id": 308,
    "name": "Imo State",
    "countryId": 161,
    "countryCode": "NG",
    "fipsCode": "28",
    "iso2": "IM",
    "latitude": 5.5720122,
    "longitude": 7.0588219
  },
  {
    "id": 309,
    "name": "Ekiti State",
    "countryId": 161,
    "countryCode": "NG",
    "fipsCode": "54",
    "iso2": "EK",
    "latitude": 7.7189862,
    "longitude": 5.3109505
  },
  {
    "id": 310,
    "name": "Gombe State",
    "countryId": 161,
    "countryCode": "NG",
    "fipsCode": "55",
    "iso2": "GO",
    "latitude": 10.3637795,
    "longitude": 11.1927587
  },
  {
    "id": 311,
    "name": "Ebonyi State",
    "countryId": 161,
    "countryCode": "NG",
    "fipsCode": "53",
    "iso2": "EB",
    "latitude": 6.2649232,
    "longitude": 8.0137302
  },
  {
    "id": 312,
    "name": "Bauchi State",
    "countryId": 161,
    "countryCode": "NG",
    "fipsCode": "46",
    "iso2": "BA",
    "latitude": 10.7760624,
    "longitude": 9.9991943
  },
  {
    "id": 313,
    "name": "Katsina State",
    "countryId": 161,
    "countryCode": "NG",
    "fipsCode": "24",
    "iso2": "KT",
    "latitude": 12.3796707,
    "longitude": 7.6305748
  },
  {
    "id": 314,
    "name": "Cross River State",
    "countryId": 161,
    "countryCode": "NG",
    "fipsCode": "22",
    "iso2": "CR",
    "latitude": 5.8701724,
    "longitude": 8.5988014
  },
  {
    "id": 315,
    "name": "Anambra State",
    "countryId": 161,
    "countryCode": "NG",
    "fipsCode": "25",
    "iso2": "AN",
    "latitude": 6.2208997,
    "longitude": 6.9369559
  },
  {
    "id": 316,
    "name": "Delta State",
    "countryId": 161,
    "countryCode": "NG",
    "fipsCode": "36",
    "iso2": "DE",
    "latitude": 33.7453784,
    "longitude": -90.7354508
  },
  {
    "id": 317,
    "name": "Niger State",
    "countryId": 161,
    "countryCode": "NG",
    "fipsCode": "31",
    "iso2": "NI",
    "latitude": 9.9309224,
    "longitude": 5.598321
  },
  {
    "id": 318,
    "name": "Edo State",
    "countryId": 161,
    "countryCode": "NG",
    "fipsCode": "37",
    "iso2": "ED",
    "latitude": 6.6341831,
    "longitude": 5.9304056
  },
  {
    "id": 319,
    "name": "Taraba State",
    "countryId": 161,
    "countryCode": "NG",
    "fipsCode": "43",
    "iso2": "TA",
    "latitude": 7.9993616,
    "longitude": 10.7739863
  },
  {
    "id": 320,
    "name": "Adamawa State",
    "countryId": 161,
    "countryCode": "NG",
    "fipsCode": "35",
    "iso2": "AD",
    "latitude": 9.3264751,
    "longitude": 12.3983853
  },
  {
    "id": 321,
    "name": "Ondo State",
    "countryId": 161,
    "countryCode": "NG",
    "fipsCode": "48",
    "iso2": "ON",
    "latitude": 6.9148682,
    "longitude": 5.1478144
  },
  {
    "id": 322,
    "name": "Osun State",
    "countryId": 161,
    "countryCode": "NG",
    "fipsCode": "42",
    "iso2": "OS",
    "latitude": 7.5628964,
    "longitude": 4.5199593
  },
  {
    "id": 323,
    "name": "Ogun State",
    "countryId": 161,
    "countryCode": "NG",
    "fipsCode": "16",
    "iso2": "OG",
    "latitude": 6.9979747,
    "longitude": 3.4737378
  },
  {
    "id": 324,
    "name": "Rukungiri District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "93",
    "iso2": "412",
    "latitude": -0.751849,
    "longitude": 29.9277947
  },
  {
    "id": 325,
    "name": "Kyankwanzi District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "93",
    "iso2": "123",
    "latitude": 1.0966037,
    "longitude": 31.7195459
  },
  {
    "id": 326,
    "name": "Kabarole District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "79",
    "iso2": "405",
    "latitude": 0.5850791,
    "longitude": 30.2512728
  },
  {
    "id": 327,
    "name": "Mpigi District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "89",
    "iso2": "106",
    "latitude": 0.2273528,
    "longitude": 32.3249236
  },
  {
    "id": 328,
    "name": "Apac District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "26",
    "iso2": "302",
    "latitude": 1.8730263,
    "longitude": 32.6277455
  },
  {
    "id": 329,
    "name": "Abim District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "26",
    "iso2": "314",
    "latitude": 2.706698,
    "longitude": 33.6595337
  },
  {
    "id": 330,
    "name": "Yumbe District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "97",
    "iso2": "313",
    "latitude": 3.4698023,
    "longitude": 31.2483291
  },
  {
    "id": 331,
    "name": "Rukiga District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "97",
    "iso2": "431",
    "latitude": -1.1326337,
    "longitude": 30.043412
  },
  {
    "id": 332,
    "name": "Northern Region",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "N",
    "iso2": "N",
    "latitude": 9.5439269,
    "longitude": -0.9056623
  },
  {
    "id": 333,
    "name": "Serere District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "N",
    "iso2": "232",
    "latitude": 1.4994033,
    "longitude": 33.5490078
  },
  {
    "id": 334,
    "name": "Kamuli District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "38",
    "iso2": "205",
    "latitude": 0.9187107,
    "longitude": 33.1239049
  },
  {
    "id": 335,
    "name": "Amuru District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "38",
    "iso2": "316",
    "latitude": 2.9667878,
    "longitude": 32.0837445
  },
  {
    "id": 336,
    "name": "Kaberamaido District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "80",
    "iso2": "213",
    "latitude": 1.6963322,
    "longitude": 33.213851
  },
  {
    "id": 337,
    "name": "Namutumba District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "80",
    "iso2": "224",
    "latitude": 0.849261,
    "longitude": 33.6623301
  },
  {
    "id": 338,
    "name": "Kibuku District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "80",
    "iso2": "227",
    "latitude": 1.0452874,
    "longitude": 33.7992536
  },
  {
    "id": 339,
    "name": "Ibanda District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "80",
    "iso2": "417",
    "latitude": -0.096489,
    "longitude": 30.5739579
  },
  {
    "id": 340,
    "name": "Iganga District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "78",
    "iso2": "203",
    "latitude": 0.6600137,
    "longitude": 33.4831906
  },
  {
    "id": 341,
    "name": "Dokolo District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "78",
    "iso2": "317",
    "latitude": 1.9636421,
    "longitude": 33.0338767
  },
  {
    "id": 342,
    "name": "Lira District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "47",
    "iso2": "307",
    "latitude": 2.2316169,
    "longitude": 32.9437667
  },
  {
    "id": 343,
    "name": "Bukedea District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "47",
    "iso2": "219",
    "latitude": 1.3556898,
    "longitude": 34.1086793
  },
  {
    "id": 344,
    "name": "Alebtong District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "47",
    "iso2": "323",
    "latitude": 2.2545773,
    "longitude": 33.3486147
  },
  {
    "id": 345,
    "name": "Koboko District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "47",
    "iso2": "319",
    "latitude": 3.5237058,
    "longitude": 31.03351
  },
  {
    "id": 346,
    "name": "Kiryandongo District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "47",
    "iso2": "421",
    "latitude": 2.0179907,
    "longitude": 32.0837445
  },
  {
    "id": 347,
    "name": "Kiboga District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "42",
    "iso2": "103",
    "latitude": 0.965759,
    "longitude": 31.7195459
  },
  {
    "id": 348,
    "name": "Kitgum District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "84",
    "iso2": "305",
    "latitude": 3.3396829,
    "longitude": 33.1688883
  },
  {
    "id": 349,
    "name": "Bududa District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "84",
    "iso2": "218",
    "latitude": 1.0029693,
    "longitude": 34.3338123
  },
  {
    "id": 350,
    "name": "Mbale District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "87",
    "iso2": "209",
    "latitude": 1.0344274,
    "longitude": 34.1976882
  },
  {
    "id": 351,
    "name": "Namayingo District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "87",
    "iso2": "230",
    "latitude": -0.2803575,
    "longitude": 33.7517723
  },
  {
    "id": 352,
    "name": "Amuria District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "87",
    "iso2": "216",
    "latitude": 2.03017,
    "longitude": 33.6427533
  },
  {
    "id": 353,
    "name": "Amudat District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "87",
    "iso2": "324",
    "latitude": 1.7916224,
    "longitude": 34.906551
  },
  {
    "id": 354,
    "name": "Masindi District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "50",
    "iso2": "409",
    "latitude": 1.4920363,
    "longitude": 31.7195459
  },
  {
    "id": 355,
    "name": "Kiruhura District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "50",
    "iso2": "419",
    "latitude": -0.1927998,
    "longitude": 30.8039474
  },
  {
    "id": 356,
    "name": "Masaka District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "71",
    "iso2": "105",
    "latitude": -0.4463691,
    "longitude": 31.9017954
  },
  {
    "id": 357,
    "name": "Pakwach District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "71",
    "iso2": "332",
    "latitude": 2.4607141,
    "longitude": 31.4941738
  },
  {
    "id": 358,
    "name": "Rubanda District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "71",
    "iso2": "429",
    "latitude": -1.186119,
    "longitude": 29.8453576
  },
  {
    "id": 359,
    "name": "Tororo District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "76",
    "iso2": "212",
    "latitude": 0.6870994,
    "longitude": 34.0641419
  },
  {
    "id": 360,
    "name": "Kamwenge District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "81",
    "iso2": "413",
    "latitude": 0.225793,
    "longitude": 30.4818446
  },
  {
    "id": 361,
    "name": "Adjumani District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "65",
    "iso2": "301",
    "latitude": 3.2548527,
    "longitude": 31.7195459
  },
  {
    "id": 362,
    "name": "Wakiso District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "96",
    "iso2": "113",
    "latitude": 0.063019,
    "longitude": 32.4467238
  },
  {
    "id": 363,
    "name": "Moyo District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "72",
    "iso2": "309",
    "latitude": 3.5696464,
    "longitude": 31.6739371
  },
  {
    "id": 364,
    "name": "Mityana District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "72",
    "iso2": "115",
    "latitude": 0.4454845,
    "longitude": 32.0837445
  },
  {
    "id": 365,
    "name": "Butaleja District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "72",
    "iso2": "221",
    "latitude": 0.8474922,
    "longitude": 33.8411288
  },
  {
    "id": 366,
    "name": "Gomba District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "72",
    "iso2": "121",
    "latitude": 0.2229791,
    "longitude": 31.6739371
  },
  {
    "id": 367,
    "name": "Jinja District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "33",
    "iso2": "204",
    "latitude": 0.5343743,
    "longitude": 33.3037143
  },
  {
    "id": 368,
    "name": "Kayunga District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "83",
    "iso2": "112",
    "latitude": 0.9860182,
    "longitude": 32.8535755
  },
  {
    "id": 369,
    "name": "Kween District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "83",
    "iso2": "228",
    "latitude": 1.443879,
    "longitude": 34.597132
  },
  {
    "id": 370,
    "name": "Western Region",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "W",
    "iso2": "W",
    "latitude": 40.7667215,
    "longitude": -111.8877203
  },
  {
    "id": 371,
    "name": "Mubende District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "56",
    "iso2": "107",
    "latitude": 0.5772758,
    "longitude": 31.5370003
  },
  {
    "id": 372,
    "name": "Eastern Region",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "E",
    "iso2": "E",
    "latitude": 6.2374036,
    "longitude": -0.4502368
  },
  {
    "id": 373,
    "name": "Kanungu District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "82",
    "iso2": "414",
    "latitude": -0.8195253,
    "longitude": 29.742604
  },
  {
    "id": 374,
    "name": "Omoro District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "82",
    "iso2": "331",
    "latitude": 2.715223,
    "longitude": 32.4920088
  },
  {
    "id": 375,
    "name": "Bukomansimbi District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "82",
    "iso2": "118",
    "latitude": -0.1432752,
    "longitude": 31.6054893
  },
  {
    "id": 376,
    "name": "Lyantonde District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "82",
    "iso2": "114",
    "latitude": -0.2240696,
    "longitude": 31.2168466
  },
  {
    "id": 377,
    "name": "Buikwe District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "82",
    "iso2": "117",
    "latitude": 0.3144046,
    "longitude": 32.9888319
  },
  {
    "id": 378,
    "name": "Nwoya District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "82",
    "iso2": "328",
    "latitude": 2.562444,
    "longitude": 31.9017954
  },
  {
    "id": 379,
    "name": "Zombo District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "82",
    "iso2": "330",
    "latitude": 2.5544293,
    "longitude": 30.9417368
  },
  {
    "id": 380,
    "name": "Buyende District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "82",
    "iso2": "226",
    "latitude": 1.2413682,
    "longitude": 33.1239049
  },
  {
    "id": 381,
    "name": "Bunyangabu District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "82",
    "iso2": "430",
    "latitude": 0.4870918,
    "longitude": 30.2051096
  },
  {
    "id": 382,
    "name": "Kampala District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "37",
    "iso2": "102",
    "latitude": 0.3475964,
    "longitude": 32.5825197
  },
  {
    "id": 383,
    "name": "Isingiro District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "37",
    "iso2": "418",
    "latitude": -0.843543,
    "longitude": 30.8039474
  },
  {
    "id": 384,
    "name": "Butambala District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "37",
    "iso2": "119",
    "latitude": 0.17425,
    "longitude": 32.1064668
  },
  {
    "id": 385,
    "name": "Bukwo District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "37",
    "iso2": "220",
    "latitude": 1.2818651,
    "longitude": 34.7298765
  },
  {
    "id": 386,
    "name": "Bushenyi District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "29",
    "iso2": "402",
    "latitude": -0.4870918,
    "longitude": 30.2051096
  },
  {
    "id": 387,
    "name": "Bugiri District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "66",
    "iso2": "201",
    "latitude": 0.5316127,
    "longitude": 33.7517723
  },
  {
    "id": 388,
    "name": "Butebo District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "66",
    "iso2": "233",
    "latitude": 1.2141124,
    "longitude": 33.9080896
  },
  {
    "id": 389,
    "name": "Buliisa District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "66",
    "iso2": "416",
    "latitude": 2.0299607,
    "longitude": 31.5370003
  },
  {
    "id": 390,
    "name": "Otuke District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "66",
    "iso2": "329",
    "latitude": 2.5214059,
    "longitude": 33.3486147
  },
  {
    "id": 391,
    "name": "Buhweju District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "66",
    "iso2": "420",
    "latitude": -0.2911359,
    "longitude": 30.2974199
  },
  {
    "id": 392,
    "name": "Agago District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "66",
    "iso2": "322",
    "latitude": 2.925082,
    "longitude": 33.3486147
  },
  {
    "id": 393,
    "name": "Nakapiripirit District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "91",
    "iso2": "311",
    "latitude": 1.9606173,
    "longitude": 34.597132
  },
  {
    "id": 394,
    "name": "Kalungu District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "91",
    "iso2": "122",
    "latitude": -0.0952831,
    "longitude": 31.7651362
  },
  {
    "id": 395,
    "name": "Moroto District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "88",
    "iso2": "308",
    "latitude": 2.6168545,
    "longitude": 34.597132
  },
  {
    "id": 396,
    "name": "Central Region",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "C",
    "iso2": "C",
    "latitude": 44.296875,
    "longitude": -94.7401733
  },
  {
    "id": 397,
    "name": "Oyam District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "C",
    "iso2": "321",
    "latitude": 2.2776281,
    "longitude": 32.4467238
  },
  {
    "id": 398,
    "name": "Kaliro District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "C",
    "iso2": "222",
    "latitude": 1.0431107,
    "longitude": 33.4831906
  },
  {
    "id": 399,
    "name": "Kakumiro District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "C",
    "iso2": "428",
    "latitude": 0.7808035,
    "longitude": 31.3241389
  },
  {
    "id": 400,
    "name": "Namisindwa District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "C",
    "iso2": "234",
    "latitude": 0.907101,
    "longitude": 34.3574037
  },
  {
    "id": 401,
    "name": "Kole District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "C",
    "iso2": "325",
    "latitude": 2.3701097,
    "longitude": 32.7633036
  },
  {
    "id": 402,
    "name": "Kyenjojo District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "85",
    "iso2": "415",
    "latitude": 0.6092923,
    "longitude": 30.6401231
  },
  {
    "id": 403,
    "name": "Kagadi District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "85",
    "iso2": "427",
    "latitude": 0.9400761,
    "longitude": 30.8125638
  },
  {
    "id": 404,
    "name": "Ntungamo District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "59",
    "iso2": "411",
    "latitude": -0.9807341,
    "longitude": 30.2512728
  },
  {
    "id": 405,
    "name": "Kalangala District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "36",
    "iso2": "101",
    "latitude": -0.6350578,
    "longitude": 32.5372741
  },
  {
    "id": 406,
    "name": "Nakasongola District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "73",
    "iso2": "109",
    "latitude": 1.3489721,
    "longitude": 32.4467238
  },
  {
    "id": 407,
    "name": "Sheema District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "73",
    "iso2": "426",
    "latitude": -0.5515298,
    "longitude": 30.3896651
  },
  {
    "id": 408,
    "name": "Pader District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "92",
    "iso2": "312",
    "latitude": 2.9430682,
    "longitude": 32.8084496
  },
  {
    "id": 409,
    "name": "Kisoro District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "43",
    "iso2": "408",
    "latitude": -1.220943,
    "longitude": 29.6499162
  },
  {
    "id": 410,
    "name": "Mukono District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "90",
    "iso2": "108",
    "latitude": 0.2835476,
    "longitude": 32.7633036
  },
  {
    "id": 411,
    "name": "Lamwo District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "90",
    "iso2": "326",
    "latitude": 3.5707568,
    "longitude": 32.5372741
  },
  {
    "id": 412,
    "name": "Pallisa District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "60",
    "iso2": "210",
    "latitude": 1.2324206,
    "longitude": 33.7517723
  },
  {
    "id": 413,
    "name": "Gulu District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "30",
    "iso2": "304",
    "latitude": 2.8185776,
    "longitude": 32.4467238
  },
  {
    "id": 414,
    "name": "Buvuma District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "30",
    "iso2": "120",
    "latitude": -0.3764912,
    "longitude": 33.258793
  },
  {
    "id": 415,
    "name": "Mbarara District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "52",
    "iso2": "410",
    "latitude": -0.6071596,
    "longitude": 30.6545022
  },
  {
    "id": 416,
    "name": "Amolatar District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "52",
    "iso2": "315",
    "latitude": 1.6054402,
    "longitude": 32.8084496
  },
  {
    "id": 417,
    "name": "Lwengo District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "52",
    "iso2": "124",
    "latitude": -0.4165288,
    "longitude": 31.3998995
  },
  {
    "id": 418,
    "name": "Mayuge District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "86",
    "iso2": "214",
    "latitude": -0.2182982,
    "longitude": 33.5728027
  },
  {
    "id": 419,
    "name": "Bundibugyo District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "28",
    "iso2": "401",
    "latitude": 0.6851763,
    "longitude": 30.0202964
  },
  {
    "id": 420,
    "name": "Katakwi District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "69",
    "iso2": "207",
    "latitude": 1.973103,
    "longitude": 34.0641419
  },
  {
    "id": 421,
    "name": "Maracha District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "69",
    "iso2": "320",
    "latitude": 3.2873127,
    "longitude": 30.9403023
  },
  {
    "id": 422,
    "name": "Ntoroko District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "69",
    "iso2": "424",
    "latitude": 1.0788178,
    "longitude": 30.3896651
  },
  {
    "id": 423,
    "name": "Nakaseke District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "69",
    "iso2": "116",
    "latitude": 1.2230848,
    "longitude": 32.0837445
  },
  {
    "id": 424,
    "name": "Ngora District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "69",
    "iso2": "231",
    "latitude": 1.4908115,
    "longitude": 33.7517723
  },
  {
    "id": 425,
    "name": "Kumi District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "46",
    "iso2": "208",
    "latitude": 1.4876999,
    "longitude": 33.9303991
  },
  {
    "id": 426,
    "name": "Kabale District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "34",
    "iso2": "404",
    "latitude": -1.2493084,
    "longitude": 30.0665236
  },
  {
    "id": 427,
    "name": "Sembabule District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "74",
    "iso2": "111",
    "latitude": 0.0637715,
    "longitude": 31.3541631
  },
  {
    "id": 428,
    "name": "Bulambuli District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "74",
    "iso2": "225",
    "latitude": 1.4798846,
    "longitude": 34.3754414
  },
  {
    "id": 429,
    "name": "Sironko District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "94",
    "iso2": "215",
    "latitude": 1.2302274,
    "longitude": 34.2491064
  },
  {
    "id": 430,
    "name": "Napak District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "94",
    "iso2": "327",
    "latitude": 2.3629945,
    "longitude": 34.2421597
  },
  {
    "id": 431,
    "name": "Busia District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "67",
    "iso2": "202",
    "latitude": 0.4044731,
    "longitude": 34.0195827
  },
  {
    "id": 432,
    "name": "Kapchorwa District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "39",
    "iso2": "206",
    "latitude": 1.3350205,
    "longitude": 34.3976356
  },
  {
    "id": 433,
    "name": "Luwero District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "70",
    "iso2": "104",
    "latitude": 0.8271118,
    "longitude": 32.6277455
  },
  {
    "id": 434,
    "name": "Kaabong District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "70",
    "iso2": "318",
    "latitude": 3.5126215,
    "longitude": 33.9750018
  },
  {
    "id": 435,
    "name": "Mitooma District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "70",
    "iso2": "423",
    "latitude": -0.6193276,
    "longitude": 30.0202964
  },
  {
    "id": 436,
    "name": "Kibaale District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "41",
    "iso2": "407",
    "latitude": 0.9066802,
    "longitude": 31.0793705
  },
  {
    "id": 437,
    "name": "Kyegegwa District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "41",
    "iso2": "422",
    "latitude": 0.4818193,
    "longitude": 31.0550093
  },
  {
    "id": 438,
    "name": "Manafwa District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "41",
    "iso2": "223",
    "latitude": 0.9063599,
    "longitude": 34.2866091
  },
  {
    "id": 439,
    "name": "Rakai District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "61",
    "iso2": "110",
    "latitude": -0.7069135,
    "longitude": 31.5370003
  },
  {
    "id": 440,
    "name": "Kasese District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "40",
    "iso2": "406",
    "latitude": 0.0646285,
    "longitude": 30.0665236
  },
  {
    "id": 441,
    "name": "Budaka District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "40",
    "iso2": "217",
    "latitude": 1.1016277,
    "longitude": 33.9303991
  },
  {
    "id": 442,
    "name": "Rubirizi District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "40",
    "iso2": "425",
    "latitude": -0.264241,
    "longitude": 30.1084033
  },
  {
    "id": 443,
    "name": "Kotido District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "45",
    "iso2": "306",
    "latitude": 3.0415679,
    "longitude": 33.8857747
  },
  {
    "id": 444,
    "name": "Soroti District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "95",
    "iso2": "211",
    "latitude": 1.7229117,
    "longitude": 33.5280072
  },
  {
    "id": 445,
    "name": "Luuka District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "95",
    "iso2": "229",
    "latitude": 0.7250599,
    "longitude": 33.3037143
  },
  {
    "id": 446,
    "name": "Nebbi District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "58",
    "iso2": "310",
    "latitude": 2.4409392,
    "longitude": 31.3541631
  },
  {
    "id": 447,
    "name": "Arua District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "77",
    "iso2": "303",
    "latitude": 2.9959846,
    "longitude": 31.1710389
  },
  {
    "id": 448,
    "name": "Kyotera District",
    "countryId": 229,
    "countryCode": "UG",
    "fipsCode": "77",
    "iso2": "125",
    "latitude": -0.6358988,
    "longitude": 31.5455637
  },
  {
    "id": 449,
    "name": "Schellenberg",
    "countryId": 125,
    "countryCode": "LI",
    "fipsCode": "08",
    "iso2": "08",
    "latitude": 47.230966,
    "longitude": 9.5467843
  },
  {
    "id": 450,
    "name": "Schaan",
    "countryId": 125,
    "countryCode": "LI",
    "fipsCode": "07",
    "iso2": "07",
    "latitude": 47.120434,
    "longitude": 9.5941602
  },
  {
    "id": 451,
    "name": "Eschen",
    "countryId": 125,
    "countryCode": "LI",
    "fipsCode": "02",
    "iso2": "02",
    "latitude": 40.7669574,
    "longitude": -73.9522821
  },
  {
    "id": 452,
    "name": "Vaduz",
    "countryId": 125,
    "countryCode": "LI",
    "fipsCode": "11",
    "iso2": "11",
    "latitude": 47.1410303,
    "longitude": 9.5209277
  },
  {
    "id": 453,
    "name": "Ruggell",
    "countryId": 125,
    "countryCode": "LI",
    "fipsCode": "06",
    "iso2": "06",
    "latitude": 47.2529222,
    "longitude": 9.5402127
  },
  {
    "id": 454,
    "name": "Planken",
    "countryId": 125,
    "countryCode": "LI",
    "fipsCode": "05",
    "iso2": "05",
    "latitude": 40.6650576,
    "longitude": -73.504798
  },
  {
    "id": 455,
    "name": "Mauren",
    "countryId": 125,
    "countryCode": "LI",
    "fipsCode": "04",
    "iso2": "04",
    "latitude": 47.2189285,
    "longitude": 9.541735
  },
  {
    "id": 456,
    "name": "Triesenberg",
    "countryId": 125,
    "countryCode": "LI",
    "fipsCode": "10",
    "iso2": "10",
    "latitude": 47.1224511,
    "longitude": 9.5701985
  },
  {
    "id": 457,
    "name": "Gamprin",
    "countryId": 125,
    "countryCode": "LI",
    "fipsCode": "03",
    "iso2": "03",
    "latitude": 47.213249,
    "longitude": 9.5025195
  },
  {
    "id": 458,
    "name": "Balzers",
    "countryId": 125,
    "countryCode": "LI",
    "fipsCode": "01",
    "iso2": "01",
    "latitude": 42.0528357,
    "longitude": -88.0366848
  },
  {
    "id": 459,
    "name": "Triesen",
    "countryId": 125,
    "countryCode": "LI",
    "fipsCode": "09",
    "iso2": "09",
    "latitude": 47.1097988,
    "longitude": 9.5248296
  },
  {
    "id": 460,
    "name": "Brčko District",
    "countryId": 28,
    "countryCode": "BA",
    "fipsCode": "BRC",
    "iso2": "BRC",
    "latitude": 44.8405944,
    "longitude": 18.742153
  },
  {
    "id": 461,
    "name": "Tuzla Canton",
    "countryId": 28,
    "countryCode": "BA",
    "fipsCode": "BRC",
    "iso2": "03",
    "latitude": 44.5343463,
    "longitude": 18.6972797
  },
  {
    "id": 462,
    "name": "Central Bosnia Canton",
    "countryId": 28,
    "countryCode": "BA",
    "fipsCode": "BRC",
    "iso2": "06",
    "latitude": 44.1381856,
    "longitude": 17.6866714
  },
  {
    "id": 463,
    "name": "Herzegovina-Neretva Canton",
    "countryId": 28,
    "countryCode": "BA",
    "fipsCode": "BRC",
    "iso2": "07",
    "latitude": 43.5265159,
    "longitude": 17.763621
  },
  {
    "id": 464,
    "name": "Posavina Canton",
    "countryId": 28,
    "countryCode": "BA",
    "fipsCode": "BRC",
    "iso2": "02",
    "latitude": 45.0752094,
    "longitude": 18.3776304
  },
  {
    "id": 465,
    "name": "Una-Sana Canton",
    "countryId": 28,
    "countryCode": "BA",
    "fipsCode": "BRC",
    "iso2": "01",
    "latitude": 44.6503116,
    "longitude": 16.3171629
  },
  {
    "id": 466,
    "name": "Sarajevo Canton",
    "countryId": 28,
    "countryCode": "BA",
    "fipsCode": "BRC",
    "iso2": "09",
    "latitude": 43.8512564,
    "longitude": 18.2953442
  },
  {
    "id": 467,
    "name": "Federation of Bosnia and Herzegovina",
    "countryId": 28,
    "countryCode": "BA",
    "fipsCode": "01",
    "iso2": "BIH",
    "latitude": 43.8874897,
    "longitude": 17.842793
  },
  {
    "id": 468,
    "name": "Zenica-Doboj Canton",
    "countryId": 28,
    "countryCode": "BA",
    "fipsCode": "01",
    "iso2": "04",
    "latitude": 44.2127109,
    "longitude": 18.1604625
  },
  {
    "id": 469,
    "name": "West Herzegovina Canton",
    "countryId": 28,
    "countryCode": "BA",
    "fipsCode": "01",
    "iso2": "08",
    "latitude": 43.4369244,
    "longitude": 17.3848831
  },
  {
    "id": 470,
    "name": "Republika Srpska",
    "countryId": 28,
    "countryCode": "BA",
    "fipsCode": "02",
    "iso2": "SRP",
    "latitude": 44.7280186,
    "longitude": 17.3148136
  },
  {
    "id": 471,
    "name": "Canton 10",
    "countryId": 28,
    "countryCode": "BA",
    "fipsCode": "02",
    "iso2": "10",
    "latitude": 43.9534155,
    "longitude": 16.9425187
  },
  {
    "id": 472,
    "name": "Bosnian Podrinje Canton",
    "countryId": 28,
    "countryCode": "BA",
    "fipsCode": "02",
    "iso2": "05",
    "latitude": 43.68749,
    "longitude": 18.8244394
  },
  {
    "id": 473,
    "name": "Dakar",
    "countryId": 195,
    "countryCode": "SN",
    "fipsCode": "01",
    "iso2": "DK",
    "latitude": 14.716677,
    "longitude": -17.4676861
  },
  {
    "id": 474,
    "name": "Kolda",
    "countryId": 195,
    "countryCode": "SN",
    "fipsCode": "11",
    "iso2": "KD",
    "latitude": 12.9107495,
    "longitude": -14.9505671
  },
  {
    "id": 475,
    "name": "Kaffrine",
    "countryId": 195,
    "countryCode": "SN",
    "fipsCode": "16",
    "iso2": "KA",
    "latitude": 14.105202,
    "longitude": -15.5415755
  },
  {
    "id": 476,
    "name": "Matam",
    "countryId": 195,
    "countryCode": "SN",
    "fipsCode": "15",
    "iso2": "MT",
    "latitude": 15.6600225,
    "longitude": -13.2576906
  },
  {
    "id": 477,
    "name": "Saint-Louis",
    "countryId": 195,
    "countryCode": "SN",
    "fipsCode": "14",
    "iso2": "SL",
    "latitude": 38.6270025,
    "longitude": -90.1994042
  },
  {
    "id": 478,
    "name": "Ziguinchor",
    "countryId": 195,
    "countryCode": "SN",
    "fipsCode": "12",
    "iso2": "ZG",
    "latitude": 12.5641479,
    "longitude": -16.2639825
  },
  {
    "id": 479,
    "name": "Fatick",
    "countryId": 195,
    "countryCode": "SN",
    "fipsCode": "09",
    "iso2": "FK",
    "latitude": 14.3390167,
    "longitude": -16.4111425
  },
  {
    "id": 480,
    "name": "Diourbel Region",
    "countryId": 195,
    "countryCode": "SN",
    "fipsCode": "03",
    "iso2": "DB",
    "latitude": 14.7283085,
    "longitude": -16.2522143
  },
  {
    "id": 481,
    "name": "Kédougou",
    "countryId": 195,
    "countryCode": "SN",
    "fipsCode": "17",
    "iso2": "KE",
    "latitude": 12.5604607,
    "longitude": -12.1747077
  },
  {
    "id": 482,
    "name": "Sédhiou",
    "countryId": 195,
    "countryCode": "SN",
    "fipsCode": "18",
    "iso2": "SE",
    "latitude": 12.704604,
    "longitude": -15.5562304
  },
  {
    "id": 483,
    "name": "Kaolack",
    "countryId": 195,
    "countryCode": "SN",
    "fipsCode": "10",
    "iso2": "KL",
    "latitude": 14.1652083,
    "longitude": -16.0757749
  },
  {
    "id": 484,
    "name": "Thiès Region",
    "countryId": 195,
    "countryCode": "SN",
    "fipsCode": "07",
    "iso2": "TH",
    "latitude": 14.7910052,
    "longitude": -16.9358604
  },
  {
    "id": 485,
    "name": "Louga",
    "countryId": 195,
    "countryCode": "SN",
    "fipsCode": "13",
    "iso2": "LG",
    "latitude": 15.6141768,
    "longitude": -16.22868
  },
  {
    "id": 486,
    "name": "Tambacounda Region",
    "countryId": 195,
    "countryCode": "SN",
    "fipsCode": "05",
    "iso2": "TC",
    "latitude": 13.5619011,
    "longitude": -13.1740348
  },
  {
    "id": 487,
    "name": "Encamp",
    "countryId": 6,
    "countryCode": "AD",
    "fipsCode": "03",
    "iso2": "03",
    "latitude": 42.5359764,
    "longitude": 1.5836773
  },
  {
    "id": 488,
    "name": "Andorra la Vella",
    "countryId": 6,
    "countryCode": "AD",
    "fipsCode": "07",
    "iso2": "07",
    "latitude": 42.5063174,
    "longitude": 1.5218355
  },
  {
    "id": 489,
    "name": "Canillo",
    "countryId": 6,
    "countryCode": "AD",
    "fipsCode": "02",
    "iso2": "02",
    "latitude": 42.5978249,
    "longitude": 1.6566377
  },
  {
    "id": 490,
    "name": "Sant Julià de Lòria",
    "countryId": 6,
    "countryCode": "AD",
    "fipsCode": "06",
    "iso2": "06",
    "latitude": 42.4529631,
    "longitude": 1.4918235
  },
  {
    "id": 491,
    "name": "Ordino",
    "countryId": 6,
    "countryCode": "AD",
    "fipsCode": "05",
    "iso2": "05",
    "latitude": 42.5994433,
    "longitude": 1.5402327
  },
  {
    "id": 492,
    "name": "Escaldes-Engordany",
    "countryId": 6,
    "countryCode": "AD",
    "fipsCode": "08",
    "iso2": "08",
    "latitude": 42.4909379,
    "longitude": 1.5886966
  },
  {
    "id": 493,
    "name": "La Massana",
    "countryId": 6,
    "countryCode": "AD",
    "fipsCode": "04",
    "iso2": "04",
    "latitude": 42.545625,
    "longitude": 1.5147392
  },
  {
    "id": 494,
    "name": "Mont Buxton",
    "countryId": 197,
    "countryCode": "SC",
    "fipsCode": "17",
    "iso2": "17",
    "latitude": -4.6166667,
    "longitude": 55.4457768
  },
  {
    "id": 495,
    "name": "La Digue",
    "countryId": 197,
    "countryCode": "SC",
    "fipsCode": "25",
    "iso2": "15",
    "latitude": 49.7666922,
    "longitude": -97.1546629
  },
  {
    "id": 496,
    "name": "Saint Louis",
    "countryId": 197,
    "countryCode": "SC",
    "fipsCode": "22",
    "iso2": "22",
    "latitude": 38.6270025,
    "longitude": -90.1994042
  },
  {
    "id": 497,
    "name": "Baie Lazare",
    "countryId": 197,
    "countryCode": "SC",
    "fipsCode": "06",
    "iso2": "06",
    "latitude": -4.7482525,
    "longitude": 55.4859363
  },
  {
    "id": 498,
    "name": "Mont Fleuri",
    "countryId": 197,
    "countryCode": "SC",
    "fipsCode": "18",
    "iso2": "18",
    "latitude": -4.6356543,
    "longitude": 55.4554688
  },
  {
    "id": 499,
    "name": "Les Mamelles",
    "countryId": 197,
    "countryCode": "SC",
    "fipsCode": "29",
    "iso2": "24",
    "latitude": 38.8250505,
    "longitude": -90.4834517
  },
  {
    "id": 500,
    "name": "Grand\"Anse Mahé",
    "countryId": 197,
    "countryCode": "SC",
    "fipsCode": "24",
    "iso2": "13",
    "latitude": -4.677392,
    "longitude": 55.463777
  },
  {
    "id": 501,
    "name": "Roche Caiman",
    "countryId": 197,
    "countryCode": "SC",
    "fipsCode": "30",
    "iso2": "25",
    "latitude": -4.6396028,
    "longitude": 55.4679315
  },
  {
    "id": 502,
    "name": "Anse Royale",
    "countryId": 197,
    "countryCode": "SC",
    "fipsCode": "05",
    "iso2": "05",
    "latitude": -4.7407988,
    "longitude": 55.5081012
  },
  {
    "id": 503,
    "name": "Glacis",
    "countryId": 197,
    "countryCode": "SC",
    "fipsCode": "12",
    "iso2": "12",
    "latitude": 47.1157303,
    "longitude": -70.3028183
  },
  {
    "id": 504,
    "name": "Grand\"Anse Praslin",
    "countryId": 197,
    "countryCode": "SC",
    "fipsCode": "14",
    "iso2": "14",
    "latitude": -4.3176219,
    "longitude": 55.7078363
  },
  {
    "id": 505,
    "name": "Bel Ombre",
    "countryId": 197,
    "countryCode": "SC",
    "fipsCode": "10",
    "iso2": "10",
    "latitude": -20.5010095,
    "longitude": 57.4259624
  },
  {
    "id": 506,
    "name": "Anse-aux-Pins",
    "countryId": 197,
    "countryCode": "SC",
    "fipsCode": "01",
    "iso2": "01",
    "latitude": -4.6900443,
    "longitude": 55.5150289
  },
  {
    "id": 507,
    "name": "Port Glaud",
    "countryId": 197,
    "countryCode": "SC",
    "fipsCode": "27",
    "iso2": "21",
    "latitude": -4.6488523,
    "longitude": 55.4194753
  },
  {
    "id": 508,
    "name": "Au Cap",
    "countryId": 197,
    "countryCode": "SC",
    "fipsCode": "28",
    "iso2": "04",
    "latitude": -4.7059723,
    "longitude": 55.5081012
  },
  {
    "id": 509,
    "name": "Takamaka",
    "countryId": 197,
    "countryCode": "SC",
    "fipsCode": "23",
    "iso2": "23",
    "latitude": 37.9645917,
    "longitude": -1.2217727
  },
  {
    "id": 510,
    "name": "Pointe La Rue",
    "countryId": 197,
    "countryCode": "SC",
    "fipsCode": "20",
    "iso2": "20",
    "latitude": -4.680489,
    "longitude": 55.5191857
  },
  {
    "id": 511,
    "name": "Plaisance",
    "countryId": 197,
    "countryCode": "SC",
    "fipsCode": "19",
    "iso2": "19",
    "latitude": 45.607095,
    "longitude": -75.1142745
  },
  {
    "id": 512,
    "name": "Beau Vallon",
    "countryId": 197,
    "countryCode": "SC",
    "fipsCode": "08",
    "iso2": "08",
    "latitude": -4.6210967,
    "longitude": 55.4277802
  },
  {
    "id": 513,
    "name": "Anse Boileau",
    "countryId": 197,
    "countryCode": "SC",
    "fipsCode": "02",
    "iso2": "02",
    "latitude": -4.7047268,
    "longitude": 55.4859363
  },
  {
    "id": 514,
    "name": "Baie Sainte Anne",
    "countryId": 197,
    "countryCode": "SC",
    "fipsCode": "07",
    "iso2": "07",
    "latitude": 47.05259,
    "longitude": -64.9524579
  },
  {
    "id": 515,
    "name": "Bel Air",
    "countryId": 197,
    "countryCode": "SC",
    "fipsCode": "09",
    "iso2": "09",
    "latitude": 34.1002455,
    "longitude": -118.459463
  },
  {
    "id": 516,
    "name": "La Rivière Anglaise",
    "countryId": 197,
    "countryCode": "SC",
    "fipsCode": "26",
    "iso2": "16",
    "latitude": -4.610615,
    "longitude": 55.4540841
  },
  {
    "id": 517,
    "name": "Cascade",
    "countryId": 197,
    "countryCode": "SC",
    "fipsCode": "11",
    "iso2": "11",
    "latitude": 44.5162821,
    "longitude": -116.0417983
  },
  {
    "id": 518,
    "name": "Shaki",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "48",
    "iso2": "SA",
    "latitude": 41.1974753,
    "longitude": 47.1571241
  },
  {
    "id": 519,
    "name": "Tartar District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "57",
    "iso2": "TAR",
    "latitude": 40.3443875,
    "longitude": 46.9376519
  },
  {
    "id": 520,
    "name": "Shirvan",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "07",
    "iso2": "SR",
    "latitude": 39.9469707,
    "longitude": 48.9223919
  },
  {
    "id": 521,
    "name": "Qazakh District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "40",
    "iso2": "QAZ",
    "latitude": 41.0971074,
    "longitude": 45.3516331
  },
  {
    "id": 522,
    "name": "Sadarak District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "40",
    "iso2": "SAD",
    "latitude": 39.7105114,
    "longitude": 44.8864277
  },
  {
    "id": 523,
    "name": "Yevlakh District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "67",
    "iso2": "YEV",
    "latitude": 40.6196638,
    "longitude": 47.1500324
  },
  {
    "id": 524,
    "name": "Khojali District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "64",
    "iso2": "XCI",
    "latitude": 39.9132553,
    "longitude": 46.794305
  },
  {
    "id": 525,
    "name": "Kalbajar District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "26",
    "iso2": "KAL",
    "latitude": 40.1024329,
    "longitude": 46.0364872
  },
  {
    "id": 526,
    "name": "Qakh District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "39",
    "iso2": "QAX",
    "latitude": 41.4206827,
    "longitude": 46.9320184
  },
  {
    "id": 527,
    "name": "Fizuli District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "18",
    "iso2": "FUZ",
    "latitude": 39.5378605,
    "longitude": 47.3033877
  },
  {
    "id": 528,
    "name": "Astara District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "08",
    "iso2": "AST",
    "latitude": 38.4937845,
    "longitude": 48.6944365
  },
  {
    "id": 529,
    "name": "Shamakhi District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "50",
    "iso2": "SMI",
    "latitude": 40.6318731,
    "longitude": 48.6363801
  },
  {
    "id": 530,
    "name": "Neftchala District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "36",
    "iso2": "NEF",
    "latitude": 39.3881052,
    "longitude": 49.2413743
  },
  {
    "id": 531,
    "name": "Goychay",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "22",
    "iso2": "GOY",
    "latitude": 40.6236168,
    "longitude": 47.7403034
  },
  {
    "id": 532,
    "name": "Bilasuvar District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "13",
    "iso2": "BIL",
    "latitude": 39.4598833,
    "longitude": 48.5509813
  },
  {
    "id": 533,
    "name": "Tovuz District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "58",
    "iso2": "TOV",
    "latitude": 40.9954523,
    "longitude": 45.6165907
  },
  {
    "id": 534,
    "name": "Ordubad District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "58",
    "iso2": "ORD",
    "latitude": 38.9021622,
    "longitude": 46.0237625
  },
  {
    "id": 535,
    "name": "Sharur District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "58",
    "iso2": "SAR",
    "latitude": 39.5536332,
    "longitude": 44.984568
  },
  {
    "id": 536,
    "name": "Samukh District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "52",
    "iso2": "SMX",
    "latitude": 40.7604631,
    "longitude": 46.4063181
  },
  {
    "id": 537,
    "name": "Khizi District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "63",
    "iso2": "XIZ",
    "latitude": 40.9109489,
    "longitude": 49.0729264
  },
  {
    "id": 538,
    "name": "Yevlakh",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "68",
    "iso2": "YE",
    "latitude": 40.6196638,
    "longitude": 47.1500324
  },
  {
    "id": 539,
    "name": "Ujar District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "59",
    "iso2": "UCA",
    "latitude": 40.5067525,
    "longitude": 47.6489641
  },
  {
    "id": 540,
    "name": "Absheron District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "01",
    "iso2": "ABS",
    "latitude": 40.3629693,
    "longitude": 49.2736815
  },
  {
    "id": 541,
    "name": "Lachin District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "28",
    "iso2": "LAC",
    "latitude": 39.6383414,
    "longitude": 46.5460853
  },
  {
    "id": 542,
    "name": "Qabala District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "38",
    "iso2": "QAB",
    "latitude": 40.9253925,
    "longitude": 47.8016106
  },
  {
    "id": 543,
    "name": "Agstafa District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "05",
    "iso2": "AGA",
    "latitude": 41.2655933,
    "longitude": 45.5134291
  },
  {
    "id": 544,
    "name": "Imishli District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "24",
    "iso2": "IMI",
    "latitude": 39.8694686,
    "longitude": 48.0665218
  },
  {
    "id": 545,
    "name": "Salyan District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "49",
    "iso2": "SAL",
    "latitude": 28.3524811,
    "longitude": 82.12784
  },
  {
    "id": 546,
    "name": "Lerik District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "31",
    "iso2": "LER",
    "latitude": 38.7736192,
    "longitude": 48.4151483
  },
  {
    "id": 547,
    "name": "Agsu District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "06",
    "iso2": "AGU",
    "latitude": 40.5283339,
    "longitude": 48.3650835
  },
  {
    "id": 548,
    "name": "Qubadli District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "43",
    "iso2": "QBI",
    "latitude": 39.2713996,
    "longitude": 46.6354312
  },
  {
    "id": 549,
    "name": "Kurdamir District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "27",
    "iso2": "KUR",
    "latitude": 40.3698651,
    "longitude": 48.1644626
  },
  {
    "id": 550,
    "name": "Yardymli District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "66",
    "iso2": "YAR",
    "latitude": 38.9058917,
    "longitude": 48.2496127
  },
  {
    "id": 551,
    "name": "Goranboy District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "21",
    "iso2": "GOR",
    "latitude": 40.5380506,
    "longitude": 46.5990891
  },
  {
    "id": 552,
    "name": "Baku",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "09",
    "iso2": "BA",
    "latitude": 40.4092617,
    "longitude": 49.8670924
  },
  {
    "id": 553,
    "name": "Agdash District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "04",
    "iso2": "AGS",
    "latitude": 40.6335427,
    "longitude": 47.467431
  },
  {
    "id": 554,
    "name": "Beylagan District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "12",
    "iso2": "BEY",
    "latitude": 39.7723073,
    "longitude": 47.6154166
  },
  {
    "id": 555,
    "name": "Masally District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "32",
    "iso2": "MAS",
    "latitude": 39.0340722,
    "longitude": 48.6589354
  },
  {
    "id": 556,
    "name": "Oghuz District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "37",
    "iso2": "OGU",
    "latitude": 41.0727924,
    "longitude": 47.4650672
  },
  {
    "id": 557,
    "name": "Saatly District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "45",
    "iso2": "SAT",
    "latitude": 39.9095503,
    "longitude": 48.3595122
  },
  {
    "id": 558,
    "name": "Lankaran District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "29",
    "iso2": "LA",
    "latitude": 38.7528669,
    "longitude": 48.8475015
  },
  {
    "id": 559,
    "name": "Agdam District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "03",
    "iso2": "AGM",
    "latitude": 39.9931853,
    "longitude": 46.9949562
  },
  {
    "id": 560,
    "name": "Balakan District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "10",
    "iso2": "BAL",
    "latitude": 41.7037509,
    "longitude": 46.4044213
  },
  {
    "id": 561,
    "name": "Dashkasan District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "16",
    "iso2": "DAS",
    "latitude": 40.5202257,
    "longitude": 46.0779304
  },
  {
    "id": 562,
    "name": "Nakhchivan Autonomous Republic",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "35",
    "iso2": "NX",
    "latitude": 39.3256814,
    "longitude": 45.4912648
  },
  {
    "id": 563,
    "name": "Quba District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "42",
    "iso2": "QBA",
    "latitude": 41.1564242,
    "longitude": 48.4135021
  },
  {
    "id": 564,
    "name": "Ismailli District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "25",
    "iso2": "ISM",
    "latitude": 40.7429936,
    "longitude": 48.2125556
  },
  {
    "id": 565,
    "name": "Sabirabad District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "46",
    "iso2": "SAB",
    "latitude": 39.9870663,
    "longitude": 48.4692545
  },
  {
    "id": 566,
    "name": "Zaqatala District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "70",
    "iso2": "ZAQ",
    "latitude": 41.5906889,
    "longitude": 46.7240373
  },
  {
    "id": 567,
    "name": "Kangarli District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "70",
    "iso2": "KAN",
    "latitude": 39.387194,
    "longitude": 45.1639852
  },
  {
    "id": 568,
    "name": "Martuni",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "65",
    "iso2": "XVD",
    "latitude": 39.7914693,
    "longitude": 47.1100814
  },
  {
    "id": 569,
    "name": "Barda District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "11",
    "iso2": "BAR",
    "latitude": 40.3706555,
    "longitude": 47.1378909
  },
  {
    "id": 570,
    "name": "Jabrayil District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "14",
    "iso2": "CAB",
    "latitude": 39.2645544,
    "longitude": 46.9621562
  },
  {
    "id": 571,
    "name": "Hajigabul District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "23",
    "iso2": "HAC",
    "latitude": 40.039377,
    "longitude": 48.9202533
  },
  {
    "id": 572,
    "name": "Julfa District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "23",
    "iso2": "CUL",
    "latitude": 38.9604983,
    "longitude": 45.6292939
  },
  {
    "id": 573,
    "name": "Gobustan District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "41",
    "iso2": "QOB",
    "latitude": 40.5326104,
    "longitude": 48.927375
  },
  {
    "id": 574,
    "name": "Goygol District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "62",
    "iso2": "GYG",
    "latitude": 40.5595378,
    "longitude": 46.3314953
  },
  {
    "id": 575,
    "name": "Babek District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "62",
    "iso2": "BAB",
    "latitude": 39.1507613,
    "longitude": 45.4485368
  },
  {
    "id": 576,
    "name": "Zardab District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "71",
    "iso2": "ZAR",
    "latitude": 40.2148114,
    "longitude": 47.714944
  },
  {
    "id": 577,
    "name": "Aghjabadi District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "02",
    "iso2": "AGC",
    "latitude": 28.7891841,
    "longitude": 77.5160788
  },
  {
    "id": 578,
    "name": "Jalilabad District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "15",
    "iso2": "CAL",
    "latitude": 39.2051632,
    "longitude": 48.5100604
  },
  {
    "id": 579,
    "name": "Shahbuz District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "15",
    "iso2": "SAH",
    "latitude": 39.4452103,
    "longitude": 45.6568009
  },
  {
    "id": 580,
    "name": "Mingachevir",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "33",
    "iso2": "MI",
    "latitude": 40.7702563,
    "longitude": 47.0496015
  },
  {
    "id": 581,
    "name": "Zangilan District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "69",
    "iso2": "ZAN",
    "latitude": 39.0856899,
    "longitude": 46.6524728
  },
  {
    "id": 582,
    "name": "Sumqayit",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "54",
    "iso2": "SM",
    "latitude": 40.5854765,
    "longitude": 49.6317411
  },
  {
    "id": 583,
    "name": "Shamkir District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "51",
    "iso2": "SKR",
    "latitude": 40.8288144,
    "longitude": 46.0166879
  },
  {
    "id": 584,
    "name": "Siazan District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "53",
    "iso2": "SIY",
    "latitude": 41.0783833,
    "longitude": 49.1118477
  },
  {
    "id": 585,
    "name": "Ganja",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "20",
    "iso2": "GA",
    "latitude": 36.3687338,
    "longitude": -95.9985767
  },
  {
    "id": 586,
    "name": "Shaki District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "47",
    "iso2": "SAK",
    "latitude": 41.1134662,
    "longitude": 47.1316927
  },
  {
    "id": 587,
    "name": "Lankaran",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "30",
    "iso2": "LAN",
    "latitude": 38.7528669,
    "longitude": 48.8475015
  },
  {
    "id": 588,
    "name": "Qusar District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "44",
    "iso2": "QUS",
    "latitude": 41.4266886,
    "longitude": 48.4345577
  },
  {
    "id": 589,
    "name": "Gədəbəy",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "19",
    "iso2": "GAD",
    "latitude": 40.5699639,
    "longitude": 45.8106883
  },
  {
    "id": 590,
    "name": "Khachmaz District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "60",
    "iso2": "XAC",
    "latitude": 41.4591168,
    "longitude": 48.8020626
  },
  {
    "id": 591,
    "name": "Shabran District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "17",
    "iso2": "SBN",
    "latitude": 41.2228376,
    "longitude": 48.8457304
  },
  {
    "id": 592,
    "name": "Shusha District",
    "countryId": 16,
    "countryCode": "AZ",
    "fipsCode": "55",
    "iso2": "SUS",
    "latitude": 39.7537438,
    "longitude": 46.7464755
  },
  {
    "id": 593,
    "name": "Skrapar District",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "55",
    "iso2": "SK",
    "latitude": 40.5349946,
    "longitude": 20.2832217
  },
  {
    "id": 594,
    "name": "Kavajë District",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "55",
    "iso2": "KA",
    "latitude": 41.1844529,
    "longitude": 19.5627596
  },
  {
    "id": 595,
    "name": "Lezhë District",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "48",
    "iso2": "LE",
    "latitude": 41.786073,
    "longitude": 19.6460758
  },
  {
    "id": 596,
    "name": "Librazhd District",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "48",
    "iso2": "LB",
    "latitude": 41.1829232,
    "longitude": 20.3174769
  },
  {
    "id": 597,
    "name": "Korçë District",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "46",
    "iso2": "KO",
    "latitude": 40.590567,
    "longitude": 20.6168921
  },
  {
    "id": 598,
    "name": "Elbasan County",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "43",
    "iso2": "03",
    "latitude": 41.1266672,
    "longitude": 20.2355647
  },
  {
    "id": 599,
    "name": "Lushnjë District",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "43",
    "iso2": "LU",
    "latitude": 40.941983,
    "longitude": 19.6996428
  },
  {
    "id": 600,
    "name": "Has District",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "43",
    "iso2": "HA",
    "latitude": 42.7901336,
    "longitude": -83.6122012
  },
  {
    "id": 601,
    "name": "Kukës County",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "47",
    "iso2": "07",
    "latitude": 42.0807464,
    "longitude": 20.4142923
  },
  {
    "id": 602,
    "name": "Malësi e Madhe District",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "47",
    "iso2": "MM",
    "latitude": 42.4245173,
    "longitude": 19.6163185
  },
  {
    "id": 603,
    "name": "Berat County",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "40",
    "iso2": "01",
    "latitude": 40.6953012,
    "longitude": 20.0449662
  },
  {
    "id": 604,
    "name": "Gjirokastër County",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "45",
    "iso2": "05",
    "latitude": 40.0672874,
    "longitude": 20.1045229
  },
  {
    "id": 605,
    "name": "Dibër District",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "41",
    "iso2": "DI",
    "latitude": 41.5888163,
    "longitude": 20.2355647
  },
  {
    "id": 606,
    "name": "Pogradec District",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "41",
    "iso2": "PG",
    "latitude": 40.9015314,
    "longitude": 20.6556289
  },
  {
    "id": 607,
    "name": "Bulqizë District",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "41",
    "iso2": "BU",
    "latitude": 41.4942587,
    "longitude": 20.2147157
  },
  {
    "id": 608,
    "name": "Devoll District",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "41",
    "iso2": "DV",
    "latitude": 40.6447347,
    "longitude": 20.9506636
  },
  {
    "id": 609,
    "name": "Lezhë County",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "48",
    "iso2": "08",
    "latitude": 41.7813759,
    "longitude": 19.8067916
  },
  {
    "id": 610,
    "name": "Dibër County",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "41",
    "iso2": "09",
    "latitude": 41.5888163,
    "longitude": 20.2355647
  },
  {
    "id": 611,
    "name": "Shkodër County",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "49",
    "iso2": "10",
    "latitude": 42.150371,
    "longitude": 19.6639309
  },
  {
    "id": 612,
    "name": "Kuçovë District",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "49",
    "iso2": "KC",
    "latitude": 40.7837063,
    "longitude": 19.8782348
  },
  {
    "id": 613,
    "name": "Vlorë District",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "51",
    "iso2": "VL",
    "latitude": 40.4660668,
    "longitude": 19.491356
  },
  {
    "id": 614,
    "name": "Krujë District",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "51",
    "iso2": "KR",
    "latitude": 41.5094765,
    "longitude": 19.7710732
  },
  {
    "id": 615,
    "name": "Tirana County",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "50",
    "iso2": "11",
    "latitude": 41.2427598,
    "longitude": 19.8067916
  },
  {
    "id": 616,
    "name": "Tepelenë District",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "50",
    "iso2": "TE",
    "latitude": 40.2966632,
    "longitude": 20.0181673
  },
  {
    "id": 617,
    "name": "Gramsh District",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "50",
    "iso2": "GR",
    "latitude": 40.8669873,
    "longitude": 20.1849323
  },
  {
    "id": 618,
    "name": "Delvinë District",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "50",
    "iso2": "DL",
    "latitude": 39.9481364,
    "longitude": 20.0955891
  },
  {
    "id": 619,
    "name": "Peqin District",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "50",
    "iso2": "PQ",
    "latitude": 41.0470902,
    "longitude": 19.7502384
  },
  {
    "id": 620,
    "name": "Pukë District",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "50",
    "iso2": "PU",
    "latitude": 42.0469772,
    "longitude": 19.8960968
  },
  {
    "id": 621,
    "name": "Gjirokastër District",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "45",
    "iso2": "GJ",
    "latitude": 40.0672874,
    "longitude": 20.1045229
  },
  {
    "id": 622,
    "name": "Kurbin District",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "45",
    "iso2": "KB",
    "latitude": 41.6412644,
    "longitude": 19.705595
  },
  {
    "id": 623,
    "name": "Kukës District",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "47",
    "iso2": "KU",
    "latitude": 42.0807464,
    "longitude": 20.4142923
  },
  {
    "id": 624,
    "name": "Sarandë District",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "47",
    "iso2": "SR",
    "latitude": 39.8592119,
    "longitude": 20.0271001
  },
  {
    "id": 625,
    "name": "Përmet District",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "47",
    "iso2": "PR",
    "latitude": 40.2361837,
    "longitude": 20.3517334
  },
  {
    "id": 626,
    "name": "Shkodër District",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "49",
    "iso2": "SH",
    "latitude": 42.0692985,
    "longitude": 19.5032559
  },
  {
    "id": 627,
    "name": "Fier District",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "44",
    "iso2": "FR",
    "latitude": 40.727504,
    "longitude": 19.5627596
  },
  {
    "id": 628,
    "name": "Kolonjë District",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "44",
    "iso2": "ER",
    "latitude": 40.3373262,
    "longitude": 20.6794676
  },
  {
    "id": 629,
    "name": "Berat District",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "40",
    "iso2": "BR",
    "latitude": 40.7086377,
    "longitude": 19.9437314
  },
  {
    "id": 630,
    "name": "Korçë County",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "46",
    "iso2": "06",
    "latitude": 40.590567,
    "longitude": 20.6168921
  },
  {
    "id": 631,
    "name": "Fier County",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "44",
    "iso2": "04",
    "latitude": 40.9191392,
    "longitude": 19.6639309
  },
  {
    "id": 632,
    "name": "Durrës County",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "42",
    "iso2": "02",
    "latitude": 41.5080972,
    "longitude": 19.6163185
  },
  {
    "id": 633,
    "name": "Tirana District",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "50",
    "iso2": "TR",
    "latitude": 41.3275459,
    "longitude": 19.8186982
  },
  {
    "id": 634,
    "name": "Vlorë County",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "51",
    "iso2": "12",
    "latitude": 40.150096,
    "longitude": 19.8067916
  },
  {
    "id": 635,
    "name": "Mat District",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "51",
    "iso2": "MT",
    "latitude": 41.5937675,
    "longitude": 19.9973244
  },
  {
    "id": 636,
    "name": "Tropojë District",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "51",
    "iso2": "TP",
    "latitude": 42.3982151,
    "longitude": 20.1625955
  },
  {
    "id": 637,
    "name": "Mallakastër District",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "51",
    "iso2": "MK",
    "latitude": 40.5273376,
    "longitude": 19.7829791
  },
  {
    "id": 638,
    "name": "Mirditë District",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "51",
    "iso2": "MR",
    "latitude": 41.764286,
    "longitude": 19.9020509
  },
  {
    "id": 639,
    "name": "Durrës District",
    "countryId": 3,
    "countryCode": "AL",
    "fipsCode": "42",
    "iso2": "DR",
    "latitude": 41.3706517,
    "longitude": 19.5211063
  },
  {
    "id": 640,
    "name": "Sveti Nikole Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "A4",
    "iso2": "69",
    "latitude": 41.8980312,
    "longitude": 21.9999435
  },
  {
    "id": 641,
    "name": "Kratovo Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "51",
    "iso2": "43",
    "latitude": 42.0537141,
    "longitude": 22.0714835
  },
  {
    "id": 642,
    "name": "Zajas Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "C1",
    "iso2": "31",
    "latitude": 41.6030328,
    "longitude": 20.8791343
  },
  {
    "id": 643,
    "name": "Staro Nagoričane Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "97",
    "iso2": "71",
    "latitude": 42.2191692,
    "longitude": 21.9045541
  },
  {
    "id": 644,
    "name": "Češinovo-Obleševo Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "19",
    "iso2": "81",
    "latitude": 41.8639316,
    "longitude": 22.262246
  },
  {
    "id": 645,
    "name": "Debarca Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "F5",
    "iso2": "22",
    "latitude": 41.3584077,
    "longitude": 20.8552919
  },
  {
    "id": 646,
    "name": "Probištip Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "83",
    "iso2": "63",
    "latitude": 41.9589146,
    "longitude": 22.166867
  },
  {
    "id": 647,
    "name": "Krivogaštani Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "53",
    "iso2": "45",
    "latitude": 41.3082306,
    "longitude": 21.3679689
  },
  {
    "id": 648,
    "name": "Gevgelija Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "33",
    "iso2": "18",
    "latitude": 41.2118606,
    "longitude": 22.3814624
  },
  {
    "id": 649,
    "name": "Bogdanci Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "08",
    "iso2": "05",
    "latitude": 41.1869616,
    "longitude": 22.5960268
  },
  {
    "id": 650,
    "name": "Vraneštica Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "B6",
    "iso2": "15",
    "latitude": 41.4829087,
    "longitude": 21.0579632
  },
  {
    "id": 651,
    "name": "Veles Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "F1",
    "iso2": "13",
    "latitude": 41.7274426,
    "longitude": 21.7137694
  },
  {
    "id": 652,
    "name": "Bosilovo Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "11",
    "iso2": "07",
    "latitude": 41.4904864,
    "longitude": 22.7867174
  },
  {
    "id": 653,
    "name": "Mogila Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "D9",
    "iso2": "53",
    "latitude": 41.1479645,
    "longitude": 21.4514369
  },
  {
    "id": 654,
    "name": "Tearce Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "A5",
    "iso2": "75",
    "latitude": 42.0777511,
    "longitude": 21.0534923
  },
  {
    "id": 655,
    "name": "Demir Kapija Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "25",
    "iso2": "24",
    "latitude": 41.3795538,
    "longitude": 22.2145571
  },
  {
    "id": 656,
    "name": "Aračinovo Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "01",
    "iso2": "02",
    "latitude": 42.0247381,
    "longitude": 21.5766407
  },
  {
    "id": 657,
    "name": "Drugovo Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "30",
    "iso2": "28",
    "latitude": 41.4408153,
    "longitude": 20.9268201
  },
  {
    "id": 658,
    "name": "Vasilevo Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "A9",
    "iso2": "11",
    "latitude": 41.4741699,
    "longitude": 22.6422128
  },
  {
    "id": 659,
    "name": "Lipkovo Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "59",
    "iso2": "48",
    "latitude": 42.2006626,
    "longitude": 21.6183755
  },
  {
    "id": 660,
    "name": "Brvenica Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "12",
    "iso2": "08",
    "latitude": 41.9681482,
    "longitude": 20.9819586
  },
  {
    "id": 661,
    "name": "Štip Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "98",
    "iso2": "83",
    "latitude": 41.7079297,
    "longitude": 22.1907122
  },
  {
    "id": 662,
    "name": "Vevčani Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "B3",
    "iso2": "12",
    "latitude": 41.2407543,
    "longitude": 20.5915649
  },
  {
    "id": 663,
    "name": "Tetovo Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "E8",
    "iso2": "76",
    "latitude": 42.027486,
    "longitude": 20.9506636
  },
  {
    "id": 664,
    "name": "Negotino Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "69",
    "iso2": "54",
    "latitude": 41.4989985,
    "longitude": 22.0953297
  },
  {
    "id": 665,
    "name": "Konče Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "47",
    "iso2": "41",
    "latitude": 41.5171011,
    "longitude": 22.3814624
  },
  {
    "id": 666,
    "name": "Prilep Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "E3",
    "iso2": "62",
    "latitude": 41.2693142,
    "longitude": 21.7137694
  },
  {
    "id": 667,
    "name": "Saraj Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "90",
    "iso2": "68",
    "latitude": 41.9869496,
    "longitude": 21.2606554
  },
  {
    "id": 668,
    "name": "Želino Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "C3",
    "iso2": "30",
    "latitude": 41.9006531,
    "longitude": 21.1175767
  },
  {
    "id": 669,
    "name": "Mavrovo and Rostuša Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "E4",
    "iso2": "50",
    "latitude": 41.6092427,
    "longitude": 20.6012488
  },
  {
    "id": 670,
    "name": "Plasnica Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "80",
    "iso2": "61",
    "latitude": 41.4546349,
    "longitude": 21.1056539
  },
  {
    "id": 671,
    "name": "Valandovo Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "E9",
    "iso2": "10",
    "latitude": 41.3211909,
    "longitude": 22.5006693
  },
  {
    "id": 672,
    "name": "Vinica Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "B4",
    "iso2": "14",
    "latitude": 41.857102,
    "longitude": 22.5721881
  },
  {
    "id": 673,
    "name": "Zrnovci Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "C6",
    "iso2": "33",
    "latitude": 41.8228221,
    "longitude": 22.4172256
  },
  {
    "id": 674,
    "name": "Karbinci",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "40",
    "iso2": "37",
    "latitude": 41.8180159,
    "longitude": 22.2324758
  },
  {
    "id": 675,
    "name": "Dolneni Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "28",
    "iso2": "27",
    "latitude": 41.4640935,
    "longitude": 21.4037407
  },
  {
    "id": 676,
    "name": "Čaška Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "C9",
    "iso2": "80",
    "latitude": 41.647438,
    "longitude": 21.6914115
  },
  {
    "id": 677,
    "name": "Kriva Palanka Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "52",
    "iso2": "44",
    "latitude": 42.2058454,
    "longitude": 22.3307965
  },
  {
    "id": 678,
    "name": "Jegunovce Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "D5",
    "iso2": "35",
    "latitude": 42.074072,
    "longitude": 21.1220478
  },
  {
    "id": 679,
    "name": "Bitola Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "06",
    "iso2": "04",
    "latitude": 41.0363302,
    "longitude": 21.3321974
  },
  {
    "id": 680,
    "name": "Šuto Orizari Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "A3",
    "iso2": "84",
    "latitude": 42.0290416,
    "longitude": 21.4097027
  },
  {
    "id": 681,
    "name": "Karpoš Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "41",
    "iso2": "38",
    "latitude": 41.9709661,
    "longitude": 21.3918168
  },
  {
    "id": 682,
    "name": "Oslomej Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "77",
    "iso2": "57",
    "latitude": 41.5758391,
    "longitude": 21.022196
  },
  {
    "id": 683,
    "name": "Kumanovo Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "D7",
    "iso2": "47",
    "latitude": 42.0732613,
    "longitude": 21.7853143
  },
  {
    "id": 684,
    "name": "Greater Skopje",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "F6",
    "iso2": "85",
    "latitude": 41.9981294,
    "longitude": 21.4254355
  },
  {
    "id": 685,
    "name": "Pehčevo Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "78",
    "iso2": "60",
    "latitude": 41.7737132,
    "longitude": 22.8820489
  },
  {
    "id": 686,
    "name": "Kisela Voda Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "44",
    "iso2": "39",
    "latitude": 41.92748,
    "longitude": 21.4931713
  },
  {
    "id": 687,
    "name": "Demir Hisar Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "D3",
    "iso2": "25",
    "latitude": 41.227083,
    "longitude": 21.1414226
  },
  {
    "id": 688,
    "name": "Kičevo Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "43",
    "iso2": "40",
    "latitude": 41.5129112,
    "longitude": 20.9525065
  },
  {
    "id": 689,
    "name": "Vrapčište Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "B7",
    "iso2": "16",
    "latitude": 41.879116,
    "longitude": 20.83145
  },
  {
    "id": 690,
    "name": "Ilinden Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "36",
    "iso2": "34",
    "latitude": 41.9957443,
    "longitude": 21.5676975
  },
  {
    "id": 691,
    "name": "Rosoman Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "87",
    "iso2": "67",
    "latitude": 41.4848006,
    "longitude": 21.8807064
  },
  {
    "id": 692,
    "name": "Makedonski Brod Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "D8",
    "iso2": "52",
    "latitude": 41.5133088,
    "longitude": 21.2174329
  },
  {
    "id": 693,
    "name": "Gostivar Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "D4",
    "iso2": "19",
    "latitude": 41.8025541,
    "longitude": 20.9089378
  },
  {
    "id": 694,
    "name": "Butel Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "F4",
    "iso2": "09",
    "latitude": 42.0895068,
    "longitude": 21.463361
  },
  {
    "id": 695,
    "name": "Delčevo Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "22",
    "iso2": "23",
    "latitude": 41.9684387,
    "longitude": 22.762883
  },
  {
    "id": 696,
    "name": "Novaci Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "E1",
    "iso2": "55",
    "latitude": 41.0442661,
    "longitude": 21.4588894
  },
  {
    "id": 697,
    "name": "Dojran Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "E5",
    "iso2": "26",
    "latitude": 41.2436672,
    "longitude": 22.6913764
  },
  {
    "id": 698,
    "name": "Petrovec Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "79",
    "iso2": "59",
    "latitude": 41.9029897,
    "longitude": 21.689921
  },
  {
    "id": 699,
    "name": "Ohrid Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "E2",
    "iso2": "58",
    "latitude": 41.0682088,
    "longitude": 20.7599266
  },
  {
    "id": 700,
    "name": "Struga Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "E6",
    "iso2": "72",
    "latitude": 41.3173744,
    "longitude": 20.6645683
  },
  {
    "id": 701,
    "name": "Makedonska Kamenica Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "62",
    "iso2": "51",
    "latitude": 42.0694604,
    "longitude": 22.548349
  },
  {
    "id": 702,
    "name": "Centar Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "62",
    "iso2": "77",
    "latitude": 41.9698934,
    "longitude": 21.4216267
  },
  {
    "id": 703,
    "name": "Aerodrom Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "F3",
    "iso2": "01",
    "latitude": 41.9464363,
    "longitude": 21.4931713
  },
  {
    "id": 704,
    "name": "Čair Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "C8",
    "iso2": "79",
    "latitude": 41.9930355,
    "longitude": 21.4365318
  },
  {
    "id": 705,
    "name": "Lozovo Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "60",
    "iso2": "49",
    "latitude": 41.7818139,
    "longitude": 21.9000827
  },
  {
    "id": 706,
    "name": "Zelenikovo Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "C2",
    "iso2": "32",
    "latitude": 41.8733812,
    "longitude": 21.602725
  },
  {
    "id": 707,
    "name": "Gazi Baba Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "32",
    "iso2": "17",
    "latitude": 42.0162961,
    "longitude": 21.4991334
  },
  {
    "id": 708,
    "name": "Gradsko Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "35",
    "iso2": "20",
    "latitude": 41.5991608,
    "longitude": 21.8807064
  },
  {
    "id": 709,
    "name": "Radoviš Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "84",
    "iso2": "64",
    "latitude": 41.6495531,
    "longitude": 22.4768287
  },
  {
    "id": 710,
    "name": "Strumica Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "E7",
    "iso2": "73",
    "latitude": 41.4378004,
    "longitude": 22.6427428
  },
  {
    "id": 711,
    "name": "Studeničani Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "A2",
    "iso2": "74",
    "latitude": 41.9225639,
    "longitude": 21.5363965
  },
  {
    "id": 712,
    "name": "Resen Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "86",
    "iso2": "66",
    "latitude": 40.9368093,
    "longitude": 21.0460407
  },
  {
    "id": 713,
    "name": "Kavadarci Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "D6",
    "iso2": "36",
    "latitude": 41.2890068,
    "longitude": 21.9999435
  },
  {
    "id": 714,
    "name": "Kruševo Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "54",
    "iso2": "46",
    "latitude": 41.3769331,
    "longitude": 21.2606554
  },
  {
    "id": 715,
    "name": "Čučer-Sandevo Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "20",
    "iso2": "82",
    "latitude": 42.1483946,
    "longitude": 21.4037407
  },
  {
    "id": 716,
    "name": "Berovo Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "04",
    "iso2": "03",
    "latitude": 41.6661929,
    "longitude": 22.762883
  },
  {
    "id": 717,
    "name": "Rankovce Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "85",
    "iso2": "65",
    "latitude": 42.1808141,
    "longitude": 22.0953297
  },
  {
    "id": 718,
    "name": "Novo Selo Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "72",
    "iso2": "56",
    "latitude": 41.432558,
    "longitude": 22.8820489
  },
  {
    "id": 719,
    "name": "Sopište Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "92",
    "iso2": "70",
    "latitude": 41.8638492,
    "longitude": 21.3083499
  },
  {
    "id": 720,
    "name": "Centar Župa Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "18",
    "iso2": "78",
    "latitude": 41.4652259,
    "longitude": 20.5930548
  },
  {
    "id": 721,
    "name": "Bogovinje Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "C7",
    "iso2": "06",
    "latitude": 41.9236371,
    "longitude": 20.9163887
  },
  {
    "id": 722,
    "name": "Gjorče Petrov Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "29",
    "iso2": "29",
    "latitude": 42.0606374,
    "longitude": 21.3202736
  },
  {
    "id": 723,
    "name": "Kočani Municipality",
    "countryId": 129,
    "countryCode": "MK",
    "fipsCode": "46",
    "iso2": "42",
    "latitude": 41.9858374,
    "longitude": 22.4053046
  },
  {
    "id": 724,
    "name": "Požega-Slavonia County",
    "countryId": 55,
    "countryCode": "HR",
    "fipsCode": "11",
    "iso2": "11",
    "latitude": 45.3417868,
    "longitude": 17.8114359
  },
  {
    "id": 725,
    "name": "Split-Dalmatia County",
    "countryId": 55,
    "countryCode": "HR",
    "fipsCode": "15",
    "iso2": "17",
    "latitude": 43.5240328,
    "longitude": 16.8178377
  },
  {
    "id": 726,
    "name": "Međimurje County",
    "countryId": 55,
    "countryCode": "HR",
    "fipsCode": "09",
    "iso2": "20",
    "latitude": 46.3766644,
    "longitude": 16.4213298
  },
  {
    "id": 727,
    "name": "Zadar County",
    "countryId": 55,
    "countryCode": "HR",
    "fipsCode": "19",
    "iso2": "13",
    "latitude": 44.146939,
    "longitude": 15.6164943
  },
  {
    "id": 728,
    "name": "Dubrovnik-Neretva County",
    "countryId": 55,
    "countryCode": "HR",
    "fipsCode": "03",
    "iso2": "19",
    "latitude": 43.0766588,
    "longitude": 17.5268471
  },
  {
    "id": 729,
    "name": "Krapina-Zagorje County",
    "countryId": 55,
    "countryCode": "HR",
    "fipsCode": "07",
    "iso2": "02",
    "latitude": 46.1013393,
    "longitude": 15.8809693
  },
  {
    "id": 730,
    "name": "Šibenik-Knin County",
    "countryId": 55,
    "countryCode": "HR",
    "fipsCode": "13",
    "iso2": "15",
    "latitude": 43.9281485,
    "longitude": 16.1037694
  },
  {
    "id": 731,
    "name": "Lika-Senj County",
    "countryId": 55,
    "countryCode": "HR",
    "fipsCode": "08",
    "iso2": "09",
    "latitude": 44.6192218,
    "longitude": 15.4701608
  },
  {
    "id": 732,
    "name": "Virovitica-Podravina County",
    "countryId": 55,
    "countryCode": "HR",
    "fipsCode": "17",
    "iso2": "10",
    "latitude": 45.6557985,
    "longitude": 17.7932472
  },
  {
    "id": 733,
    "name": "Sisak-Moslavina County",
    "countryId": 55,
    "countryCode": "HR",
    "fipsCode": "14",
    "iso2": "03",
    "latitude": 45.3837926,
    "longitude": 16.5380994
  },
  {
    "id": 734,
    "name": "Bjelovar-Bilogora County",
    "countryId": 55,
    "countryCode": "HR",
    "fipsCode": "01",
    "iso2": "07",
    "latitude": 45.8987972,
    "longitude": 16.8423093
  },
  {
    "id": 735,
    "name": "Primorje-Gorski Kotar County",
    "countryId": 55,
    "countryCode": "HR",
    "fipsCode": "12",
    "iso2": "08",
    "latitude": 45.3173996,
    "longitude": 14.8167466
  },
  {
    "id": 736,
    "name": "Zagreb County",
    "countryId": 55,
    "countryCode": "HR",
    "fipsCode": "20",
    "iso2": "01",
    "latitude": 45.8706612,
    "longitude": 16.395491
  },
  {
    "id": 737,
    "name": "Brod-Posavina County",
    "countryId": 55,
    "countryCode": "HR",
    "fipsCode": "02",
    "iso2": "12",
    "latitude": 45.2637951,
    "longitude": 17.3264562
  },
  {
    "id": 738,
    "name": "Zagreb",
    "countryId": 55,
    "countryCode": "HR",
    "fipsCode": "21",
    "iso2": "21",
    "latitude": 45.8150108,
    "longitude": 15.9819189
  },
  {
    "id": 739,
    "name": "Varaždin County",
    "countryId": 55,
    "countryCode": "HR",
    "fipsCode": "16",
    "iso2": "05",
    "latitude": 46.2317473,
    "longitude": 16.3360559
  },
  {
    "id": 740,
    "name": "Osijek-Baranja County",
    "countryId": 55,
    "countryCode": "HR",
    "fipsCode": "10",
    "iso2": "14",
    "latitude": 45.5576428,
    "longitude": 18.3942141
  },
  {
    "id": 741,
    "name": "Vukovar-Syrmia County",
    "countryId": 55,
    "countryCode": "HR",
    "fipsCode": "18",
    "iso2": "16",
    "latitude": 45.1773552,
    "longitude": 18.8053527
  },
  {
    "id": 742,
    "name": "Koprivnica-Križevci County",
    "countryId": 55,
    "countryCode": "HR",
    "fipsCode": "06",
    "iso2": "06",
    "latitude": 46.1568919,
    "longitude": 16.8390826
  },
  {
    "id": 743,
    "name": "Istria County",
    "countryId": 55,
    "countryCode": "HR",
    "fipsCode": "04",
    "iso2": "18",
    "latitude": 45.1286455,
    "longitude": 13.901542
  },
  {
    "id": 744,
    "name": "Kyrenia District",
    "countryId": 57,
    "countryCode": "CY",
    "fipsCode": "02",
    "iso2": "06",
    "latitude": 35.299194,
    "longitude": 33.2363246
  },
  {
    "id": 745,
    "name": "Nicosia District",
    "countryId": 57,
    "countryCode": "CY",
    "fipsCode": "04",
    "iso2": "01",
    "latitude": 35.1855659,
    "longitude": 33.3822764
  },
  {
    "id": 746,
    "name": "Paphos District",
    "countryId": 57,
    "countryCode": "CY",
    "fipsCode": "06",
    "iso2": "05",
    "latitude": 34.9164594,
    "longitude": 32.4920088
  },
  {
    "id": 747,
    "name": "Larnaca District",
    "countryId": 57,
    "countryCode": "CY",
    "fipsCode": "03",
    "iso2": "03",
    "latitude": 34.8507206,
    "longitude": 33.4831906
  },
  {
    "id": 748,
    "name": "Limassol District",
    "countryId": 57,
    "countryCode": "CY",
    "fipsCode": "05",
    "iso2": "02",
    "latitude": 34.7071301,
    "longitude": 33.0226174
  },
  {
    "id": 749,
    "name": "Famagusta District",
    "countryId": 57,
    "countryCode": "CY",
    "fipsCode": "01",
    "iso2": "04",
    "latitude": 35.2857023,
    "longitude": 33.8411288
  },
  {
    "id": 750,
    "name": "Rangpur Division",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "87",
    "iso2": "F",
    "latitude": 25.8483388,
    "longitude": 88.9413865
  },
  {
    "id": 751,
    "name": "Cox\"s Bazar District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "87",
    "iso2": "11",
    "latitude": 21.5640626,
    "longitude": 92.0282129
  },
  {
    "id": 752,
    "name": "Bandarban District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "87",
    "iso2": "01",
    "latitude": 21.8311002,
    "longitude": 92.3686321
  },
  {
    "id": 753,
    "name": "Rajshahi Division",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "83",
    "iso2": "E",
    "latitude": 24.7105776,
    "longitude": 88.9413865
  },
  {
    "id": 754,
    "name": "Pabna District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "83",
    "iso2": "49",
    "latitude": 24.158505,
    "longitude": 89.4480718
  },
  {
    "id": 755,
    "name": "Sherpur District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "83",
    "iso2": "57",
    "latitude": 25.0746235,
    "longitude": 90.1494904
  },
  {
    "id": 756,
    "name": "Bhola District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "83",
    "iso2": "07",
    "latitude": 22.1785315,
    "longitude": 90.7101023
  },
  {
    "id": 757,
    "name": "Jessore District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "83",
    "iso2": "22",
    "latitude": 23.1634014,
    "longitude": 89.2181664
  },
  {
    "id": 758,
    "name": "Mymensingh Division",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "H",
    "iso2": "H",
    "latitude": 24.71362,
    "longitude": 90.4502368
  },
  {
    "id": 759,
    "name": "Rangpur District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "87",
    "iso2": "55",
    "latitude": 25.7467925,
    "longitude": 89.2508335
  },
  {
    "id": 760,
    "name": "Dhaka Division",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "81",
    "iso2": "C",
    "latitude": 23.9535742,
    "longitude": 90.1494988
  },
  {
    "id": 761,
    "name": "Chapai Nawabganj District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "81",
    "iso2": "45",
    "latitude": 24.7413111,
    "longitude": 88.2912069
  },
  {
    "id": 762,
    "name": "Faridpur District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "81",
    "iso2": "15",
    "latitude": 23.5423919,
    "longitude": 89.6308921
  },
  {
    "id": 763,
    "name": "Comilla District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "81",
    "iso2": "08",
    "latitude": 23.4575667,
    "longitude": 91.1808996
  },
  {
    "id": 764,
    "name": "Netrokona District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "81",
    "iso2": "41",
    "latitude": 24.8103284,
    "longitude": 90.8656415
  },
  {
    "id": 765,
    "name": "Sylhet Division",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "86",
    "iso2": "G",
    "latitude": 24.7049811,
    "longitude": 91.6760691
  },
  {
    "id": 766,
    "name": "Mymensingh District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "H",
    "iso2": "34",
    "latitude": 24.7538575,
    "longitude": 90.4072919
  },
  {
    "id": 767,
    "name": "Sylhet District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "86",
    "iso2": "60",
    "latitude": 24.8993357,
    "longitude": 91.8700473
  },
  {
    "id": 768,
    "name": "Chandpur District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "86",
    "iso2": "09",
    "latitude": 23.2513148,
    "longitude": 90.8517846
  },
  {
    "id": 769,
    "name": "Narail District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "86",
    "iso2": "43",
    "latitude": 23.1162929,
    "longitude": 89.5840404
  },
  {
    "id": 770,
    "name": "Narayanganj District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "86",
    "iso2": "40",
    "latitude": 23.7146601,
    "longitude": 90.563609
  },
  {
    "id": 771,
    "name": "Dhaka District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "81",
    "iso2": "13",
    "latitude": 23.810514,
    "longitude": 90.3371889
  },
  {
    "id": 772,
    "name": "Nilphamari District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "81",
    "iso2": "46",
    "latitude": 25.8482798,
    "longitude": 88.9414134
  },
  {
    "id": 773,
    "name": "Rajbari District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "81",
    "iso2": "53",
    "latitude": 23.715134,
    "longitude": 89.5874819
  },
  {
    "id": 774,
    "name": "Kushtia District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "81",
    "iso2": "30",
    "latitude": 23.8906995,
    "longitude": 89.1099368
  },
  {
    "id": 775,
    "name": "Khulna Division",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "82",
    "iso2": "D",
    "latitude": 22.8087816,
    "longitude": 89.2467191
  },
  {
    "id": 776,
    "name": "Meherpur District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "82",
    "iso2": "39",
    "latitude": 23.8051991,
    "longitude": 88.6723578
  },
  {
    "id": 777,
    "name": "Patuakhali District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "82",
    "iso2": "51",
    "latitude": 22.2248632,
    "longitude": 90.4547503
  },
  {
    "id": 778,
    "name": "Jhalokati District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "82",
    "iso2": "25",
    "latitude": 22.57208,
    "longitude": 90.1869644
  },
  {
    "id": 779,
    "name": "Kishoreganj District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "82",
    "iso2": "26",
    "latitude": 24.4260457,
    "longitude": 90.9820668
  },
  {
    "id": 780,
    "name": "Lalmonirhat District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "82",
    "iso2": "32",
    "latitude": 25.9923398,
    "longitude": 89.2847251
  },
  {
    "id": 781,
    "name": "Sirajganj District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "82",
    "iso2": "59",
    "latitude": 24.3141115,
    "longitude": 89.5699615
  },
  {
    "id": 782,
    "name": "Tangail District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "82",
    "iso2": "63",
    "latitude": 24.3917427,
    "longitude": 89.9948257
  },
  {
    "id": 783,
    "name": "Dinajpur District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "82",
    "iso2": "14",
    "latitude": 25.6279123,
    "longitude": 88.6331758
  },
  {
    "id": 784,
    "name": "Barguna District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "82",
    "iso2": "02",
    "latitude": 22.0952915,
    "longitude": 90.1120696
  },
  {
    "id": 785,
    "name": "Chittagong District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "84",
    "iso2": "10",
    "latitude": 22.5150105,
    "longitude": 91.7538817
  },
  {
    "id": 786,
    "name": "Khagrachari District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "84",
    "iso2": "29",
    "latitude": 23.1321751,
    "longitude": 91.949021
  },
  {
    "id": 787,
    "name": "Natore District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "84",
    "iso2": "44",
    "latitude": 24.410243,
    "longitude": 89.0076177
  },
  {
    "id": 788,
    "name": "Chuadanga District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "84",
    "iso2": "12",
    "latitude": 23.6160512,
    "longitude": 88.8263006
  },
  {
    "id": 789,
    "name": "Jhenaidah District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "84",
    "iso2": "23",
    "latitude": 23.5449873,
    "longitude": 89.1726031
  },
  {
    "id": 790,
    "name": "Munshiganj District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "84",
    "iso2": "35",
    "latitude": 23.4980931,
    "longitude": 90.4126621
  },
  {
    "id": 791,
    "name": "Pirojpur District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "84",
    "iso2": "50",
    "latitude": 22.5790744,
    "longitude": 89.9759264
  },
  {
    "id": 792,
    "name": "Gopalganj District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "84",
    "iso2": "17",
    "latitude": 26.4831584,
    "longitude": 84.43655
  },
  {
    "id": 793,
    "name": "Kurigram District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "84",
    "iso2": "28",
    "latitude": 25.8072414,
    "longitude": 89.6294746
  },
  {
    "id": 794,
    "name": "Moulvibazar District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "84",
    "iso2": "38",
    "latitude": 24.3095344,
    "longitude": 91.7314903
  },
  {
    "id": 795,
    "name": "Gaibandha District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "84",
    "iso2": "19",
    "latitude": 25.3296928,
    "longitude": 89.5429652
  },
  {
    "id": 796,
    "name": "Bagerhat District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "84",
    "iso2": "05",
    "latitude": 22.6602436,
    "longitude": 89.7895478
  },
  {
    "id": 797,
    "name": "Bogra District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "84",
    "iso2": "03",
    "latitude": 24.8510402,
    "longitude": 89.3697225
  },
  {
    "id": 798,
    "name": "Gazipur District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "84",
    "iso2": "18",
    "latitude": 24.0958171,
    "longitude": 90.4125181
  },
  {
    "id": 799,
    "name": "Satkhira District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "84",
    "iso2": "58",
    "latitude": 22.3154812,
    "longitude": 89.1114525
  },
  {
    "id": 800,
    "name": "Panchagarh District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "84",
    "iso2": "52",
    "latitude": 26.2708705,
    "longitude": 88.5951751
  },
  {
    "id": 801,
    "name": "Shariatpur District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "84",
    "iso2": "62",
    "latitude": 23.2423214,
    "longitude": 90.4347711
  },
  {
    "id": 802,
    "name": "Bahadia",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "84",
    "iso2": "33",
    "latitude": 23.7898712,
    "longitude": 90.1671483
  },
  {
    "id": 803,
    "name": "Chittagong Division",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "84",
    "iso2": "B",
    "latitude": 23.1793157,
    "longitude": 91.9881527
  },
  {
    "id": 804,
    "name": "Thakurgaon District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "84",
    "iso2": "64",
    "latitude": 26.0418392,
    "longitude": 88.4282616
  },
  {
    "id": 805,
    "name": "Habiganj District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "84",
    "iso2": "20",
    "latitude": 24.4771236,
    "longitude": 91.4506565
  },
  {
    "id": 806,
    "name": "Joypurhat District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "84",
    "iso2": "24",
    "latitude": 25.0947349,
    "longitude": 89.0944937
  },
  {
    "id": 807,
    "name": "Barisal Division",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "85",
    "iso2": "A",
    "latitude": 22.3811131,
    "longitude": 90.3371889
  },
  {
    "id": 808,
    "name": "Jamalpur District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "85",
    "iso2": "21",
    "latitude": 25.0830926,
    "longitude": 89.7853218
  },
  {
    "id": 809,
    "name": "Rangamati Hill District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "85",
    "iso2": "56",
    "latitude": 22.7324173,
    "longitude": 92.2985134
  },
  {
    "id": 810,
    "name": "Brahmanbaria District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "85",
    "iso2": "04",
    "latitude": 23.9608181,
    "longitude": 91.1115014
  },
  {
    "id": 811,
    "name": "Khulna District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "82",
    "iso2": "27",
    "latitude": 22.6737735,
    "longitude": 89.3966581
  },
  {
    "id": 812,
    "name": "Sunamganj District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "82",
    "iso2": "61",
    "latitude": 25.0714535,
    "longitude": 91.3991627
  },
  {
    "id": 813,
    "name": "Rajshahi District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "83",
    "iso2": "54",
    "latitude": 24.3733087,
    "longitude": 88.6048716
  },
  {
    "id": 814,
    "name": "Naogaon District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "83",
    "iso2": "48",
    "latitude": 24.9131597,
    "longitude": 88.7530952
  },
  {
    "id": 815,
    "name": "Noakhali District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "83",
    "iso2": "47",
    "latitude": 22.8723789,
    "longitude": 91.0973184
  },
  {
    "id": 816,
    "name": "Feni District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "83",
    "iso2": "16",
    "latitude": 22.9408784,
    "longitude": 91.4066646
  },
  {
    "id": 817,
    "name": "Madaripur District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "83",
    "iso2": "36",
    "latitude": 23.2393346,
    "longitude": 90.1869644
  },
  {
    "id": 818,
    "name": "Barisal District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "85",
    "iso2": "06",
    "latitude": 22.7022098,
    "longitude": 90.3696316
  },
  {
    "id": 819,
    "name": "Lakshmipur District",
    "countryId": 19,
    "countryCode": "BD",
    "fipsCode": "85",
    "iso2": "31",
    "latitude": 22.9446744,
    "longitude": 90.8281907
  },
  {
    "id": 820,
    "name": "Okayama Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "31",
    "iso2": "33",
    "latitude": 34.8963407,
    "longitude": 133.6375314
  },
  {
    "id": 821,
    "name": "Chiba Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "04",
    "iso2": "12",
    "latitude": 35.3354155,
    "longitude": 140.1832516
  },
  {
    "id": 822,
    "name": "Ōita Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "30",
    "iso2": "44",
    "latitude": 33.1589299,
    "longitude": 131.3611121
  },
  {
    "id": 823,
    "name": "Tokyo",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "40",
    "iso2": "13",
    "latitude": 35.6761919,
    "longitude": 139.6503106
  },
  {
    "id": 824,
    "name": "Nara Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "28",
    "iso2": "29",
    "latitude": 34.2975528,
    "longitude": 135.8279734
  },
  {
    "id": 825,
    "name": "Shizuoka Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "37",
    "iso2": "22",
    "latitude": 35.0929397,
    "longitude": 138.3190276
  },
  {
    "id": 826,
    "name": "Shimane Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "36",
    "iso2": "32",
    "latitude": 35.1244094,
    "longitude": 132.6293446
  },
  {
    "id": 827,
    "name": "Aichi Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "01",
    "iso2": "23",
    "latitude": 35.0182505,
    "longitude": 137.2923893
  },
  {
    "id": 828,
    "name": "Hiroshima Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "11",
    "iso2": "34",
    "latitude": 34.8823408,
    "longitude": 133.0194897
  },
  {
    "id": 829,
    "name": "Akita Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "02",
    "iso2": "05",
    "latitude": 40.1376293,
    "longitude": 140.334341
  },
  {
    "id": 830,
    "name": "Ishikawa Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "15",
    "iso2": "17",
    "latitude": 36.3260317,
    "longitude": 136.5289653
  },
  {
    "id": 831,
    "name": "Hyōgo Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "13",
    "iso2": "28",
    "latitude": 34.8579518,
    "longitude": 134.5453787
  },
  {
    "id": 832,
    "name": "Hokkaidō Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "12",
    "iso2": "01",
    "latitude": 43.2203266,
    "longitude": 142.8634737
  },
  {
    "id": 833,
    "name": "Mie Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "23",
    "iso2": "24",
    "latitude": 33.8143901,
    "longitude": 136.0487047
  },
  {
    "id": 834,
    "name": "Kyōto Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "22",
    "iso2": "26",
    "latitude": 35.1566609,
    "longitude": 135.5251982
  },
  {
    "id": 835,
    "name": "Yamaguchi Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "45",
    "iso2": "35",
    "latitude": 34.2796769,
    "longitude": 131.5212742
  },
  {
    "id": 836,
    "name": "Tokushima Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "39",
    "iso2": "36",
    "latitude": 33.9419655,
    "longitude": 134.3236557
  },
  {
    "id": 837,
    "name": "Yamagata Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "44",
    "iso2": "06",
    "latitude": 38.5370564,
    "longitude": 140.1435198
  },
  {
    "id": 838,
    "name": "Toyama Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "42",
    "iso2": "16",
    "latitude": 36.6958266,
    "longitude": 137.2137071
  },
  {
    "id": 839,
    "name": "Aomori Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "03",
    "iso2": "02",
    "latitude": 40.7657077,
    "longitude": 140.9175879
  },
  {
    "id": 840,
    "name": "Kagoshima Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "18",
    "iso2": "46",
    "latitude": 31.3911958,
    "longitude": 130.8778586
  },
  {
    "id": 841,
    "name": "Niigata Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "29",
    "iso2": "15",
    "latitude": 37.5178386,
    "longitude": 138.9269794
  },
  {
    "id": 842,
    "name": "Kanagawa Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "19",
    "iso2": "14",
    "latitude": 35.4913535,
    "longitude": 139.284143
  },
  {
    "id": 843,
    "name": "Nagano Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "26",
    "iso2": "20",
    "latitude": 36.1543941,
    "longitude": 137.9218204
  },
  {
    "id": 844,
    "name": "Wakayama Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "43",
    "iso2": "30",
    "latitude": 33.9480914,
    "longitude": 135.3745358
  },
  {
    "id": 845,
    "name": "Shiga Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "35",
    "iso2": "25",
    "latitude": 35.3292014,
    "longitude": 136.0563212
  },
  {
    "id": 846,
    "name": "Kumamoto Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "21",
    "iso2": "43",
    "latitude": 32.8594427,
    "longitude": 130.7969149
  },
  {
    "id": 847,
    "name": "Fukushima Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "08",
    "iso2": "07",
    "latitude": 37.3834373,
    "longitude": 140.1832516
  },
  {
    "id": 848,
    "name": "Fukui Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "06",
    "iso2": "18",
    "latitude": 35.896227,
    "longitude": 136.2111579
  },
  {
    "id": 849,
    "name": "Nagasaki Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "27",
    "iso2": "42",
    "latitude": 33.2488525,
    "longitude": 129.6930912
  },
  {
    "id": 850,
    "name": "Tottori Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "41",
    "iso2": "31",
    "latitude": 35.3573161,
    "longitude": 133.4066618
  },
  {
    "id": 851,
    "name": "Ibaraki Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "14",
    "iso2": "08",
    "latitude": 36.2193571,
    "longitude": 140.1832516
  },
  {
    "id": 852,
    "name": "Yamanashi Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "46",
    "iso2": "19",
    "latitude": 35.6635113,
    "longitude": 138.6388879
  },
  {
    "id": 853,
    "name": "Okinawa Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "47",
    "iso2": "47",
    "latitude": 26.1201911,
    "longitude": 127.7025012
  },
  {
    "id": 854,
    "name": "Tochigi Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "38",
    "iso2": "09",
    "latitude": 36.6714739,
    "longitude": 139.8547266
  },
  {
    "id": 855,
    "name": "Miyazaki Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "25",
    "iso2": "45",
    "latitude": 32.6036022,
    "longitude": 131.441251
  },
  {
    "id": 856,
    "name": "Iwate Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "16",
    "iso2": "03",
    "latitude": 39.5832989,
    "longitude": 141.2534574
  },
  {
    "id": 857,
    "name": "Miyagi Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "24",
    "iso2": "04",
    "latitude": 38.630612,
    "longitude": 141.1193048
  },
  {
    "id": 858,
    "name": "Gifu Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "09",
    "iso2": "21",
    "latitude": 35.7437491,
    "longitude": 136.9805103
  },
  {
    "id": 859,
    "name": "Ōsaka Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "32",
    "iso2": "27",
    "latitude": 34.6413315,
    "longitude": 135.5629394
  },
  {
    "id": 860,
    "name": "Saitama Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "34",
    "iso2": "11",
    "latitude": 35.9962513,
    "longitude": 139.4466005
  },
  {
    "id": 861,
    "name": "Fukuoka Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "07",
    "iso2": "40",
    "latitude": 33.5662559,
    "longitude": 130.715857
  },
  {
    "id": 862,
    "name": "Gunma Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "10",
    "iso2": "10",
    "latitude": 36.5605388,
    "longitude": 138.8799972
  },
  {
    "id": 863,
    "name": "Saga Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "33",
    "iso2": "41",
    "latitude": 33.3078371,
    "longitude": 130.2271243
  },
  {
    "id": 864,
    "name": "Kagawa Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "17",
    "iso2": "37",
    "latitude": 34.2225915,
    "longitude": 134.0199152
  },
  {
    "id": 865,
    "name": "Ehime Prefecture",
    "countryId": 109,
    "countryCode": "JP",
    "fipsCode": "05",
    "iso2": "38",
    "latitude": 33.6025306,
    "longitude": 132.7857583
  },
  {
    "id": 866,
    "name": "Ontario",
    "countryId": 39,
    "countryCode": "CA",
    "fipsCode": "08",
    "iso2": "ON",
    "latitude": 51.253775,
    "longitude": -85.323214
  },
  {
    "id": 867,
    "name": "Manitoba",
    "countryId": 39,
    "countryCode": "CA",
    "fipsCode": "03",
    "iso2": "MB",
    "latitude": 53.7608608,
    "longitude": -98.8138762
  },
  {
    "id": 868,
    "name": "New Brunswick",
    "countryId": 39,
    "countryCode": "CA",
    "fipsCode": "04",
    "iso2": "NB",
    "latitude": 46.5653163,
    "longitude": -66.4619164
  },
  {
    "id": 869,
    "name": "Yukon",
    "countryId": 39,
    "countryCode": "CA",
    "fipsCode": "12",
    "iso2": "YT",
    "latitude": 35.5067215,
    "longitude": -97.7625441
  },
  {
    "id": 870,
    "name": "Saskatchewan",
    "countryId": 39,
    "countryCode": "CA",
    "fipsCode": "11",
    "iso2": "SK",
    "latitude": 52.9399159,
    "longitude": -106.4508639
  },
  {
    "id": 871,
    "name": "Prince Edward Island",
    "countryId": 39,
    "countryCode": "CA",
    "fipsCode": "09",
    "iso2": "PE",
    "latitude": 46.510712,
    "longitude": -63.4168136
  },
  {
    "id": 872,
    "name": "Alberta",
    "countryId": 39,
    "countryCode": "CA",
    "fipsCode": "01",
    "iso2": "AB",
    "latitude": 53.9332706,
    "longitude": -116.5765035
  },
  {
    "id": 873,
    "name": "Quebec",
    "countryId": 39,
    "countryCode": "CA",
    "fipsCode": "10",
    "iso2": "QC",
    "latitude": 52.9399159,
    "longitude": -73.5491361
  },
  {
    "id": 874,
    "name": "Nova Scotia",
    "countryId": 39,
    "countryCode": "CA",
    "fipsCode": "07",
    "iso2": "NS",
    "latitude": 44.6819866,
    "longitude": -63.744311
  },
  {
    "id": 875,
    "name": "British Columbia",
    "countryId": 39,
    "countryCode": "CA",
    "fipsCode": "02",
    "iso2": "BC",
    "latitude": 53.7266683,
    "longitude": -127.6476205
  },
  {
    "id": 876,
    "name": "Nunavut",
    "countryId": 39,
    "countryCode": "CA",
    "fipsCode": "14",
    "iso2": "NU",
    "latitude": 70.2997711,
    "longitude": -83.107577
  },
  {
    "id": 877,
    "name": "Newfoundland and Labrador",
    "countryId": 39,
    "countryCode": "CA",
    "fipsCode": "05",
    "iso2": "NL",
    "latitude": 53.1355091,
    "longitude": -57.6604364
  },
  {
    "id": 878,
    "name": "Northwest Territories",
    "countryId": 39,
    "countryCode": "CA",
    "fipsCode": "13",
    "iso2": "NT",
    "latitude": 64.8255441,
    "longitude": -124.8457334
  },
  {
    "id": 879,
    "name": "White Nile",
    "countryId": 209,
    "countryCode": "SD",
    "fipsCode": "41",
    "iso2": "NW",
    "latitude": 9.3321516,
    "longitude": 31.46153
  },
  {
    "id": 880,
    "name": "Red Sea",
    "countryId": 209,
    "countryCode": "SD",
    "fipsCode": "36",
    "iso2": "RS",
    "latitude": 20.280232,
    "longitude": 38.512573
  },
  {
    "id": 881,
    "name": "Khartoum",
    "countryId": 209,
    "countryCode": "SD",
    "fipsCode": "29",
    "iso2": "KH",
    "latitude": 15.5006544,
    "longitude": 32.5598994
  },
  {
    "id": 882,
    "name": "Sennar",
    "countryId": 209,
    "countryCode": "SD",
    "fipsCode": "58",
    "iso2": "SI",
    "latitude": 13.567469,
    "longitude": 33.5672045
  },
  {
    "id": 883,
    "name": "South Kordofan",
    "countryId": 209,
    "countryCode": "SD",
    "fipsCode": "50",
    "iso2": "KS",
    "latitude": 11.1990192,
    "longitude": 29.4179324
  },
  {
    "id": 884,
    "name": "Kassala",
    "countryId": 209,
    "countryCode": "SD",
    "fipsCode": "52",
    "iso2": "KA",
    "latitude": 15.4581332,
    "longitude": 36.4039629
  },
  {
    "id": 885,
    "name": "Al Jazirah",
    "countryId": 209,
    "countryCode": "SD",
    "fipsCode": "38",
    "iso2": "GZ",
    "latitude": 14.8859611,
    "longitude": 33.438353
  },
  {
    "id": 886,
    "name": "Al Qadarif",
    "countryId": 209,
    "countryCode": "SD",
    "fipsCode": "39",
    "iso2": "GD",
    "latitude": 14.024307,
    "longitude": 35.3685679
  },
  {
    "id": 887,
    "name": "Blue Nile",
    "countryId": 209,
    "countryCode": "SD",
    "fipsCode": "42",
    "iso2": "NB",
    "latitude": 47.598673,
    "longitude": -122.334419
  },
  {
    "id": 888,
    "name": "West Darfur",
    "countryId": 209,
    "countryCode": "SD",
    "fipsCode": "47",
    "iso2": "DW",
    "latitude": 12.8463561,
    "longitude": 23.0011989
  },
  {
    "id": 889,
    "name": "West Kordofan",
    "countryId": 209,
    "countryCode": "SD",
    "fipsCode": "62",
    "iso2": "GK",
    "latitude": 11.1990192,
    "longitude": 29.4179324
  },
  {
    "id": 890,
    "name": "North Darfur",
    "countryId": 209,
    "countryCode": "SD",
    "fipsCode": "55",
    "iso2": "DN",
    "latitude": 15.7661969,
    "longitude": 24.9042208
  },
  {
    "id": 891,
    "name": "River Nile",
    "countryId": 209,
    "countryCode": "SD",
    "fipsCode": "53",
    "iso2": "NR",
    "latitude": 23.9727595,
    "longitude": 32.8749206
  },
  {
    "id": 892,
    "name": "East Darfur",
    "countryId": 209,
    "countryCode": "SD",
    "fipsCode": "60",
    "iso2": "DE",
    "latitude": 14.3782747,
    "longitude": 24.9042208
  },
  {
    "id": 893,
    "name": "North Kordofan",
    "countryId": 209,
    "countryCode": "SD",
    "fipsCode": "56",
    "iso2": "KN",
    "latitude": 13.8306441,
    "longitude": 29.4179324
  },
  {
    "id": 894,
    "name": "South Darfur",
    "countryId": 209,
    "countryCode": "SD",
    "fipsCode": "49",
    "iso2": "DS",
    "latitude": 11.6488639,
    "longitude": 24.9042208
  },
  {
    "id": 895,
    "name": "Northern",
    "countryId": 209,
    "countryCode": "SD",
    "fipsCode": "43",
    "iso2": "NO",
    "latitude": 38.063817,
    "longitude": -84.4628648
  },
  {
    "id": 896,
    "name": "Central Darfur",
    "countryId": 209,
    "countryCode": "SD",
    "fipsCode": "61",
    "iso2": "DC",
    "latitude": 14.3782747,
    "longitude": 24.9042208
  },
  {
    "id": 897,
    "name": "Khelvachauri Municipality",
    "countryId": 81,
    "countryCode": "GE",
    "fipsCode": "61",
    "iso2": "29",
    "latitude": 41.5801926,
    "longitude": 41.6610742
  },
  {
    "id": 898,
    "name": "Senaki Municipality",
    "countryId": 81,
    "countryCode": "GE",
    "fipsCode": "49",
    "iso2": "50",
    "latitude": 42.269636,
    "longitude": 42.0656896
  },
  {
    "id": 899,
    "name": "Tbilisi",
    "countryId": 81,
    "countryCode": "GE",
    "fipsCode": "51",
    "iso2": "TB",
    "latitude": 41.7151377,
    "longitude": 44.827096
  },
  {
    "id": 900,
    "name": "Adjara",
    "countryId": 81,
    "countryCode": "GE",
    "fipsCode": "04",
    "iso2": "AJ",
    "latitude": 41.6005626,
    "longitude": 42.0688383
  },
  {
    "id": 901,
    "name": "Autonomous Republic of Abkhazia",
    "countryId": 81,
    "countryCode": "GE",
    "fipsCode": "02",
    "iso2": "AB",
    "latitude": 43.0015544,
    "longitude": 41.023407
  },
  {
    "id": 902,
    "name": "Mtskheta-Mtianeti",
    "countryId": 81,
    "countryCode": "GE",
    "fipsCode": "69",
    "iso2": "MM",
    "latitude": 42.1682185,
    "longitude": 44.6506058
  },
  {
    "id": 903,
    "name": "Shida Kartli",
    "countryId": 81,
    "countryCode": "GE",
    "fipsCode": "73",
    "iso2": "SK",
    "latitude": 42.0756944,
    "longitude": 43.9540462
  },
  {
    "id": 904,
    "name": "Kvemo Kartli",
    "countryId": 81,
    "countryCode": "GE",
    "fipsCode": "68",
    "iso2": "KK",
    "latitude": 41.4791833,
    "longitude": 44.6560451
  },
  {
    "id": 905,
    "name": "Imereti",
    "countryId": 81,
    "countryCode": "GE",
    "fipsCode": "66",
    "iso2": "IM",
    "latitude": 42.230108,
    "longitude": 42.9008664
  },
  {
    "id": 906,
    "name": "Samtskhe-Javakheti",
    "countryId": 81,
    "countryCode": "GE",
    "fipsCode": "72",
    "iso2": "SJ",
    "latitude": 41.5479296,
    "longitude": 43.27764
  },
  {
    "id": 907,
    "name": "Guria",
    "countryId": 81,
    "countryCode": "GE",
    "fipsCode": "65",
    "iso2": "GU",
    "latitude": 41.9442736,
    "longitude": 42.0458091
  },
  {
    "id": 908,
    "name": "Samegrelo-Zemo Svaneti",
    "countryId": 81,
    "countryCode": "GE",
    "fipsCode": "71",
    "iso2": "SZ",
    "latitude": 42.7352247,
    "longitude": 42.1689362
  },
  {
    "id": 909,
    "name": "Racha-Lechkhumi and Kvemo Svaneti",
    "countryId": 81,
    "countryCode": "GE",
    "fipsCode": "70",
    "iso2": "RL",
    "latitude": 42.6718873,
    "longitude": 43.0562836
  },
  {
    "id": 910,
    "name": "Kakheti",
    "countryId": 81,
    "countryCode": "GE",
    "fipsCode": "67",
    "iso2": "KA",
    "latitude": 41.6481602,
    "longitude": 45.6905554
  },
  {
    "id": 911,
    "name": "Northern Province",
    "countryId": 198,
    "countryCode": "SL",
    "fipsCode": "02",
    "iso2": "N",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 912,
    "name": "Southern Province",
    "countryId": 198,
    "countryCode": "SL",
    "fipsCode": "03",
    "iso2": "S",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 913,
    "name": "Western Area",
    "countryId": 198,
    "countryCode": "SL",
    "fipsCode": "04",
    "iso2": "W",
    "latitude": 40.2545969,
    "longitude": -80.2455444
  },
  {
    "id": 914,
    "name": "Eastern Province",
    "countryId": 198,
    "countryCode": "SL",
    "fipsCode": "01",
    "iso2": "E",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 915,
    "name": "Hiran",
    "countryId": 203,
    "countryCode": "SO",
    "fipsCode": "07",
    "iso2": "HI",
    "latitude": 4.321015,
    "longitude": 45.2993862
  },
  {
    "id": 916,
    "name": "Mudug",
    "countryId": 203,
    "countryCode": "SO",
    "fipsCode": "10",
    "iso2": "MU",
    "latitude": 6.5656726,
    "longitude": 47.7637565
  },
  {
    "id": 917,
    "name": "Bakool",
    "countryId": 203,
    "countryCode": "SO",
    "fipsCode": "01",
    "iso2": "BK",
    "latitude": 4.3657221,
    "longitude": 44.0960311
  },
  {
    "id": 918,
    "name": "Galguduud",
    "countryId": 203,
    "countryCode": "SO",
    "fipsCode": "05",
    "iso2": "GA",
    "latitude": 5.1850128,
    "longitude": 46.8252838
  },
  {
    "id": 919,
    "name": "Sanaag Region",
    "countryId": 203,
    "countryCode": "SO",
    "fipsCode": "12",
    "iso2": "SA",
    "latitude": 10.3938218,
    "longitude": 47.7637565
  },
  {
    "id": 920,
    "name": "Nugal",
    "countryId": 203,
    "countryCode": "SO",
    "fipsCode": "18",
    "iso2": "NU",
    "latitude": 43.2793861,
    "longitude": 17.0339205
  },
  {
    "id": 921,
    "name": "Lower Shebelle",
    "countryId": 203,
    "countryCode": "SO",
    "fipsCode": "14",
    "iso2": "SH",
    "latitude": 1.8766458,
    "longitude": 44.2479015
  },
  {
    "id": 922,
    "name": "Middle Juba",
    "countryId": 203,
    "countryCode": "SO",
    "fipsCode": "08",
    "iso2": "JD",
    "latitude": 2.0780488,
    "longitude": 41.6011814
  },
  {
    "id": 923,
    "name": "Middle Shebelle",
    "countryId": 203,
    "countryCode": "SO",
    "fipsCode": "13",
    "iso2": "SD",
    "latitude": 2.9250247,
    "longitude": 45.9039689
  },
  {
    "id": 924,
    "name": "Lower Juba",
    "countryId": 203,
    "countryCode": "SO",
    "fipsCode": "09",
    "iso2": "JH",
    "latitude": 0.224021,
    "longitude": 41.6011814
  },
  {
    "id": 925,
    "name": "Awdal Region",
    "countryId": 203,
    "countryCode": "SO",
    "fipsCode": "21",
    "iso2": "AW",
    "latitude": 10.6334285,
    "longitude": 43.329466
  },
  {
    "id": 926,
    "name": "Bay",
    "countryId": 203,
    "countryCode": "SO",
    "fipsCode": "04",
    "iso2": "BY",
    "latitude": 37.0365534,
    "longitude": -95.6174767
  },
  {
    "id": 927,
    "name": "Banaadir",
    "countryId": 203,
    "countryCode": "SO",
    "fipsCode": "02",
    "iso2": "BN",
    "latitude": 2.1187375,
    "longitude": 45.3369459
  },
  {
    "id": 928,
    "name": "Gedo",
    "countryId": 203,
    "countryCode": "SO",
    "fipsCode": "06",
    "iso2": "GE",
    "latitude": 3.5039227,
    "longitude": 42.2362435
  },
  {
    "id": 929,
    "name": "Togdheer Region",
    "countryId": 203,
    "countryCode": "SO",
    "fipsCode": "19",
    "iso2": "TO",
    "latitude": 9.4460587,
    "longitude": 45.2993862
  },
  {
    "id": 930,
    "name": "Bari",
    "countryId": 203,
    "countryCode": "SO",
    "fipsCode": "03",
    "iso2": "BR",
    "latitude": 41.1171432,
    "longitude": 16.8718715
  },
  {
    "id": 931,
    "name": "Northern Cape",
    "countryId": 204,
    "countryCode": "ZA",
    "fipsCode": "08",
    "iso2": "NC",
    "latitude": -29.0466808,
    "longitude": 21.8568586
  },
  {
    "id": 932,
    "name": "Free State",
    "countryId": 204,
    "countryCode": "ZA",
    "fipsCode": "03",
    "iso2": "FS",
    "latitude": 37.6858525,
    "longitude": -97.2811256
  },
  {
    "id": 933,
    "name": "Limpopo",
    "countryId": 204,
    "countryCode": "ZA",
    "fipsCode": "09",
    "iso2": "LP",
    "latitude": -23.4012946,
    "longitude": 29.4179324
  },
  {
    "id": 934,
    "name": "North West",
    "countryId": 204,
    "countryCode": "ZA",
    "fipsCode": "10",
    "iso2": "NW",
    "latitude": 32.758852,
    "longitude": -97.328806
  },
  {
    "id": 935,
    "name": "KwaZulu-Natal",
    "countryId": 204,
    "countryCode": "ZA",
    "fipsCode": "02",
    "iso2": "KZN",
    "latitude": -28.5305539,
    "longitude": 30.8958242
  },
  {
    "id": 936,
    "name": "Gauteng",
    "countryId": 204,
    "countryCode": "ZA",
    "fipsCode": "06",
    "iso2": "GP",
    "latitude": -26.2707593,
    "longitude": 28.1122679
  },
  {
    "id": 937,
    "name": "Mpumalanga",
    "countryId": 204,
    "countryCode": "ZA",
    "fipsCode": "07",
    "iso2": "MP",
    "latitude": -25.565336,
    "longitude": 30.5279096
  },
  {
    "id": 938,
    "name": "Eastern Cape",
    "countryId": 204,
    "countryCode": "ZA",
    "fipsCode": "05",
    "iso2": "EC",
    "latitude": -32.2968402,
    "longitude": 26.419389
  },
  {
    "id": 939,
    "name": "Western Cape",
    "countryId": 204,
    "countryCode": "ZA",
    "fipsCode": "11",
    "iso2": "WC",
    "latitude": -33.2277918,
    "longitude": 21.8568586
  },
  {
    "id": 940,
    "name": "Chontales Department",
    "countryId": 159,
    "countryCode": "NI",
    "fipsCode": "04",
    "iso2": "CO",
    "latitude": 11.9394717,
    "longitude": -85.1894045
  },
  {
    "id": 941,
    "name": "Managua Department",
    "countryId": 159,
    "countryCode": "NI",
    "fipsCode": "10",
    "iso2": "MN",
    "latitude": 12.1391699,
    "longitude": -86.3376761
  },
  {
    "id": 942,
    "name": "Rivas Department",
    "countryId": 159,
    "countryCode": "NI",
    "fipsCode": "15",
    "iso2": "RI",
    "latitude": 11.402349,
    "longitude": -85.684578
  },
  {
    "id": 943,
    "name": "Granada Department",
    "countryId": 159,
    "countryCode": "NI",
    "fipsCode": "06",
    "iso2": "GR",
    "latitude": 11.9344073,
    "longitude": -85.9560005
  },
  {
    "id": 944,
    "name": "León Department",
    "countryId": 159,
    "countryCode": "NI",
    "fipsCode": "08",
    "iso2": "LE",
    "latitude": 12.5092037,
    "longitude": -86.6611083
  },
  {
    "id": 945,
    "name": "Estelí Department",
    "countryId": 159,
    "countryCode": "NI",
    "fipsCode": "05",
    "iso2": "ES",
    "latitude": 13.0851139,
    "longitude": -86.3630197
  },
  {
    "id": 946,
    "name": "Boaco Department",
    "countryId": 159,
    "countryCode": "NI",
    "fipsCode": "01",
    "iso2": "BO",
    "latitude": 12.469284,
    "longitude": -85.6614682
  },
  {
    "id": 947,
    "name": "Matagalpa Department",
    "countryId": 159,
    "countryCode": "NI",
    "fipsCode": "12",
    "iso2": "MT",
    "latitude": 12.9498436,
    "longitude": -85.4375574
  },
  {
    "id": 948,
    "name": "Madriz Department",
    "countryId": 159,
    "countryCode": "NI",
    "fipsCode": "09",
    "iso2": "MD",
    "latitude": 13.4726005,
    "longitude": -86.4592091
  },
  {
    "id": 949,
    "name": "Río San Juan Department",
    "countryId": 159,
    "countryCode": "NI",
    "fipsCode": "14",
    "iso2": "SJ",
    "latitude": 11.478161,
    "longitude": -84.7733325
  },
  {
    "id": 950,
    "name": "Carazo Department",
    "countryId": 159,
    "countryCode": "NI",
    "fipsCode": "02",
    "iso2": "CA",
    "latitude": 11.7274729,
    "longitude": -86.2158497
  },
  {
    "id": 951,
    "name": "North Caribbean Coast Autonomous Region",
    "countryId": 159,
    "countryCode": "NI",
    "fipsCode": "17",
    "iso2": "AN",
    "latitude": 13.8394456,
    "longitude": -83.9320806
  },
  {
    "id": 952,
    "name": "South Caribbean Coast Autonomous Region",
    "countryId": 159,
    "countryCode": "NI",
    "fipsCode": "18",
    "iso2": "AS",
    "latitude": 12.1918502,
    "longitude": -84.1012861
  },
  {
    "id": 953,
    "name": "Masaya Department",
    "countryId": 159,
    "countryCode": "NI",
    "fipsCode": "11",
    "iso2": "MS",
    "latitude": 11.9759328,
    "longitude": -86.0733498
  },
  {
    "id": 954,
    "name": "Chinandega Department",
    "countryId": 159,
    "countryCode": "NI",
    "fipsCode": "03",
    "iso2": "CI",
    "latitude": 12.8820062,
    "longitude": -87.1422895
  },
  {
    "id": 955,
    "name": "Jinotega Department",
    "countryId": 159,
    "countryCode": "NI",
    "fipsCode": "07",
    "iso2": "JI",
    "latitude": 13.0883907,
    "longitude": -85.9993997
  },
  {
    "id": 956,
    "name": "Karak Governorate",
    "countryId": 111,
    "countryCode": "JO",
    "fipsCode": "09",
    "iso2": "KA",
    "latitude": 31.1853527,
    "longitude": 35.7047682
  },
  {
    "id": 957,
    "name": "Tafilah Governorate",
    "countryId": 111,
    "countryCode": "JO",
    "fipsCode": "12",
    "iso2": "AT",
    "latitude": 30.8338063,
    "longitude": 35.6160513
  },
  {
    "id": 958,
    "name": "Madaba Governorate",
    "countryId": 111,
    "countryCode": "JO",
    "fipsCode": "23",
    "iso2": "MD",
    "latitude": 31.7196097,
    "longitude": 35.7932754
  },
  {
    "id": 959,
    "name": "Aqaba Governorate",
    "countryId": 111,
    "countryCode": "JO",
    "fipsCode": "21",
    "iso2": "AQ",
    "latitude": 29.532086,
    "longitude": 35.0062821
  },
  {
    "id": 960,
    "name": "Irbid Governorate",
    "countryId": 111,
    "countryCode": "JO",
    "fipsCode": "18",
    "iso2": "IR",
    "latitude": 32.5569636,
    "longitude": 35.8478965
  },
  {
    "id": 961,
    "name": "Balqa Governorate",
    "countryId": 111,
    "countryCode": "JO",
    "fipsCode": "02",
    "iso2": "BA",
    "latitude": 32.0366806,
    "longitude": 35.728848
  },
  {
    "id": 962,
    "name": "Mafraq Governorate",
    "countryId": 111,
    "countryCode": "JO",
    "fipsCode": "15",
    "iso2": "MA",
    "latitude": 32.3416923,
    "longitude": 36.2020175
  },
  {
    "id": 963,
    "name": "Ajloun Governorate",
    "countryId": 111,
    "countryCode": "JO",
    "fipsCode": "20",
    "iso2": "AJ",
    "latitude": 32.3325584,
    "longitude": 35.7516844
  },
  {
    "id": 964,
    "name": "Ma\"an Governorate",
    "countryId": 111,
    "countryCode": "JO",
    "fipsCode": "19",
    "iso2": "MN",
    "latitude": 30.1926789,
    "longitude": 35.7249319
  },
  {
    "id": 965,
    "name": "Amman Governorate",
    "countryId": 111,
    "countryCode": "JO",
    "fipsCode": "16",
    "iso2": "AM",
    "latitude": 31.9453633,
    "longitude": 35.9283895
  },
  {
    "id": 966,
    "name": "Jerash Governorate",
    "countryId": 111,
    "countryCode": "JO",
    "fipsCode": "22",
    "iso2": "JA",
    "latitude": 32.2747237,
    "longitude": 35.8960954
  },
  {
    "id": 967,
    "name": "Zarqa Governorate",
    "countryId": 111,
    "countryCode": "JO",
    "fipsCode": "17",
    "iso2": "AZ",
    "latitude": 32.0608505,
    "longitude": 36.0942121
  },
  {
    "id": 968,
    "name": "Manzini District",
    "countryId": 212,
    "countryCode": "SZ",
    "fipsCode": "03",
    "iso2": "MA",
    "latitude": -26.5081999,
    "longitude": 31.3713164
  },
  {
    "id": 969,
    "name": "Hhohho District",
    "countryId": 212,
    "countryCode": "SZ",
    "fipsCode": "01",
    "iso2": "HH",
    "latitude": -26.1365662,
    "longitude": 31.3541631
  },
  {
    "id": 970,
    "name": "Lubombo District",
    "countryId": 212,
    "countryCode": "SZ",
    "fipsCode": "02",
    "iso2": "LU",
    "latitude": -26.7851773,
    "longitude": 31.8107079
  },
  {
    "id": 971,
    "name": "Shiselweni District",
    "countryId": 212,
    "countryCode": "SZ",
    "fipsCode": "04",
    "iso2": "SH",
    "latitude": -26.9827577,
    "longitude": 31.3541631
  },
  {
    "id": 972,
    "name": "Al Jahra Governorate",
    "countryId": 117,
    "countryCode": "KW",
    "fipsCode": "05",
    "iso2": "JA",
    "latitude": 29.9931831,
    "longitude": 47.7634731
  },
  {
    "id": 973,
    "name": "Hawalli Governorate",
    "countryId": 117,
    "countryCode": "KW",
    "fipsCode": "08",
    "iso2": "HA",
    "latitude": 29.3056716,
    "longitude": 48.0307613
  },
  {
    "id": 974,
    "name": "Mubarak Al-Kabeer Governorate",
    "countryId": 117,
    "countryCode": "KW",
    "fipsCode": "09",
    "iso2": "MU",
    "latitude": 29.21224,
    "longitude": 48.0605108
  },
  {
    "id": 975,
    "name": "Al Farwaniyah Governorate",
    "countryId": 117,
    "countryCode": "KW",
    "fipsCode": "07",
    "iso2": "FA",
    "latitude": 29.273357,
    "longitude": 47.9400154
  },
  {
    "id": 976,
    "name": "Capital Governorate",
    "countryId": 117,
    "countryCode": "KW",
    "fipsCode": "02",
    "iso2": "KU",
    "latitude": 26.2285161,
    "longitude": 50.5860497
  },
  {
    "id": 977,
    "name": "Al Ahmadi Governorate",
    "countryId": 117,
    "countryCode": "KW",
    "fipsCode": "04",
    "iso2": "AH",
    "latitude": 28.5745125,
    "longitude": 48.1024743
  },
  {
    "id": 978,
    "name": "Luang Prabang Province",
    "countryId": 119,
    "countryCode": "LA",
    "fipsCode": "17",
    "iso2": "LP",
    "latitude": 20.0656229,
    "longitude": 102.6216211
  },
  {
    "id": 979,
    "name": "Vientiane Prefecture",
    "countryId": 119,
    "countryCode": "LA",
    "fipsCode": "24",
    "iso2": "VT",
    "latitude": 18.110541,
    "longitude": 102.5298028
  },
  {
    "id": 980,
    "name": "Vientiane Province",
    "countryId": 119,
    "countryCode": "LA",
    "fipsCode": "27",
    "iso2": "VI",
    "latitude": 18.5705063,
    "longitude": 102.6216211
  },
  {
    "id": 981,
    "name": "Salavan Province",
    "countryId": 119,
    "countryCode": "LA",
    "fipsCode": "19",
    "iso2": "SL",
    "latitude": 15.8171073,
    "longitude": 106.2522143
  },
  {
    "id": 982,
    "name": "Attapeu Province",
    "countryId": 119,
    "countryCode": "LA",
    "fipsCode": "01",
    "iso2": "AT",
    "latitude": 14.93634,
    "longitude": 107.1011931
  },
  {
    "id": 983,
    "name": "Xaisomboun Province",
    "countryId": 119,
    "countryCode": "LA",
    "fipsCode": "28",
    "iso2": "XS",
    "latitude": 18.4362924,
    "longitude": 104.4723301
  },
  {
    "id": 984,
    "name": "Sekong Province",
    "countryId": 119,
    "countryCode": "LA",
    "fipsCode": "26",
    "iso2": "XE",
    "latitude": 15.5767446,
    "longitude": 107.0067031
  },
  {
    "id": 985,
    "name": "Bolikhamsai Province",
    "countryId": 119,
    "countryCode": "LA",
    "fipsCode": "23",
    "iso2": "BL",
    "latitude": 18.4362924,
    "longitude": 104.4723301
  },
  {
    "id": 986,
    "name": "Khammouane Province",
    "countryId": 119,
    "countryCode": "LA",
    "fipsCode": "15",
    "iso2": "KH",
    "latitude": 17.6384066,
    "longitude": 105.2194808
  },
  {
    "id": 987,
    "name": "Phongsaly Province",
    "countryId": 119,
    "countryCode": "LA",
    "fipsCode": "18",
    "iso2": "PH",
    "latitude": 21.5919377,
    "longitude": 102.2547919
  },
  {
    "id": 988,
    "name": "Oudomxay Province",
    "countryId": 119,
    "countryCode": "LA",
    "fipsCode": "07",
    "iso2": "OU",
    "latitude": 20.4921929,
    "longitude": 101.8891721
  },
  {
    "id": 989,
    "name": "Houaphanh Province",
    "countryId": 119,
    "countryCode": "LA",
    "fipsCode": "03",
    "iso2": "HO",
    "latitude": 20.3254175,
    "longitude": 104.1001326
  },
  {
    "id": 990,
    "name": "Savannakhet Province",
    "countryId": 119,
    "countryCode": "LA",
    "fipsCode": "20",
    "iso2": "SV",
    "latitude": 16.5065381,
    "longitude": 105.5943388
  },
  {
    "id": 991,
    "name": "Bokeo Province",
    "countryId": 119,
    "countryCode": "LA",
    "fipsCode": "22",
    "iso2": "BK",
    "latitude": 20.2872662,
    "longitude": 100.7097867
  },
  {
    "id": 992,
    "name": "Luang Namtha Province",
    "countryId": 119,
    "countryCode": "LA",
    "fipsCode": "16",
    "iso2": "LM",
    "latitude": 20.9170187,
    "longitude": 101.1617356
  },
  {
    "id": 993,
    "name": "Sainyabuli Province",
    "countryId": 119,
    "countryCode": "LA",
    "fipsCode": "13",
    "iso2": "XA",
    "latitude": 19.3907886,
    "longitude": 101.5248055
  },
  {
    "id": 994,
    "name": "Xaisomboun",
    "countryId": 119,
    "countryCode": "LA",
    "fipsCode": "25",
    "iso2": "XN",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 995,
    "name": "Xiangkhouang Province",
    "countryId": 119,
    "countryCode": "LA",
    "fipsCode": "14",
    "iso2": "XI",
    "latitude": 19.6093003,
    "longitude": 103.7289167
  },
  {
    "id": 996,
    "name": "Champasak Province",
    "countryId": 119,
    "countryCode": "LA",
    "fipsCode": "02",
    "iso2": "CH",
    "latitude": 14.6578664,
    "longitude": 105.9699878
  },
  {
    "id": 997,
    "name": "Talas Region",
    "countryId": 118,
    "countryCode": "KG",
    "fipsCode": "06",
    "iso2": "T",
    "latitude": 42.2867339,
    "longitude": 72.5204827
  },
  {
    "id": 998,
    "name": "Batken Region",
    "countryId": 118,
    "countryCode": "KG",
    "fipsCode": "09",
    "iso2": "B",
    "latitude": 39.9721425,
    "longitude": 69.8597406
  },
  {
    "id": 999,
    "name": "Naryn Region",
    "countryId": 118,
    "countryCode": "KG",
    "fipsCode": "04",
    "iso2": "N",
    "latitude": 41.2943227,
    "longitude": 75.3412179
  },
  {
    "id": 1000,
    "name": "Jalal-Abad Region",
    "countryId": 118,
    "countryCode": "KG",
    "fipsCode": "03",
    "iso2": "J",
    "latitude": 41.106808,
    "longitude": 72.8988069
  },
  {
    "id": 1001,
    "name": "Bishkek",
    "countryId": 118,
    "countryCode": "KG",
    "fipsCode": "01",
    "iso2": "GB",
    "latitude": 42.8746212,
    "longitude": 74.5697617
  },
  {
    "id": 1002,
    "name": "Issyk-Kul Region",
    "countryId": 118,
    "countryCode": "KG",
    "fipsCode": "07",
    "iso2": "Y",
    "latitude": 42.1859428,
    "longitude": 77.5619419
  },
  {
    "id": 1003,
    "name": "Osh",
    "countryId": 118,
    "countryCode": "KG",
    "fipsCode": "08",
    "iso2": "GO",
    "latitude": 36.0631399,
    "longitude": -95.9182895
  },
  {
    "id": 1004,
    "name": "Chuy Region",
    "countryId": 118,
    "countryCode": "KG",
    "fipsCode": "02",
    "iso2": "C",
    "latitude": 42.5655,
    "longitude": 74.4056612
  },
  {
    "id": 1005,
    "name": "Osh Region",
    "countryId": 118,
    "countryCode": "KG",
    "fipsCode": "08",
    "iso2": "O",
    "latitude": 39.8407366,
    "longitude": 72.8988069
  },
  {
    "id": 1006,
    "name": "Trøndelag",
    "countryId": 165,
    "countryCode": "NO",
    "fipsCode": "21",
    "iso2": "50",
    "latitude": 63.5420125,
    "longitude": 10.9369267
  },
  {
    "id": 1007,
    "name": "Oslo",
    "countryId": 165,
    "countryCode": "NO",
    "fipsCode": "12",
    "iso2": "03",
    "latitude": 59.9138688,
    "longitude": 10.7522454
  },
  {
    "id": 1008,
    "name": "Vestfold",
    "countryId": 165,
    "countryCode": "NO",
    "fipsCode": "20",
    "iso2": "07",
    "latitude": 59.1707862,
    "longitude": 10.1144355
  },
  {
    "id": 1009,
    "name": "Oppland",
    "countryId": 165,
    "countryCode": "NO",
    "fipsCode": "11",
    "iso2": "05",
    "latitude": 61.5422752,
    "longitude": 9.7166315
  },
  {
    "id": 1010,
    "name": "Sør-Trøndelag",
    "countryId": 165,
    "countryCode": "NO",
    "fipsCode": "16",
    "iso2": "16",
    "latitude": 63.0136823,
    "longitude": 10.3487136
  },
  {
    "id": 1011,
    "name": "Buskerud",
    "countryId": 165,
    "countryCode": "NO",
    "fipsCode": "04",
    "iso2": "06",
    "latitude": 60.4846025,
    "longitude": 8.6983764
  },
  {
    "id": 1012,
    "name": "Nord-Trøndelag",
    "countryId": 165,
    "countryCode": "NO",
    "fipsCode": "10",
    "iso2": "17",
    "latitude": 64.4370792,
    "longitude": 11.746295
  },
  {
    "id": 1013,
    "name": "Svalbard",
    "countryId": 165,
    "countryCode": "NO",
    "fipsCode": "SV",
    "iso2": "21",
    "latitude": 77.8749725,
    "longitude": 20.9751821
  },
  {
    "id": 1014,
    "name": "Vest-Agder",
    "countryId": 165,
    "countryCode": "NO",
    "fipsCode": "19",
    "iso2": "10",
    "latitude": 58.0999081,
    "longitude": 6.5869809
  },
  {
    "id": 1015,
    "name": "Troms",
    "countryId": 165,
    "countryCode": "NO",
    "fipsCode": "18",
    "iso2": "19",
    "latitude": 69.8178242,
    "longitude": 18.7819365
  },
  {
    "id": 1016,
    "name": "Finnmark",
    "countryId": 165,
    "countryCode": "NO",
    "fipsCode": "05",
    "iso2": "20",
    "latitude": 70.4830388,
    "longitude": 26.0135107
  },
  {
    "id": 1017,
    "name": "Akershus",
    "countryId": 165,
    "countryCode": "NO",
    "fipsCode": "01",
    "iso2": "02",
    "latitude": 28.3704203,
    "longitude": -81.5468058
  },
  {
    "id": 1018,
    "name": "Sogn og Fjordane",
    "countryId": 165,
    "countryCode": "NO",
    "fipsCode": "15",
    "iso2": "14",
    "latitude": 61.5539435,
    "longitude": 6.3325879
  },
  {
    "id": 1019,
    "name": "Hedmark",
    "countryId": 165,
    "countryCode": "NO",
    "fipsCode": "06",
    "iso2": "04",
    "latitude": 61.3967311,
    "longitude": 11.5627369
  },
  {
    "id": 1020,
    "name": "Møre og Romsdal",
    "countryId": 165,
    "countryCode": "NO",
    "fipsCode": "08",
    "iso2": "15",
    "latitude": 62.8406833,
    "longitude": 7.007143
  },
  {
    "id": 1021,
    "name": "Rogaland",
    "countryId": 165,
    "countryCode": "NO",
    "fipsCode": "14",
    "iso2": "11",
    "latitude": 59.1489544,
    "longitude": 6.0143432
  },
  {
    "id": 1022,
    "name": "Østfold",
    "countryId": 165,
    "countryCode": "NO",
    "fipsCode": "13",
    "iso2": "01",
    "latitude": 59.2558286,
    "longitude": 11.3279006
  },
  {
    "id": 1023,
    "name": "Hordaland",
    "countryId": 165,
    "countryCode": "NO",
    "fipsCode": "07",
    "iso2": "12",
    "latitude": 60.2733674,
    "longitude": 5.7220194
  },
  {
    "id": 1024,
    "name": "Telemark",
    "countryId": 165,
    "countryCode": "NO",
    "fipsCode": "17",
    "iso2": "08",
    "latitude": 59.3913985,
    "longitude": 8.3211209
  },
  {
    "id": 1025,
    "name": "Nordland",
    "countryId": 165,
    "countryCode": "NO",
    "fipsCode": "09",
    "iso2": "18",
    "latitude": 67.693058,
    "longitude": 12.7073936
  },
  {
    "id": 1026,
    "name": "Jan Mayen",
    "countryId": 165,
    "countryCode": "NO",
    "fipsCode": "JN",
    "iso2": "22",
    "latitude": 71.031818,
    "longitude": -8.2920346
  },
  {
    "id": 1027,
    "name": "Hódmezővásárhely",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "29",
    "iso2": "HV",
    "latitude": 46.4181262,
    "longitude": 20.3300315
  },
  {
    "id": 1028,
    "name": "Érd",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "43",
    "iso2": "ER",
    "latitude": 47.3919718,
    "longitude": 18.904544
  },
  {
    "id": 1029,
    "name": "Szeged",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "19",
    "iso2": "SD",
    "latitude": 46.2530102,
    "longitude": 20.1414253
  },
  {
    "id": 1030,
    "name": "Nagykanizsa",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "32",
    "iso2": "NK",
    "latitude": 46.4590218,
    "longitude": 16.9896796
  },
  {
    "id": 1031,
    "name": "Csongrád County",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "06",
    "iso2": "CS",
    "latitude": 46.416705,
    "longitude": 20.2566161
  },
  {
    "id": 1032,
    "name": "Debrecen",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "07",
    "iso2": "DE",
    "latitude": 47.5316049,
    "longitude": 21.6273124
  },
  {
    "id": 1033,
    "name": "Székesfehérvár",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "35",
    "iso2": "SF",
    "latitude": 47.1860262,
    "longitude": 18.4221358
  },
  {
    "id": 1034,
    "name": "Nyíregyháza",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "33",
    "iso2": "NY",
    "latitude": 47.9495324,
    "longitude": 21.7244053
  },
  {
    "id": 1035,
    "name": "Somogy County",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "17",
    "iso2": "SO",
    "latitude": 46.554859,
    "longitude": 17.5866732
  },
  {
    "id": 1036,
    "name": "Békéscsaba",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "26",
    "iso2": "BC",
    "latitude": 46.6735939,
    "longitude": 21.0877309
  },
  {
    "id": 1037,
    "name": "Eger",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "28",
    "iso2": "EG",
    "latitude": 47.9025348,
    "longitude": 20.3772284
  },
  {
    "id": 1038,
    "name": "Tolna County",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "21",
    "iso2": "TO",
    "latitude": 46.4762754,
    "longitude": 18.5570627
  },
  {
    "id": 1039,
    "name": "Vas County",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "22",
    "iso2": "VA",
    "latitude": 47.0929111,
    "longitude": 16.6812183
  },
  {
    "id": 1040,
    "name": "Heves County",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "11",
    "iso2": "HE",
    "latitude": 47.8057617,
    "longitude": 20.2038559
  },
  {
    "id": 1041,
    "name": "Győr",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "25",
    "iso2": "GY",
    "latitude": 47.6874569,
    "longitude": 17.6503974
  },
  {
    "id": 1042,
    "name": "Győr-Moson-Sopron County",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "09",
    "iso2": "GS",
    "latitude": 47.6509285,
    "longitude": 17.2505883
  },
  {
    "id": 1043,
    "name": "Jász-Nagykun-Szolnok County",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "20",
    "iso2": "JN",
    "latitude": 47.2555579,
    "longitude": 20.5232456
  },
  {
    "id": 1044,
    "name": "Fejér County",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "08",
    "iso2": "FE",
    "latitude": 47.1217932,
    "longitude": 18.5294815
  },
  {
    "id": 1045,
    "name": "Szabolcs-Szatmár-Bereg County",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "18",
    "iso2": "SZ",
    "latitude": 48.0394954,
    "longitude": 22.00333
  },
  {
    "id": 1046,
    "name": "Zala County",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "24",
    "iso2": "ZA",
    "latitude": 46.7384404,
    "longitude": 16.9152252
  },
  {
    "id": 1047,
    "name": "Szolnok",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "36",
    "iso2": "SK",
    "latitude": 47.1621355,
    "longitude": 20.1824712
  },
  {
    "id": 1048,
    "name": "Bács-Kiskun County",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "01",
    "iso2": "BK",
    "latitude": 46.5661437,
    "longitude": 19.4272464
  },
  {
    "id": 1049,
    "name": "Dunaújváros",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "27",
    "iso2": "DU",
    "latitude": 46.9619059,
    "longitude": 18.9355227
  },
  {
    "id": 1050,
    "name": "Zalaegerszeg",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "40",
    "iso2": "ZE",
    "latitude": 46.8416936,
    "longitude": 16.8416322
  },
  {
    "id": 1051,
    "name": "Nógrád County",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "14",
    "iso2": "NO",
    "latitude": 47.9041031,
    "longitude": 19.0498504
  },
  {
    "id": 1052,
    "name": "Szombathely",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "37",
    "iso2": "SH",
    "latitude": 47.2306851,
    "longitude": 16.6218441
  },
  {
    "id": 1053,
    "name": "Pécs",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "15",
    "iso2": "PS",
    "latitude": 46.0727345,
    "longitude": 18.232266
  },
  {
    "id": 1054,
    "name": "Veszprém County",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "23",
    "iso2": "VE",
    "latitude": 47.0930974,
    "longitude": 17.9100763
  },
  {
    "id": 1055,
    "name": "Baranya County",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "02",
    "iso2": "BA",
    "latitude": 46.0484585,
    "longitude": 18.2719173
  },
  {
    "id": 1056,
    "name": "Kecskemét",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "31",
    "iso2": "KM",
    "latitude": 46.8963711,
    "longitude": 19.6896861
  },
  {
    "id": 1057,
    "name": "Sopron",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "34",
    "iso2": "SN",
    "latitude": 47.6816619,
    "longitude": 16.5844795
  },
  {
    "id": 1058,
    "name": "Borsod-Abaúj-Zemplén County",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "04",
    "iso2": "BZ",
    "latitude": 48.2939401,
    "longitude": 20.6934112
  },
  {
    "id": 1059,
    "name": "Pest County",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "16",
    "iso2": "PE",
    "latitude": 47.4480001,
    "longitude": 19.4618128
  },
  {
    "id": 1060,
    "name": "Békés County",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "03",
    "iso2": "BE",
    "latitude": 46.6704899,
    "longitude": 21.0434996
  },
  {
    "id": 1061,
    "name": "Szekszárd",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "42",
    "iso2": "SS",
    "latitude": 46.3474326,
    "longitude": 18.7062293
  },
  {
    "id": 1062,
    "name": "Veszprém",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "39",
    "iso2": "VM",
    "latitude": 47.1028087,
    "longitude": 17.9093019
  },
  {
    "id": 1063,
    "name": "Hajdú-Bihar County",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "10",
    "iso2": "HB",
    "latitude": 47.4688355,
    "longitude": 21.5453227
  },
  {
    "id": 1064,
    "name": "Budapest",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "05",
    "iso2": "BU",
    "latitude": 47.497912,
    "longitude": 19.040235
  },
  {
    "id": 1065,
    "name": "Miskolc",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "13",
    "iso2": "MI",
    "latitude": 48.1034775,
    "longitude": 20.7784384
  },
  {
    "id": 1066,
    "name": "Tatabánya",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "38",
    "iso2": "TB",
    "latitude": 47.569246,
    "longitude": 18.404818
  },
  {
    "id": 1067,
    "name": "Kaposvár",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "30",
    "iso2": "KV",
    "latitude": 46.3593606,
    "longitude": 17.7967639
  },
  {
    "id": 1068,
    "name": "Salgótarján",
    "countryId": 99,
    "countryCode": "HU",
    "fipsCode": "41",
    "iso2": "ST",
    "latitude": 48.0935237,
    "longitude": 19.7999813
  },
  {
    "id": 1069,
    "name": "County Tipperary",
    "countryId": 105,
    "countryCode": "IE",
    "fipsCode": "26",
    "iso2": "TA",
    "latitude": 52.4737894,
    "longitude": -8.1618514
  },
  {
    "id": 1070,
    "name": "County Sligo",
    "countryId": 105,
    "countryCode": "IE",
    "fipsCode": "25",
    "iso2": "SO",
    "latitude": 54.1553277,
    "longitude": -8.6064532
  },
  {
    "id": 1071,
    "name": "County Donegal",
    "countryId": 105,
    "countryCode": "IE",
    "fipsCode": "06",
    "iso2": "DL",
    "latitude": 54.6548993,
    "longitude": -8.1040967
  },
  {
    "id": 1072,
    "name": "County Dublin",
    "countryId": 105,
    "countryCode": "IE",
    "fipsCode": "07",
    "iso2": "D",
    "latitude": 53.3498053,
    "longitude": -6.2603097
  },
  {
    "id": 1073,
    "name": "Leinster",
    "countryId": 105,
    "countryCode": "IE",
    "fipsCode": "L",
    "iso2": "L",
    "latitude": 53.3271538,
    "longitude": -7.5140841
  },
  {
    "id": 1074,
    "name": "County Cork",
    "countryId": 105,
    "countryCode": "IE",
    "fipsCode": "04",
    "iso2": "CO",
    "latitude": 51.8985143,
    "longitude": -8.4756035
  },
  {
    "id": 1075,
    "name": "County Monaghan",
    "countryId": 105,
    "countryCode": "IE",
    "fipsCode": "22",
    "iso2": "MN",
    "latitude": 54.2492046,
    "longitude": -6.9683132
  },
  {
    "id": 1076,
    "name": "County Longford",
    "countryId": 105,
    "countryCode": "IE",
    "fipsCode": "18",
    "iso2": "LD",
    "latitude": 53.7274982,
    "longitude": -7.7931527
  },
  {
    "id": 1077,
    "name": "County Kerry",
    "countryId": 105,
    "countryCode": "IE",
    "fipsCode": "11",
    "iso2": "KY",
    "latitude": 52.1544607,
    "longitude": -9.5668633
  },
  {
    "id": 1078,
    "name": "County Offaly",
    "countryId": 105,
    "countryCode": "IE",
    "fipsCode": "23",
    "iso2": "OY",
    "latitude": 53.2356871,
    "longitude": -7.7122229
  },
  {
    "id": 1079,
    "name": "County Galway",
    "countryId": 105,
    "countryCode": "IE",
    "fipsCode": "10",
    "iso2": "G",
    "latitude": 53.3564509,
    "longitude": -8.8534113
  },
  {
    "id": 1080,
    "name": "Munster",
    "countryId": 105,
    "countryCode": "IE",
    "fipsCode": "M",
    "iso2": "M",
    "latitude": 51.9471197,
    "longitude": 7.584532
  },
  {
    "id": 1081,
    "name": "County Roscommon",
    "countryId": 105,
    "countryCode": "IE",
    "fipsCode": "24",
    "iso2": "RN",
    "latitude": 53.7592604,
    "longitude": -8.2681621
  },
  {
    "id": 1082,
    "name": "County Kildare",
    "countryId": 105,
    "countryCode": "IE",
    "fipsCode": "12",
    "iso2": "KE",
    "latitude": 53.2120434,
    "longitude": -6.8194708
  },
  {
    "id": 1083,
    "name": "County Louth",
    "countryId": 105,
    "countryCode": "IE",
    "fipsCode": "19",
    "iso2": "LH",
    "latitude": 53.9252324,
    "longitude": -6.4889423
  },
  {
    "id": 1084,
    "name": "County Mayo",
    "countryId": 105,
    "countryCode": "IE",
    "fipsCode": "20",
    "iso2": "MO",
    "latitude": 54.0152604,
    "longitude": -9.4289369
  },
  {
    "id": 1085,
    "name": "County Wicklow",
    "countryId": 105,
    "countryCode": "IE",
    "fipsCode": "31",
    "iso2": "WW",
    "latitude": 52.9862313,
    "longitude": -6.3672543
  },
  {
    "id": 1086,
    "name": "Ulster",
    "countryId": 105,
    "countryCode": "IE",
    "fipsCode": "U",
    "iso2": "U",
    "latitude": 54.7616555,
    "longitude": -6.9612273
  },
  {
    "id": 1087,
    "name": "Connacht",
    "countryId": 105,
    "countryCode": "IE",
    "fipsCode": "U",
    "iso2": "C",
    "latitude": 53.8376243,
    "longitude": -8.9584481
  },
  {
    "id": 1088,
    "name": "County Cavan",
    "countryId": 105,
    "countryCode": "IE",
    "fipsCode": "02",
    "iso2": "CN",
    "latitude": 53.9765424,
    "longitude": -7.2996623
  },
  {
    "id": 1089,
    "name": "County Waterford",
    "countryId": 105,
    "countryCode": "IE",
    "fipsCode": "27",
    "iso2": "WD",
    "latitude": 52.1943549,
    "longitude": -7.6227512
  },
  {
    "id": 1090,
    "name": "County Kilkenny",
    "countryId": 105,
    "countryCode": "IE",
    "fipsCode": "13",
    "iso2": "KK",
    "latitude": 52.5776957,
    "longitude": -7.218002
  },
  {
    "id": 1091,
    "name": "County Clare",
    "countryId": 105,
    "countryCode": "IE",
    "fipsCode": "03",
    "iso2": "CE",
    "latitude": 43.04664,
    "longitude": -87.899581
  },
  {
    "id": 1092,
    "name": "County Meath",
    "countryId": 105,
    "countryCode": "IE",
    "fipsCode": "21",
    "iso2": "MH",
    "latitude": 53.605548,
    "longitude": -6.6564169
  },
  {
    "id": 1093,
    "name": "County Wexford",
    "countryId": 105,
    "countryCode": "IE",
    "fipsCode": "30",
    "iso2": "WX",
    "latitude": 52.4793603,
    "longitude": -6.5839913
  },
  {
    "id": 1094,
    "name": "County Limerick",
    "countryId": 105,
    "countryCode": "IE",
    "fipsCode": "16",
    "iso2": "LK",
    "latitude": 52.5090517,
    "longitude": -8.7474955
  },
  {
    "id": 1095,
    "name": "County Carlow",
    "countryId": 105,
    "countryCode": "IE",
    "fipsCode": "01",
    "iso2": "CW",
    "latitude": 52.7232217,
    "longitude": -6.8108295
  },
  {
    "id": 1096,
    "name": "County Laois",
    "countryId": 105,
    "countryCode": "IE",
    "fipsCode": "15",
    "iso2": "LS",
    "latitude": 52.994295,
    "longitude": -7.3323007
  },
  {
    "id": 1097,
    "name": "County Westmeath",
    "countryId": 105,
    "countryCode": "IE",
    "fipsCode": "29",
    "iso2": "WH",
    "latitude": 53.5345308,
    "longitude": -7.4653217
  },
  {
    "id": 1098,
    "name": "Djelfa",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "22",
    "iso2": "17",
    "latitude": 34.6703956,
    "longitude": 3.2503761
  },
  {
    "id": 1099,
    "name": "El Oued",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "43",
    "iso2": "39",
    "latitude": 33.367811,
    "longitude": 6.8516511
  },
  {
    "id": 1100,
    "name": "El Tarf",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "44",
    "iso2": "36",
    "latitude": 36.7576678,
    "longitude": 8.3076343
  },
  {
    "id": 1101,
    "name": "Oran",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "09",
    "iso2": "31",
    "latitude": 35.6082351,
    "longitude": -0.563609
  },
  {
    "id": 1102,
    "name": "Naama",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "49",
    "iso2": "45",
    "latitude": 33.2667317,
    "longitude": -0.3128659
  },
  {
    "id": 1103,
    "name": "Annaba",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "37",
    "iso2": "23",
    "latitude": 36.8020508,
    "longitude": 7.5247243
  },
  {
    "id": 1104,
    "name": "Bouïra",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "21",
    "iso2": "10",
    "latitude": 36.3691846,
    "longitude": 3.9006194
  },
  {
    "id": 1105,
    "name": "Chlef",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "41",
    "iso2": "02",
    "latitude": 36.1693515,
    "longitude": 1.2891036
  },
  {
    "id": 1106,
    "name": "Tiaret",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "13",
    "iso2": "14",
    "latitude": 35.3708689,
    "longitude": 1.3217852
  },
  {
    "id": 1107,
    "name": "Tlemcen",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "15",
    "iso2": "13",
    "latitude": 34.6780284,
    "longitude": -1.366216
  },
  {
    "id": 1108,
    "name": "Béchar",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "38",
    "iso2": "08",
    "latitude": 31.6238098,
    "longitude": -2.2162443
  },
  {
    "id": 1109,
    "name": "Médéa",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "06",
    "iso2": "26",
    "latitude": 36.2637078,
    "longitude": 2.7587857
  },
  {
    "id": 1110,
    "name": "Skikda",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "31",
    "iso2": "21",
    "latitude": 36.6721198,
    "longitude": 6.8350999
  },
  {
    "id": 1111,
    "name": "Blida",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "20",
    "iso2": "09",
    "latitude": 36.531123,
    "longitude": 2.8976254
  },
  {
    "id": 1112,
    "name": "Illizi",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "46",
    "iso2": "33",
    "latitude": 26.1690005,
    "longitude": 8.4842465
  },
  {
    "id": 1113,
    "name": "Jijel",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "24",
    "iso2": "18",
    "latitude": 36.7179681,
    "longitude": 5.9832577
  },
  {
    "id": 1114,
    "name": "Biskra",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "19",
    "iso2": "07",
    "latitude": 34.8449437,
    "longitude": 5.7248567
  },
  {
    "id": 1115,
    "name": "Tipasa",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "55",
    "iso2": "42",
    "latitude": 36.546265,
    "longitude": 2.1843285
  },
  {
    "id": 1116,
    "name": "Bordj Bou Arréridj",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "39",
    "iso2": "34",
    "latitude": 36.0739925,
    "longitude": 4.7630271
  },
  {
    "id": 1117,
    "name": "Tébessa",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "33",
    "iso2": "12",
    "latitude": 35.1290691,
    "longitude": 7.9592863
  },
  {
    "id": 1118,
    "name": "Adrar",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "34",
    "iso2": "01",
    "latitude": 26.418131,
    "longitude": -0.6014717
  },
  {
    "id": 1119,
    "name": "Aïn Defla",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "35",
    "iso2": "44",
    "latitude": 36.2509429,
    "longitude": 1.9393815
  },
  {
    "id": 1120,
    "name": "Tindouf",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "54",
    "iso2": "37",
    "latitude": 27.8063119,
    "longitude": -5.7299821
  },
  {
    "id": 1121,
    "name": "Constantine",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "04",
    "iso2": "25",
    "latitude": 36.3373911,
    "longitude": 6.663812
  },
  {
    "id": 1122,
    "name": "Aïn Témouchent",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "36",
    "iso2": "46",
    "latitude": 35.2992698,
    "longitude": -1.1392792
  },
  {
    "id": 1123,
    "name": "Saïda",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "10",
    "iso2": "20",
    "latitude": 34.8415207,
    "longitude": 0.1456055
  },
  {
    "id": 1124,
    "name": "Mascara",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "26",
    "iso2": "29",
    "latitude": 35.3904125,
    "longitude": 0.1494988
  },
  {
    "id": 1125,
    "name": "Boumerdès",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "40",
    "iso2": "35",
    "latitude": 36.6839559,
    "longitude": 3.6217802
  },
  {
    "id": 1126,
    "name": "Khenchela",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "47",
    "iso2": "40",
    "latitude": 35.4269404,
    "longitude": 7.1460155
  },
  {
    "id": 1127,
    "name": "Ghardaïa",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "45",
    "iso2": "47",
    "latitude": 32.4943741,
    "longitude": 3.64446
  },
  {
    "id": 1128,
    "name": "Béjaïa",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "18",
    "iso2": "06",
    "latitude": 36.7515258,
    "longitude": 5.0556837
  },
  {
    "id": 1129,
    "name": "El Bayadh",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "42",
    "iso2": "32",
    "latitude": 32.7148824,
    "longitude": 0.9056623
  },
  {
    "id": 1130,
    "name": "Relizane",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "51",
    "iso2": "48",
    "latitude": 35.7383405,
    "longitude": 0.7532809
  },
  {
    "id": 1131,
    "name": "Tizi Ouzou",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "14",
    "iso2": "15",
    "latitude": 36.706911,
    "longitude": 4.2333355
  },
  {
    "id": 1132,
    "name": "Mila",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "48",
    "iso2": "43",
    "latitude": 36.3647957,
    "longitude": 6.1526985
  },
  {
    "id": 1133,
    "name": "Tissemsilt",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "56",
    "iso2": "38",
    "latitude": 35.6053781,
    "longitude": 1.813098
  },
  {
    "id": 1134,
    "name": "M\"Sila",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "27",
    "iso2": "28",
    "latitude": 35.7186646,
    "longitude": 4.5233423
  },
  {
    "id": 1135,
    "name": "Tamanghasset",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "53",
    "iso2": "11",
    "latitude": 22.7902972,
    "longitude": 5.5193268
  },
  {
    "id": 1136,
    "name": "Oum El Bouaghi",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "29",
    "iso2": "04",
    "latitude": 35.8688789,
    "longitude": 7.1108266
  },
  {
    "id": 1137,
    "name": "Guelma",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "23",
    "iso2": "24",
    "latitude": 36.4627444,
    "longitude": 7.4330833
  },
  {
    "id": 1138,
    "name": "Laghouat",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "25",
    "iso2": "03",
    "latitude": 33.8078341,
    "longitude": 2.8628294
  },
  {
    "id": 1139,
    "name": "Ouargla",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "50",
    "iso2": "30",
    "latitude": 32.2264863,
    "longitude": 5.7299821
  },
  {
    "id": 1140,
    "name": "Mostaganem",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "07",
    "iso2": "27",
    "latitude": 35.9583054,
    "longitude": 0.3371889
  },
  {
    "id": 1141,
    "name": "Sétif",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "12",
    "iso2": "19",
    "latitude": 36.3073389,
    "longitude": 5.5617279
  },
  {
    "id": 1142,
    "name": "Batna",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "03",
    "iso2": "05",
    "latitude": 35.5965954,
    "longitude": 5.8987139
  },
  {
    "id": 1143,
    "name": "Souk Ahras",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "52",
    "iso2": "41",
    "latitude": 36.2801062,
    "longitude": 7.9384033
  },
  {
    "id": 1144,
    "name": "Algiers",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "01",
    "iso2": "16",
    "latitude": 36.6997294,
    "longitude": 3.0576199
  },
  {
    "id": 1146,
    "name": "Burgos Province",
    "countryId": 207,
    "countryCode": "ES",
    "fipsCode": "",
    "iso2": "BU",
    "latitude": 42.3380758,
    "longitude": -3.5812692
  },
  {
    "id": 1147,
    "name": "Salamanca Province",
    "countryId": 207,
    "countryCode": "ES",
    "fipsCode": "",
    "iso2": "SA",
    "latitude": 40.9515263,
    "longitude": -6.2375947
  },
  {
    "id": 1157,
    "name": "Palencia Province",
    "countryId": 207,
    "countryCode": "ES",
    "fipsCode": "",
    "iso2": "P",
    "latitude": 42.0096832,
    "longitude": -4.5287949
  },
  {
    "id": 1158,
    "name": "Madrid",
    "countryId": 207,
    "countryCode": "ES",
    "fipsCode": "29",
    "iso2": "MD",
    "latitude": 40.4167515,
    "longitude": -3.7038322
  },
  {
    "id": 1159,
    "name": "Melilla",
    "countryId": 207,
    "countryCode": "ES",
    "fipsCode": "ML",
    "iso2": "ML",
    "latitude": 35.2922775,
    "longitude": -2.9380973
  },
  {
    "id": 1160,
    "name": "Asturias",
    "countryId": 207,
    "countryCode": "ES",
    "fipsCode": "34",
    "iso2": "AS",
    "latitude": 43.3613953,
    "longitude": -5.8593267
  },
  {
    "id": 1161,
    "name": "Zamora Province",
    "countryId": 207,
    "countryCode": "ES",
    "fipsCode": "",
    "iso2": "ZA",
    "latitude": 41.6095744,
    "longitude": -5.8987139
  },
  {
    "id": 1167,
    "name": "Galicia",
    "countryId": 207,
    "countryCode": "ES",
    "fipsCode": "58",
    "iso2": "GA",
    "latitude": 42.5750554,
    "longitude": -8.1338558
  },
  {
    "id": 1170,
    "name": "Cantabria",
    "countryId": 207,
    "countryCode": "ES",
    "fipsCode": "39",
    "iso2": "CB",
    "latitude": 43.1828396,
    "longitude": -3.9878427
  },
  {
    "id": 1171,
    "name": "La Rioja",
    "countryId": 207,
    "countryCode": "ES",
    "fipsCode": "27",
    "iso2": "RI",
    "latitude": 42.2870733,
    "longitude": -2.539603
  },
  {
    "id": 1174,
    "name": "Balearic Islands",
    "countryId": 207,
    "countryCode": "ES",
    "fipsCode": "07",
    "iso2": "PM",
    "latitude": 39.3587759,
    "longitude": 2.7356328
  },
  {
    "id": 1175,
    "name": "Valencia",
    "countryId": 207,
    "countryCode": "ES",
    "fipsCode": "60",
    "iso2": "VC",
    "latitude": 39.4840108,
    "longitude": -0.7532809
  },
  {
    "id": 1176,
    "name": "Murcia",
    "countryId": 207,
    "countryCode": "ES",
    "fipsCode": "31",
    "iso2": "MC",
    "latitude": 38.1398141,
    "longitude": -1.366216
  },
  {
    "id": 1177,
    "name": "Aragon",
    "countryId": 207,
    "countryCode": "ES",
    "fipsCode": "52",
    "iso2": "AR",
    "latitude": 41.5976275,
    "longitude": -0.9056623
  },
  {
    "id": 1183,
    "name": "Valladolid Province",
    "countryId": 207,
    "countryCode": "ES",
    "fipsCode": "",
    "iso2": "VA",
    "latitude": 41.6517375,
    "longitude": -4.724495
  },
  {
    "id": 1184,
    "name": "Castile and León",
    "countryId": 207,
    "countryCode": "ES",
    "fipsCode": "55",
    "iso2": "CL",
    "latitude": 41.8356821,
    "longitude": -4.3976357
  },
  {
    "id": 1185,
    "name": "Canary Islands",
    "countryId": 207,
    "countryCode": "ES",
    "fipsCode": "53",
    "iso2": "CN",
    "latitude": 28.2915637,
    "longitude": -16.6291304
  },
  {
    "id": 1189,
    "name": "Ávila",
    "countryId": 207,
    "countryCode": "ES",
    "fipsCode": "",
    "iso2": "AV",
    "latitude": 40.6934511,
    "longitude": -4.8935627
  },
  {
    "id": 1190,
    "name": "Extremadura",
    "countryId": 207,
    "countryCode": "ES",
    "fipsCode": "57",
    "iso2": "EX",
    "latitude": 39.4937392,
    "longitude": -6.0679194
  },
  {
    "id": 1191,
    "name": "Basque Country",
    "countryId": 207,
    "countryCode": "ES",
    "fipsCode": "59",
    "iso2": "PV",
    "latitude": 42.9896248,
    "longitude": -2.6189273
  },
  {
    "id": 1192,
    "name": "Segovia Province",
    "countryId": 207,
    "countryCode": "ES",
    "fipsCode": "",
    "iso2": "SG",
    "latitude": 40.9429296,
    "longitude": -4.1088942
  },
  {
    "id": 1193,
    "name": "Andalusia",
    "countryId": 207,
    "countryCode": "ES",
    "fipsCode": "51",
    "iso2": "AN",
    "latitude": 37.5442706,
    "longitude": -4.7277528
  },
  {
    "id": 1200,
    "name": "Léon",
    "countryId": 207,
    "countryCode": "ES",
    "fipsCode": "55",
    "iso2": "LE",
    "latitude": 42.5987041,
    "longitude": -5.5670839
  },
  {
    "id": 1203,
    "name": "Catalonia",
    "countryId": 207,
    "countryCode": "ES",
    "fipsCode": "56",
    "iso2": "CT",
    "latitude": 41.5911589,
    "longitude": 1.5208624
  },
  {
    "id": 1204,
    "name": "Navarra",
    "countryId": 207,
    "countryCode": "ES",
    "fipsCode": "32",
    "iso2": "NC",
    "latitude": 42.6953909,
    "longitude": -1.6760691
  },
  {
    "id": 1205,
    "name": "Castilla La Mancha",
    "countryId": 207,
    "countryCode": "ES",
    "fipsCode": "54",
    "iso2": "CM",
    "latitude": 39.2795607,
    "longitude": -3.097702
  },
  {
    "id": 1206,
    "name": "Ceuta",
    "countryId": 207,
    "countryCode": "ES",
    "fipsCode": "CE",
    "iso2": "CE",
    "latitude": 35.8893874,
    "longitude": -5.3213455
  },
  {
    "id": 1208,
    "name": "Soria Province",
    "countryId": 207,
    "countryCode": "ES",
    "fipsCode": "",
    "iso2": "SO",
    "latitude": 41.7665464,
    "longitude": -2.4790306
  },
  {
    "id": 1209,
    "name": "Guanacaste Province",
    "countryId": 53,
    "countryCode": "CR",
    "fipsCode": "03",
    "iso2": "G",
    "latitude": 10.6267399,
    "longitude": -85.4436706
  },
  {
    "id": 1210,
    "name": "Puntarenas Province",
    "countryId": 53,
    "countryCode": "CR",
    "fipsCode": "07",
    "iso2": "P",
    "latitude": 9.2169531,
    "longitude": -83.336188
  },
  {
    "id": 1211,
    "name": "Provincia de Cartago",
    "countryId": 53,
    "countryCode": "CR",
    "fipsCode": "02",
    "iso2": "C",
    "latitude": 9.8622311,
    "longitude": -83.9214187
  },
  {
    "id": 1212,
    "name": "Heredia Province",
    "countryId": 53,
    "countryCode": "CR",
    "fipsCode": "04",
    "iso2": "H",
    "latitude": 10.473523,
    "longitude": -84.0167423
  },
  {
    "id": 1213,
    "name": "Limón Province",
    "countryId": 53,
    "countryCode": "CR",
    "fipsCode": "06",
    "iso2": "L",
    "latitude": 9.9896398,
    "longitude": -83.0332417
  },
  {
    "id": 1214,
    "name": "San José Province",
    "countryId": 53,
    "countryCode": "CR",
    "fipsCode": "08",
    "iso2": "SJ",
    "latitude": 9.9129727,
    "longitude": -84.0768294
  },
  {
    "id": 1215,
    "name": "Alajuela Province",
    "countryId": 53,
    "countryCode": "CR",
    "fipsCode": "01",
    "iso2": "A",
    "latitude": 10.391583,
    "longitude": -84.4382721
  },
  {
    "id": 1216,
    "name": "Brunei-Muara District",
    "countryId": 33,
    "countryCode": "BN",
    "fipsCode": "02",
    "iso2": "BM",
    "latitude": 4.9311206,
    "longitude": 114.9516869
  },
  {
    "id": 1217,
    "name": "Belait District",
    "countryId": 33,
    "countryCode": "BN",
    "fipsCode": "01",
    "iso2": "BE",
    "latitude": 4.3750749,
    "longitude": 114.6192899
  },
  {
    "id": 1218,
    "name": "Temburong District",
    "countryId": 33,
    "countryCode": "BN",
    "fipsCode": "03",
    "iso2": "TE",
    "latitude": 4.6204128,
    "longitude": 115.141484
  },
  {
    "id": 1219,
    "name": "Tutong District",
    "countryId": 33,
    "countryCode": "BN",
    "fipsCode": "04",
    "iso2": "TU",
    "latitude": 4.7140373,
    "longitude": 114.6667939
  },
  {
    "id": 1220,
    "name": "Saint Philip",
    "countryId": 20,
    "countryCode": "BB",
    "fipsCode": "10",
    "iso2": "10",
    "latitude": 35.233114,
    "longitude": -89.4364042
  },
  {
    "id": 1221,
    "name": "Saint Lucy",
    "countryId": 20,
    "countryCode": "BB",
    "fipsCode": "07",
    "iso2": "07",
    "latitude": 38.7614625,
    "longitude": -77.4491439
  },
  {
    "id": 1222,
    "name": "Saint Peter",
    "countryId": 20,
    "countryCode": "BB",
    "fipsCode": "09",
    "iso2": "09",
    "latitude": 37.0827119,
    "longitude": -94.517125
  },
  {
    "id": 1223,
    "name": "Saint Joseph",
    "countryId": 20,
    "countryCode": "BB",
    "fipsCode": "06",
    "iso2": "06",
    "latitude": 39.7674578,
    "longitude": -94.846681
  },
  {
    "id": 1224,
    "name": "Saint James",
    "countryId": 20,
    "countryCode": "BB",
    "fipsCode": "04",
    "iso2": "04",
    "latitude": 48.523566,
    "longitude": -1.3237885
  },
  {
    "id": 1225,
    "name": "Saint Thomas",
    "countryId": 20,
    "countryCode": "BB",
    "fipsCode": "11",
    "iso2": "11",
    "latitude": 18.3380965,
    "longitude": -64.8940946
  },
  {
    "id": 1226,
    "name": "Saint George",
    "countryId": 20,
    "countryCode": "BB",
    "fipsCode": "03",
    "iso2": "03",
    "latitude": 37.0965278,
    "longitude": -113.5684164
  },
  {
    "id": 1227,
    "name": "Saint John",
    "countryId": 20,
    "countryCode": "BB",
    "fipsCode": "05",
    "iso2": "05",
    "latitude": 45.2733153,
    "longitude": -66.063308
  },
  {
    "id": 1228,
    "name": "Christ Church",
    "countryId": 20,
    "countryCode": "BB",
    "fipsCode": "01",
    "iso2": "01",
    "latitude": 36.0060407,
    "longitude": -95.921121
  },
  {
    "id": 1229,
    "name": "Saint Andrew",
    "countryId": 20,
    "countryCode": "BB",
    "fipsCode": "02",
    "iso2": "02",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 1230,
    "name": "Saint Michael",
    "countryId": 20,
    "countryCode": "BB",
    "fipsCode": "08",
    "iso2": "08",
    "latitude": 36.035977,
    "longitude": -95.849052
  },
  {
    "id": 1231,
    "name": "Ta\"izz Governorate",
    "countryId": 245,
    "countryCode": "YE",
    "fipsCode": "25",
    "iso2": "TA",
    "latitude": 13.5775886,
    "longitude": 44.0177989
  },
  {
    "id": 1232,
    "name": "Sana\"a",
    "countryId": 245,
    "countryCode": "YE",
    "fipsCode": "16",
    "iso2": "SA",
    "latitude": 15.3694451,
    "longitude": 44.1910066
  },
  {
    "id": 1233,
    "name": "Ibb Governorate",
    "countryId": 245,
    "countryCode": "YE",
    "fipsCode": "23",
    "iso2": "IB",
    "latitude": 14.1415717,
    "longitude": 44.2479015
  },
  {
    "id": 1234,
    "name": "Ma\"rib Governorate",
    "countryId": 245,
    "countryCode": "YE",
    "fipsCode": "14",
    "iso2": "MA",
    "latitude": 15.515888,
    "longitude": 45.4498065
  },
  {
    "id": 1235,
    "name": "Al Mahwit Governorate",
    "countryId": 245,
    "countryCode": "YE",
    "fipsCode": "10",
    "iso2": "MW",
    "latitude": 15.3963229,
    "longitude": 43.5606946
  },
  {
    "id": 1236,
    "name": "Sana\"a Governorate",
    "countryId": 245,
    "countryCode": "YE",
    "fipsCode": "16",
    "iso2": "SN",
    "latitude": 15.3168913,
    "longitude": 44.4748018
  },
  {
    "id": 1237,
    "name": "Abyan Governorate",
    "countryId": 245,
    "countryCode": "YE",
    "fipsCode": "01",
    "iso2": "AB",
    "latitude": 13.6343413,
    "longitude": 46.0563212
  },
  {
    "id": 1238,
    "name": "Hadhramaut Governorate",
    "countryId": 245,
    "countryCode": "YE",
    "fipsCode": "04",
    "iso2": "HD",
    "latitude": 16.9304135,
    "longitude": 49.3653149
  },
  {
    "id": 1239,
    "name": "Socotra Governorate",
    "countryId": 245,
    "countryCode": "YE",
    "fipsCode": "28",
    "iso2": "SU",
    "latitude": 12.4634205,
    "longitude": 53.8237385
  },
  {
    "id": 1240,
    "name": "Al Bayda\" Governorate",
    "countryId": 245,
    "countryCode": "YE",
    "fipsCode": "20",
    "iso2": "BA",
    "latitude": 14.3588662,
    "longitude": 45.4498065
  },
  {
    "id": 1241,
    "name": "Al Hudaydah Governorate",
    "countryId": 245,
    "countryCode": "YE",
    "fipsCode": "08",
    "iso2": "HU",
    "latitude": 15.3053072,
    "longitude": 43.0194897
  },
  {
    "id": 1242,
    "name": "\"Adan Governorate",
    "countryId": 245,
    "countryCode": "YE",
    "fipsCode": "02",
    "iso2": "AD",
    "latitude": 12.8257481,
    "longitude": 44.7943804
  },
  {
    "id": 1243,
    "name": "Al Jawf Governorate",
    "countryId": 245,
    "countryCode": "YE",
    "fipsCode": "21",
    "iso2": "JA",
    "latitude": 16.7901819,
    "longitude": 45.2993862
  },
  {
    "id": 1244,
    "name": "Hajjah Governorate",
    "countryId": 245,
    "countryCode": "YE",
    "fipsCode": "22",
    "iso2": "HJ",
    "latitude": 16.1180631,
    "longitude": 43.329466
  },
  {
    "id": 1245,
    "name": "Lahij Governorate",
    "countryId": 245,
    "countryCode": "YE",
    "fipsCode": "24",
    "iso2": "LA",
    "latitude": 13.1489588,
    "longitude": 44.8505495
  },
  {
    "id": 1246,
    "name": "Dhamar Governorate",
    "countryId": 245,
    "countryCode": "YE",
    "fipsCode": "11",
    "iso2": "DH",
    "latitude": 14.7195344,
    "longitude": 44.2479015
  },
  {
    "id": 1247,
    "name": "Shabwah Governorate",
    "countryId": 245,
    "countryCode": "YE",
    "fipsCode": "05",
    "iso2": "SH",
    "latitude": 14.7546303,
    "longitude": 46.516262
  },
  {
    "id": 1248,
    "name": "Raymah Governorate",
    "countryId": 245,
    "countryCode": "YE",
    "fipsCode": "27",
    "iso2": "RA",
    "latitude": 14.6277682,
    "longitude": 43.7142484
  },
  {
    "id": 1249,
    "name": "Saada Governorate",
    "countryId": 245,
    "countryCode": "YE",
    "fipsCode": "15",
    "iso2": "SD",
    "latitude": 16.8476528,
    "longitude": 43.9436788
  },
  {
    "id": 1250,
    "name": "\"Amran Governorate",
    "countryId": 245,
    "countryCode": "YE",
    "fipsCode": "19",
    "iso2": "AM",
    "latitude": 16.2569214,
    "longitude": 43.9436788
  },
  {
    "id": 1251,
    "name": "Al Mahrah Governorate",
    "countryId": 245,
    "countryCode": "YE",
    "fipsCode": "03",
    "iso2": "MR",
    "latitude": 16.5238423,
    "longitude": 51.6834275
  },
  {
    "id": 1252,
    "name": "Sangha-Mbaéré",
    "countryId": 42,
    "countryCode": "CF",
    "fipsCode": "16",
    "iso2": "SE",
    "latitude": 3.4368607,
    "longitude": 16.3463791
  },
  {
    "id": 1253,
    "name": "Nana-Grébizi Economic Prefecture",
    "countryId": 42,
    "countryCode": "CF",
    "fipsCode": "15",
    "iso2": "KB",
    "latitude": 7.1848607,
    "longitude": 19.3783206
  },
  {
    "id": 1254,
    "name": "Ouham Prefecture",
    "countryId": 42,
    "countryCode": "CF",
    "fipsCode": "12",
    "iso2": "AC",
    "latitude": 7.090911,
    "longitude": 17.668887
  },
  {
    "id": 1255,
    "name": "Ombella-M\"Poko Prefecture",
    "countryId": 42,
    "countryCode": "CF",
    "fipsCode": "17",
    "iso2": "MP",
    "latitude": 5.1188825,
    "longitude": 18.4276047
  },
  {
    "id": 1256,
    "name": "Lobaye Prefecture",
    "countryId": 42,
    "countryCode": "CF",
    "fipsCode": "07",
    "iso2": "LB",
    "latitude": 4.3525981,
    "longitude": 17.4795173
  },
  {
    "id": 1257,
    "name": "Mambéré-Kadéï",
    "countryId": 42,
    "countryCode": "CF",
    "fipsCode": "04",
    "iso2": "HS",
    "latitude": 4.7055653,
    "longitude": 15.9699878
  },
  {
    "id": 1258,
    "name": "Haut-Mbomou Prefecture",
    "countryId": 42,
    "countryCode": "CF",
    "fipsCode": "05",
    "iso2": "HM",
    "latitude": 6.2537134,
    "longitude": 25.4733554
  },
  {
    "id": 1259,
    "name": "Bamingui-Bangoran Prefecture",
    "countryId": 42,
    "countryCode": "CF",
    "fipsCode": "01",
    "iso2": "BB",
    "latitude": 8.2733455,
    "longitude": 20.7122465
  },
  {
    "id": 1260,
    "name": "Nana-Mambéré Prefecture",
    "countryId": 42,
    "countryCode": "CF",
    "fipsCode": "09",
    "iso2": "NM",
    "latitude": 5.6932135,
    "longitude": 15.2194808
  },
  {
    "id": 1261,
    "name": "Vakaga Prefecture",
    "countryId": 42,
    "countryCode": "CF",
    "fipsCode": "14",
    "iso2": "VK",
    "latitude": 9.5113296,
    "longitude": 22.2384017
  },
  {
    "id": 1262,
    "name": "Bangui",
    "countryId": 42,
    "countryCode": "CF",
    "fipsCode": "18",
    "iso2": "BGF",
    "latitude": 4.3946735,
    "longitude": 18.5581899
  },
  {
    "id": 1263,
    "name": "Kémo Prefecture",
    "countryId": 42,
    "countryCode": "CF",
    "fipsCode": "06",
    "iso2": "KG",
    "latitude": 5.8867794,
    "longitude": 19.3783206
  },
  {
    "id": 1264,
    "name": "Basse-Kotto Prefecture",
    "countryId": 42,
    "countryCode": "CF",
    "fipsCode": "02",
    "iso2": "BK",
    "latitude": 4.8719319,
    "longitude": 21.2845025
  },
  {
    "id": 1265,
    "name": "Ouaka Prefecture",
    "countryId": 42,
    "countryCode": "CF",
    "fipsCode": "11",
    "iso2": "UK",
    "latitude": 6.3168216,
    "longitude": 20.7122465
  },
  {
    "id": 1266,
    "name": "Mbomou Prefecture",
    "countryId": 42,
    "countryCode": "CF",
    "fipsCode": "08",
    "iso2": "MB",
    "latitude": 5.556837,
    "longitude": 23.7632828
  },
  {
    "id": 1267,
    "name": "Ouham-Pendé Prefecture",
    "countryId": 42,
    "countryCode": "CF",
    "fipsCode": "13",
    "iso2": "OP",
    "latitude": 6.4850984,
    "longitude": 16.1580937
  },
  {
    "id": 1268,
    "name": "Haute-Kotto Prefecture",
    "countryId": 42,
    "countryCode": "CF",
    "fipsCode": "03",
    "iso2": "HK",
    "latitude": 7.7964379,
    "longitude": 23.3823545
  },
  {
    "id": 1269,
    "name": "Romblon",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "54",
    "iso2": "ROM",
    "latitude": 12.5778016,
    "longitude": 122.269146
  },
  {
    "id": 1270,
    "name": "Bukidnon",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "12",
    "iso2": "BUK",
    "latitude": 8.0515054,
    "longitude": 124.9229946
  },
  {
    "id": 1271,
    "name": "Rizal",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "53",
    "iso2": "RIZ",
    "latitude": 14.6037446,
    "longitude": 121.3084088
  },
  {
    "id": 1272,
    "name": "Bohol",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "11",
    "iso2": "BOH",
    "latitude": 9.8499911,
    "longitude": 124.1435427
  },
  {
    "id": 1273,
    "name": "Quirino",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "68",
    "iso2": "QUI",
    "latitude": 16.2700424,
    "longitude": 121.5370003
  },
  {
    "id": 1274,
    "name": "Biliran",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "68",
    "iso2": "BIL",
    "latitude": 11.5833152,
    "longitude": 124.4641848
  },
  {
    "id": 1275,
    "name": "Quezon",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "H2",
    "iso2": "QUE",
    "latitude": 14.0313906,
    "longitude": 122.1130909
  },
  {
    "id": 1276,
    "name": "Siquijor",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "69",
    "iso2": "SIG",
    "latitude": 9.1998779,
    "longitude": 123.5951925
  },
  {
    "id": 1277,
    "name": "Sarangani",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "69",
    "iso2": "SAR",
    "latitude": 5.9267175,
    "longitude": 124.994751
  },
  {
    "id": 1278,
    "name": "Bulacan",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "13",
    "iso2": "BUL",
    "latitude": 14.7942735,
    "longitude": 120.8799008
  },
  {
    "id": 1279,
    "name": "Cagayan",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "14",
    "iso2": "CAG",
    "latitude": 18.2489629,
    "longitude": 121.8787833
  },
  {
    "id": 1280,
    "name": "South Cotabato",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "70",
    "iso2": "SCO",
    "latitude": 6.3357565,
    "longitude": 124.7740793
  },
  {
    "id": 1281,
    "name": "Sorsogon",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "58",
    "iso2": "SOR",
    "latitude": 12.9927095,
    "longitude": 124.0147464
  },
  {
    "id": 1282,
    "name": "Sultan Kudarat",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "71",
    "iso2": "SUK",
    "latitude": 6.5069401,
    "longitude": 124.4198243
  },
  {
    "id": 1283,
    "name": "Camarines Norte",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "15",
    "iso2": "CAN",
    "latitude": 14.1390265,
    "longitude": 122.7633036
  },
  {
    "id": 1284,
    "name": "Southern Leyte",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "59",
    "iso2": "SLE",
    "latitude": 10.3346206,
    "longitude": 125.1708741
  },
  {
    "id": 1285,
    "name": "Camiguin",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "17",
    "iso2": "CAM",
    "latitude": 9.1732164,
    "longitude": 124.7298765
  },
  {
    "id": 1286,
    "name": "Surigao del Norte",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "61",
    "iso2": "SUN",
    "latitude": 9.514828,
    "longitude": 125.6969984
  },
  {
    "id": 1287,
    "name": "Camarines Sur",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "16",
    "iso2": "CAS",
    "latitude": 13.5250197,
    "longitude": 123.3486147
  },
  {
    "id": 1288,
    "name": "Sulu",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "60",
    "iso2": "SLU",
    "latitude": 5.9749011,
    "longitude": 121.03351
  },
  {
    "id": 1289,
    "name": "Davao Oriental",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "26",
    "iso2": "DAO",
    "latitude": 7.3171585,
    "longitude": 126.5419887
  },
  {
    "id": 1290,
    "name": "Eastern Samar",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "23",
    "iso2": "EAS",
    "latitude": 11.5000731,
    "longitude": 125.4999908
  },
  {
    "id": 1291,
    "name": "Dinagat Islands",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "23",
    "iso2": "DIN",
    "latitude": 10.1281816,
    "longitude": 125.6095474
  },
  {
    "id": 1292,
    "name": "Capiz",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "18",
    "iso2": "CAP",
    "latitude": 11.5528816,
    "longitude": 122.740723
  },
  {
    "id": 1293,
    "name": "Tawi-Tawi",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "72",
    "iso2": "TAW",
    "latitude": 5.133811,
    "longitude": 119.950926
  },
  {
    "id": 1294,
    "name": "Calabarzon",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "40",
    "iso2": "40",
    "latitude": 14.1007803,
    "longitude": 121.0793705
  },
  {
    "id": 1295,
    "name": "Tarlac",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "63",
    "iso2": "TAR",
    "latitude": 15.4754786,
    "longitude": 120.5963492
  },
  {
    "id": 1296,
    "name": "Surigao del Sur",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "62",
    "iso2": "SUR",
    "latitude": 8.5404906,
    "longitude": 126.1144758
  },
  {
    "id": 1297,
    "name": "Zambales",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "64",
    "iso2": "ZMB",
    "latitude": 15.5081766,
    "longitude": 119.9697808
  },
  {
    "id": 1298,
    "name": "Ilocos Norte",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "28",
    "iso2": "ILN",
    "latitude": 18.1647281,
    "longitude": 120.7115592
  },
  {
    "id": 1299,
    "name": "Mimaropa",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "41",
    "iso2": "41",
    "latitude": 9.8432065,
    "longitude": 118.7364783
  },
  {
    "id": 1300,
    "name": "Ifugao",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "27",
    "iso2": "IFU",
    "latitude": 16.8330792,
    "longitude": 121.1710389
  },
  {
    "id": 1301,
    "name": "Catanduanes",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "19",
    "iso2": "CAT",
    "latitude": 13.7088684,
    "longitude": 124.2421597
  },
  {
    "id": 1302,
    "name": "Zamboanga del Norte",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "65",
    "iso2": "ZAN",
    "latitude": 8.3886282,
    "longitude": 123.1688883
  },
  {
    "id": 1303,
    "name": "Guimaras",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "65",
    "iso2": "GUI",
    "latitude": 10.5928661,
    "longitude": 122.6325081
  },
  {
    "id": 1304,
    "name": "Bicol Region",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "05",
    "iso2": "05",
    "latitude": 13.4209885,
    "longitude": 123.4136736
  },
  {
    "id": 1305,
    "name": "Western Visayas",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "06",
    "iso2": "06",
    "latitude": 11.0049836,
    "longitude": 122.5372741
  },
  {
    "id": 1306,
    "name": "Cebu",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "21",
    "iso2": "CEB",
    "latitude": 10.3156992,
    "longitude": 123.8854366
  },
  {
    "id": 1307,
    "name": "Cavite",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "20",
    "iso2": "CAV",
    "latitude": 14.4791297,
    "longitude": 120.8969634
  },
  {
    "id": 1308,
    "name": "Central Visayas",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "07",
    "iso2": "07",
    "latitude": 9.816875,
    "longitude": 124.0641419
  },
  {
    "id": 1309,
    "name": "Davao Occidental",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "11",
    "iso2": "DVO",
    "latitude": 6.0941396,
    "longitude": 125.6095474
  },
  {
    "id": 1310,
    "name": "Soccsksargen",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "12",
    "iso2": "12",
    "latitude": 6.2706918,
    "longitude": 124.6856509
  },
  {
    "id": 1311,
    "name": "Compostela Valley",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "12",
    "iso2": "COM",
    "latitude": 7.512515,
    "longitude": 126.1762615
  },
  {
    "id": 1312,
    "name": "Kalinga",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "12",
    "iso2": "KAL",
    "latitude": 17.4740422,
    "longitude": 121.3541631
  },
  {
    "id": 1313,
    "name": "Isabela",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "31",
    "iso2": "ISA",
    "latitude": 18.5007759,
    "longitude": -67.0243462
  },
  {
    "id": 1314,
    "name": "Caraga",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "13",
    "iso2": "13",
    "latitude": 8.8014562,
    "longitude": 125.7406882
  },
  {
    "id": 1315,
    "name": "Iloilo",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "30",
    "iso2": "ILI",
    "latitude": 10.7201501,
    "longitude": 122.5621063
  },
  {
    "id": 1316,
    "name": "Autonomous Region in Muslim Mindanao",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "14",
    "iso2": "14",
    "latitude": 6.9568313,
    "longitude": 124.2421597
  },
  {
    "id": 1317,
    "name": "La Union",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "36",
    "iso2": "LUN",
    "latitude": 38.8766878,
    "longitude": -77.1280912
  },
  {
    "id": 1318,
    "name": "Davao del Sur",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "25",
    "iso2": "DAS",
    "latitude": 6.7662687,
    "longitude": 125.3284269
  },
  {
    "id": 1319,
    "name": "Davao del Norte",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "24",
    "iso2": "DAV",
    "latitude": 7.5617699,
    "longitude": 125.6532848
  },
  {
    "id": 1320,
    "name": "Cotabato",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "57",
    "iso2": "NCO",
    "latitude": 7.2046668,
    "longitude": 124.2310439
  },
  {
    "id": 1321,
    "name": "Ilocos Sur",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "29",
    "iso2": "ILS",
    "latitude": 17.2278664,
    "longitude": 120.5739579
  },
  {
    "id": 1322,
    "name": "Eastern Visayas",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "08",
    "iso2": "08",
    "latitude": 12.2445533,
    "longitude": 125.0388164
  },
  {
    "id": 1323,
    "name": "Agusan del Norte",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "02",
    "iso2": "AGN",
    "latitude": 8.9456259,
    "longitude": 125.5319234
  },
  {
    "id": 1324,
    "name": "Abra",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "01",
    "iso2": "ABR",
    "latitude": 42.497083,
    "longitude": -96.38441
  },
  {
    "id": 1325,
    "name": "Zamboanga Peninsula",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "09",
    "iso2": "09",
    "latitude": 8.154077,
    "longitude": 123.258793
  },
  {
    "id": 1326,
    "name": "Agusan del Sur",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "03",
    "iso2": "AGS",
    "latitude": 8.0463888,
    "longitude": 126.0615384
  },
  {
    "id": 1327,
    "name": "Lanao del Norte",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "34",
    "iso2": "LAN",
    "latitude": 7.8721811,
    "longitude": 123.8857747
  },
  {
    "id": 1328,
    "name": "Laguna",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "33",
    "iso2": "LAG",
    "latitude": 33.5427189,
    "longitude": -117.7853568
  },
  {
    "id": 1329,
    "name": "Marinduque",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "38",
    "iso2": "MAD",
    "latitude": 13.4767171,
    "longitude": 121.9032192
  },
  {
    "id": 1330,
    "name": "Maguindanao",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "56",
    "iso2": "MAG",
    "latitude": 6.9422581,
    "longitude": 124.4198243
  },
  {
    "id": 1331,
    "name": "Aklan",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "04",
    "iso2": "AKL",
    "latitude": 11.8166109,
    "longitude": 122.0941541
  },
  {
    "id": 1332,
    "name": "Leyte",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "37",
    "iso2": "LEY",
    "latitude": 10.8624536,
    "longitude": 124.8811195
  },
  {
    "id": 1333,
    "name": "Lanao del Sur",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "35",
    "iso2": "LAS",
    "latitude": 7.823176,
    "longitude": 124.4198243
  },
  {
    "id": 1334,
    "name": "Apayao",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "35",
    "iso2": "APA",
    "latitude": 18.0120304,
    "longitude": 121.1710389
  },
  {
    "id": 1335,
    "name": "Cordillera Administrative Region",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "15",
    "iso2": "15",
    "latitude": 17.3512542,
    "longitude": 121.1718851
  },
  {
    "id": 1336,
    "name": "Antique",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "06",
    "iso2": "ANT",
    "latitude": 37.0358695,
    "longitude": -95.6361694
  },
  {
    "id": 1337,
    "name": "Albay",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "05",
    "iso2": "ALB",
    "latitude": 13.1774827,
    "longitude": 123.5280072
  },
  {
    "id": 1338,
    "name": "Masbate",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "39",
    "iso2": "MAS",
    "latitude": 12.3574346,
    "longitude": 123.5504076
  },
  {
    "id": 1339,
    "name": "Northern Mindanao",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "10",
    "iso2": "10",
    "latitude": 8.0201635,
    "longitude": 124.6856509
  },
  {
    "id": 1340,
    "name": "Davao Region",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "11",
    "iso2": "11",
    "latitude": 7.3041622,
    "longitude": 126.0893406
  },
  {
    "id": 1341,
    "name": "Aurora",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "G8",
    "iso2": "AUR",
    "latitude": 36.970891,
    "longitude": -93.717979
  },
  {
    "id": 1342,
    "name": "Cagayan Valley",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "02",
    "iso2": "02",
    "latitude": 16.9753758,
    "longitude": 121.8107079
  },
  {
    "id": 1343,
    "name": "Misamis Occidental",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "42",
    "iso2": "MSC",
    "latitude": 8.3374903,
    "longitude": 123.7070619
  },
  {
    "id": 1344,
    "name": "Bataan",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "07",
    "iso2": "BAN",
    "latitude": 14.6416842,
    "longitude": 120.4818446
  },
  {
    "id": 1345,
    "name": "Central Luzon",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "03",
    "iso2": "03",
    "latitude": 15.4827722,
    "longitude": 120.7120023
  },
  {
    "id": 1346,
    "name": "Basilan",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "22",
    "iso2": "BAS",
    "latitude": 6.4296349,
    "longitude": 121.9870165
  },
  {
    "id": 1347,
    "name": "Metro Manila",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "00",
    "iso2": "NCR",
    "latitude": 14.6090537,
    "longitude": 121.0222565
  },
  {
    "id": 1348,
    "name": "Misamis Oriental",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "43",
    "iso2": "MSR",
    "latitude": 8.5045558,
    "longitude": 124.6219592
  },
  {
    "id": 1349,
    "name": "Northern Samar",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "67",
    "iso2": "NSA",
    "latitude": 12.3613199,
    "longitude": 124.7740793
  },
  {
    "id": 1350,
    "name": "Negros Oriental",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "46",
    "iso2": "NER",
    "latitude": 9.6282083,
    "longitude": 122.9888319
  },
  {
    "id": 1351,
    "name": "Negros Occidental",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "45",
    "iso2": "NEC",
    "latitude": 10.2925609,
    "longitude": 123.0246518
  },
  {
    "id": 1352,
    "name": "Batanes",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "08",
    "iso2": "BTN",
    "latitude": 20.4485074,
    "longitude": 121.9708129
  },
  {
    "id": 1353,
    "name": "Mountain Province",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "44",
    "iso2": "MOU",
    "latitude": 40.7075437,
    "longitude": -73.9501033
  },
  {
    "id": 1354,
    "name": "Oriental Mindoro",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "41",
    "iso2": "MDR",
    "latitude": 13.0564598,
    "longitude": 121.4069417
  },
  {
    "id": 1355,
    "name": "Ilocos Region",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "01",
    "iso2": "01",
    "latitude": 16.0832144,
    "longitude": 120.6199895
  },
  {
    "id": 1356,
    "name": "Occidental Mindoro",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "40",
    "iso2": "MDC",
    "latitude": 13.1024111,
    "longitude": 120.7651284
  },
  {
    "id": 1357,
    "name": "Zamboanga del Sur",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "66",
    "iso2": "ZAS",
    "latitude": 7.8383054,
    "longitude": 123.2966657
  },
  {
    "id": 1358,
    "name": "Nueva Vizcaya",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "48",
    "iso2": "NUV",
    "latitude": 16.3301107,
    "longitude": 121.1710389
  },
  {
    "id": 1359,
    "name": "Batangas",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "09",
    "iso2": "BTG",
    "latitude": 13.7564651,
    "longitude": 121.0583076
  },
  {
    "id": 1360,
    "name": "Nueva Ecija",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "47",
    "iso2": "NUE",
    "latitude": 15.578375,
    "longitude": 121.1112615
  },
  {
    "id": 1361,
    "name": "Palawan",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "49",
    "iso2": "PLW",
    "latitude": 9.8349493,
    "longitude": 118.7383615
  },
  {
    "id": 1362,
    "name": "Zamboanga Sibugay",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "09",
    "iso2": "ZSI",
    "latitude": 7.5225247,
    "longitude": 122.3107517
  },
  {
    "id": 1363,
    "name": "Benguet",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "10",
    "iso2": "BEN",
    "latitude": 16.5577257,
    "longitude": 120.8039474
  },
  {
    "id": 1364,
    "name": "Pangasinan",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "51",
    "iso2": "PAN",
    "latitude": 15.8949055,
    "longitude": 120.2863183
  },
  {
    "id": 1365,
    "name": "Pampanga",
    "countryId": 174,
    "countryCode": "PH",
    "fipsCode": "50",
    "iso2": "PAM",
    "latitude": 15.079409,
    "longitude": 120.6199895
  },
  {
    "id": 1366,
    "name": "Northern District",
    "countryId": 106,
    "countryCode": "IL",
    "fipsCode": "03",
    "iso2": "Z",
    "latitude": 36.1511864,
    "longitude": -95.9951763
  },
  {
    "id": 1367,
    "name": "Central District",
    "countryId": 106,
    "countryCode": "IL",
    "fipsCode": "02",
    "iso2": "M",
    "latitude": 47.6087583,
    "longitude": -122.2964235
  },
  {
    "id": 1368,
    "name": "Southern District",
    "countryId": 106,
    "countryCode": "IL",
    "fipsCode": "01",
    "iso2": "D",
    "latitude": 40.7137586,
    "longitude": -74.0009059
  },
  {
    "id": 1369,
    "name": "Haifa District",
    "countryId": 106,
    "countryCode": "IL",
    "fipsCode": "04",
    "iso2": "HA",
    "latitude": 32.4814111,
    "longitude": 34.994751
  },
  {
    "id": 1370,
    "name": "Jerusalem District",
    "countryId": 106,
    "countryCode": "IL",
    "fipsCode": "06",
    "iso2": "JM",
    "latitude": 31.7648243,
    "longitude": 34.994751
  },
  {
    "id": 1371,
    "name": "Tel Aviv District",
    "countryId": 106,
    "countryCode": "IL",
    "fipsCode": "05",
    "iso2": "TA",
    "latitude": 32.0929075,
    "longitude": 34.8072165
  },
  {
    "id": 1372,
    "name": "Limburg",
    "countryId": 22,
    "countryCode": "BE",
    "fipsCode": "05",
    "iso2": "VLI",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 1373,
    "name": "Flanders",
    "countryId": 22,
    "countryCode": "BE",
    "fipsCode": "VLG",
    "iso2": "VLG",
    "latitude": 51.0108706,
    "longitude": 3.7264613
  },
  {
    "id": 1374,
    "name": "Flemish Brabant",
    "countryId": 22,
    "countryCode": "BE",
    "fipsCode": "12",
    "iso2": "VBR",
    "latitude": 50.8815434,
    "longitude": 4.564597
  },
  {
    "id": 1375,
    "name": "Hainaut",
    "countryId": 22,
    "countryCode": "BE",
    "fipsCode": "03",
    "iso2": "WHT",
    "latitude": 50.5257076,
    "longitude": 4.0621017
  },
  {
    "id": 1376,
    "name": "Brussels-Capital Region",
    "countryId": 22,
    "countryCode": "BE",
    "fipsCode": "11",
    "iso2": "BRU",
    "latitude": 50.8503463,
    "longitude": 4.3517211
  },
  {
    "id": 1377,
    "name": "East Flanders",
    "countryId": 22,
    "countryCode": "BE",
    "fipsCode": "08",
    "iso2": "VOV",
    "latitude": 51.0362101,
    "longitude": 3.7373124
  },
  {
    "id": 1378,
    "name": "Namur",
    "countryId": 22,
    "countryCode": "BE",
    "fipsCode": "07",
    "iso2": "WNA",
    "latitude": 50.4673883,
    "longitude": 4.8719854
  },
  {
    "id": 1379,
    "name": "Luxembourg",
    "countryId": 22,
    "countryCode": "BE",
    "fipsCode": "06",
    "iso2": "WLX",
    "latitude": 49.815273,
    "longitude": 6.129583
  },
  {
    "id": 1380,
    "name": "Wallonia",
    "countryId": 22,
    "countryCode": "BE",
    "fipsCode": "WAL",
    "iso2": "WAL",
    "latitude": 50.4175637,
    "longitude": 4.4510066
  },
  {
    "id": 1381,
    "name": "Antwerp",
    "countryId": 22,
    "countryCode": "BE",
    "fipsCode": "01",
    "iso2": "VAN",
    "latitude": 51.2194475,
    "longitude": 4.4024643
  },
  {
    "id": 1382,
    "name": "Walloon Brabant",
    "countryId": 22,
    "countryCode": "BE",
    "fipsCode": "10",
    "iso2": "WBR",
    "latitude": 50.633241,
    "longitude": 4.524315
  },
  {
    "id": 1383,
    "name": "West Flanders",
    "countryId": 22,
    "countryCode": "BE",
    "fipsCode": "09",
    "iso2": "VWV",
    "latitude": 40.0179334,
    "longitude": -105.2806733
  },
  {
    "id": 1384,
    "name": "Liège",
    "countryId": 22,
    "countryCode": "BE",
    "fipsCode": "04",
    "iso2": "WLG",
    "latitude": 50.6325574,
    "longitude": 5.5796662
  },
  {
    "id": 1385,
    "name": "Darién Province",
    "countryId": 170,
    "countryCode": "PA",
    "fipsCode": "05",
    "iso2": "5",
    "latitude": 7.8681713,
    "longitude": -77.8367282
  },
  {
    "id": 1386,
    "name": "Colón Province",
    "countryId": 170,
    "countryCode": "PA",
    "fipsCode": "04",
    "iso2": "3",
    "latitude": 9.1851989,
    "longitude": -80.0534923
  },
  {
    "id": 1387,
    "name": "Coclé Province",
    "countryId": 170,
    "countryCode": "PA",
    "fipsCode": "03",
    "iso2": "2",
    "latitude": 8.6266068,
    "longitude": -80.365865
  },
  {
    "id": 1388,
    "name": "Guna Yala",
    "countryId": 170,
    "countryCode": "PA",
    "fipsCode": "09",
    "iso2": "KY",
    "latitude": 9.2344395,
    "longitude": -78.192625
  },
  {
    "id": 1389,
    "name": "Herrera Province",
    "countryId": 170,
    "countryCode": "PA",
    "fipsCode": "06",
    "iso2": "6",
    "latitude": 7.7704282,
    "longitude": -80.7214417
  },
  {
    "id": 1390,
    "name": "Los Santos Province",
    "countryId": 170,
    "countryCode": "PA",
    "fipsCode": "07",
    "iso2": "7",
    "latitude": 7.5909302,
    "longitude": -80.365865
  },
  {
    "id": 1391,
    "name": "Ngöbe-Buglé Comarca",
    "countryId": 170,
    "countryCode": "PA",
    "fipsCode": "12",
    "iso2": "NB",
    "latitude": 8.6595833,
    "longitude": -81.7787021
  },
  {
    "id": 1392,
    "name": "Veraguas Province",
    "countryId": 170,
    "countryCode": "PA",
    "fipsCode": "10",
    "iso2": "9",
    "latitude": 8.1231033,
    "longitude": -81.0754657
  },
  {
    "id": 1393,
    "name": "Bocas del Toro Province",
    "countryId": 170,
    "countryCode": "PA",
    "fipsCode": "01",
    "iso2": "1",
    "latitude": 9.4165521,
    "longitude": -82.5207787
  },
  {
    "id": 1394,
    "name": "Panamá Oeste Province",
    "countryId": 170,
    "countryCode": "PA",
    "fipsCode": "13",
    "iso2": "10",
    "latitude": 9.1196751,
    "longitude": -79.2902133
  },
  {
    "id": 1395,
    "name": "Panamá Province",
    "countryId": 170,
    "countryCode": "PA",
    "fipsCode": "08",
    "iso2": "8",
    "latitude": 9.1196751,
    "longitude": -79.2902133
  },
  {
    "id": 1396,
    "name": "Emberá-Wounaan Comarca",
    "countryId": 170,
    "countryCode": "PA",
    "fipsCode": "11",
    "iso2": "EM",
    "latitude": 8.3766983,
    "longitude": -77.6536125
  },
  {
    "id": 1397,
    "name": "Chiriquí Province",
    "countryId": 170,
    "countryCode": "PA",
    "fipsCode": "02",
    "iso2": "4",
    "latitude": 8.584898,
    "longitude": -82.3885783
  },
  {
    "id": 1398,
    "name": "Howland Island",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "HQ",
    "iso2": "UM-84",
    "latitude": 0.8113219,
    "longitude": -176.6182736
  },
  {
    "id": 1399,
    "name": "Delaware",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "10",
    "iso2": "DE",
    "latitude": 38.9108325,
    "longitude": -75.5276699
  },
  {
    "id": 1400,
    "name": "Alaska",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "02",
    "iso2": "AK",
    "latitude": 64.2008413,
    "longitude": -149.4936733
  },
  {
    "id": 1401,
    "name": "Maryland",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "24",
    "iso2": "MD",
    "latitude": 39.0457549,
    "longitude": -76.6412712
  },
  {
    "id": 1402,
    "name": "Baker Island",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "FQ",
    "iso2": "UM-81",
    "latitude": 0.1936266,
    "longitude": -176.476908
  },
  {
    "id": 1403,
    "name": "Kingman Reef",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "KQ",
    "iso2": "UM-89",
    "latitude": 6.383333,
    "longitude": -162.416667
  },
  {
    "id": 1404,
    "name": "New Hampshire",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "33",
    "iso2": "NH",
    "latitude": 43.1938516,
    "longitude": -71.5723953
  },
  {
    "id": 1405,
    "name": "Wake Island",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "WQ",
    "iso2": "UM-79",
    "latitude": 19.279619,
    "longitude": 166.6499348
  },
  {
    "id": 1406,
    "name": "Kansas",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "20",
    "iso2": "KS",
    "latitude": 39.011902,
    "longitude": -98.4842465
  },
  {
    "id": 1407,
    "name": "Texas",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "48",
    "iso2": "TX",
    "latitude": 31.9685988,
    "longitude": -99.9018131
  },
  {
    "id": 1408,
    "name": "Nebraska",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "31",
    "iso2": "NE",
    "latitude": 41.4925374,
    "longitude": -99.9018131
  },
  {
    "id": 1409,
    "name": "Vermont",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "50",
    "iso2": "VT",
    "latitude": 44.5588028,
    "longitude": -72.5778415
  },
  {
    "id": 1410,
    "name": "Jarvis Island",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "DQ",
    "iso2": "UM-86",
    "latitude": -0.3743503,
    "longitude": -159.9967206
  },
  {
    "id": 1411,
    "name": "Hawaii",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "15",
    "iso2": "HI",
    "latitude": 19.8967662,
    "longitude": -155.5827818
  },
  {
    "id": 1412,
    "name": "Guam",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "GQ",
    "iso2": "GU",
    "latitude": 13.444304,
    "longitude": 144.793731
  },
  {
    "id": 1413,
    "name": "United States Virgin Islands",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "VQ",
    "iso2": "VI",
    "latitude": 18.335765,
    "longitude": -64.896335
  },
  {
    "id": 1414,
    "name": "Utah",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "49",
    "iso2": "UT",
    "latitude": 39.3209801,
    "longitude": -111.0937311
  },
  {
    "id": 1415,
    "name": "Oregon",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "41",
    "iso2": "OR",
    "latitude": 43.8041334,
    "longitude": -120.5542012
  },
  {
    "id": 1416,
    "name": "California",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "06",
    "iso2": "CA",
    "latitude": 36.778261,
    "longitude": -119.4179324
  },
  {
    "id": 1417,
    "name": "New Jersey",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "34",
    "iso2": "NJ",
    "latitude": 40.0583238,
    "longitude": -74.4056612
  },
  {
    "id": 1418,
    "name": "North Dakota",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "38",
    "iso2": "ND",
    "latitude": 47.5514926,
    "longitude": -101.0020119
  },
  {
    "id": 1419,
    "name": "Kentucky",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "21",
    "iso2": "KY",
    "latitude": 37.8393332,
    "longitude": -84.2700179
  },
  {
    "id": 1420,
    "name": "Minnesota",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "27",
    "iso2": "MN",
    "latitude": 46.729553,
    "longitude": -94.6858998
  },
  {
    "id": 1421,
    "name": "Oklahoma",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "40",
    "iso2": "OK",
    "latitude": 35.4675602,
    "longitude": -97.5164276
  },
  {
    "id": 1422,
    "name": "Pennsylvania",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "42",
    "iso2": "PA",
    "latitude": 41.2033216,
    "longitude": -77.1945247
  },
  {
    "id": 1423,
    "name": "New Mexico",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "35",
    "iso2": "NM",
    "latitude": 34.5199402,
    "longitude": -105.8700901
  },
  {
    "id": 1424,
    "name": "American Samoa",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "AQ",
    "iso2": "AS",
    "latitude": -14.270972,
    "longitude": -170.132217
  },
  {
    "id": 1425,
    "name": "Illinois",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "17",
    "iso2": "IL",
    "latitude": 40.6331249,
    "longitude": -89.3985283
  },
  {
    "id": 1426,
    "name": "Michigan",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "26",
    "iso2": "MI",
    "latitude": 44.3148443,
    "longitude": -85.6023643
  },
  {
    "id": 1427,
    "name": "Virginia",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "51",
    "iso2": "VA",
    "latitude": 37.4315734,
    "longitude": -78.6568942
  },
  {
    "id": 1428,
    "name": "Johnston Atoll",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "JQ",
    "iso2": "UM-67",
    "latitude": 16.7295035,
    "longitude": -169.5336477
  },
  {
    "id": 1429,
    "name": "West Virginia",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "54",
    "iso2": "WV",
    "latitude": 38.5976262,
    "longitude": -80.4549026
  },
  {
    "id": 1430,
    "name": "Mississippi",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "28",
    "iso2": "MS",
    "latitude": 32.3546679,
    "longitude": -89.3985283
  },
  {
    "id": 1431,
    "name": "Northern Mariana Islands",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "CQ",
    "iso2": "MP",
    "latitude": 15.0979,
    "longitude": 145.6739
  },
  {
    "id": 1433,
    "name": "Massachusetts",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "25",
    "iso2": "MA",
    "latitude": 42.4072107,
    "longitude": -71.3824374
  },
  {
    "id": 1434,
    "name": "Arizona",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "04",
    "iso2": "AZ",
    "latitude": 34.0489281,
    "longitude": -111.0937311
  },
  {
    "id": 1435,
    "name": "Connecticut",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "09",
    "iso2": "CT",
    "latitude": 41.6032207,
    "longitude": -73.087749
  },
  {
    "id": 1436,
    "name": "Florida",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "12",
    "iso2": "FL",
    "latitude": 27.6648274,
    "longitude": -81.5157535
  },
  {
    "id": 1437,
    "name": "District of Columbia",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "11",
    "iso2": "DC",
    "latitude": 38.9071923,
    "longitude": -77.0368707
  },
  {
    "id": 1438,
    "name": "Midway Atoll",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "MQ",
    "iso2": "UM-71",
    "latitude": 28.2072168,
    "longitude": -177.3734926
  },
  {
    "id": 1439,
    "name": "Navassa Island",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "BQ",
    "iso2": "UM-76",
    "latitude": 18.4100689,
    "longitude": -75.0114612
  },
  {
    "id": 1440,
    "name": "Indiana",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "18",
    "iso2": "IN",
    "latitude": 40.2671941,
    "longitude": -86.1349019
  },
  {
    "id": 1441,
    "name": "Wisconsin",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "55",
    "iso2": "WI",
    "latitude": 43.7844397,
    "longitude": -88.7878678
  },
  {
    "id": 1442,
    "name": "Wyoming",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "56",
    "iso2": "WY",
    "latitude": 43.0759678,
    "longitude": -107.2902839
  },
  {
    "id": 1443,
    "name": "South Carolina",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "45",
    "iso2": "SC",
    "latitude": 33.836081,
    "longitude": -81.1637245
  },
  {
    "id": 1444,
    "name": "Arkansas",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "05",
    "iso2": "AR",
    "latitude": 35.20105,
    "longitude": -91.8318334
  },
  {
    "id": 1445,
    "name": "South Dakota",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "46",
    "iso2": "SD",
    "latitude": 43.9695148,
    "longitude": -99.9018131
  },
  {
    "id": 1446,
    "name": "Montana",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "30",
    "iso2": "MT",
    "latitude": 46.8796822,
    "longitude": -110.3625658
  },
  {
    "id": 1447,
    "name": "North Carolina",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "37",
    "iso2": "NC",
    "latitude": 35.7595731,
    "longitude": -79.0192997
  },
  {
    "id": 1448,
    "name": "Palmyra Atoll",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "LQ",
    "iso2": "UM-95",
    "latitude": 5.8885026,
    "longitude": -162.0786656
  },
  {
    "id": 1449,
    "name": "Puerto Rico",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "RQ",
    "iso2": "PR",
    "latitude": 18.220833,
    "longitude": -66.590149
  },
  {
    "id": 1450,
    "name": "Colorado",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "08",
    "iso2": "CO",
    "latitude": 39.5500507,
    "longitude": -105.7820674
  },
  {
    "id": 1451,
    "name": "Missouri",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "29",
    "iso2": "MO",
    "latitude": 37.9642529,
    "longitude": -91.8318334
  },
  {
    "id": 1452,
    "name": "New York",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "36",
    "iso2": "NY",
    "latitude": 40.7127753,
    "longitude": -74.0059728
  },
  {
    "id": 1453,
    "name": "Maine",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "23",
    "iso2": "ME",
    "latitude": 45.253783,
    "longitude": -69.4454689
  },
  {
    "id": 1454,
    "name": "Tennessee",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "47",
    "iso2": "TN",
    "latitude": 35.5174913,
    "longitude": -86.5804473
  },
  {
    "id": 1455,
    "name": "Georgia",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "13",
    "iso2": "GA",
    "latitude": 32.1656221,
    "longitude": -82.9000751
  },
  {
    "id": 1456,
    "name": "Alabama",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "01",
    "iso2": "AL",
    "latitude": 32.3182314,
    "longitude": -86.902298
  },
  {
    "id": 1457,
    "name": "Louisiana",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "22",
    "iso2": "LA",
    "latitude": 30.9842977,
    "longitude": -91.9623327
  },
  {
    "id": 1458,
    "name": "Nevada",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "32",
    "iso2": "NV",
    "latitude": 38.8026097,
    "longitude": -116.419389
  },
  {
    "id": 1459,
    "name": "Iowa",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "19",
    "iso2": "IA",
    "latitude": 41.8780025,
    "longitude": -93.097702
  },
  {
    "id": 1460,
    "name": "Idaho",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "16",
    "iso2": "ID",
    "latitude": 44.0682019,
    "longitude": -114.7420408
  },
  {
    "id": 1461,
    "name": "Rhode Island",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "44",
    "iso2": "RI",
    "latitude": 41.5800945,
    "longitude": -71.4774291
  },
  {
    "id": 1462,
    "name": "Washington",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "53",
    "iso2": "WA",
    "latitude": 47.7510741,
    "longitude": -120.7401385
  },
  {
    "id": 1463,
    "name": "Shinyanga Region",
    "countryId": 218,
    "countryCode": "TZ",
    "fipsCode": "15",
    "iso2": "22",
    "latitude": -3.6809961,
    "longitude": 33.4271403
  },
  {
    "id": 1464,
    "name": "Simiyu Region",
    "countryId": 218,
    "countryCode": "TZ",
    "fipsCode": "31",
    "iso2": "30",
    "latitude": -2.8308738,
    "longitude": 34.1531947
  },
  {
    "id": 1465,
    "name": "Kagera Region",
    "countryId": 218,
    "countryCode": "TZ",
    "fipsCode": "19",
    "iso2": "05",
    "latitude": -1.3001115,
    "longitude": 31.2626366
  },
  {
    "id": 1466,
    "name": "Dodoma Region",
    "countryId": 218,
    "countryCode": "TZ",
    "fipsCode": "03",
    "iso2": "03",
    "latitude": -6.5738228,
    "longitude": 36.2630846
  },
  {
    "id": 1467,
    "name": "Kilimanjaro Region",
    "countryId": 218,
    "countryCode": "TZ",
    "fipsCode": "06",
    "iso2": "09",
    "latitude": -4.1336927,
    "longitude": 37.8087693
  },
  {
    "id": 1468,
    "name": "Mara Region",
    "countryId": 218,
    "countryCode": "TZ",
    "fipsCode": "08",
    "iso2": "13",
    "latitude": -1.7753538,
    "longitude": 34.1531947
  },
  {
    "id": 1469,
    "name": "Tabora Region",
    "countryId": 218,
    "countryCode": "TZ",
    "fipsCode": "17",
    "iso2": "24",
    "latitude": -5.0342138,
    "longitude": 32.8084496
  },
  {
    "id": 1470,
    "name": "Morogoro Region",
    "countryId": 218,
    "countryCode": "TZ",
    "fipsCode": "10",
    "iso2": "16",
    "latitude": -8.8137173,
    "longitude": 36.954107
  },
  {
    "id": 1471,
    "name": "Zanzibar Central/South Region",
    "countryId": 218,
    "countryCode": "TZ",
    "fipsCode": "21",
    "iso2": "11",
    "latitude": -6.2642851,
    "longitude": 39.4450281
  },
  {
    "id": 1472,
    "name": "South Pemba Region",
    "countryId": 218,
    "countryCode": "TZ",
    "fipsCode": "20",
    "iso2": "10",
    "latitude": -5.3146961,
    "longitude": 39.7549511
  },
  {
    "id": 1473,
    "name": "Zanzibar North Region",
    "countryId": 218,
    "countryCode": "TZ",
    "fipsCode": "22",
    "iso2": "07",
    "latitude": -5.9395093,
    "longitude": 39.2791011
  },
  {
    "id": 1474,
    "name": "Singida Region",
    "countryId": 218,
    "countryCode": "TZ",
    "fipsCode": "16",
    "iso2": "23",
    "latitude": -6.7453352,
    "longitude": 34.1531947
  },
  {
    "id": 1475,
    "name": "Zanzibar Urban/West Region",
    "countryId": 218,
    "countryCode": "TZ",
    "fipsCode": "25",
    "iso2": "15",
    "latitude": -6.2298136,
    "longitude": 39.2583293
  },
  {
    "id": 1476,
    "name": "Mtwara Region",
    "countryId": 218,
    "countryCode": "TZ",
    "fipsCode": "11",
    "iso2": "17",
    "latitude": -10.3398455,
    "longitude": 40.1657466
  },
  {
    "id": 1477,
    "name": "Rukwa Region",
    "countryId": 218,
    "countryCode": "TZ",
    "fipsCode": "24",
    "iso2": "20",
    "latitude": -8.0109444,
    "longitude": 31.4456179
  },
  {
    "id": 1478,
    "name": "Kigoma Region",
    "countryId": 218,
    "countryCode": "TZ",
    "fipsCode": "05",
    "iso2": "08",
    "latitude": -4.8824092,
    "longitude": 29.6615055
  },
  {
    "id": 1479,
    "name": "Mwanza Region",
    "countryId": 218,
    "countryCode": "TZ",
    "fipsCode": "12",
    "iso2": "18",
    "latitude": -2.4671197,
    "longitude": 32.8986812
  },
  {
    "id": 1480,
    "name": "Njombe Region",
    "countryId": 218,
    "countryCode": "TZ",
    "fipsCode": "30",
    "iso2": "29",
    "latitude": -9.2422632,
    "longitude": 35.1268781
  },
  {
    "id": 1481,
    "name": "Geita Region",
    "countryId": 218,
    "countryCode": "TZ",
    "fipsCode": "28",
    "iso2": "27",
    "latitude": -2.8242257,
    "longitude": 32.2653887
  },
  {
    "id": 1482,
    "name": "Katavi Region",
    "countryId": 218,
    "countryCode": "TZ",
    "fipsCode": "29",
    "iso2": "28",
    "latitude": -6.3677125,
    "longitude": 31.2626366
  },
  {
    "id": 1483,
    "name": "Lindi Region",
    "countryId": 218,
    "countryCode": "TZ",
    "fipsCode": "07",
    "iso2": "12",
    "latitude": -9.2343394,
    "longitude": 38.3165725
  },
  {
    "id": 1484,
    "name": "Manyara Region",
    "countryId": 218,
    "countryCode": "TZ",
    "fipsCode": "27",
    "iso2": "26",
    "latitude": -4.3150058,
    "longitude": 36.954107
  },
  {
    "id": 1485,
    "name": "Pwani Region",
    "countryId": 218,
    "countryCode": "TZ",
    "fipsCode": "02",
    "iso2": "19",
    "latitude": -7.3237714,
    "longitude": 38.8205454
  },
  {
    "id": 1486,
    "name": "Ruvuma Region",
    "countryId": 218,
    "countryCode": "TZ",
    "fipsCode": "14",
    "iso2": "21",
    "latitude": -10.6878717,
    "longitude": 36.2630846
  },
  {
    "id": 1487,
    "name": "Tanga Region",
    "countryId": 218,
    "countryCode": "TZ",
    "fipsCode": "18",
    "iso2": "25",
    "latitude": -5.3049789,
    "longitude": 38.3165725
  },
  {
    "id": 1488,
    "name": "North Pemba Region",
    "countryId": 218,
    "countryCode": "TZ",
    "fipsCode": "13",
    "iso2": "06",
    "latitude": -5.0319352,
    "longitude": 39.7755571
  },
  {
    "id": 1489,
    "name": "Iringa Region",
    "countryId": 218,
    "countryCode": "TZ",
    "fipsCode": "04",
    "iso2": "04",
    "latitude": -7.7887442,
    "longitude": 35.5657862
  },
  {
    "id": 1490,
    "name": "Dar es Salaam Region",
    "countryId": 218,
    "countryCode": "TZ",
    "fipsCode": "23",
    "iso2": "02",
    "latitude": -6.792354,
    "longitude": 39.2083284
  },
  {
    "id": 1491,
    "name": "Arusha Region",
    "countryId": 218,
    "countryCode": "TZ",
    "fipsCode": "26",
    "iso2": "01",
    "latitude": -3.3869254,
    "longitude": 36.6829927
  },
  {
    "id": 1492,
    "name": "Eastern Finland Province",
    "countryId": 74,
    "countryCode": "FI",
    "fipsCode": "14",
    "iso2": "IS",
    "latitude": 62.5633891,
    "longitude": 28.5024042
  },
  {
    "id": 1493,
    "name": "Tavastia Proper",
    "countryId": 74,
    "countryCode": "FI",
    "fipsCode": "05",
    "iso2": "06",
    "latitude": 60.907015,
    "longitude": 24.3005498
  },
  {
    "id": 1494,
    "name": "Central Ostrobothnia",
    "countryId": 74,
    "countryCode": "FI",
    "fipsCode": "16",
    "iso2": "07",
    "latitude": 63.5621735,
    "longitude": 24.0013631
  },
  {
    "id": 1495,
    "name": "Southern Savonia",
    "countryId": 74,
    "countryCode": "FI",
    "fipsCode": "10",
    "iso2": "04",
    "latitude": 61.6945148,
    "longitude": 27.8005015
  },
  {
    "id": 1496,
    "name": "Kainuu",
    "countryId": 74,
    "countryCode": "FI",
    "fipsCode": "18",
    "iso2": "05",
    "latitude": 64.3736564,
    "longitude": 28.7437475
  },
  {
    "id": 1497,
    "name": "South Karelia",
    "countryId": 74,
    "countryCode": "FI",
    "fipsCode": "09",
    "iso2": "02",
    "latitude": 61.1181949,
    "longitude": 28.1024372
  },
  {
    "id": 1498,
    "name": "Southern Ostrobothnia",
    "countryId": 74,
    "countryCode": "FI",
    "fipsCode": "14",
    "iso2": "03",
    "latitude": 62.9433099,
    "longitude": 23.5285267
  },
  {
    "id": 1499,
    "name": "Oulu Province",
    "countryId": 74,
    "countryCode": "FI",
    "fipsCode": "08",
    "iso2": "OL",
    "latitude": 65.0120748,
    "longitude": 25.4650496
  },
  {
    "id": 1500,
    "name": "Lapland",
    "countryId": 74,
    "countryCode": "FI",
    "fipsCode": "19",
    "iso2": "LL",
    "latitude": 67.9222304,
    "longitude": 26.5046438
  },
  {
    "id": 1501,
    "name": "Satakunta",
    "countryId": 74,
    "countryCode": "FI",
    "fipsCode": "04",
    "iso2": "17",
    "latitude": 61.5932758,
    "longitude": 22.1483081
  },
  {
    "id": 1502,
    "name": "Päijänne Tavastia",
    "countryId": 74,
    "countryCode": "FI",
    "fipsCode": "07",
    "iso2": "16",
    "latitude": 61.3230041,
    "longitude": 25.7322496
  },
  {
    "id": 1503,
    "name": "Northern Savonia",
    "countryId": 74,
    "countryCode": "FI",
    "fipsCode": "07",
    "iso2": "15",
    "latitude": 63.08448,
    "longitude": 27.0253504
  },
  {
    "id": 1504,
    "name": "North Karelia",
    "countryId": 74,
    "countryCode": "FI",
    "fipsCode": "12",
    "iso2": "13",
    "latitude": 62.8062078,
    "longitude": 30.1553887
  },
  {
    "id": 1505,
    "name": "Northern Ostrobothnia",
    "countryId": 74,
    "countryCode": "FI",
    "fipsCode": "17",
    "iso2": "14",
    "latitude": 65.279493,
    "longitude": 26.2890417
  },
  {
    "id": 1506,
    "name": "Pirkanmaa",
    "countryId": 74,
    "countryCode": "FI",
    "fipsCode": "06",
    "iso2": "11",
    "latitude": 61.6986918,
    "longitude": 23.7895598
  },
  {
    "id": 1507,
    "name": "Finland Proper",
    "countryId": 74,
    "countryCode": "FI",
    "fipsCode": "02",
    "iso2": "19",
    "latitude": 60.3627914,
    "longitude": 22.4439369
  },
  {
    "id": 1508,
    "name": "Ostrobothnia",
    "countryId": 74,
    "countryCode": "FI",
    "fipsCode": "15",
    "iso2": "12",
    "latitude": 63.1181757,
    "longitude": 21.9061062
  },
  {
    "id": 1509,
    "name": "Åland Islands",
    "countryId": 74,
    "countryCode": "FI",
    "fipsCode": "01",
    "iso2": "01",
    "latitude": 60.1785247,
    "longitude": 19.9156105
  },
  {
    "id": 1510,
    "name": "Uusimaa",
    "countryId": 74,
    "countryCode": "FI",
    "fipsCode": "01",
    "iso2": "18",
    "latitude": 60.21872,
    "longitude": 25.271621
  },
  {
    "id": 1511,
    "name": "Central Finland",
    "countryId": 74,
    "countryCode": "FI",
    "fipsCode": "13",
    "iso2": "08",
    "latitude": 62.5666743,
    "longitude": 25.5549445
  },
  {
    "id": 1512,
    "name": "Kymenlaakso",
    "countryId": 74,
    "countryCode": "FI",
    "fipsCode": "08",
    "iso2": "09",
    "latitude": 60.780512,
    "longitude": 26.8829336
  },
  {
    "id": 1513,
    "name": "Canton of Diekirch",
    "countryId": 127,
    "countryCode": "LU",
    "fipsCode": "08",
    "iso2": "DI",
    "latitude": 49.8671784,
    "longitude": 6.1595633
  },
  {
    "id": 1514,
    "name": "Luxembourg District",
    "countryId": 127,
    "countryCode": "LU",
    "fipsCode": "03",
    "iso2": "L",
    "latitude": 49.5953706,
    "longitude": 6.1333178
  },
  {
    "id": 1515,
    "name": "Canton of Echternach",
    "countryId": 127,
    "countryCode": "LU",
    "fipsCode": "03",
    "iso2": "EC",
    "latitude": 49.8114133,
    "longitude": 6.4175635
  },
  {
    "id": 1516,
    "name": "Canton of Redange",
    "countryId": 127,
    "countryCode": "LU",
    "fipsCode": "03",
    "iso2": "RD",
    "latitude": 49.76455,
    "longitude": 5.88948
  },
  {
    "id": 1517,
    "name": "Canton of Esch-sur-Alzette",
    "countryId": 127,
    "countryCode": "LU",
    "fipsCode": "03",
    "iso2": "ES",
    "latitude": 49.5008805,
    "longitude": 5.9860925
  },
  {
    "id": 1518,
    "name": "Canton of Capellen",
    "countryId": 127,
    "countryCode": "LU",
    "fipsCode": "03",
    "iso2": "CA",
    "latitude": 49.6403931,
    "longitude": 5.9553846
  },
  {
    "id": 1519,
    "name": "Canton of Remich",
    "countryId": 127,
    "countryCode": "LU",
    "fipsCode": "03",
    "iso2": "RM",
    "latitude": 49.545017,
    "longitude": 6.3674222
  },
  {
    "id": 1520,
    "name": "Grevenmacher District",
    "countryId": 127,
    "countryCode": "LU",
    "fipsCode": "02",
    "iso2": "G",
    "latitude": 49.680851,
    "longitude": 6.4407524
  },
  {
    "id": 1521,
    "name": "Canton of Clervaux",
    "countryId": 127,
    "countryCode": "LU",
    "fipsCode": "02",
    "iso2": "CL",
    "latitude": 50.0546313,
    "longitude": 6.0285875
  },
  {
    "id": 1522,
    "name": "Canton of Mersch",
    "countryId": 127,
    "countryCode": "LU",
    "fipsCode": "02",
    "iso2": "ME",
    "latitude": 49.7542906,
    "longitude": 6.1292185
  },
  {
    "id": 1523,
    "name": "Canton of Vianden",
    "countryId": 127,
    "countryCode": "LU",
    "fipsCode": "02",
    "iso2": "VD",
    "latitude": 49.9341924,
    "longitude": 6.2019917
  },
  {
    "id": 1524,
    "name": "Diekirch District",
    "countryId": 127,
    "countryCode": "LU",
    "fipsCode": "01",
    "iso2": "D",
    "latitude": 49.867172,
    "longitude": 6.1596362
  },
  {
    "id": 1525,
    "name": "Canton of Grevenmacher",
    "countryId": 127,
    "countryCode": "LU",
    "fipsCode": "01",
    "iso2": "GR",
    "latitude": 49.680841,
    "longitude": 6.4407593
  },
  {
    "id": 1526,
    "name": "Canton of Wiltz",
    "countryId": 127,
    "countryCode": "LU",
    "fipsCode": "01",
    "iso2": "WI",
    "latitude": 49.96622,
    "longitude": 5.9324306
  },
  {
    "id": 1527,
    "name": "Canton of Luxembourg",
    "countryId": 127,
    "countryCode": "LU",
    "fipsCode": "01",
    "iso2": "LU",
    "latitude": 49.6301025,
    "longitude": 6.1520185
  },
  {
    "id": 1528,
    "name": "Region Zealand",
    "countryId": 59,
    "countryCode": "DK",
    "fipsCode": "20",
    "iso2": "85",
    "latitude": 55.4632518,
    "longitude": 11.7214979
  },
  {
    "id": 1529,
    "name": "Region of Southern Denmark",
    "countryId": 59,
    "countryCode": "DK",
    "fipsCode": "21",
    "iso2": "83",
    "latitude": 55.3307714,
    "longitude": 9.0924903
  },
  {
    "id": 1530,
    "name": "Capital Region of Denmark",
    "countryId": 59,
    "countryCode": "DK",
    "fipsCode": "17",
    "iso2": "84",
    "latitude": 55.6751812,
    "longitude": 12.5493261
  },
  {
    "id": 1531,
    "name": "Central Denmark Region",
    "countryId": 59,
    "countryCode": "DK",
    "fipsCode": "18",
    "iso2": "82",
    "latitude": 56.302139,
    "longitude": 9.302777
  },
  {
    "id": 1532,
    "name": "North Denmark Region",
    "countryId": 59,
    "countryCode": "DK",
    "fipsCode": "19",
    "iso2": "81",
    "latitude": 56.8307416,
    "longitude": 9.4930527
  },
  {
    "id": 1533,
    "name": "Gävleborg County",
    "countryId": 213,
    "countryCode": "SE",
    "fipsCode": "03",
    "iso2": "X",
    "latitude": 61.3011993,
    "longitude": 16.1534214
  },
  {
    "id": 1534,
    "name": "Dalarna County",
    "countryId": 213,
    "countryCode": "SE",
    "fipsCode": "10",
    "iso2": "W",
    "latitude": 61.0917012,
    "longitude": 14.6663653
  },
  {
    "id": 1535,
    "name": "Värmland County",
    "countryId": 213,
    "countryCode": "SE",
    "fipsCode": "22",
    "iso2": "S",
    "latitude": 59.7294065,
    "longitude": 13.2354024
  },
  {
    "id": 1536,
    "name": "Östergötland County",
    "countryId": 213,
    "countryCode": "SE",
    "fipsCode": "16",
    "iso2": "E",
    "latitude": 58.3453635,
    "longitude": 15.5197844
  },
  {
    "id": 1537,
    "name": "Blekinge",
    "countryId": 213,
    "countryCode": "SE",
    "fipsCode": "02",
    "iso2": "K",
    "latitude": 56.2783837,
    "longitude": 15.0180058
  },
  {
    "id": 1538,
    "name": "Norrbotten County",
    "countryId": 213,
    "countryCode": "SE",
    "fipsCode": "14",
    "iso2": "BD",
    "latitude": 66.8309216,
    "longitude": 20.3991966
  },
  {
    "id": 1539,
    "name": "Örebro County",
    "countryId": 213,
    "countryCode": "SE",
    "fipsCode": "15",
    "iso2": "T",
    "latitude": 59.535036,
    "longitude": 15.0065731
  },
  {
    "id": 1540,
    "name": "Södermanland County",
    "countryId": 213,
    "countryCode": "SE",
    "fipsCode": "18",
    "iso2": "D",
    "latitude": 59.0336349,
    "longitude": 16.7518899
  },
  {
    "id": 1541,
    "name": "Skåne County",
    "countryId": 213,
    "countryCode": "SE",
    "fipsCode": "27",
    "iso2": "M",
    "latitude": 55.9902572,
    "longitude": 13.5957692
  },
  {
    "id": 1542,
    "name": "Kronoberg County",
    "countryId": 213,
    "countryCode": "SE",
    "fipsCode": "12",
    "iso2": "G",
    "latitude": 56.7183403,
    "longitude": 14.4114673
  },
  {
    "id": 1543,
    "name": "Västerbotten County",
    "countryId": 213,
    "countryCode": "SE",
    "fipsCode": "23",
    "iso2": "AC",
    "latitude": 65.3337311,
    "longitude": 16.5161694
  },
  {
    "id": 1544,
    "name": "Kalmar County",
    "countryId": 213,
    "countryCode": "SE",
    "fipsCode": "09",
    "iso2": "H",
    "latitude": 57.2350156,
    "longitude": 16.1849349
  },
  {
    "id": 1545,
    "name": "Uppsala County",
    "countryId": 213,
    "countryCode": "SE",
    "fipsCode": "21",
    "iso2": "C",
    "latitude": 60.0092262,
    "longitude": 17.2714588
  },
  {
    "id": 1546,
    "name": "Gotland County",
    "countryId": 213,
    "countryCode": "SE",
    "fipsCode": "05",
    "iso2": "I",
    "latitude": 57.4684121,
    "longitude": 18.4867447
  },
  {
    "id": 1547,
    "name": "Västra Götaland County",
    "countryId": 213,
    "countryCode": "SE",
    "fipsCode": "28",
    "iso2": "O",
    "latitude": 58.2527926,
    "longitude": 13.0596425
  },
  {
    "id": 1548,
    "name": "Halland County",
    "countryId": 213,
    "countryCode": "SE",
    "fipsCode": "06",
    "iso2": "N",
    "latitude": 56.8966805,
    "longitude": 12.8033993
  },
  {
    "id": 1549,
    "name": "Västmanland County",
    "countryId": 213,
    "countryCode": "SE",
    "fipsCode": "25",
    "iso2": "U",
    "latitude": 59.6713879,
    "longitude": 16.2158953
  },
  {
    "id": 1550,
    "name": "Jönköping County",
    "countryId": 213,
    "countryCode": "SE",
    "fipsCode": "08",
    "iso2": "F",
    "latitude": 57.3708434,
    "longitude": 14.3439174
  },
  {
    "id": 1551,
    "name": "Stockholm County",
    "countryId": 213,
    "countryCode": "SE",
    "fipsCode": "26",
    "iso2": "AB",
    "latitude": 59.6024958,
    "longitude": 18.1384383
  },
  {
    "id": 1552,
    "name": "Västernorrland County",
    "countryId": 213,
    "countryCode": "SE",
    "fipsCode": "24",
    "iso2": "Y",
    "latitude": 63.4276473,
    "longitude": 17.7292444
  },
  {
    "id": 1553,
    "name": "Plungė District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "24",
    "iso2": "35",
    "latitude": 55.910784,
    "longitude": 21.8454069
  },
  {
    "id": 1554,
    "name": "Šiauliai District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "61",
    "iso2": "44",
    "latitude": 55.9721456,
    "longitude": 23.0332371
  },
  {
    "id": 1555,
    "name": "Jurbarkas District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "61",
    "iso2": "12",
    "latitude": 55.077407,
    "longitude": 22.7419569
  },
  {
    "id": 1556,
    "name": "Kaunas County",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "57",
    "iso2": "KU",
    "latitude": 54.9872863,
    "longitude": 23.9525736
  },
  {
    "id": 1557,
    "name": "Mažeikiai District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "57",
    "iso2": "26",
    "latitude": 56.3092439,
    "longitude": 22.341468
  },
  {
    "id": 1558,
    "name": "Panevėžys County",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "60",
    "iso2": "PN",
    "latitude": 55.9748049,
    "longitude": 25.0794767
  },
  {
    "id": 1559,
    "name": "Elektrėnai municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "60",
    "iso2": "08",
    "latitude": 54.7653934,
    "longitude": 24.7740583
  },
  {
    "id": 1560,
    "name": "Švenčionys District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "60",
    "iso2": "49",
    "latitude": 55.1028098,
    "longitude": 26.0071855
  },
  {
    "id": 1561,
    "name": "Akmenė District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "60",
    "iso2": "01",
    "latitude": 56.2455029,
    "longitude": 22.7471169
  },
  {
    "id": 1562,
    "name": "Ignalina District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "60",
    "iso2": "09",
    "latitude": 55.4090342,
    "longitude": 26.3284893
  },
  {
    "id": 1563,
    "name": "Neringa Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "60",
    "iso2": "28",
    "latitude": 55.4572403,
    "longitude": 21.0839005
  },
  {
    "id": 1564,
    "name": "Visaginas Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "60",
    "iso2": "59",
    "latitude": 55.594118,
    "longitude": 26.4307954
  },
  {
    "id": 1565,
    "name": "Kaunas District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "57",
    "iso2": "16",
    "latitude": 54.9936236,
    "longitude": 23.6324941
  },
  {
    "id": 1566,
    "name": "Biržai District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "57",
    "iso2": "06",
    "latitude": 56.2017719,
    "longitude": 24.7560118
  },
  {
    "id": 1567,
    "name": "Jonava District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "57",
    "iso2": "10",
    "latitude": 55.0727242,
    "longitude": 24.2793337
  },
  {
    "id": 1568,
    "name": "Radviliškis District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "57",
    "iso2": "37",
    "latitude": 55.8108399,
    "longitude": 23.546487
  },
  {
    "id": 1569,
    "name": "Telšiai County",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "63",
    "iso2": "TE",
    "latitude": 56.1026616,
    "longitude": 22.1113915
  },
  {
    "id": 1570,
    "name": "Marijampolė County",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "59",
    "iso2": "MR",
    "latitude": 54.7819971,
    "longitude": 23.1341365
  },
  {
    "id": 1571,
    "name": "Kretinga District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "59",
    "iso2": "22",
    "latitude": 55.883842,
    "longitude": 21.2350919
  },
  {
    "id": 1572,
    "name": "Tauragė District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "62",
    "iso2": "50",
    "latitude": 55.250366,
    "longitude": 22.29095
  },
  {
    "id": 1573,
    "name": "Tauragė County",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "62",
    "iso2": "TA",
    "latitude": 55.3072586,
    "longitude": 22.3572939
  },
  {
    "id": 1574,
    "name": "Alytus County",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "56",
    "iso2": "AL",
    "latitude": 54.2000214,
    "longitude": 24.1512634
  },
  {
    "id": 1575,
    "name": "Kazlų Rūda municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "56",
    "iso2": "17",
    "latitude": 54.7807526,
    "longitude": 23.4840243
  },
  {
    "id": 1576,
    "name": "Šakiai District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "56",
    "iso2": "41",
    "latitude": 54.952671,
    "longitude": 23.0480199
  },
  {
    "id": 1577,
    "name": "Šalčininkai District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "56",
    "iso2": "42",
    "latitude": 54.309767,
    "longitude": 25.387564
  },
  {
    "id": 1578,
    "name": "Prienai District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "56",
    "iso2": "36",
    "latitude": 54.638358,
    "longitude": 23.9468009
  },
  {
    "id": 1579,
    "name": "Druskininkai municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "56",
    "iso2": "07",
    "latitude": 53.9933685,
    "longitude": 24.0342438
  },
  {
    "id": 1580,
    "name": "Kaunas City Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "57",
    "iso2": "15",
    "latitude": 54.9145326,
    "longitude": 23.9053518
  },
  {
    "id": 1581,
    "name": "Joniškis District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "57",
    "iso2": "11",
    "latitude": 56.236073,
    "longitude": 23.6136579
  },
  {
    "id": 1582,
    "name": "Molėtai District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "57",
    "iso2": "27",
    "latitude": 55.2265309,
    "longitude": 25.4180011
  },
  {
    "id": 1583,
    "name": "Kaišiadorys District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "57",
    "iso2": "13",
    "latitude": 54.8588669,
    "longitude": 24.4277929
  },
  {
    "id": 1584,
    "name": "Kėdainiai District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "57",
    "iso2": "18",
    "latitude": 55.3560947,
    "longitude": 23.9832683
  },
  {
    "id": 1585,
    "name": "Kupiškis District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "57",
    "iso2": "23",
    "latitude": 55.8428741,
    "longitude": 25.0295816
  },
  {
    "id": 1586,
    "name": "Šiauliai County",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "61",
    "iso2": "SA",
    "latitude": 55.9985751,
    "longitude": 23.1380051
  },
  {
    "id": 1587,
    "name": "Raseiniai District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "61",
    "iso2": "38",
    "latitude": 55.3819499,
    "longitude": 23.1156129
  },
  {
    "id": 1588,
    "name": "Palanga City Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "61",
    "iso2": "31",
    "latitude": 55.920198,
    "longitude": 21.0677614
  },
  {
    "id": 1589,
    "name": "Panevėžys City Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "60",
    "iso2": "32",
    "latitude": 55.7347915,
    "longitude": 24.3574774
  },
  {
    "id": 1590,
    "name": "Rietavas municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "60",
    "iso2": "39",
    "latitude": 55.7021719,
    "longitude": 21.9986564
  },
  {
    "id": 1591,
    "name": "Kalvarija municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "60",
    "iso2": "14",
    "latitude": 54.3761674,
    "longitude": 23.1920321
  },
  {
    "id": 1592,
    "name": "Vilnius District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "65",
    "iso2": "58",
    "latitude": 54.7732578,
    "longitude": 25.5867113
  },
  {
    "id": 1593,
    "name": "Trakai District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "65",
    "iso2": "52",
    "latitude": 54.6379113,
    "longitude": 24.9346894
  },
  {
    "id": 1594,
    "name": "Širvintos District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "65",
    "iso2": "47",
    "latitude": 55.043102,
    "longitude": 24.956981
  },
  {
    "id": 1595,
    "name": "Pakruojis District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "65",
    "iso2": "30",
    "latitude": 56.0732605,
    "longitude": 23.9389906
  },
  {
    "id": 1596,
    "name": "Ukmergė District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "65",
    "iso2": "53",
    "latitude": 55.245265,
    "longitude": 24.7760749
  },
  {
    "id": 1597,
    "name": "Klaipeda City Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "58",
    "iso2": "20",
    "latitude": 55.7032948,
    "longitude": 21.1442795
  },
  {
    "id": 1598,
    "name": "Utena District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "64",
    "iso2": "54",
    "latitude": 55.5084614,
    "longitude": 25.6832642
  },
  {
    "id": 1599,
    "name": "Alytus District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "56",
    "iso2": "03",
    "latitude": 54.3297496,
    "longitude": 24.1960931
  },
  {
    "id": 1600,
    "name": "Klaipėda County",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "58",
    "iso2": "KL",
    "latitude": 55.6519744,
    "longitude": 21.3743956
  },
  {
    "id": 1601,
    "name": "Vilnius County",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "65",
    "iso2": "VL",
    "latitude": 54.8086502,
    "longitude": 25.2182139
  },
  {
    "id": 1602,
    "name": "Varėna District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "65",
    "iso2": "55",
    "latitude": 54.220333,
    "longitude": 24.578997
  },
  {
    "id": 1603,
    "name": "Birštonas Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "65",
    "iso2": "05",
    "latitude": 54.5669664,
    "longitude": 24.0093098
  },
  {
    "id": 1604,
    "name": "Klaipėda District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "58",
    "iso2": "21",
    "latitude": 55.6841615,
    "longitude": 21.4416464
  },
  {
    "id": 1605,
    "name": "Alytus City Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "56",
    "iso2": "02",
    "latitude": 54.3962938,
    "longitude": 24.0458761
  },
  {
    "id": 1606,
    "name": "Vilnius City Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "65",
    "iso2": "57",
    "latitude": 54.6710761,
    "longitude": 25.2878721
  },
  {
    "id": 1607,
    "name": "Šilutė District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "65",
    "iso2": "46",
    "latitude": 55.350414,
    "longitude": 21.4659859
  },
  {
    "id": 1608,
    "name": "Telšiai District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "63",
    "iso2": "51",
    "latitude": 55.9175215,
    "longitude": 22.345184
  },
  {
    "id": 1609,
    "name": "Šiauliai City Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "61",
    "iso2": "43",
    "latitude": 55.9349085,
    "longitude": 23.3136823
  },
  {
    "id": 1610,
    "name": "Marijampolė Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "59",
    "iso2": "25",
    "latitude": 54.5711094,
    "longitude": 23.4859371
  },
  {
    "id": 1611,
    "name": "Lazdijai District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "59",
    "iso2": "24",
    "latitude": 54.2343267,
    "longitude": 23.5156505
  },
  {
    "id": 1612,
    "name": "Pagėgiai municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "59",
    "iso2": "29",
    "latitude": 55.172132,
    "longitude": 21.9683614
  },
  {
    "id": 1613,
    "name": "Šilalė District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "59",
    "iso2": "45",
    "latitude": 55.49268,
    "longitude": 22.1845559
  },
  {
    "id": 1614,
    "name": "Panevėžys District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "60",
    "iso2": "33",
    "latitude": 55.6166728,
    "longitude": 24.3142283
  },
  {
    "id": 1615,
    "name": "Rokiškis District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "60",
    "iso2": "40",
    "latitude": 55.9555039,
    "longitude": 25.5859249
  },
  {
    "id": 1616,
    "name": "Pasvalys District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "60",
    "iso2": "34",
    "latitude": 56.0604619,
    "longitude": 24.396291
  },
  {
    "id": 1617,
    "name": "Skuodas District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "60",
    "iso2": "48",
    "latitude": 56.2702169,
    "longitude": 21.5214331
  },
  {
    "id": 1618,
    "name": "Kelmė District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "60",
    "iso2": "19",
    "latitude": 55.6266352,
    "longitude": 22.878172
  },
  {
    "id": 1619,
    "name": "Zarasai District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "60",
    "iso2": "60",
    "latitude": 55.7309609,
    "longitude": 26.245295
  },
  {
    "id": 1620,
    "name": "Vilkaviškis District Municipality",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "60",
    "iso2": "56",
    "latitude": 54.651945,
    "longitude": 23.035155
  },
  {
    "id": 1621,
    "name": "Utena County",
    "countryId": 126,
    "countryCode": "LT",
    "fipsCode": "64",
    "iso2": "UT",
    "latitude": 55.5318969,
    "longitude": 25.7904699
  },
  {
    "id": 1622,
    "name": "Opole Voivodeship",
    "countryId": 176,
    "countryCode": "PL",
    "fipsCode": "79",
    "iso2": "OP",
    "latitude": 50.8003761,
    "longitude": 17.937989
  },
  {
    "id": 1623,
    "name": "Silesian Voivodeship",
    "countryId": 176,
    "countryCode": "PL",
    "fipsCode": "83",
    "iso2": "SL",
    "latitude": 50.5716595,
    "longitude": 19.3219768
  },
  {
    "id": 1624,
    "name": "Pomeranian Voivodeship",
    "countryId": 176,
    "countryCode": "PL",
    "fipsCode": "82",
    "iso2": "PM",
    "latitude": 54.2944252,
    "longitude": 18.1531164
  },
  {
    "id": 1625,
    "name": "Kuyavian-Pomeranian Voivodeship",
    "countryId": 176,
    "countryCode": "PL",
    "fipsCode": "73",
    "iso2": "KP",
    "latitude": 53.1648363,
    "longitude": 18.4834224
  },
  {
    "id": 1626,
    "name": "Podkarpackie Voivodeship",
    "countryId": 176,
    "countryCode": "PL",
    "fipsCode": "80",
    "iso2": "PK",
    "latitude": 50.0574749,
    "longitude": 22.0895691
  },
  {
    "id": 1628,
    "name": "Warmian-Masurian Voivodeship",
    "countryId": 176,
    "countryCode": "PL",
    "fipsCode": "85",
    "iso2": "WN",
    "latitude": 53.8671117,
    "longitude": 20.7027861
  },
  {
    "id": 1629,
    "name": "Lower Silesian Voivodeship",
    "countryId": 176,
    "countryCode": "PL",
    "fipsCode": "72",
    "iso2": "DS",
    "latitude": 51.1339861,
    "longitude": 16.8841961
  },
  {
    "id": 1630,
    "name": "Świętokrzyskie Voivodeship",
    "countryId": 176,
    "countryCode": "PL",
    "fipsCode": "84",
    "iso2": "SK",
    "latitude": 50.6261041,
    "longitude": 20.9406279
  },
  {
    "id": 1631,
    "name": "Lubusz Voivodeship",
    "countryId": 176,
    "countryCode": "PL",
    "fipsCode": "76",
    "iso2": "LB",
    "latitude": 52.2274612,
    "longitude": 15.2559103
  },
  {
    "id": 1632,
    "name": "Podlaskie Voivodeship",
    "countryId": 176,
    "countryCode": "PL",
    "fipsCode": "81",
    "iso2": "PD",
    "latitude": 53.0697159,
    "longitude": 22.9674639
  },
  {
    "id": 1633,
    "name": "West Pomeranian Voivodeship",
    "countryId": 176,
    "countryCode": "PL",
    "fipsCode": "87",
    "iso2": "ZP",
    "latitude": 53.4657891,
    "longitude": 15.1822581
  },
  {
    "id": 1634,
    "name": "Greater Poland Voivodeship",
    "countryId": 176,
    "countryCode": "PL",
    "fipsCode": "86",
    "iso2": "WP",
    "latitude": 52.279986,
    "longitude": 17.3522939
  },
  {
    "id": 1635,
    "name": "Lesser Poland Voivodeship",
    "countryId": 176,
    "countryCode": "PL",
    "fipsCode": "77",
    "iso2": "MA",
    "latitude": 49.7225306,
    "longitude": 20.2503358
  },
  {
    "id": 1636,
    "name": "Łódź Voivodeship",
    "countryId": 176,
    "countryCode": "PL",
    "fipsCode": "74",
    "iso2": "LD",
    "latitude": 51.4634771,
    "longitude": 19.1726974
  },
  {
    "id": 1637,
    "name": "Masovian Voivodeship",
    "countryId": 176,
    "countryCode": "PL",
    "fipsCode": "78",
    "iso2": "MZ",
    "latitude": 51.8927182,
    "longitude": 21.0021679
  },
  {
    "id": 1638,
    "name": "Lublin Voivodeship",
    "countryId": 176,
    "countryCode": "PL",
    "fipsCode": "75",
    "iso2": "LU",
    "latitude": 51.2493519,
    "longitude": 23.1011392
  },
  {
    "id": 1639,
    "name": "Aargau",
    "countryId": 214,
    "countryCode": "CH",
    "fipsCode": "01",
    "iso2": "AG",
    "latitude": 47.3876664,
    "longitude": 8.2554295
  },
  {
    "id": 1640,
    "name": "Canton of Fribourg",
    "countryId": 214,
    "countryCode": "CH",
    "fipsCode": "06",
    "iso2": "FR",
    "latitude": 46.6816748,
    "longitude": 7.1172635
  },
  {
    "id": 1641,
    "name": "Basel-Landschaft",
    "countryId": 214,
    "countryCode": "CH",
    "fipsCode": "03",
    "iso2": "BL",
    "latitude": 47.4418122,
    "longitude": 7.7644002
  },
  {
    "id": 1642,
    "name": "Uri",
    "countryId": 214,
    "countryCode": "CH",
    "fipsCode": "21",
    "iso2": "UR",
    "latitude": 41.4860647,
    "longitude": -71.5308537
  },
  {
    "id": 1643,
    "name": "Ticino",
    "countryId": 214,
    "countryCode": "CH",
    "fipsCode": "20",
    "iso2": "TI",
    "latitude": 46.331734,
    "longitude": 8.8004529
  },
  {
    "id": 1644,
    "name": "Canton of St. Gallen",
    "countryId": 214,
    "countryCode": "CH",
    "fipsCode": "15",
    "iso2": "SG",
    "latitude": 47.1456254,
    "longitude": 9.3504332
  },
  {
    "id": 1645,
    "name": "canton of Bern",
    "countryId": 214,
    "countryCode": "CH",
    "fipsCode": "05",
    "iso2": "BE",
    "latitude": 46.7988621,
    "longitude": 7.7080701
  },
  {
    "id": 1646,
    "name": "Canton of Zug",
    "countryId": 214,
    "countryCode": "CH",
    "fipsCode": "24",
    "iso2": "ZG",
    "latitude": 47.1661505,
    "longitude": 8.5154749
  },
  {
    "id": 1647,
    "name": "Canton of Geneva",
    "countryId": 214,
    "countryCode": "CH",
    "fipsCode": "07",
    "iso2": "GE",
    "latitude": 46.2180073,
    "longitude": 6.1216925
  },
  {
    "id": 1648,
    "name": "Canton of Valais",
    "countryId": 214,
    "countryCode": "CH",
    "fipsCode": "22",
    "iso2": "VS",
    "latitude": 46.1904614,
    "longitude": 7.5449226
  },
  {
    "id": 1649,
    "name": "Appenzell Innerrhoden",
    "countryId": 214,
    "countryCode": "CH",
    "fipsCode": "10",
    "iso2": "AI",
    "latitude": 47.3161925,
    "longitude": 9.4316573
  },
  {
    "id": 1650,
    "name": "Obwalden",
    "countryId": 214,
    "countryCode": "CH",
    "fipsCode": "14",
    "iso2": "OW",
    "latitude": 46.877858,
    "longitude": 8.251249
  },
  {
    "id": 1651,
    "name": "Canton of Vaud",
    "countryId": 214,
    "countryCode": "CH",
    "fipsCode": "23",
    "iso2": "VD",
    "latitude": 46.5613135,
    "longitude": 6.536765
  },
  {
    "id": 1652,
    "name": "Nidwalden",
    "countryId": 214,
    "countryCode": "CH",
    "fipsCode": "13",
    "iso2": "NW",
    "latitude": 46.9267016,
    "longitude": 8.3849982
  },
  {
    "id": 1653,
    "name": "Schwyz",
    "countryId": 214,
    "countryCode": "CH",
    "fipsCode": "17",
    "iso2": "SZ",
    "latitude": 47.0207138,
    "longitude": 8.6529884
  },
  {
    "id": 1654,
    "name": "Canton of Schaffhausen",
    "countryId": 214,
    "countryCode": "CH",
    "fipsCode": "16",
    "iso2": "SH",
    "latitude": 47.7009364,
    "longitude": 8.568004
  },
  {
    "id": 1655,
    "name": "Appenzell Ausserrhoden",
    "countryId": 214,
    "countryCode": "CH",
    "fipsCode": "02",
    "iso2": "AR",
    "latitude": 47.366481,
    "longitude": 9.3000916
  },
  {
    "id": 1656,
    "name": "canton of Zürich",
    "countryId": 214,
    "countryCode": "CH",
    "fipsCode": "25",
    "iso2": "ZH",
    "latitude": 47.359536,
    "longitude": 8.6356452
  },
  {
    "id": 1657,
    "name": "Thurgau",
    "countryId": 214,
    "countryCode": "CH",
    "fipsCode": "19",
    "iso2": "TG",
    "latitude": 47.6037856,
    "longitude": 9.0557371
  },
  {
    "id": 1658,
    "name": "Canton of Jura",
    "countryId": 214,
    "countryCode": "CH",
    "fipsCode": "26",
    "iso2": "JU",
    "latitude": 47.3444474,
    "longitude": 7.1430608
  },
  {
    "id": 1659,
    "name": "Canton of Neuchâtel",
    "countryId": 214,
    "countryCode": "CH",
    "fipsCode": "12",
    "iso2": "NE",
    "latitude": 46.9899874,
    "longitude": 6.9292732
  },
  {
    "id": 1660,
    "name": "Graubünden",
    "countryId": 214,
    "countryCode": "CH",
    "fipsCode": "09",
    "iso2": "GR",
    "latitude": 46.6569871,
    "longitude": 9.5780257
  },
  {
    "id": 1661,
    "name": "Glarus",
    "countryId": 214,
    "countryCode": "CH",
    "fipsCode": "08",
    "iso2": "GL",
    "latitude": 47.0411232,
    "longitude": 9.0679
  },
  {
    "id": 1662,
    "name": "Canton of Solothurn",
    "countryId": 214,
    "countryCode": "CH",
    "fipsCode": "18",
    "iso2": "SO",
    "latitude": 47.3320717,
    "longitude": 7.6388385
  },
  {
    "id": 1663,
    "name": "Canton of Lucerne",
    "countryId": 214,
    "countryCode": "CH",
    "fipsCode": "11",
    "iso2": "LU",
    "latitude": 47.0795671,
    "longitude": 8.1662445
  },
  {
    "id": 1664,
    "name": "Tuscany",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "16",
    "iso2": "52",
    "latitude": 43.7710513,
    "longitude": 11.2486208
  },
  {
    "id": 1665,
    "name": "Province of Padua",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "16",
    "iso2": "PD",
    "latitude": 45.3661864,
    "longitude": 11.8209139
  },
  {
    "id": 1666,
    "name": "Province of Parma",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "16",
    "iso2": "PR",
    "latitude": 44.8015322,
    "longitude": 10.3279354
  },
  {
    "id": 1667,
    "name": "Libero consorzio comunale di Siracusa",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "16",
    "iso2": "SR",
    "latitude": 37.0656924,
    "longitude": 15.2857109
  },
  {
    "id": 1668,
    "name": "Metropolitan City of Palermo",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "16",
    "iso2": "PA",
    "latitude": 38.11569,
    "longitude": 13.3614868
  },
  {
    "id": 1669,
    "name": "Campania",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "04",
    "iso2": "72",
    "latitude": 40.6670887,
    "longitude": 15.1068113
  },
  {
    "id": 1670,
    "name": "Marche",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "10",
    "iso2": "57",
    "latitude": 30.556707,
    "longitude": -81.449303
  },
  {
    "id": 1671,
    "name": "Metropolitan City of Reggio Calabria",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "10",
    "iso2": "RC",
    "latitude": 38.1084396,
    "longitude": 15.6437048
  },
  {
    "id": 1672,
    "name": "Province of Ancona",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "10",
    "iso2": "AN",
    "latitude": 43.5493245,
    "longitude": 13.2663479
  },
  {
    "id": 1673,
    "name": "Metropolitan City of Venice",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "10",
    "iso2": "VE",
    "latitude": 45.4414685,
    "longitude": 12.3152672
  },
  {
    "id": 1674,
    "name": "Province of Latina",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "10",
    "iso2": "LT",
    "latitude": 41.4087476,
    "longitude": 13.0817903
  },
  {
    "id": 1675,
    "name": "Province of Lecce",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "10",
    "iso2": "LE",
    "latitude": 40.2347393,
    "longitude": 18.1428669
  },
  {
    "id": 1676,
    "name": "Province of Pavia",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "10",
    "iso2": "PV",
    "latitude": 45.3218166,
    "longitude": 8.8466236
  },
  {
    "id": 1677,
    "name": "Province of Lecco",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "10",
    "iso2": "LC",
    "latitude": 45.9382941,
    "longitude": 9.385729
  },
  {
    "id": 1678,
    "name": "Lazio",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "07",
    "iso2": "62",
    "latitude": 45.6991667,
    "longitude": -73.6558333
  },
  {
    "id": 1679,
    "name": "Abruzzo",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "01",
    "iso2": "65",
    "latitude": 42.1920119,
    "longitude": 13.7289167
  },
  {
    "id": 1680,
    "name": "Metropolitan City of Florence",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "01",
    "iso2": "FI",
    "latitude": 43.7679178,
    "longitude": 11.2523792
  },
  {
    "id": 1681,
    "name": "Province of Ascoli Piceno",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "01",
    "iso2": "AP",
    "latitude": 42.8638933,
    "longitude": 13.5899733
  },
  {
    "id": 1682,
    "name": "Metropolitan City of Cagliari",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "01",
    "iso2": "CA",
    "latitude": 39.2238411,
    "longitude": 9.1216613
  },
  {
    "id": 1683,
    "name": "Umbria",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "18",
    "iso2": "55",
    "latitude": 42.938004,
    "longitude": 12.6216211
  },
  {
    "id": 1684,
    "name": "Metropolitan City of Bologna",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "18",
    "iso2": "BO",
    "latitude": 44.494887,
    "longitude": 11.3426162
  },
  {
    "id": 1685,
    "name": "Province of Pisa",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "18",
    "iso2": "PI",
    "latitude": 43.7228315,
    "longitude": 10.4017194
  },
  {
    "id": 1686,
    "name": "Province of Barletta-Andria-Trani",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "18",
    "iso2": "BT",
    "latitude": 41.2004543,
    "longitude": 16.2051484
  },
  {
    "id": 1687,
    "name": "Province of Pistoia",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "18",
    "iso2": "PT",
    "latitude": 43.9543733,
    "longitude": 10.8903099
  },
  {
    "id": 1688,
    "name": "Apulia",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "13",
    "iso2": "75",
    "latitude": 40.7928393,
    "longitude": 17.1011931
  },
  {
    "id": 1689,
    "name": "Province of Belluno",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "13",
    "iso2": "BL",
    "latitude": 46.2497659,
    "longitude": 12.1969565
  },
  {
    "id": 1690,
    "name": "Province of Pordenone",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "13",
    "iso2": "PN",
    "latitude": 46.0378862,
    "longitude": 12.710835
  },
  {
    "id": 1691,
    "name": "Province of Perugia",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "13",
    "iso2": "PG",
    "latitude": 42.938004,
    "longitude": 12.6216211
  },
  {
    "id": 1692,
    "name": "Province of Avellino",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "13",
    "iso2": "AV",
    "latitude": 40.996451,
    "longitude": 15.1258955
  },
  {
    "id": 1693,
    "name": "Pesaro and Urbino Province",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "13",
    "iso2": "PU",
    "latitude": 43.6130118,
    "longitude": 12.7135121
  },
  {
    "id": 1694,
    "name": "Province of Pescara",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "13",
    "iso2": "PE",
    "latitude": 42.3570655,
    "longitude": 13.9608091
  },
  {
    "id": 1695,
    "name": "Molise",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "11",
    "iso2": "67",
    "latitude": 41.6738865,
    "longitude": 14.7520939
  },
  {
    "id": 1696,
    "name": "Province of Piacenza",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "11",
    "iso2": "PC",
    "latitude": 44.8263112,
    "longitude": 9.5291447
  },
  {
    "id": 1697,
    "name": "Province of Potenza",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "11",
    "iso2": "PZ",
    "latitude": 40.4182194,
    "longitude": 15.876004
  },
  {
    "id": 1698,
    "name": "Metropolitan City of Milan",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "11",
    "iso2": "MI",
    "latitude": 45.458626,
    "longitude": 9.181873
  },
  {
    "id": 1699,
    "name": "Metropolitan City of Genoa",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "11",
    "iso2": "GE",
    "latitude": 44.4056493,
    "longitude": 8.9462564
  },
  {
    "id": 1700,
    "name": "Province of Prato",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "11",
    "iso2": "PO",
    "latitude": 44.04539,
    "longitude": 11.1164452
  },
  {
    "id": 1701,
    "name": "Benevento Province",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "11",
    "iso2": "BN",
    "latitude": 41.2035093,
    "longitude": 14.7520939
  },
  {
    "id": 1702,
    "name": "Piedmont",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "12",
    "iso2": "21",
    "latitude": 45.0522366,
    "longitude": 7.5153885
  },
  {
    "id": 1703,
    "name": "Calabria",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "03",
    "iso2": "78",
    "latitude": 39.3087714,
    "longitude": 16.3463791
  },
  {
    "id": 1704,
    "name": "Province of Bergamo",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "03",
    "iso2": "BG",
    "latitude": 45.6982642,
    "longitude": 9.6772698
  },
  {
    "id": 1705,
    "name": "Lombardy",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "09",
    "iso2": "25",
    "latitude": 45.4790671,
    "longitude": 9.8452433
  },
  {
    "id": 1706,
    "name": "Basilicata",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "02",
    "iso2": "77",
    "latitude": 40.6430766,
    "longitude": 15.9699878
  },
  {
    "id": 1707,
    "name": "Province of Ravenna",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "02",
    "iso2": "RA",
    "latitude": 44.4184443,
    "longitude": 12.2035998
  },
  {
    "id": 1708,
    "name": "Province of Reggio Emilia",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "02",
    "iso2": "RE",
    "latitude": 44.585658,
    "longitude": 10.5564736
  },
  {
    "id": 1709,
    "name": "Sicily",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "15",
    "iso2": "82",
    "latitude": 37.5999938,
    "longitude": 14.0153557
  },
  {
    "id": 1710,
    "name": "Metropolitan City of Turin",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "15",
    "iso2": "TO",
    "latitude": 45.063299,
    "longitude": 7.669289
  },
  {
    "id": 1711,
    "name": "Metropolitan City of Rome",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "15",
    "iso2": "RM",
    "latitude": 41.9027008,
    "longitude": 12.4962352
  },
  {
    "id": 1712,
    "name": "Province of Rieti",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "15",
    "iso2": "RI",
    "latitude": 42.3674405,
    "longitude": 12.8975098
  },
  {
    "id": 1713,
    "name": "Province of Rimini",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "15",
    "iso2": "RN",
    "latitude": 44.0678288,
    "longitude": 12.5695158
  },
  {
    "id": 1714,
    "name": "Province of Brindisi",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "15",
    "iso2": "BR",
    "latitude": 40.6112663,
    "longitude": 17.763621
  },
  {
    "id": 1715,
    "name": "Sardinia",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "14",
    "iso2": "88",
    "latitude": 40.1208752,
    "longitude": 9.0128926
  },
  {
    "id": 1716,
    "name": "Aosta Valley",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "19",
    "iso2": "23",
    "latitude": 45.7388878,
    "longitude": 7.4261866
  },
  {
    "id": 1717,
    "name": "Province of Brescia",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "19",
    "iso2": "BS",
    "latitude": 45.5415526,
    "longitude": 10.2118019
  },
  {
    "id": 1718,
    "name": "Libero consorzio comunale di Caltanissetta",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "19",
    "iso2": "CL",
    "latitude": 37.486013,
    "longitude": 14.0614982
  },
  {
    "id": 1719,
    "name": "Province of Rovigo",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "19",
    "iso2": "RO",
    "latitude": 45.0241818,
    "longitude": 11.8238162
  },
  {
    "id": 1720,
    "name": "Province of Salerno",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "19",
    "iso2": "SA",
    "latitude": 40.4287832,
    "longitude": 15.2194808
  },
  {
    "id": 1721,
    "name": "Province of Campobasso",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "19",
    "iso2": "CB",
    "latitude": 41.6738865,
    "longitude": 14.7520939
  },
  {
    "id": 1722,
    "name": "Province of Sassari",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "19",
    "iso2": "SS",
    "latitude": 40.7967907,
    "longitude": 8.5750407
  },
  {
    "id": 1723,
    "name": "Libero consorzio comunale di Enna",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "19",
    "iso2": "EN",
    "latitude": 37.5676216,
    "longitude": 14.2795349
  },
  {
    "id": 1724,
    "name": "Metropolitan City of Naples",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "19",
    "iso2": "NA",
    "latitude": 40.901975,
    "longitude": 14.332644
  },
  {
    "id": 1725,
    "name": "Trentino-South Tyrol",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "17",
    "iso2": "32",
    "latitude": 46.4336662,
    "longitude": 11.1693296
  },
  {
    "id": 1726,
    "name": "Province of Verbano-Cusio-Ossola",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "17",
    "iso2": "VB",
    "latitude": 46.1399688,
    "longitude": 8.2724649
  },
  {
    "id": 1727,
    "name": "Libero consorzio comunale di Agrigento",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "17",
    "iso2": "AG",
    "latitude": 37.3105202,
    "longitude": 13.5857978
  },
  {
    "id": 1728,
    "name": "Province of Catanzaro",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "17",
    "iso2": "CZ",
    "latitude": 38.8896348,
    "longitude": 16.4405872
  },
  {
    "id": 1729,
    "name": "Libero consorzio comunale di Ragusa",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "17",
    "iso2": "RG",
    "latitude": 36.9269273,
    "longitude": 14.7255129
  },
  {
    "id": 1730,
    "name": "Province of Carbonia-Iglesias",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "17",
    "iso2": "CI",
    "latitude": 39.2534659,
    "longitude": 8.5721016
  },
  {
    "id": 1731,
    "name": "Province of Caserta",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "17",
    "iso2": "CE",
    "latitude": 41.2078354,
    "longitude": 14.1001326
  },
  {
    "id": 1732,
    "name": "Province of Savona",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "17",
    "iso2": "SV",
    "latitude": 44.2887995,
    "longitude": 8.265058
  },
  {
    "id": 1733,
    "name": "Libero consorzio comunale di Trapani",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "17",
    "iso2": "TP",
    "latitude": 38.0183116,
    "longitude": 12.5148265
  },
  {
    "id": 1734,
    "name": "Province of Siena",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "17",
    "iso2": "SI",
    "latitude": 43.2937732,
    "longitude": 11.4339148
  },
  {
    "id": 1735,
    "name": "Province of Viterbo",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "17",
    "iso2": "VT",
    "latitude": 42.400242,
    "longitude": 11.8891721
  },
  {
    "id": 1736,
    "name": "Province of Verona",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "17",
    "iso2": "VR",
    "latitude": 45.4418498,
    "longitude": 11.0735316
  },
  {
    "id": 1737,
    "name": "Province of Vibo Valentia",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "17",
    "iso2": "VV",
    "latitude": 38.6378565,
    "longitude": 16.2051484
  },
  {
    "id": 1738,
    "name": "Province of Vicenza",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "17",
    "iso2": "VI",
    "latitude": 45.6983995,
    "longitude": 11.5661465
  },
  {
    "id": 1739,
    "name": "Province of Chieti",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "17",
    "iso2": "CH",
    "latitude": 42.0334428,
    "longitude": 14.3791912
  },
  {
    "id": 1740,
    "name": "Province of Como",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "17",
    "iso2": "CO",
    "latitude": 45.8080416,
    "longitude": 9.0851793
  },
  {
    "id": 1741,
    "name": "Province of Sondrio",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "17",
    "iso2": "SO",
    "latitude": 46.1727636,
    "longitude": 9.7994917
  },
  {
    "id": 1742,
    "name": "Province of Cosenza",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "17",
    "iso2": "CS",
    "latitude": 39.5644105,
    "longitude": 16.2522143
  },
  {
    "id": 1743,
    "name": "Province of Taranto",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "17",
    "iso2": "TA",
    "latitude": 40.5740901,
    "longitude": 17.2429976
  },
  {
    "id": 1744,
    "name": "Province of Fermo",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "17",
    "iso2": "FM",
    "latitude": 43.0931367,
    "longitude": 13.5899733
  },
  {
    "id": 1745,
    "name": "Province of Livorno",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "17",
    "iso2": "LI",
    "latitude": 43.0239848,
    "longitude": 10.6647101
  },
  {
    "id": 1746,
    "name": "Province of Ferrara",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "17",
    "iso2": "FE",
    "latitude": 44.766368,
    "longitude": 11.7644068
  },
  {
    "id": 1747,
    "name": "Province of Lodi",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "17",
    "iso2": "LO",
    "latitude": 45.2405036,
    "longitude": 9.5292512
  },
  {
    "id": 1748,
    "name": "Trentino",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "17",
    "iso2": "TN",
    "latitude": 46.0512004,
    "longitude": 11.1175392
  },
  {
    "id": 1749,
    "name": "Province of Lucca",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "17",
    "iso2": "LU",
    "latitude": 43.8376736,
    "longitude": 10.495053
  },
  {
    "id": 1750,
    "name": "Province of Macerata",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "17",
    "iso2": "MC",
    "latitude": 43.2459322,
    "longitude": 13.2663479
  },
  {
    "id": 1751,
    "name": "Province of Cremona",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "17",
    "iso2": "CR",
    "latitude": 45.2014375,
    "longitude": 9.9836582
  },
  {
    "id": 1752,
    "name": "Province of Teramo",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "17",
    "iso2": "TE",
    "latitude": 42.5895608,
    "longitude": 13.6362715
  },
  {
    "id": 1753,
    "name": "Veneto",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "20",
    "iso2": "34",
    "latitude": 45.4414662,
    "longitude": 12.3152595
  },
  {
    "id": 1754,
    "name": "Province of Crotone",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "20",
    "iso2": "KR",
    "latitude": 39.1309856,
    "longitude": 17.0067031
  },
  {
    "id": 1755,
    "name": "Province of Terni",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "20",
    "iso2": "TR",
    "latitude": 42.5634534,
    "longitude": 12.5298028
  },
  {
    "id": 1756,
    "name": "Friuli–Venezia Giulia",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "06",
    "iso2": "36",
    "latitude": 46.2259177,
    "longitude": 13.1033646
  },
  {
    "id": 1757,
    "name": "Province of Modena",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "06",
    "iso2": "MO",
    "latitude": 44.5513799,
    "longitude": 10.918048
  },
  {
    "id": 1758,
    "name": "Province of Mantua",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "06",
    "iso2": "MN",
    "latitude": 45.1667728,
    "longitude": 10.7753613
  },
  {
    "id": 1759,
    "name": "Province of Massa and Carrara",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "06",
    "iso2": "MS",
    "latitude": 44.2213998,
    "longitude": 10.0359661
  },
  {
    "id": 1760,
    "name": "Province of Matera",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "06",
    "iso2": "MT",
    "latitude": 40.6663496,
    "longitude": 16.6043636
  },
  {
    "id": 1761,
    "name": "Province of Medio Campidano",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "06",
    "iso2": "VS",
    "latitude": 39.5317389,
    "longitude": 8.704075
  },
  {
    "id": 1762,
    "name": "Province of Treviso",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "06",
    "iso2": "TV",
    "latitude": 45.6668517,
    "longitude": 12.2430617
  },
  {
    "id": 1763,
    "name": "Province of Trieste",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "06",
    "iso2": "TS",
    "latitude": 45.6894823,
    "longitude": 13.7833072
  },
  {
    "id": 1764,
    "name": "Province of Udine",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "06",
    "iso2": "UD",
    "latitude": 46.1407972,
    "longitude": 13.1662896
  },
  {
    "id": 1765,
    "name": "Province of Varese",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "06",
    "iso2": "VA",
    "latitude": 45.799026,
    "longitude": 8.7300945
  },
  {
    "id": 1766,
    "name": "Metropolitan City of Catania",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "06",
    "iso2": "CT",
    "latitude": 37.4515438,
    "longitude": 15.0557415
  },
  {
    "id": 1767,
    "name": "South Tyrol",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "06",
    "iso2": "BZ",
    "latitude": 46.494945,
    "longitude": 11.3402657
  },
  {
    "id": 1768,
    "name": "Liguria",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "08",
    "iso2": "42",
    "latitude": 44.3167917,
    "longitude": 8.3964938
  },
  {
    "id": 1769,
    "name": "Province of Monza and Brianza",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "08",
    "iso2": "MB",
    "latitude": 45.623599,
    "longitude": 9.2588015
  },
  {
    "id": 1770,
    "name": "Metropolitan City of Messina",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "08",
    "iso2": "ME",
    "latitude": 38.1937335,
    "longitude": 15.5542057
  },
  {
    "id": 1771,
    "name": "Province of Foggia",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "08",
    "iso2": "FG",
    "latitude": 41.638448,
    "longitude": 15.5943388
  },
  {
    "id": 1772,
    "name": "Metropolitan City of Bari",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "08",
    "iso2": "BA",
    "latitude": 41.1171432,
    "longitude": 16.8718715
  },
  {
    "id": 1773,
    "name": "Emilia-Romagna",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "05",
    "iso2": "45",
    "latitude": 44.5967607,
    "longitude": 11.2186396
  },
  {
    "id": 1774,
    "name": "Province of Novara",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "05",
    "iso2": "NO",
    "latitude": 45.5485133,
    "longitude": 8.5150793
  },
  {
    "id": 1775,
    "name": "Province of Cuneo",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "05",
    "iso2": "CN",
    "latitude": 44.5970314,
    "longitude": 7.6114217
  },
  {
    "id": 1776,
    "name": "Province of Frosinone",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "05",
    "iso2": "FR",
    "latitude": 41.6576528,
    "longitude": 13.6362715
  },
  {
    "id": 1777,
    "name": "Province of Gorizia",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "05",
    "iso2": "GO",
    "latitude": 45.9053899,
    "longitude": 13.5163725
  },
  {
    "id": 1778,
    "name": "Province of Biella",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "05",
    "iso2": "BI",
    "latitude": 45.5628176,
    "longitude": 8.0582717
  },
  {
    "id": 1779,
    "name": "Province of Forlì-Cesena",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "05",
    "iso2": "FC",
    "latitude": 43.9947681,
    "longitude": 11.9804613
  },
  {
    "id": 1780,
    "name": "Province of Asti",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "05",
    "iso2": "AT",
    "latitude": 44.9007652,
    "longitude": 8.2064315
  },
  {
    "id": 1781,
    "name": "Province of L\"Aquila",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "05",
    "iso2": "AQ",
    "latitude": 42.1256317,
    "longitude": 13.6362715
  },
  {
    "id": 1782,
    "name": "Province of Ogliastra",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "05",
    "iso2": "OG",
    "latitude": 39.8410536,
    "longitude": 9.456155
  },
  {
    "id": 1783,
    "name": "Province of Alessandria",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "05",
    "iso2": "AL",
    "latitude": 44.8175587,
    "longitude": 8.7046627
  },
  {
    "id": 1784,
    "name": "Province of Olbia-Tempio",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "05",
    "iso2": "OT",
    "latitude": 40.8268383,
    "longitude": 9.2785583
  },
  {
    "id": 1785,
    "name": "Province of Vercelli",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "05",
    "iso2": "VC",
    "latitude": 45.3202204,
    "longitude": 8.418508
  },
  {
    "id": 1786,
    "name": "Province of Oristano",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "05",
    "iso2": "OR",
    "latitude": 40.0599068,
    "longitude": 8.7481167
  },
  {
    "id": 1787,
    "name": "Province of Grosseto",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "05",
    "iso2": "GR",
    "latitude": 42.8518007,
    "longitude": 11.2523792
  },
  {
    "id": 1788,
    "name": "Province of Imperia",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "05",
    "iso2": "IM",
    "latitude": 43.941866,
    "longitude": 7.8286368
  },
  {
    "id": 1789,
    "name": "Province of Isernia",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "05",
    "iso2": "IS",
    "latitude": 41.5891555,
    "longitude": 14.1930918
  },
  {
    "id": 1790,
    "name": "Province of Nuoro",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "05",
    "iso2": "NU",
    "latitude": 40.3286904,
    "longitude": 9.456155
  },
  {
    "id": 1791,
    "name": "Province of La Spezia",
    "countryId": 107,
    "countryCode": "IT",
    "fipsCode": "05",
    "iso2": "SP",
    "latitude": 44.2447913,
    "longitude": 9.7678687
  },
  {
    "id": 1792,
    "name": "North Sumatra",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "26",
    "iso2": "SU",
    "latitude": 2.1153547,
    "longitude": 99.5450974
  },
  {
    "id": 1793,
    "name": "Bengkulu",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "03",
    "iso2": "BE",
    "latitude": -3.7928451,
    "longitude": 102.2607641
  },
  {
    "id": 1794,
    "name": "Central Kalimantan",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "13",
    "iso2": "KT",
    "latitude": -1.6814878,
    "longitude": 113.3823545
  },
  {
    "id": 1795,
    "name": "South Sulawesi",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "38",
    "iso2": "SN",
    "latitude": -3.6687994,
    "longitude": 119.9740534
  },
  {
    "id": 1796,
    "name": "Southeast Sulawesi",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "22",
    "iso2": "SG",
    "latitude": -4.14491,
    "longitude": 122.174605
  },
  {
    "id": 1797,
    "name": "Sumatra",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "22",
    "iso2": "SM",
    "latitude": -0.589724,
    "longitude": 101.3431058
  },
  {
    "id": 1798,
    "name": "Papua",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "36",
    "iso2": "PA",
    "latitude": -5.0122202,
    "longitude": 141.3470159
  },
  {
    "id": 1799,
    "name": "West Papua",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "39",
    "iso2": "PB",
    "latitude": -1.3361154,
    "longitude": 133.1747162
  },
  {
    "id": 1800,
    "name": "Maluku",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "28",
    "iso2": "MA",
    "latitude": -3.2384616,
    "longitude": 130.1452734
  },
  {
    "id": 1801,
    "name": "North Maluku",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "29",
    "iso2": "MU",
    "latitude": 1.5709993,
    "longitude": 127.8087693
  },
  {
    "id": 1802,
    "name": "Central Java",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "07",
    "iso2": "JT",
    "latitude": -7.150975,
    "longitude": 110.1402594
  },
  {
    "id": 1803,
    "name": "Sulawesi",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "07",
    "iso2": "SL",
    "latitude": -1.8479,
    "longitude": 120.5279
  },
  {
    "id": 1804,
    "name": "East Kalimantan",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "14",
    "iso2": "KI",
    "latitude": 0.5386586,
    "longitude": 116.419389
  },
  {
    "id": 1805,
    "name": "Jakarta",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "04",
    "iso2": "JK",
    "latitude": -6.2087634,
    "longitude": 106.845599
  },
  {
    "id": 1806,
    "name": "Kalimantan",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "04",
    "iso2": "KA",
    "latitude": 0.9618834,
    "longitude": 114.5548495
  },
  {
    "id": 1807,
    "name": "Riau Islands",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "40",
    "iso2": "KR",
    "latitude": 3.9456514,
    "longitude": 108.1428669
  },
  {
    "id": 1808,
    "name": "North Sulawesi",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "31",
    "iso2": "SA",
    "latitude": 0.6246932,
    "longitude": 123.9750018
  },
  {
    "id": 1809,
    "name": "Riau",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "37",
    "iso2": "RI",
    "latitude": 0.2933469,
    "longitude": 101.7068294
  },
  {
    "id": 1810,
    "name": "Banten",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "33",
    "iso2": "BT",
    "latitude": -6.4058172,
    "longitude": 106.0640179
  },
  {
    "id": 1811,
    "name": "Lampung",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "15",
    "iso2": "LA",
    "latitude": -4.5585849,
    "longitude": 105.4068079
  },
  {
    "id": 1812,
    "name": "Gorontalo",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "34",
    "iso2": "GO",
    "latitude": 0.5435442,
    "longitude": 123.0567693
  },
  {
    "id": 1813,
    "name": "Central Sulawesi",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "21",
    "iso2": "ST",
    "latitude": -1.4300254,
    "longitude": 121.4456179
  },
  {
    "id": 1814,
    "name": "West Nusa Tenggara",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "17",
    "iso2": "NB",
    "latitude": -8.6529334,
    "longitude": 117.3616476
  },
  {
    "id": 1815,
    "name": "Jambi",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "05",
    "iso2": "JA",
    "latitude": -1.6101229,
    "longitude": 103.6131203
  },
  {
    "id": 1816,
    "name": "South Sumatra",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "32",
    "iso2": "SS",
    "latitude": -3.3194374,
    "longitude": 103.914399
  },
  {
    "id": 1817,
    "name": "West Sulawesi",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "41",
    "iso2": "SR",
    "latitude": -2.8441371,
    "longitude": 119.2320784
  },
  {
    "id": 1818,
    "name": "East Nusa Tenggara",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "18",
    "iso2": "NT",
    "latitude": -8.6573819,
    "longitude": 121.0793705
  },
  {
    "id": 1819,
    "name": "South Kalimantan",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "12",
    "iso2": "KS",
    "latitude": -3.0926415,
    "longitude": 115.2837585
  },
  {
    "id": 1820,
    "name": "Bangka Belitung Islands",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "35",
    "iso2": "BB",
    "latitude": -2.7410513,
    "longitude": 106.4405872
  },
  {
    "id": 1821,
    "name": "Lesser Sunda Islands",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "35",
    "iso2": "NU",
    "latitude": -9,
    "longitude": 120
  },
  {
    "id": 1822,
    "name": "Aceh",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "01",
    "iso2": "AC",
    "latitude": 4.695135,
    "longitude": 96.7493993
  },
  {
    "id": 1823,
    "name": "Maluku Islands",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "01",
    "iso2": "ML",
    "latitude": -2.8646166,
    "longitude": 129.5765974
  },
  {
    "id": 1824,
    "name": "North Kalimantan",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "42",
    "iso2": "KU",
    "latitude": 3.0730929,
    "longitude": 116.0413889
  },
  {
    "id": 1825,
    "name": "West Java",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "30",
    "iso2": "JB",
    "latitude": -7.090911,
    "longitude": 107.668887
  },
  {
    "id": 1826,
    "name": "Bali",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "02",
    "iso2": "BA",
    "latitude": -8.3405389,
    "longitude": 115.0919509
  },
  {
    "id": 1827,
    "name": "East Java",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "08",
    "iso2": "JI",
    "latitude": -7.5360639,
    "longitude": 112.2384017
  },
  {
    "id": 1828,
    "name": "West Sumatra",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "24",
    "iso2": "SB",
    "latitude": -0.7399397,
    "longitude": 100.8000051
  },
  {
    "id": 1829,
    "name": "Special Region of Yogyakarta",
    "countryId": 102,
    "countryCode": "ID",
    "fipsCode": "10",
    "iso2": "YO",
    "latitude": -7.8753849,
    "longitude": 110.4262088
  },
  {
    "id": 1830,
    "name": "Phoenix Islands",
    "countryId": 114,
    "countryCode": "KI",
    "fipsCode": "03",
    "iso2": "P",
    "latitude": 33.3284369,
    "longitude": -111.9824774
  },
  {
    "id": 1831,
    "name": "Gilbert Islands",
    "countryId": 114,
    "countryCode": "KI",
    "fipsCode": "01",
    "iso2": "G",
    "latitude": 0.3524262,
    "longitude": 174.7552634
  },
  {
    "id": 1832,
    "name": "Line Islands",
    "countryId": 114,
    "countryCode": "KI",
    "fipsCode": "02",
    "iso2": "L",
    "latitude": 1.7429439,
    "longitude": -157.2132826
  },
  {
    "id": 1833,
    "name": "Primorsky Krai",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "59",
    "iso2": "PRI",
    "latitude": 45.0525641,
    "longitude": 135
  },
  {
    "id": 1834,
    "name": "Novgorod Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "52",
    "iso2": "NGR",
    "latitude": 58.2427552,
    "longitude": 32.566519
  },
  {
    "id": 1835,
    "name": "Jewish Autonomous Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "89",
    "iso2": "YEV",
    "latitude": 48.4808147,
    "longitude": 131.7657367
  },
  {
    "id": 1836,
    "name": "Nenets Autonomous Okrug",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "50",
    "iso2": "NEN",
    "latitude": 67.6078337,
    "longitude": 57.6338331
  },
  {
    "id": 1837,
    "name": "Rostov Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "61",
    "iso2": "ROS",
    "latitude": 47.6853247,
    "longitude": 41.8258952
  },
  {
    "id": 1838,
    "name": "Khanty-Mansi Autonomous Okrug",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "32",
    "iso2": "KHM",
    "latitude": 62.2287062,
    "longitude": 70.6410057
  },
  {
    "id": 1839,
    "name": "Magadan Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "44",
    "iso2": "MAG",
    "latitude": 62.6643417,
    "longitude": 153.914991
  },
  {
    "id": 1840,
    "name": "Krasnoyarsk Krai",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "91",
    "iso2": "KYA",
    "latitude": 64.2479758,
    "longitude": 95.1104176
  },
  {
    "id": 1841,
    "name": "Republic of Karelia",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "28",
    "iso2": "KR",
    "latitude": 63.1558702,
    "longitude": 32.9905552
  },
  {
    "id": 1842,
    "name": "Republic of Buryatia",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "11",
    "iso2": "BU",
    "latitude": 54.8331146,
    "longitude": 112.406053
  },
  {
    "id": 1843,
    "name": "Murmansk Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "49",
    "iso2": "MUR",
    "latitude": 67.8442674,
    "longitude": 35.0884102
  },
  {
    "id": 1844,
    "name": "Kaluga Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "25",
    "iso2": "KLU",
    "latitude": 54.3872666,
    "longitude": 35.1889094
  },
  {
    "id": 1845,
    "name": "Chelyabinsk Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "13",
    "iso2": "CHE",
    "latitude": 54.4319422,
    "longitude": 60.8788963
  },
  {
    "id": 1846,
    "name": "Omsk Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "54",
    "iso2": "OMS",
    "latitude": 55.0554669,
    "longitude": 73.3167342
  },
  {
    "id": 1847,
    "name": "Yamalo-Nenets Autonomous Okrug",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "87",
    "iso2": "YAN",
    "latitude": 66.0653057,
    "longitude": 76.9345193
  },
  {
    "id": 1848,
    "name": "Sakha Republic",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "63",
    "iso2": "SA",
    "latitude": 66.7613451,
    "longitude": 124.123753
  },
  {
    "id": 1849,
    "name": "Arkhangelsk",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "06",
    "iso2": "ARK",
    "latitude": 64.5458549,
    "longitude": 40.5505769
  },
  {
    "id": 1850,
    "name": "Republic of Dagestan",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "17",
    "iso2": "DA",
    "latitude": 42.1431886,
    "longitude": 47.0949799
  },
  {
    "id": 1851,
    "name": "Yaroslavl Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "88",
    "iso2": "YAR",
    "latitude": 57.8991523,
    "longitude": 38.8388633
  },
  {
    "id": 1852,
    "name": "Republic of Adygea",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "01",
    "iso2": "AD",
    "latitude": 44.8229155,
    "longitude": 40.1754463
  },
  {
    "id": 1853,
    "name": "Republic of North Ossetia-Alania",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "68",
    "iso2": "SE",
    "latitude": 43.0451302,
    "longitude": 44.2870972
  },
  {
    "id": 1854,
    "name": "Republic of Bashkortostan",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "08",
    "iso2": "BA",
    "latitude": 54.2312172,
    "longitude": 56.1645257
  },
  {
    "id": 1855,
    "name": "Kursk Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "41",
    "iso2": "KRS",
    "latitude": 51.7634026,
    "longitude": 35.3811812
  },
  {
    "id": 1856,
    "name": "Ulyanovsk Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "81",
    "iso2": "ULY",
    "latitude": 53.9793357,
    "longitude": 47.7762425
  },
  {
    "id": 1857,
    "name": "Nizhny Novgorod Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "51",
    "iso2": "NIZ",
    "latitude": 55.7995159,
    "longitude": 44.0296769
  },
  {
    "id": 1858,
    "name": "Amur Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "05",
    "iso2": "AMU",
    "latitude": 54.6035065,
    "longitude": 127.4801721
  },
  {
    "id": 1859,
    "name": "Chukotka Autonomous Okrug",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "15",
    "iso2": "CHU",
    "latitude": 65.6298355,
    "longitude": 171.6952159
  },
  {
    "id": 1860,
    "name": "Tver Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "77",
    "iso2": "TVE",
    "latitude": 57.0021654,
    "longitude": 33.9853142
  },
  {
    "id": 1861,
    "name": "Republic of Tatarstan",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "73",
    "iso2": "TA",
    "latitude": 55.1802364,
    "longitude": 50.7263945
  },
  {
    "id": 1862,
    "name": "Samara Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "65",
    "iso2": "SAM",
    "latitude": 53.4183839,
    "longitude": 50.4725528
  },
  {
    "id": 1863,
    "name": "Pskov Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "60",
    "iso2": "PSK",
    "latitude": 56.7708599,
    "longitude": 29.094009
  },
  {
    "id": 1864,
    "name": "Ivanovo Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "21",
    "iso2": "IVA",
    "latitude": 57.1056854,
    "longitude": 41.4830084
  },
  {
    "id": 1865,
    "name": "Kamchatka Krai",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "92",
    "iso2": "KAM",
    "latitude": 61.4343981,
    "longitude": 166.7884131
  },
  {
    "id": 1866,
    "name": "Astrakhan Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "07",
    "iso2": "AST",
    "latitude": 46.1321166,
    "longitude": 48.0610115
  },
  {
    "id": 1867,
    "name": "Bryansk Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "10",
    "iso2": "BRY",
    "latitude": 53.0408599,
    "longitude": 33.26909
  },
  {
    "id": 1868,
    "name": "Stavropol Krai",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "70",
    "iso2": "STA",
    "latitude": 44.6680993,
    "longitude": 43.520214
  },
  {
    "id": 1869,
    "name": "Karachay-Cherkess Republic",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "27",
    "iso2": "KC",
    "latitude": 43.8845143,
    "longitude": 41.7303939
  },
  {
    "id": 1870,
    "name": "Mari El Republic",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "45",
    "iso2": "ME",
    "latitude": 56.438457,
    "longitude": 47.9607758
  },
  {
    "id": 1871,
    "name": "Perm Krai",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "90",
    "iso2": "PER",
    "latitude": 58.8231929,
    "longitude": 56.5872481
  },
  {
    "id": 1872,
    "name": "Tomsk Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "75",
    "iso2": "TOM",
    "latitude": 58.8969882,
    "longitude": 82.67655
  },
  {
    "id": 1873,
    "name": "Khabarovsk Krai",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "30",
    "iso2": "KHA",
    "latitude": 50.5888431,
    "longitude": 135
  },
  {
    "id": 1874,
    "name": "Vologda Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "85",
    "iso2": "VLG",
    "latitude": 59.8706711,
    "longitude": 40.6555411
  },
  {
    "id": 1875,
    "name": "Sakhalin",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "64",
    "iso2": "SAK",
    "latitude": 50.6909848,
    "longitude": 142.9505689
  },
  {
    "id": 1876,
    "name": "Altai Republic",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "03",
    "iso2": "AL",
    "latitude": 50.6181924,
    "longitude": 86.2199308
  },
  {
    "id": 1877,
    "name": "Republic of Khakassia",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "31",
    "iso2": "KK",
    "latitude": 53.0452281,
    "longitude": 90.3982145
  },
  {
    "id": 1878,
    "name": "Tambov Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "72",
    "iso2": "TAM",
    "latitude": 52.6416589,
    "longitude": 41.4216451
  },
  {
    "id": 1879,
    "name": "Saint Petersburg",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "66",
    "iso2": "SPE",
    "latitude": 59.9310584,
    "longitude": 30.3609096
  },
  {
    "id": 1880,
    "name": "Irkutsk",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "20",
    "iso2": "IRK",
    "latitude": 52.2854834,
    "longitude": 104.2890222
  },
  {
    "id": 1881,
    "name": "Vladimir Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "83",
    "iso2": "VLA",
    "latitude": 56.1553465,
    "longitude": 40.5926685
  },
  {
    "id": 1882,
    "name": "Moscow Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "47",
    "iso2": "MOS",
    "latitude": 55.340396,
    "longitude": 38.2917651
  },
  {
    "id": 1883,
    "name": "Republic of Kalmykia",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "24",
    "iso2": "KL",
    "latitude": 46.1867176,
    "longitude": 45
  },
  {
    "id": 1884,
    "name": "Republic of Ingushetia",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "19",
    "iso2": "IN",
    "latitude": 43.4051698,
    "longitude": 44.8202999
  },
  {
    "id": 1885,
    "name": "Smolensk Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "69",
    "iso2": "SMO",
    "latitude": 54.9882994,
    "longitude": 32.6677378
  },
  {
    "id": 1886,
    "name": "Orenburg Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "55",
    "iso2": "ORE",
    "latitude": 51.7634026,
    "longitude": 54.6188188
  },
  {
    "id": 1887,
    "name": "Saratov Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "67",
    "iso2": "SAR",
    "latitude": 51.8369263,
    "longitude": 46.7539397
  },
  {
    "id": 1888,
    "name": "Novosibirsk",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "53",
    "iso2": "NVS",
    "latitude": 54.9832693,
    "longitude": 82.8963831
  },
  {
    "id": 1889,
    "name": "Lipetsk Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "43",
    "iso2": "LIP",
    "latitude": 52.5264702,
    "longitude": 39.2032269
  },
  {
    "id": 1890,
    "name": "Kirov Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "33",
    "iso2": "KIR",
    "latitude": 58.4198529,
    "longitude": 50.2097248
  },
  {
    "id": 1891,
    "name": "Krasnodar Krai",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "38",
    "iso2": "KDA",
    "latitude": 45.6415289,
    "longitude": 39.7055977
  },
  {
    "id": 1892,
    "name": "Kabardino-Balkar Republic",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "22",
    "iso2": "KB",
    "latitude": 43.3932469,
    "longitude": 43.5628498
  },
  {
    "id": 1893,
    "name": "Chechen Republic",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "12",
    "iso2": "CE",
    "latitude": 43.4023301,
    "longitude": 45.7187468
  },
  {
    "id": 1894,
    "name": "Sverdlovsk",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "71",
    "iso2": "SVE",
    "latitude": 56.8430993,
    "longitude": 60.6454086
  },
  {
    "id": 1895,
    "name": "Tula Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "76",
    "iso2": "TUL",
    "latitude": 54.163768,
    "longitude": 37.5649507
  },
  {
    "id": 1896,
    "name": "Leningrad Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "42",
    "iso2": "LEN",
    "latitude": 60.0793208,
    "longitude": 31.8926645
  },
  {
    "id": 1897,
    "name": "Kemerovo Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "29",
    "iso2": "KEM",
    "latitude": 54.7574648,
    "longitude": 87.4055288
  },
  {
    "id": 1898,
    "name": "Republic of Mordovia",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "46",
    "iso2": "MO",
    "latitude": 54.2369441,
    "longitude": 44.068397
  },
  {
    "id": 1899,
    "name": "Komi Republic",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "34",
    "iso2": "KO",
    "latitude": 63.8630539,
    "longitude": 54.831269
  },
  {
    "id": 1900,
    "name": "Tuva Republic",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "79",
    "iso2": "TY",
    "latitude": 51.8872669,
    "longitude": 95.6260172
  },
  {
    "id": 1901,
    "name": "Moscow",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "48",
    "iso2": "MOW",
    "latitude": 55.755826,
    "longitude": 37.6172999
  },
  {
    "id": 1902,
    "name": "Kaliningrad",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "23",
    "iso2": "KGD",
    "latitude": 54.7104264,
    "longitude": 20.4522144
  },
  {
    "id": 1903,
    "name": "Belgorod Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "09",
    "iso2": "BEL",
    "latitude": 50.7106926,
    "longitude": 37.7533377
  },
  {
    "id": 1904,
    "name": "Zabaykalsky Krai",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "93",
    "iso2": "ZAB",
    "latitude": 53.0928771,
    "longitude": 116.9676561
  },
  {
    "id": 1905,
    "name": "Ryazan Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "62",
    "iso2": "RYA",
    "latitude": 54.3875964,
    "longitude": 41.2595661
  },
  {
    "id": 1906,
    "name": "Voronezh Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "86",
    "iso2": "VOR",
    "latitude": 50.8589713,
    "longitude": 39.8644374
  },
  {
    "id": 1907,
    "name": "Tyumen Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "78",
    "iso2": "TYU",
    "latitude": 56.9634387,
    "longitude": 66.948278
  },
  {
    "id": 1908,
    "name": "Oryol Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "56",
    "iso2": "ORL",
    "latitude": 52.7856414,
    "longitude": 36.9242344
  },
  {
    "id": 1909,
    "name": "Penza Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "57",
    "iso2": "PNZ",
    "latitude": 53.1412105,
    "longitude": 44.0940048
  },
  {
    "id": 1910,
    "name": "Kostroma Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "37",
    "iso2": "KOS",
    "latitude": 58.5501069,
    "longitude": 43.9541102
  },
  {
    "id": 1911,
    "name": "Altai Krai",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "04",
    "iso2": "ALT",
    "latitude": 51.7936298,
    "longitude": 82.6758596
  },
  {
    "id": 1912,
    "name": "Sevastopol",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "20",
    "iso2": "UA-40",
    "latitude": 44.61665,
    "longitude": 33.5253671
  },
  {
    "id": 1913,
    "name": "Udmurt Republic",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "80",
    "iso2": "UD",
    "latitude": 57.0670218,
    "longitude": 53.0277948
  },
  {
    "id": 1914,
    "name": "Chuvash Republic",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "16",
    "iso2": "CU",
    "latitude": 55.5595992,
    "longitude": 46.9283535
  },
  {
    "id": 1915,
    "name": "Kurgan Oblast",
    "countryId": 182,
    "countryCode": "RU",
    "fipsCode": "40",
    "iso2": "KGN",
    "latitude": 55.4481548,
    "longitude": 65.1180975
  },
  {
    "id": 1916,
    "name": "Lomaiviti",
    "countryId": 73,
    "countryCode": "FJ",
    "fipsCode": "40",
    "iso2": "06",
    "latitude": -17.709,
    "longitude": 179.091
  },
  {
    "id": 1917,
    "name": "Ba",
    "countryId": 73,
    "countryCode": "FJ",
    "fipsCode": "40",
    "iso2": "01",
    "latitude": 36.0613893,
    "longitude": -95.8005872
  },
  {
    "id": 1918,
    "name": "Tailevu",
    "countryId": 73,
    "countryCode": "FJ",
    "fipsCode": "40",
    "iso2": "14",
    "latitude": -17.8269111,
    "longitude": 178.293248
  },
  {
    "id": 1919,
    "name": "Nadroga-Navosa",
    "countryId": 73,
    "countryCode": "FJ",
    "fipsCode": "40",
    "iso2": "08",
    "latitude": -17.9865278,
    "longitude": 177.658113
  },
  {
    "id": 1920,
    "name": "Rewa",
    "countryId": 73,
    "countryCode": "FJ",
    "fipsCode": "40",
    "iso2": "12",
    "latitude": 34.7923517,
    "longitude": -82.3609264
  },
  {
    "id": 1921,
    "name": "Northern Division",
    "countryId": 73,
    "countryCode": "FJ",
    "fipsCode": "03",
    "iso2": "N",
    "latitude": 32.8768766,
    "longitude": -117.2156345
  },
  {
    "id": 1922,
    "name": "Macuata",
    "countryId": 73,
    "countryCode": "FJ",
    "fipsCode": "03",
    "iso2": "07",
    "latitude": -16.4864922,
    "longitude": 179.2847251
  },
  {
    "id": 1923,
    "name": "Western Division",
    "countryId": 73,
    "countryCode": "FJ",
    "fipsCode": "05",
    "iso2": "W",
    "latitude": 42.9662198,
    "longitude": -78.7021134
  },
  {
    "id": 1924,
    "name": "Cakaudrove",
    "countryId": 73,
    "countryCode": "FJ",
    "fipsCode": "05",
    "iso2": "03",
    "latitude": -16.5814105,
    "longitude": 179.5120084
  },
  {
    "id": 1925,
    "name": "Serua",
    "countryId": 73,
    "countryCode": "FJ",
    "fipsCode": "05",
    "iso2": "13",
    "latitude": -18.1804749,
    "longitude": 178.050979
  },
  {
    "id": 1926,
    "name": "Ra",
    "countryId": 73,
    "countryCode": "FJ",
    "fipsCode": "05",
    "iso2": "11",
    "latitude": 37.1003153,
    "longitude": -95.6744246
  },
  {
    "id": 1927,
    "name": "Naitasiri",
    "countryId": 73,
    "countryCode": "FJ",
    "fipsCode": "05",
    "iso2": "09",
    "latitude": -17.8975754,
    "longitude": 178.2071598
  },
  {
    "id": 1928,
    "name": "Namosi",
    "countryId": 73,
    "countryCode": "FJ",
    "fipsCode": "05",
    "iso2": "10",
    "latitude": -18.0864176,
    "longitude": 178.1291387
  },
  {
    "id": 1929,
    "name": "Central Division",
    "countryId": 73,
    "countryCode": "FJ",
    "fipsCode": "01",
    "iso2": "C",
    "latitude": 34.0440066,
    "longitude": -118.2472738
  },
  {
    "id": 1930,
    "name": "Bua",
    "countryId": 73,
    "countryCode": "FJ",
    "fipsCode": "01",
    "iso2": "02",
    "latitude": 43.0964584,
    "longitude": -89.50088
  },
  {
    "id": 1931,
    "name": "Rotuma",
    "countryId": 73,
    "countryCode": "FJ",
    "fipsCode": "04",
    "iso2": "R",
    "latitude": -12.5025069,
    "longitude": 177.0724164
  },
  {
    "id": 1932,
    "name": "Eastern Division",
    "countryId": 73,
    "countryCode": "FJ",
    "fipsCode": "02",
    "iso2": "E",
    "latitude": 32.8094305,
    "longitude": -117.1289937
  },
  {
    "id": 1933,
    "name": "Lau",
    "countryId": 73,
    "countryCode": "FJ",
    "fipsCode": "02",
    "iso2": "05",
    "latitude": 31.6687015,
    "longitude": -106.3955763
  },
  {
    "id": 1934,
    "name": "Kadavu",
    "countryId": 73,
    "countryCode": "FJ",
    "fipsCode": "02",
    "iso2": "04",
    "latitude": -19.0127122,
    "longitude": 178.1876676
  },
  {
    "id": 1935,
    "name": "Labuan",
    "countryId": 132,
    "countryCode": "MY",
    "fipsCode": "15",
    "iso2": "15",
    "latitude": 5.2831456,
    "longitude": 115.230825
  },
  {
    "id": 1936,
    "name": "Sabah",
    "countryId": 132,
    "countryCode": "MY",
    "fipsCode": "16",
    "iso2": "12",
    "latitude": 5.9788398,
    "longitude": 116.0753199
  },
  {
    "id": 1937,
    "name": "Sarawak",
    "countryId": 132,
    "countryCode": "MY",
    "fipsCode": "11",
    "iso2": "13",
    "latitude": 1.5532783,
    "longitude": 110.3592127
  },
  {
    "id": 1938,
    "name": "Perlis",
    "countryId": 132,
    "countryCode": "MY",
    "fipsCode": "08",
    "iso2": "09",
    "latitude": 29.9227094,
    "longitude": -90.1228559
  },
  {
    "id": 1939,
    "name": "Penang",
    "countryId": 132,
    "countryCode": "MY",
    "fipsCode": "09",
    "iso2": "07",
    "latitude": 5.4163935,
    "longitude": 100.3326786
  },
  {
    "id": 1940,
    "name": "Pahang",
    "countryId": 132,
    "countryCode": "MY",
    "fipsCode": "06",
    "iso2": "06",
    "latitude": 3.8126318,
    "longitude": 103.3256204
  },
  {
    "id": 1941,
    "name": "Malacca",
    "countryId": 132,
    "countryCode": "MY",
    "fipsCode": "04",
    "iso2": "04",
    "latitude": 2.189594,
    "longitude": 102.2500868
  },
  {
    "id": 1942,
    "name": "Terengganu",
    "countryId": 132,
    "countryCode": "MY",
    "fipsCode": "13",
    "iso2": "11",
    "latitude": 5.3116916,
    "longitude": 103.1324154
  },
  {
    "id": 1943,
    "name": "Perak",
    "countryId": 132,
    "countryCode": "MY",
    "fipsCode": "07",
    "iso2": "08",
    "latitude": 4.5921126,
    "longitude": 101.090109
  },
  {
    "id": 1944,
    "name": "Selangor",
    "countryId": 132,
    "countryCode": "MY",
    "fipsCode": "12",
    "iso2": "10",
    "latitude": 3.0738379,
    "longitude": 101.5183469
  },
  {
    "id": 1945,
    "name": "Putrajaya",
    "countryId": 132,
    "countryCode": "MY",
    "fipsCode": "17",
    "iso2": "16",
    "latitude": 2.926361,
    "longitude": 101.696445
  },
  {
    "id": 1946,
    "name": "Kelantan",
    "countryId": 132,
    "countryCode": "MY",
    "fipsCode": "03",
    "iso2": "03",
    "latitude": 6.1253969,
    "longitude": 102.238071
  },
  {
    "id": 1947,
    "name": "Kedah",
    "countryId": 132,
    "countryCode": "MY",
    "fipsCode": "02",
    "iso2": "02",
    "latitude": 6.1183964,
    "longitude": 100.3684595
  },
  {
    "id": 1948,
    "name": "Negeri Sembilan",
    "countryId": 132,
    "countryCode": "MY",
    "fipsCode": "05",
    "iso2": "05",
    "latitude": 2.7258058,
    "longitude": 101.9423782
  },
  {
    "id": 1949,
    "name": "Kuala Lumpur",
    "countryId": 132,
    "countryCode": "MY",
    "fipsCode": "14",
    "iso2": "14",
    "latitude": 3.139003,
    "longitude": 101.686855
  },
  {
    "id": 1950,
    "name": "Johor",
    "countryId": 132,
    "countryCode": "MY",
    "fipsCode": "01",
    "iso2": "01",
    "latitude": 1.4853682,
    "longitude": 103.7618154
  },
  {
    "id": 1951,
    "name": "Mashonaland East Province",
    "countryId": 247,
    "countryCode": "ZW",
    "fipsCode": "04",
    "iso2": "ME",
    "latitude": -18.5871642,
    "longitude": 31.2626366
  },
  {
    "id": 1952,
    "name": "Matabeleland South Province",
    "countryId": 247,
    "countryCode": "ZW",
    "fipsCode": "07",
    "iso2": "MS",
    "latitude": -21.052337,
    "longitude": 29.0459927
  },
  {
    "id": 1953,
    "name": "Mashonaland West Province",
    "countryId": 247,
    "countryCode": "ZW",
    "fipsCode": "05",
    "iso2": "MW",
    "latitude": -17.4851029,
    "longitude": 29.7889248
  },
  {
    "id": 1954,
    "name": "Matabeleland North Province",
    "countryId": 247,
    "countryCode": "ZW",
    "fipsCode": "06",
    "iso2": "MN",
    "latitude": -18.5331566,
    "longitude": 27.5495846
  },
  {
    "id": 1955,
    "name": "Mashonaland Central Province",
    "countryId": 247,
    "countryCode": "ZW",
    "fipsCode": "03",
    "iso2": "MC",
    "latitude": -16.7644295,
    "longitude": 31.0793705
  },
  {
    "id": 1956,
    "name": "Bulawayo Province",
    "countryId": 247,
    "countryCode": "ZW",
    "fipsCode": "09",
    "iso2": "BU",
    "latitude": -20.1489505,
    "longitude": 28.5331038
  },
  {
    "id": 1957,
    "name": "Midlands Province",
    "countryId": 247,
    "countryCode": "ZW",
    "fipsCode": "02",
    "iso2": "MI",
    "latitude": -19.0552009,
    "longitude": 29.6035495
  },
  {
    "id": 1958,
    "name": "Harare Province",
    "countryId": 247,
    "countryCode": "ZW",
    "fipsCode": "10",
    "iso2": "HA",
    "latitude": -17.8216288,
    "longitude": 31.0492259
  },
  {
    "id": 1959,
    "name": "Manicaland",
    "countryId": 247,
    "countryCode": "ZW",
    "fipsCode": "01",
    "iso2": "MA",
    "latitude": -18.9216386,
    "longitude": 32.174605
  },
  {
    "id": 1960,
    "name": "Masvingo Province",
    "countryId": 247,
    "countryCode": "ZW",
    "fipsCode": "08",
    "iso2": "MV",
    "latitude": -20.6241509,
    "longitude": 31.2626366
  },
  {
    "id": 1961,
    "name": "Bulgan Province",
    "countryId": 146,
    "countryCode": "MN",
    "fipsCode": "21",
    "iso2": "067",
    "latitude": 48.9690913,
    "longitude": 102.8831723
  },
  {
    "id": 1962,
    "name": "Darkhan-Uul Province",
    "countryId": 146,
    "countryCode": "MN",
    "fipsCode": "23",
    "iso2": "037",
    "latitude": 49.4648434,
    "longitude": 105.9745919
  },
  {
    "id": 1963,
    "name": "Dornod Province",
    "countryId": 146,
    "countryCode": "MN",
    "fipsCode": "06",
    "iso2": "061",
    "latitude": 47.4658154,
    "longitude": 115.392712
  },
  {
    "id": 1964,
    "name": "Khovd Province",
    "countryId": 146,
    "countryCode": "MN",
    "fipsCode": "12",
    "iso2": "043",
    "latitude": 47.1129654,
    "longitude": 92.3110752
  },
  {
    "id": 1965,
    "name": "Övörkhangai Province",
    "countryId": 146,
    "countryCode": "MN",
    "fipsCode": "15",
    "iso2": "055",
    "latitude": 45.7624392,
    "longitude": 103.0917032
  },
  {
    "id": 1966,
    "name": "Orkhon Province",
    "countryId": 146,
    "countryCode": "MN",
    "fipsCode": "25",
    "iso2": "035",
    "latitude": 49.004705,
    "longitude": 104.3016527
  },
  {
    "id": 1967,
    "name": "Ömnögovi Province",
    "countryId": 146,
    "countryCode": "MN",
    "fipsCode": "14",
    "iso2": "053",
    "latitude": 43.500024,
    "longitude": 104.2861116
  },
  {
    "id": 1968,
    "name": "Töv Province",
    "countryId": 146,
    "countryCode": "MN",
    "fipsCode": "18",
    "iso2": "047",
    "latitude": 47.2124056,
    "longitude": 106.41541
  },
  {
    "id": 1969,
    "name": "Bayan-Ölgii Province",
    "countryId": 146,
    "countryCode": "MN",
    "fipsCode": "03",
    "iso2": "071",
    "latitude": 48.3983254,
    "longitude": 89.6625915
  },
  {
    "id": 1970,
    "name": "Dundgovi Province",
    "countryId": 146,
    "countryCode": "MN",
    "fipsCode": "08",
    "iso2": "059",
    "latitude": 45.5822786,
    "longitude": 106.7644209
  },
  {
    "id": 1971,
    "name": "Uvs Province",
    "countryId": 146,
    "countryCode": "MN",
    "fipsCode": "19",
    "iso2": "046",
    "latitude": 49.6449707,
    "longitude": 93.2736576
  },
  {
    "id": 1972,
    "name": "Govi-Altai Province",
    "countryId": 146,
    "countryCode": "MN",
    "fipsCode": "10",
    "iso2": "065",
    "latitude": 45.4511227,
    "longitude": 95.8505766
  },
  {
    "id": 1973,
    "name": "Arkhangai Province",
    "countryId": 146,
    "countryCode": "MN",
    "fipsCode": "01",
    "iso2": "073",
    "latitude": 47.8971101,
    "longitude": 100.7240165
  },
  {
    "id": 1974,
    "name": "Khentii Province",
    "countryId": 146,
    "countryCode": "MN",
    "fipsCode": "11",
    "iso2": "039",
    "latitude": 47.6081209,
    "longitude": 109.9372856
  },
  {
    "id": 1975,
    "name": "Khövsgöl Province",
    "countryId": 146,
    "countryCode": "MN",
    "fipsCode": "13",
    "iso2": "041",
    "latitude": 50.2204484,
    "longitude": 100.3213768
  },
  {
    "id": 1976,
    "name": "Bayankhongor Province",
    "countryId": 146,
    "countryCode": "MN",
    "fipsCode": "02",
    "iso2": "069",
    "latitude": 45.1526707,
    "longitude": 100.1073667
  },
  {
    "id": 1977,
    "name": "Sükhbaatar Province",
    "countryId": 146,
    "countryCode": "MN",
    "fipsCode": "17",
    "iso2": "051",
    "latitude": 46.5653163,
    "longitude": 113.5380836
  },
  {
    "id": 1978,
    "name": "Govisümber Province",
    "countryId": 146,
    "countryCode": "MN",
    "fipsCode": "24",
    "iso2": "064",
    "latitude": 46.4762754,
    "longitude": 108.5570627
  },
  {
    "id": 1979,
    "name": "Zavkhan Province",
    "countryId": 146,
    "countryCode": "MN",
    "fipsCode": "09",
    "iso2": "057",
    "latitude": 48.2388147,
    "longitude": 96.0703019
  },
  {
    "id": 1980,
    "name": "Selenge Province",
    "countryId": 146,
    "countryCode": "MN",
    "fipsCode": "16",
    "iso2": "049",
    "latitude": 50.0059273,
    "longitude": 106.4434108
  },
  {
    "id": 1981,
    "name": "Dornogovi Province",
    "countryId": 146,
    "countryCode": "MN",
    "fipsCode": "07",
    "iso2": "063",
    "latitude": 43.9653889,
    "longitude": 109.1773459
  },
  {
    "id": 1982,
    "name": "Northern Province",
    "countryId": 246,
    "countryCode": "ZM",
    "fipsCode": "05",
    "iso2": "05",
    "latitude": 8.8855027,
    "longitude": 80.2767327
  },
  {
    "id": 1983,
    "name": "Western Province",
    "countryId": 246,
    "countryCode": "ZM",
    "fipsCode": "01",
    "iso2": "01",
    "latitude": 6.9016086,
    "longitude": 80.0087746
  },
  {
    "id": 1984,
    "name": "Copperbelt Province",
    "countryId": 246,
    "countryCode": "ZM",
    "fipsCode": "08",
    "iso2": "08",
    "latitude": -13.0570073,
    "longitude": 27.5495846
  },
  {
    "id": 1985,
    "name": "Northwestern Province",
    "countryId": 246,
    "countryCode": "ZM",
    "fipsCode": "06",
    "iso2": "06",
    "latitude": -13.0050258,
    "longitude": 24.9042208
  },
  {
    "id": 1986,
    "name": "Central Province",
    "countryId": 246,
    "countryCode": "ZM",
    "fipsCode": "02",
    "iso2": "02",
    "latitude": 7.2564996,
    "longitude": 80.7214417
  },
  {
    "id": 1987,
    "name": "Luapula Province",
    "countryId": 246,
    "countryCode": "ZM",
    "fipsCode": "04",
    "iso2": "04",
    "latitude": -11.564831,
    "longitude": 29.0459927
  },
  {
    "id": 1988,
    "name": "Lusaka Province",
    "countryId": 246,
    "countryCode": "ZM",
    "fipsCode": "09",
    "iso2": "09",
    "latitude": -15.3657129,
    "longitude": 29.2320784
  },
  {
    "id": 1989,
    "name": "Muchinga Province",
    "countryId": 246,
    "countryCode": "ZM",
    "fipsCode": "10",
    "iso2": "10",
    "latitude": -15.382193,
    "longitude": 28.26158
  },
  {
    "id": 1990,
    "name": "Southern Province",
    "countryId": 246,
    "countryCode": "ZM",
    "fipsCode": "07",
    "iso2": "07",
    "latitude": 6.237375,
    "longitude": 80.543845
  },
  {
    "id": 1991,
    "name": "Eastern Province",
    "countryId": 246,
    "countryCode": "ZM",
    "fipsCode": "03",
    "iso2": "03",
    "latitude": 23.1669688,
    "longitude": 49.3653149
  },
  {
    "id": 1992,
    "name": "Capital Governorate",
    "countryId": 18,
    "countryCode": "BH",
    "fipsCode": "16",
    "iso2": "13",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 1993,
    "name": "Southern Governorate",
    "countryId": 18,
    "countryCode": "BH",
    "fipsCode": "17",
    "iso2": "14",
    "latitude": 25.9381018,
    "longitude": 50.5756887
  },
  {
    "id": 1994,
    "name": "Northern Governorate",
    "countryId": 18,
    "countryCode": "BH",
    "fipsCode": "18",
    "iso2": "17",
    "latitude": 26.1551914,
    "longitude": 50.4825173
  },
  {
    "id": 1995,
    "name": "Muharraq Governorate",
    "countryId": 18,
    "countryCode": "BH",
    "fipsCode": "15",
    "iso2": "15",
    "latitude": 26.2685653,
    "longitude": 50.6482517
  },
  {
    "id": 1996,
    "name": "Central Governorate",
    "countryId": 18,
    "countryCode": "BH",
    "fipsCode": "19",
    "iso2": "16",
    "latitude": 26.1426093,
    "longitude": 50.5653294
  },
  {
    "id": 1997,
    "name": "Rio de Janeiro",
    "countryId": 31,
    "countryCode": "BR",
    "fipsCode": "21",
    "iso2": "RJ",
    "latitude": -22.9068467,
    "longitude": -43.1728965
  },
  {
    "id": 1998,
    "name": "Minas Gerais",
    "countryId": 31,
    "countryCode": "BR",
    "fipsCode": "15",
    "iso2": "MG",
    "latitude": -18.512178,
    "longitude": -44.5550308
  },
  {
    "id": 1999,
    "name": "Amapá",
    "countryId": 31,
    "countryCode": "BR",
    "fipsCode": "03",
    "iso2": "AP",
    "latitude": 0.9019925,
    "longitude": -52.0029565
  },
  {
    "id": 2000,
    "name": "Goiás",
    "countryId": 31,
    "countryCode": "BR",
    "fipsCode": "29",
    "iso2": "GO",
    "latitude": -15.8270369,
    "longitude": -49.8362237
  },
  {
    "id": 2001,
    "name": "Rio Grande do Sul",
    "countryId": 31,
    "countryCode": "BR",
    "fipsCode": "23",
    "iso2": "RS",
    "latitude": -30.0346316,
    "longitude": -51.2176986
  },
  {
    "id": 2002,
    "name": "Bahia",
    "countryId": 31,
    "countryCode": "BR",
    "fipsCode": "05",
    "iso2": "BA",
    "latitude": 26.113539,
    "longitude": -80.106204
  },
  {
    "id": 2003,
    "name": "Sergipe",
    "countryId": 31,
    "countryCode": "BR",
    "fipsCode": "28",
    "iso2": "SE",
    "latitude": -10.5740934,
    "longitude": -37.3856581
  },
  {
    "id": 2004,
    "name": "Amazonas",
    "countryId": 31,
    "countryCode": "BR",
    "fipsCode": "04",
    "iso2": "AM",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 2005,
    "name": "Paraíba",
    "countryId": 31,
    "countryCode": "BR",
    "fipsCode": "17",
    "iso2": "PB",
    "latitude": -7.2399609,
    "longitude": -36.7819505
  },
  {
    "id": 2006,
    "name": "Pernambuco",
    "countryId": 31,
    "countryCode": "BR",
    "fipsCode": "30",
    "iso2": "PE",
    "latitude": -8.8137173,
    "longitude": -36.954107
  },
  {
    "id": 2007,
    "name": "Alagoas",
    "countryId": 31,
    "countryCode": "BR",
    "fipsCode": "02",
    "iso2": "AL",
    "latitude": -9.5713058,
    "longitude": -36.7819505
  },
  {
    "id": 2008,
    "name": "Piauí",
    "countryId": 31,
    "countryCode": "BR",
    "fipsCode": "20",
    "iso2": "PI",
    "latitude": -7.7183401,
    "longitude": -42.7289236
  },
  {
    "id": 2009,
    "name": "Pará",
    "countryId": 31,
    "countryCode": "BR",
    "fipsCode": "16",
    "iso2": "PA",
    "latitude": -1.9981271,
    "longitude": -54.9306152
  },
  {
    "id": 2010,
    "name": "Mato Grosso do Sul",
    "countryId": 31,
    "countryCode": "BR",
    "fipsCode": "11",
    "iso2": "MS",
    "latitude": -20.7722295,
    "longitude": -54.7851531
  },
  {
    "id": 2011,
    "name": "Mato Grosso",
    "countryId": 31,
    "countryCode": "BR",
    "fipsCode": "14",
    "iso2": "MT",
    "latitude": -12.6818712,
    "longitude": -56.921099
  },
  {
    "id": 2012,
    "name": "Acre",
    "countryId": 31,
    "countryCode": "BR",
    "fipsCode": "01",
    "iso2": "AC",
    "latitude": 32.933052,
    "longitude": 35.082678
  },
  {
    "id": 2013,
    "name": "Rondônia",
    "countryId": 31,
    "countryCode": "BR",
    "fipsCode": "24",
    "iso2": "RO",
    "latitude": -11.5057341,
    "longitude": -63.580611
  },
  {
    "id": 2014,
    "name": "Santa Catarina",
    "countryId": 31,
    "countryCode": "BR",
    "fipsCode": "26",
    "iso2": "SC",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 2015,
    "name": "Maranhão",
    "countryId": 31,
    "countryCode": "BR",
    "fipsCode": "13",
    "iso2": "MA",
    "latitude": -4.9609498,
    "longitude": -45.2744159
  },
  {
    "id": 2016,
    "name": "Ceará",
    "countryId": 31,
    "countryCode": "BR",
    "fipsCode": "06",
    "iso2": "CE",
    "latitude": -5.4983977,
    "longitude": -39.3206241
  },
  {
    "id": 2017,
    "name": "Federal District",
    "countryId": 31,
    "countryCode": "BR",
    "fipsCode": "07",
    "iso2": "DF",
    "latitude": -15.7997654,
    "longitude": -47.8644715
  },
  {
    "id": 2018,
    "name": "Espírito Santo",
    "countryId": 31,
    "countryCode": "BR",
    "fipsCode": "08",
    "iso2": "ES",
    "latitude": -19.1834229,
    "longitude": -40.3088626
  },
  {
    "id": 2019,
    "name": "Rio Grande do Norte",
    "countryId": 31,
    "countryCode": "BR",
    "fipsCode": "22",
    "iso2": "RN",
    "latitude": -5.4025803,
    "longitude": -36.954107
  },
  {
    "id": 2020,
    "name": "Tocantins",
    "countryId": 31,
    "countryCode": "BR",
    "fipsCode": "31",
    "iso2": "TO",
    "latitude": -10.17528,
    "longitude": -48.2982474
  },
  {
    "id": 2021,
    "name": "São Paulo",
    "countryId": 31,
    "countryCode": "BR",
    "fipsCode": "27",
    "iso2": "SP",
    "latitude": -23.5505199,
    "longitude": -46.6333094
  },
  {
    "id": 2022,
    "name": "Paraná",
    "countryId": 31,
    "countryCode": "BR",
    "fipsCode": "18",
    "iso2": "PR",
    "latitude": -25.2520888,
    "longitude": -52.0215415
  },
  {
    "id": 2023,
    "name": "Aragatsotn Region",
    "countryId": 12,
    "countryCode": "AM",
    "fipsCode": "01",
    "iso2": "AG",
    "latitude": 40.3347301,
    "longitude": 44.3748296
  },
  {
    "id": 2024,
    "name": "Ararat Province",
    "countryId": 12,
    "countryCode": "AM",
    "fipsCode": "02",
    "iso2": "AR",
    "latitude": 39.9139415,
    "longitude": 44.7200004
  },
  {
    "id": 2025,
    "name": "Vayots Dzor Region",
    "countryId": 12,
    "countryCode": "AM",
    "fipsCode": "10",
    "iso2": "VD",
    "latitude": 39.7641996,
    "longitude": 45.3337528
  },
  {
    "id": 2026,
    "name": "Armavir Region",
    "countryId": 12,
    "countryCode": "AM",
    "fipsCode": "03",
    "iso2": "AV",
    "latitude": 40.1554631,
    "longitude": 44.0372446
  },
  {
    "id": 2027,
    "name": "Syunik Province",
    "countryId": 12,
    "countryCode": "AM",
    "fipsCode": "08",
    "iso2": "SU",
    "latitude": 39.5133112,
    "longitude": 46.3393234
  },
  {
    "id": 2028,
    "name": "Gegharkunik Province",
    "countryId": 12,
    "countryCode": "AM",
    "fipsCode": "04",
    "iso2": "GR",
    "latitude": 40.3526426,
    "longitude": 45.1260414
  },
  {
    "id": 2029,
    "name": "Lori Region",
    "countryId": 12,
    "countryCode": "AM",
    "fipsCode": "06",
    "iso2": "LO",
    "latitude": 40.9698452,
    "longitude": 44.4900138
  },
  {
    "id": 2030,
    "name": "Yerevan",
    "countryId": 12,
    "countryCode": "AM",
    "fipsCode": "11",
    "iso2": "ER",
    "latitude": 40.1872023,
    "longitude": 44.515209
  },
  {
    "id": 2031,
    "name": "Shirak Region",
    "countryId": 12,
    "countryCode": "AM",
    "fipsCode": "07",
    "iso2": "SH",
    "latitude": 40.9630814,
    "longitude": 43.8102461
  },
  {
    "id": 2032,
    "name": "Tavush Region",
    "countryId": 12,
    "countryCode": "AM",
    "fipsCode": "09",
    "iso2": "TV",
    "latitude": 40.8866296,
    "longitude": 45.339349
  },
  {
    "id": 2033,
    "name": "Kotayk Region",
    "countryId": 12,
    "countryCode": "AM",
    "fipsCode": "05",
    "iso2": "KT",
    "latitude": 40.5410214,
    "longitude": 44.7690148
  },
  {
    "id": 2034,
    "name": "Cojedes",
    "countryId": 239,
    "countryCode": "VE",
    "fipsCode": "08",
    "iso2": "H",
    "latitude": 9.3816682,
    "longitude": -68.3339275
  },
  {
    "id": 2035,
    "name": "Falcón",
    "countryId": 239,
    "countryCode": "VE",
    "fipsCode": "11",
    "iso2": "I",
    "latitude": 11.1810674,
    "longitude": -69.8597406
  },
  {
    "id": 2036,
    "name": "Portuguesa",
    "countryId": 239,
    "countryCode": "VE",
    "fipsCode": "18",
    "iso2": "P",
    "latitude": 9.0943999,
    "longitude": -69.097023
  },
  {
    "id": 2037,
    "name": "Miranda",
    "countryId": 239,
    "countryCode": "VE",
    "fipsCode": "15",
    "iso2": "M",
    "latitude": 42.3519383,
    "longitude": -71.5290766
  },
  {
    "id": 2038,
    "name": "Lara",
    "countryId": 239,
    "countryCode": "VE",
    "fipsCode": "13",
    "iso2": "K",
    "latitude": 33.9822165,
    "longitude": -118.1322747
  },
  {
    "id": 2039,
    "name": "Bolívar",
    "countryId": 239,
    "countryCode": "VE",
    "fipsCode": "06",
    "iso2": "F",
    "latitude": 37.6144838,
    "longitude": -93.4104749
  },
  {
    "id": 2040,
    "name": "Carabobo",
    "countryId": 239,
    "countryCode": "VE",
    "fipsCode": "07",
    "iso2": "G",
    "latitude": 10.1176433,
    "longitude": -68.0477509
  },
  {
    "id": 2041,
    "name": "Yaracuy",
    "countryId": 239,
    "countryCode": "VE",
    "fipsCode": "22",
    "iso2": "U",
    "latitude": 10.339389,
    "longitude": -68.8108849
  },
  {
    "id": 2042,
    "name": "Zulia",
    "countryId": 239,
    "countryCode": "VE",
    "fipsCode": "23",
    "iso2": "V",
    "latitude": 10.2910237,
    "longitude": -72.1416132
  },
  {
    "id": 2043,
    "name": "Trujillo",
    "countryId": 239,
    "countryCode": "VE",
    "fipsCode": "21",
    "iso2": "T",
    "latitude": 36.6734343,
    "longitude": -121.6287588
  },
  {
    "id": 2044,
    "name": "Amazonas",
    "countryId": 239,
    "countryCode": "VE",
    "fipsCode": "01",
    "iso2": "Z",
    "latitude": -3.4168427,
    "longitude": -65.8560646
  },
  {
    "id": 2045,
    "name": "Guárico",
    "countryId": 239,
    "countryCode": "VE",
    "fipsCode": "12",
    "iso2": "J",
    "latitude": 8.7489309,
    "longitude": -66.2367172
  },
  {
    "id": 2046,
    "name": "Federal Dependencies of Venezuela",
    "countryId": 239,
    "countryCode": "VE",
    "fipsCode": "24",
    "iso2": "W",
    "latitude": 10.9377053,
    "longitude": -65.3569573
  },
  {
    "id": 2047,
    "name": "Aragua",
    "countryId": 239,
    "countryCode": "VE",
    "fipsCode": "04",
    "iso2": "D",
    "latitude": 10.0635758,
    "longitude": -67.2847875
  },
  {
    "id": 2048,
    "name": "Táchira",
    "countryId": 239,
    "countryCode": "VE",
    "fipsCode": "20",
    "iso2": "S",
    "latitude": 7.9137001,
    "longitude": -72.1416132
  },
  {
    "id": 2049,
    "name": "Barinas",
    "countryId": 239,
    "countryCode": "VE",
    "fipsCode": "05",
    "iso2": "E",
    "latitude": 8.6231498,
    "longitude": -70.2371045
  },
  {
    "id": 2050,
    "name": "Anzoátegui",
    "countryId": 239,
    "countryCode": "VE",
    "fipsCode": "02",
    "iso2": "B",
    "latitude": 8.5913073,
    "longitude": -63.9586111
  },
  {
    "id": 2051,
    "name": "Delta Amacuro",
    "countryId": 239,
    "countryCode": "VE",
    "fipsCode": "09",
    "iso2": "Y",
    "latitude": 8.8499307,
    "longitude": -61.1403196
  },
  {
    "id": 2052,
    "name": "Nueva Esparta",
    "countryId": 239,
    "countryCode": "VE",
    "fipsCode": "17",
    "iso2": "O",
    "latitude": 10.9970723,
    "longitude": -63.9113296
  },
  {
    "id": 2053,
    "name": "Mérida",
    "countryId": 239,
    "countryCode": "VE",
    "fipsCode": "14",
    "iso2": "L",
    "latitude": 20.9673702,
    "longitude": -89.5925857
  },
  {
    "id": 2054,
    "name": "Monagas",
    "countryId": 239,
    "countryCode": "VE",
    "fipsCode": "16",
    "iso2": "N",
    "latitude": 9.3241652,
    "longitude": -63.0147578
  },
  {
    "id": 2055,
    "name": "Vargas",
    "countryId": 239,
    "countryCode": "VE",
    "fipsCode": "26",
    "iso2": "X",
    "latitude": 29.3052268,
    "longitude": -94.7913854
  },
  {
    "id": 2056,
    "name": "Sucre",
    "countryId": 239,
    "countryCode": "VE",
    "fipsCode": "19",
    "iso2": "R",
    "latitude": -19.035345,
    "longitude": -65.2592128
  },
  {
    "id": 2057,
    "name": "Carinthia",
    "countryId": 15,
    "countryCode": "AT",
    "fipsCode": "02",
    "iso2": "2",
    "latitude": 46.722203,
    "longitude": 14.1805882
  },
  {
    "id": 2058,
    "name": "Upper Austria",
    "countryId": 15,
    "countryCode": "AT",
    "fipsCode": "04",
    "iso2": "4",
    "latitude": 48.025854,
    "longitude": 13.9723665
  },
  {
    "id": 2059,
    "name": "Styria",
    "countryId": 15,
    "countryCode": "AT",
    "fipsCode": "06",
    "iso2": "6",
    "latitude": 47.3593442,
    "longitude": 14.4699827
  },
  {
    "id": 2060,
    "name": "Vienna",
    "countryId": 15,
    "countryCode": "AT",
    "fipsCode": "09",
    "iso2": "9",
    "latitude": 48.2081743,
    "longitude": 16.3738189
  },
  {
    "id": 2061,
    "name": "Salzburg",
    "countryId": 15,
    "countryCode": "AT",
    "fipsCode": "05",
    "iso2": "5",
    "latitude": 47.80949,
    "longitude": 13.05501
  },
  {
    "id": 2062,
    "name": "Burgenland",
    "countryId": 15,
    "countryCode": "AT",
    "fipsCode": "01",
    "iso2": "1",
    "latitude": 47.1537165,
    "longitude": 16.2688797
  },
  {
    "id": 2063,
    "name": "Vorarlberg",
    "countryId": 15,
    "countryCode": "AT",
    "fipsCode": "08",
    "iso2": "8",
    "latitude": 47.2497427,
    "longitude": 9.9797373
  },
  {
    "id": 2064,
    "name": "Tyrol",
    "countryId": 15,
    "countryCode": "AT",
    "fipsCode": "07",
    "iso2": "7",
    "latitude": 47.2537414,
    "longitude": 11.601487
  },
  {
    "id": 2065,
    "name": "Lower Austria",
    "countryId": 15,
    "countryCode": "AT",
    "fipsCode": "03",
    "iso2": "3",
    "latitude": 48.108077,
    "longitude": 15.8049558
  },
  {
    "id": 2066,
    "name": "Mid-Western Region",
    "countryId": 154,
    "countryCode": "NP",
    "fipsCode": "MR",
    "iso2": "2",
    "latitude": 38.4111841,
    "longitude": -90.3832098
  },
  {
    "id": 2067,
    "name": "Western Region",
    "countryId": 154,
    "countryCode": "NP",
    "fipsCode": "WR",
    "iso2": "3",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 2068,
    "name": "Far-Western Development Region",
    "countryId": 154,
    "countryCode": "NP",
    "fipsCode": "FR",
    "iso2": "5",
    "latitude": 29.2987871,
    "longitude": 80.9871074
  },
  {
    "id": 2069,
    "name": "Eastern Development Region",
    "countryId": 154,
    "countryCode": "NP",
    "fipsCode": "ER",
    "iso2": "4",
    "latitude": 27.3309072,
    "longitude": 87.0624261
  },
  {
    "id": 2070,
    "name": "Mechi Zone",
    "countryId": 154,
    "countryCode": "NP",
    "fipsCode": "10",
    "iso2": "ME",
    "latitude": 26.8760007,
    "longitude": 87.9334803
  },
  {
    "id": 2071,
    "name": "Bheri Zone",
    "countryId": 154,
    "countryCode": "NP",
    "fipsCode": "02",
    "iso2": "BH",
    "latitude": 28.517456,
    "longitude": 81.7787021
  },
  {
    "id": 2072,
    "name": "Kosi Zone",
    "countryId": 154,
    "countryCode": "NP",
    "fipsCode": "07",
    "iso2": "KO",
    "latitude": 27.0536524,
    "longitude": 87.3016132
  },
  {
    "id": 2073,
    "name": "Central Region",
    "countryId": 154,
    "countryCode": "NP",
    "fipsCode": "CR",
    "iso2": "1",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 2074,
    "name": "Lumbini Zone",
    "countryId": 154,
    "countryCode": "NP",
    "fipsCode": "08",
    "iso2": "LU",
    "latitude": 27.45,
    "longitude": 83.25
  },
  {
    "id": 2075,
    "name": "Narayani Zone",
    "countryId": 154,
    "countryCode": "NP",
    "fipsCode": "11",
    "iso2": "NA",
    "latitude": 27.3611766,
    "longitude": 84.8567932
  },
  {
    "id": 2076,
    "name": "Janakpur Zone",
    "countryId": 154,
    "countryCode": "NP",
    "fipsCode": "05",
    "iso2": "JA",
    "latitude": 27.2110899,
    "longitude": 86.0121573
  },
  {
    "id": 2077,
    "name": "Rapti Zone",
    "countryId": 154,
    "countryCode": "NP",
    "fipsCode": "12",
    "iso2": "RA",
    "latitude": 28.274347,
    "longitude": 82.3885783
  },
  {
    "id": 2078,
    "name": "Seti Zone",
    "countryId": 154,
    "countryCode": "NP",
    "fipsCode": "14",
    "iso2": "SE",
    "latitude": 29.6905427,
    "longitude": 81.3399414
  },
  {
    "id": 2079,
    "name": "Karnali Zone",
    "countryId": 154,
    "countryCode": "NP",
    "fipsCode": "06",
    "iso2": "KA",
    "latitude": 29.3862555,
    "longitude": 82.3885783
  },
  {
    "id": 2080,
    "name": "Dhaulagiri Zone",
    "countryId": 154,
    "countryCode": "NP",
    "fipsCode": "03",
    "iso2": "DH",
    "latitude": 28.611176,
    "longitude": 83.5070203
  },
  {
    "id": 2081,
    "name": "Gandaki Zone",
    "countryId": 154,
    "countryCode": "NP",
    "fipsCode": "04",
    "iso2": "GA",
    "latitude": 28.3732037,
    "longitude": 84.4382721
  },
  {
    "id": 2082,
    "name": "Bagmati Zone",
    "countryId": 154,
    "countryCode": "NP",
    "fipsCode": "01",
    "iso2": "BA",
    "latitude": 28.0367577,
    "longitude": 85.4375574
  },
  {
    "id": 2083,
    "name": "Mahakali Zone",
    "countryId": 154,
    "countryCode": "NP",
    "fipsCode": "09",
    "iso2": "MA",
    "latitude": 29.3601079,
    "longitude": 80.543845
  },
  {
    "id": 2084,
    "name": "Sagarmatha Zone",
    "countryId": 154,
    "countryCode": "NP",
    "fipsCode": "13",
    "iso2": "SA",
    "latitude": 27.3238263,
    "longitude": 86.7416374
  },
  {
    "id": 2085,
    "name": "Unity",
    "countryId": 206,
    "countryCode": "SS",
    "fipsCode": "40",
    "iso2": "UY",
    "latitude": 37.7871276,
    "longitude": -122.4034079
  },
  {
    "id": 2086,
    "name": "Upper Nile",
    "countryId": 206,
    "countryCode": "SS",
    "fipsCode": "35",
    "iso2": "NU",
    "latitude": 9.8894202,
    "longitude": 32.7181375
  },
  {
    "id": 2087,
    "name": "Warrap",
    "countryId": 206,
    "countryCode": "SS",
    "fipsCode": "59",
    "iso2": "WR",
    "latitude": 8.0886238,
    "longitude": 28.6410641
  },
  {
    "id": 2088,
    "name": "Northern Bahr el Ghazal",
    "countryId": 206,
    "countryCode": "SS",
    "fipsCode": "54",
    "iso2": "BN",
    "latitude": 8.5360449,
    "longitude": 26.7967849
  },
  {
    "id": 2089,
    "name": "Western Equatoria",
    "countryId": 206,
    "countryCode": "SS",
    "fipsCode": "45",
    "iso2": "EW",
    "latitude": 5.3471799,
    "longitude": 28.299435
  },
  {
    "id": 2090,
    "name": "Lakes",
    "countryId": 206,
    "countryCode": "SS",
    "fipsCode": "11550544",
    "iso2": "LK",
    "latitude": 37.1628255,
    "longitude": -95.6911623
  },
  {
    "id": 2091,
    "name": "Western Bahr el Ghazal",
    "countryId": 206,
    "countryCode": "SS",
    "fipsCode": "46",
    "iso2": "BW",
    "latitude": 8.6452399,
    "longitude": 25.2837585
  },
  {
    "id": 2092,
    "name": "Central Equatoria",
    "countryId": 206,
    "countryCode": "SS",
    "fipsCode": "44",
    "iso2": "EC",
    "latitude": 4.6144063,
    "longitude": 31.2626366
  },
  {
    "id": 2093,
    "name": "Eastern Equatoria",
    "countryId": 206,
    "countryCode": "SS",
    "fipsCode": "57",
    "iso2": "EE",
    "latitude": 5.0692995,
    "longitude": 33.438353
  },
  {
    "id": 2094,
    "name": "Jonglei State",
    "countryId": 206,
    "countryCode": "SS",
    "fipsCode": "51",
    "iso2": "JG",
    "latitude": 7.1819619,
    "longitude": 32.3560952
  },
  {
    "id": 2095,
    "name": "Karditsa Regional Unit",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "23",
    "iso2": "41",
    "latitude": 39.3640258,
    "longitude": 21.9214049
  },
  {
    "id": 2096,
    "name": "West Greece Region",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "ESYE23",
    "iso2": "G",
    "latitude": 38.5115496,
    "longitude": 21.5706786
  },
  {
    "id": 2097,
    "name": "Thessaloniki Regional Unit",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "13",
    "iso2": "54",
    "latitude": 40.6400629,
    "longitude": 22.9444191
  },
  {
    "id": 2098,
    "name": "Arcadia Prefecture",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "41",
    "iso2": "12",
    "latitude": 37.5557825,
    "longitude": 22.3337769
  },
  {
    "id": 2099,
    "name": "Imathia Regional Unit",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "12",
    "iso2": "53",
    "latitude": 40.6060067,
    "longitude": 22.1430215
  },
  {
    "id": 2100,
    "name": "Kastoria Regional Unit",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "09",
    "iso2": "56",
    "latitude": 40.5192691,
    "longitude": 21.2687171
  },
  {
    "id": 2101,
    "name": "Euboea",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "34",
    "iso2": "04",
    "latitude": 38.5236036,
    "longitude": 23.8584737
  },
  {
    "id": 2102,
    "name": "Grevena Prefecture",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "10",
    "iso2": "51",
    "latitude": 40.0837626,
    "longitude": 21.4273299
  },
  {
    "id": 2103,
    "name": "Preveza Prefecture",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "19",
    "iso2": "34",
    "latitude": 38.9592649,
    "longitude": 20.7517155
  },
  {
    "id": 2104,
    "name": "Lefkada Regional Unit",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "26",
    "iso2": "24",
    "latitude": 38.8333663,
    "longitude": 20.7069108
  },
  {
    "id": 2105,
    "name": "Argolis Regional Unit",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "36",
    "iso2": "11",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 2106,
    "name": "Laconia",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "42",
    "iso2": "16",
    "latitude": 43.5278546,
    "longitude": -71.4703509
  },
  {
    "id": 2107,
    "name": "Pella Regional Unit",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "07",
    "iso2": "59",
    "latitude": 40.9148039,
    "longitude": 22.1430215
  },
  {
    "id": 2108,
    "name": "West Macedonia Region",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "ESYE13",
    "iso2": "C",
    "latitude": 40.3004058,
    "longitude": 21.7903559
  },
  {
    "id": 2109,
    "name": "Crete Region",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "ESYE43",
    "iso2": "M",
    "latitude": 35.240117,
    "longitude": 24.8092691
  },
  {
    "id": 2110,
    "name": "Epirus Region",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "ESYE21",
    "iso2": "D",
    "latitude": 39.5706413,
    "longitude": 20.7642843
  },
  {
    "id": 2111,
    "name": "Kilkis Regional Unit",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "06",
    "iso2": "57",
    "latitude": 40.9937071,
    "longitude": 22.8753674
  },
  {
    "id": 2112,
    "name": "Kozani Prefecture",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "11",
    "iso2": "58",
    "latitude": 40.3005586,
    "longitude": 21.7887737
  },
  {
    "id": 2113,
    "name": "Ioannina Regional Unit",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "17",
    "iso2": "33",
    "latitude": 39.6650288,
    "longitude": 20.8537466
  },
  {
    "id": 2114,
    "name": "Phthiotis Prefecture",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "29",
    "iso2": "06",
    "latitude": 38.999785,
    "longitude": 22.3337769
  },
  {
    "id": 2115,
    "name": "Chania Regional Unit",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "43",
    "iso2": "94",
    "latitude": 35.5138298,
    "longitude": 24.0180367
  },
  {
    "id": 2116,
    "name": "Achaea Regional Unit",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "38",
    "iso2": "13",
    "latitude": 38.1158729,
    "longitude": 21.9522491
  },
  {
    "id": 2117,
    "name": "East Macedonia and Thrace",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "ESYE11",
    "iso2": "A",
    "latitude": 41.1295126,
    "longitude": 24.8877191
  },
  {
    "id": 2118,
    "name": "South Aegean",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "ESYE42",
    "iso2": "L",
    "latitude": 37.0855302,
    "longitude": 25.1489215
  },
  {
    "id": 2119,
    "name": "Peloponnese Region",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "ESYE25",
    "iso2": "J",
    "latitude": 37.5079472,
    "longitude": 22.37349
  },
  {
    "id": 2120,
    "name": "East Attica Regional Unit",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "ESYE11",
    "iso2": "A2",
    "latitude": 38.2054093,
    "longitude": 23.8584737
  },
  {
    "id": 2121,
    "name": "Serres Prefecture",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "05",
    "iso2": "62",
    "latitude": 41.0863854,
    "longitude": 23.5483819
  },
  {
    "id": 2122,
    "name": "Attica Region",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "ESYE31",
    "iso2": "I",
    "latitude": 38.0457568,
    "longitude": 23.8584737
  },
  {
    "id": 2123,
    "name": "Aetolia-Acarnania Regional Unit",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "31",
    "iso2": "01",
    "latitude": 38.7084386,
    "longitude": 21.3798928
  },
  {
    "id": 2124,
    "name": "Corfu Prefecture",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "25",
    "iso2": "22",
    "latitude": 39.6249838,
    "longitude": 19.9223461
  },
  {
    "id": 2125,
    "name": "Central Macedonia",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "ESYE12",
    "iso2": "B",
    "latitude": 40.621173,
    "longitude": 23.1918021
  },
  {
    "id": 2126,
    "name": "Boeotia Regional Unit",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "33",
    "iso2": "03",
    "latitude": 38.3663664,
    "longitude": 23.0965064
  },
  {
    "id": 2127,
    "name": "Kefalonia Prefecture",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "27",
    "iso2": "23",
    "latitude": 38.1753675,
    "longitude": 20.5692179
  },
  {
    "id": 2128,
    "name": "Central Greece Region",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "ESYE24",
    "iso2": "H",
    "latitude": 38.6043984,
    "longitude": 22.7152131
  },
  {
    "id": 2129,
    "name": "Corinthia Regional Unit",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "37",
    "iso2": "15",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 2130,
    "name": "Drama Regional Unit",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "04",
    "iso2": "52",
    "latitude": 41.2340023,
    "longitude": 24.2390498
  },
  {
    "id": 2131,
    "name": "Ionian Islands Region",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "ESYE22",
    "iso2": "F",
    "latitude": 37.9694898,
    "longitude": 21.3802372
  },
  {
    "id": 2132,
    "name": "Larissa Prefecture",
    "countryId": 85,
    "countryCode": "GR",
    "fipsCode": "21",
    "iso2": "42",
    "latitude": 39.6390224,
    "longitude": 22.4191254
  },
  {
    "id": 2133,
    "name": "Kayin State",
    "countryId": 151,
    "countryCode": "MM",
    "fipsCode": "05",
    "iso2": "13",
    "latitude": 16.9459346,
    "longitude": 97.9592863
  },
  {
    "id": 2134,
    "name": "Mandalay Region",
    "countryId": 151,
    "countryCode": "MM",
    "fipsCode": "08",
    "iso2": "04",
    "latitude": 21.5619058,
    "longitude": 95.8987139
  },
  {
    "id": 2135,
    "name": "Yangon Region",
    "countryId": 151,
    "countryCode": "MM",
    "fipsCode": "17",
    "iso2": "06",
    "latitude": 16.9143488,
    "longitude": 96.1526985
  },
  {
    "id": 2136,
    "name": "Magway Region",
    "countryId": 151,
    "countryCode": "MM",
    "fipsCode": "15",
    "iso2": "03",
    "latitude": 19.8871386,
    "longitude": 94.7277528
  },
  {
    "id": 2137,
    "name": "Chin State",
    "countryId": 151,
    "countryCode": "MM",
    "fipsCode": "02",
    "iso2": "14",
    "latitude": 22.0086978,
    "longitude": 93.5812692
  },
  {
    "id": 2138,
    "name": "Rakhine State",
    "countryId": 151,
    "countryCode": "MM",
    "fipsCode": "01",
    "iso2": "16",
    "latitude": 20.1040818,
    "longitude": 93.5812692
  },
  {
    "id": 2139,
    "name": "Shan State",
    "countryId": 151,
    "countryCode": "MM",
    "fipsCode": "11",
    "iso2": "17",
    "latitude": 22.0361985,
    "longitude": 98.1338558
  },
  {
    "id": 2140,
    "name": "Tanintharyi Region",
    "countryId": 151,
    "countryCode": "MM",
    "fipsCode": "12",
    "iso2": "05",
    "latitude": 12.4706876,
    "longitude": 99.0128926
  },
  {
    "id": 2141,
    "name": "Bago",
    "countryId": 151,
    "countryCode": "MM",
    "fipsCode": "16",
    "iso2": "02",
    "latitude": 17.3220711,
    "longitude": 96.4663286
  },
  {
    "id": 2142,
    "name": "Ayeyarwady Region",
    "countryId": 151,
    "countryCode": "MM",
    "fipsCode": "03",
    "iso2": "07",
    "latitude": 17.0342125,
    "longitude": 95.2266675
  },
  {
    "id": 2143,
    "name": "Kachin State",
    "countryId": 151,
    "countryCode": "MM",
    "fipsCode": "04",
    "iso2": "11",
    "latitude": 25.850904,
    "longitude": 97.4381355
  },
  {
    "id": 2144,
    "name": "Kayah State",
    "countryId": 151,
    "countryCode": "MM",
    "fipsCode": "06",
    "iso2": "12",
    "latitude": 19.2342061,
    "longitude": 97.2652858
  },
  {
    "id": 2145,
    "name": "Sagaing Region",
    "countryId": 151,
    "countryCode": "MM",
    "fipsCode": "10",
    "iso2": "01",
    "latitude": 24.428381,
    "longitude": 95.3939551
  },
  {
    "id": 2146,
    "name": "Naypyidaw Union Territory",
    "countryId": 151,
    "countryCode": "MM",
    "fipsCode": "10",
    "iso2": "18",
    "latitude": 19.9386245,
    "longitude": 96.1526985
  },
  {
    "id": 2147,
    "name": "Mon State",
    "countryId": 151,
    "countryCode": "MM",
    "fipsCode": "13",
    "iso2": "15",
    "latitude": 16.3003133,
    "longitude": 97.6982272
  },
  {
    "id": 2148,
    "name": "Bartın Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "87",
    "iso2": "74",
    "latitude": 41.5810509,
    "longitude": 32.4609794
  },
  {
    "id": 2149,
    "name": "Kütahya Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "43",
    "iso2": "43",
    "latitude": 39.358137,
    "longitude": 29.6035495
  },
  {
    "id": 2150,
    "name": "Sakarya Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "54",
    "iso2": "54",
    "latitude": 40.788855,
    "longitude": 30.405954
  },
  {
    "id": 2151,
    "name": "Edirne Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "22",
    "iso2": "22",
    "latitude": 41.1517222,
    "longitude": 26.5137964
  },
  {
    "id": 2152,
    "name": "Van Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "65",
    "iso2": "65",
    "latitude": 38.3679417,
    "longitude": 43.7182787
  },
  {
    "id": 2153,
    "name": "Bingöl Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "12",
    "iso2": "12",
    "latitude": 39.0626354,
    "longitude": 40.7696095
  },
  {
    "id": 2154,
    "name": "Kilis Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "90",
    "iso2": "79",
    "latitude": 36.8204775,
    "longitude": 37.1687339
  },
  {
    "id": 2155,
    "name": "Adıyaman Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "02",
    "iso2": "02",
    "latitude": 37.9078291,
    "longitude": 38.4849923
  },
  {
    "id": 2156,
    "name": "Mersin Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "32",
    "iso2": "33",
    "latitude": 36.8120858,
    "longitude": 34.641475
  },
  {
    "id": 2157,
    "name": "Denizli Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "20",
    "iso2": "20",
    "latitude": 37.6128395,
    "longitude": 29.2320784
  },
  {
    "id": 2158,
    "name": "Malatya Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "44",
    "iso2": "44",
    "latitude": 38.4015057,
    "longitude": 37.9536298
  },
  {
    "id": 2159,
    "name": "Elazığ Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "23",
    "iso2": "23",
    "latitude": 38.4964804,
    "longitude": 39.2199029
  },
  {
    "id": 2160,
    "name": "Erzincan Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "24",
    "iso2": "24",
    "latitude": 39.7681914,
    "longitude": 39.0501306
  },
  {
    "id": 2161,
    "name": "Amasya Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "05",
    "iso2": "05",
    "latitude": 40.6516608,
    "longitude": 35.9037966
  },
  {
    "id": 2162,
    "name": "Muş Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "49",
    "iso2": "49",
    "latitude": 38.9461888,
    "longitude": 41.7538931
  },
  {
    "id": 2163,
    "name": "Bursa Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "16",
    "iso2": "16",
    "latitude": 40.0655459,
    "longitude": 29.2320784
  },
  {
    "id": 2164,
    "name": "Eskişehir Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "26",
    "iso2": "26",
    "latitude": 39.6329657,
    "longitude": 31.2626366
  },
  {
    "id": 2165,
    "name": "Erzurum Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "25",
    "iso2": "25",
    "latitude": 40.0746799,
    "longitude": 41.6694562
  },
  {
    "id": 2166,
    "name": "Iğdır Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "88",
    "iso2": "76",
    "latitude": 39.8879841,
    "longitude": 44.0048365
  },
  {
    "id": 2167,
    "name": "Tekirdağ Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "59",
    "iso2": "59",
    "latitude": 41.1121227,
    "longitude": 27.2676116
  },
  {
    "id": 2168,
    "name": "Çankırı Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "82",
    "iso2": "18",
    "latitude": 40.5369073,
    "longitude": 33.5883893
  },
  {
    "id": 2169,
    "name": "Antalya Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "07",
    "iso2": "07",
    "latitude": 37.0951672,
    "longitude": 31.0793705
  },
  {
    "id": 2170,
    "name": "Istanbul Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "34",
    "iso2": "34",
    "latitude": 41.1634302,
    "longitude": 28.7664408
  },
  {
    "id": 2171,
    "name": "Konya Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "71",
    "iso2": "42",
    "latitude": 37.9838134,
    "longitude": 32.7181375
  },
  {
    "id": 2172,
    "name": "Bolu Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "14",
    "iso2": "14",
    "latitude": 40.5759766,
    "longitude": 31.5788086
  },
  {
    "id": 2173,
    "name": "Çorum Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "19",
    "iso2": "19",
    "latitude": 40.4998211,
    "longitude": 34.5986263
  },
  {
    "id": 2174,
    "name": "Ordu Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "52",
    "iso2": "52",
    "latitude": 40.799058,
    "longitude": 37.3899005
  },
  {
    "id": 2175,
    "name": "Balıkesir Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "10",
    "iso2": "10",
    "latitude": 39.7616782,
    "longitude": 28.1122679
  },
  {
    "id": 2176,
    "name": "Kırklareli Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "39",
    "iso2": "39",
    "latitude": 41.7259795,
    "longitude": 27.483839
  },
  {
    "id": 2177,
    "name": "Bayburt Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "77",
    "iso2": "69",
    "latitude": 40.26032,
    "longitude": 40.228048
  },
  {
    "id": 2178,
    "name": "Kırıkkale Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "79",
    "iso2": "71",
    "latitude": 39.8876878,
    "longitude": 33.7555248
  },
  {
    "id": 2179,
    "name": "Afyonkarahisar Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "03",
    "iso2": "03",
    "latitude": 38.7391099,
    "longitude": 30.7120023
  },
  {
    "id": 2180,
    "name": "Kırşehir Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "40",
    "iso2": "40",
    "latitude": 39.2268905,
    "longitude": 33.9750018
  },
  {
    "id": 2181,
    "name": "Sivas Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "58",
    "iso2": "58",
    "latitude": 39.4488039,
    "longitude": 37.1294497
  },
  {
    "id": 2182,
    "name": "Muğla Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "48",
    "iso2": "48",
    "latitude": 37.1835819,
    "longitude": 28.4863963
  },
  {
    "id": 2183,
    "name": "Şanlıurfa Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "63",
    "iso2": "63",
    "latitude": 37.3569102,
    "longitude": 39.1543677
  },
  {
    "id": 2184,
    "name": "Karaman Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "78",
    "iso2": "70",
    "latitude": 37.2436336,
    "longitude": 33.617577
  },
  {
    "id": 2185,
    "name": "Ardahan Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "86",
    "iso2": "75",
    "latitude": 41.1112964,
    "longitude": 42.7831674
  },
  {
    "id": 2186,
    "name": "Giresun Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "28",
    "iso2": "28",
    "latitude": 40.6461672,
    "longitude": 38.5935511
  },
  {
    "id": 2187,
    "name": "Aydın Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "09",
    "iso2": "09",
    "latitude": 37.8117033,
    "longitude": 28.4863963
  },
  {
    "id": 2188,
    "name": "Yozgat Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "66",
    "iso2": "66",
    "latitude": 39.7271979,
    "longitude": 35.1077858
  },
  {
    "id": 2189,
    "name": "Niğde Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "73",
    "iso2": "51",
    "latitude": 38.0993086,
    "longitude": 34.6856509
  },
  {
    "id": 2190,
    "name": "Hakkâri Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "70",
    "iso2": "30",
    "latitude": 37.4459319,
    "longitude": 43.7449841
  },
  {
    "id": 2191,
    "name": "Artvin Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "08",
    "iso2": "08",
    "latitude": 41.078664,
    "longitude": 41.7628223
  },
  {
    "id": 2192,
    "name": "Tunceli Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "62",
    "iso2": "62",
    "latitude": 39.3073554,
    "longitude": 39.4387778
  },
  {
    "id": 2193,
    "name": "Ağrı Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "04",
    "iso2": "04",
    "latitude": 39.6269218,
    "longitude": 43.0215965
  },
  {
    "id": 2194,
    "name": "Batman Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "76",
    "iso2": "72",
    "latitude": 37.8362496,
    "longitude": 41.3605739
  },
  {
    "id": 2195,
    "name": "Kocaeli Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "41",
    "iso2": "41",
    "latitude": 40.8532704,
    "longitude": 29.8815203
  },
  {
    "id": 2196,
    "name": "Nevşehir Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "50",
    "iso2": "50",
    "latitude": 38.6939399,
    "longitude": 34.6856509
  },
  {
    "id": 2197,
    "name": "Kastamonu Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "37",
    "iso2": "37",
    "latitude": 41.4103863,
    "longitude": 33.6998334
  },
  {
    "id": 2198,
    "name": "Manisa Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "45",
    "iso2": "45",
    "latitude": 38.8419373,
    "longitude": 28.1122679
  },
  {
    "id": 2199,
    "name": "Tokat Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "60",
    "iso2": "60",
    "latitude": 40.3902713,
    "longitude": 36.6251863
  },
  {
    "id": 2200,
    "name": "Kayseri Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "38",
    "iso2": "38",
    "latitude": 38.6256854,
    "longitude": 35.7406882
  },
  {
    "id": 2201,
    "name": "Uşak Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "64",
    "iso2": "64",
    "latitude": 38.5431319,
    "longitude": 29.2320784
  },
  {
    "id": 2202,
    "name": "Düzce Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "93",
    "iso2": "81",
    "latitude": 40.8770531,
    "longitude": 31.3192713
  },
  {
    "id": 2203,
    "name": "Gaziantep Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "83",
    "iso2": "27",
    "latitude": 37.0763882,
    "longitude": 37.3827234
  },
  {
    "id": 2204,
    "name": "Gümüşhane Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "69",
    "iso2": "29",
    "latitude": 40.2803673,
    "longitude": 39.3143253
  },
  {
    "id": 2205,
    "name": "İzmir Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "35",
    "iso2": "35",
    "latitude": 38.3591693,
    "longitude": 27.2676116
  },
  {
    "id": 2206,
    "name": "Trabzon Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "61",
    "iso2": "61",
    "latitude": 40.799241,
    "longitude": 39.5847944
  },
  {
    "id": 2207,
    "name": "Siirt Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "74",
    "iso2": "56",
    "latitude": 37.8658862,
    "longitude": 42.1494523
  },
  {
    "id": 2208,
    "name": "Kars Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "84",
    "iso2": "36",
    "latitude": 40.2807636,
    "longitude": 42.9919527
  },
  {
    "id": 2209,
    "name": "Burdur Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "15",
    "iso2": "15",
    "latitude": 37.4612669,
    "longitude": 30.0665236
  },
  {
    "id": 2210,
    "name": "Aksaray Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "75",
    "iso2": "68",
    "latitude": 38.3352043,
    "longitude": 33.9750018
  },
  {
    "id": 2211,
    "name": "Hatay Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "31",
    "iso2": "31",
    "latitude": 36.4018488,
    "longitude": 36.3498097
  },
  {
    "id": 2212,
    "name": "Adana Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "81",
    "iso2": "01",
    "latitude": 37.2612315,
    "longitude": 35.3905046
  },
  {
    "id": 2213,
    "name": "Zonguldak Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "85",
    "iso2": "67",
    "latitude": 41.3124917,
    "longitude": 31.8598251
  },
  {
    "id": 2214,
    "name": "Osmaniye Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "91",
    "iso2": "80",
    "latitude": 37.2130258,
    "longitude": 36.1762615
  },
  {
    "id": 2215,
    "name": "Bitlis Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "13",
    "iso2": "13",
    "latitude": 38.6523133,
    "longitude": 42.4202028
  },
  {
    "id": 2216,
    "name": "Çanakkale Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "17",
    "iso2": "17",
    "latitude": 40.0510104,
    "longitude": 26.9852422
  },
  {
    "id": 2217,
    "name": "Ankara Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "68",
    "iso2": "06",
    "latitude": 39.7805245,
    "longitude": 32.7181375
  },
  {
    "id": 2218,
    "name": "Yalova Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "92",
    "iso2": "77",
    "latitude": 40.5775986,
    "longitude": 29.2088303
  },
  {
    "id": 2219,
    "name": "Rize Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "53",
    "iso2": "53",
    "latitude": 40.9581497,
    "longitude": 40.9226985
  },
  {
    "id": 2220,
    "name": "Samsun Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "55",
    "iso2": "55",
    "latitude": 41.1864859,
    "longitude": 36.1322678
  },
  {
    "id": 2221,
    "name": "Bilecik Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "11",
    "iso2": "11",
    "latitude": 40.0566555,
    "longitude": 30.0665236
  },
  {
    "id": 2222,
    "name": "Isparta Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "33",
    "iso2": "32",
    "latitude": 38.0211464,
    "longitude": 31.0793705
  },
  {
    "id": 2223,
    "name": "Karabük Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "89",
    "iso2": "78",
    "latitude": 41.187489,
    "longitude": 32.7417419
  },
  {
    "id": 2224,
    "name": "Mardin Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "72",
    "iso2": "47",
    "latitude": 37.3442929,
    "longitude": 40.6196487
  },
  {
    "id": 2225,
    "name": "Şırnak Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "80",
    "iso2": "73",
    "latitude": 37.4187481,
    "longitude": 42.4918338
  },
  {
    "id": 2226,
    "name": "Diyarbakır Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "21",
    "iso2": "21",
    "latitude": 38.1066372,
    "longitude": 40.5426896
  },
  {
    "id": 2227,
    "name": "Kahramanmaraş Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "46",
    "iso2": "46",
    "latitude": 37.7503036,
    "longitude": 36.954107
  },
  {
    "id": 2228,
    "name": "Lisbon District",
    "countryId": 177,
    "countryCode": "PT",
    "fipsCode": "14",
    "iso2": "11",
    "latitude": 38.7223263,
    "longitude": -9.1392714
  },
  {
    "id": 2229,
    "name": "Bragança District",
    "countryId": 177,
    "countryCode": "PT",
    "fipsCode": "05",
    "iso2": "04",
    "latitude": 41.8061652,
    "longitude": -6.7567427
  },
  {
    "id": 2230,
    "name": "Beja District",
    "countryId": 177,
    "countryCode": "PT",
    "fipsCode": "03",
    "iso2": "02",
    "latitude": 37.9687786,
    "longitude": -7.87216
  },
  {
    "id": 2231,
    "name": "Madeira",
    "countryId": 177,
    "countryCode": "PT",
    "fipsCode": "10",
    "iso2": "30",
    "latitude": 32.7607074,
    "longitude": -16.9594723
  },
  {
    "id": 2232,
    "name": "Portalegre District",
    "countryId": 177,
    "countryCode": "PT",
    "fipsCode": "16",
    "iso2": "12",
    "latitude": 39.2967086,
    "longitude": -7.4284755
  },
  {
    "id": 2233,
    "name": "Azores",
    "countryId": 177,
    "countryCode": "PT",
    "fipsCode": "23",
    "iso2": "20",
    "latitude": 37.7412488,
    "longitude": -25.6755944
  },
  {
    "id": 2234,
    "name": "Vila Real District",
    "countryId": 177,
    "countryCode": "PT",
    "fipsCode": "21",
    "iso2": "17",
    "latitude": 41.3003527,
    "longitude": -7.7457274
  },
  {
    "id": 2235,
    "name": "Aveiro District",
    "countryId": 177,
    "countryCode": "PT",
    "fipsCode": "02",
    "iso2": "01",
    "latitude": 40.7209023,
    "longitude": -8.5721016
  },
  {
    "id": 2236,
    "name": "Évora District",
    "countryId": 177,
    "countryCode": "PT",
    "fipsCode": "08",
    "iso2": "07",
    "latitude": 38.5744468,
    "longitude": -7.9076553
  },
  {
    "id": 2237,
    "name": "Viseu District",
    "countryId": 177,
    "countryCode": "PT",
    "fipsCode": "22",
    "iso2": "18",
    "latitude": 40.6588424,
    "longitude": -7.914756
  },
  {
    "id": 2238,
    "name": "Santarém District",
    "countryId": 177,
    "countryCode": "PT",
    "fipsCode": "18",
    "iso2": "14",
    "latitude": 39.2366687,
    "longitude": -8.6859944
  },
  {
    "id": 2239,
    "name": "Faro District",
    "countryId": 177,
    "countryCode": "PT",
    "fipsCode": "09",
    "iso2": "08",
    "latitude": 37.0193548,
    "longitude": -7.9304397
  },
  {
    "id": 2240,
    "name": "Leiria District",
    "countryId": 177,
    "countryCode": "PT",
    "fipsCode": "13",
    "iso2": "10",
    "latitude": 39.7709532,
    "longitude": -8.7921836
  },
  {
    "id": 2241,
    "name": "Castelo Branco District",
    "countryId": 177,
    "countryCode": "PT",
    "fipsCode": "06",
    "iso2": "05",
    "latitude": 39.8631323,
    "longitude": -7.4814163
  },
  {
    "id": 2242,
    "name": "Setúbal District",
    "countryId": 177,
    "countryCode": "PT",
    "fipsCode": "19",
    "iso2": "15",
    "latitude": 38.5240933,
    "longitude": -8.8925876
  },
  {
    "id": 2243,
    "name": "Porto District",
    "countryId": 177,
    "countryCode": "PT",
    "fipsCode": "17",
    "iso2": "13",
    "latitude": 41.1476629,
    "longitude": -8.6078973
  },
  {
    "id": 2244,
    "name": "Braga District",
    "countryId": 177,
    "countryCode": "PT",
    "fipsCode": "04",
    "iso2": "03",
    "latitude": 41.550388,
    "longitude": -8.4261301
  },
  {
    "id": 2245,
    "name": "Viana do Castelo District",
    "countryId": 177,
    "countryCode": "PT",
    "fipsCode": "20",
    "iso2": "16",
    "latitude": 41.6918046,
    "longitude": -8.834451
  },
  {
    "id": 2246,
    "name": "Coimbra District",
    "countryId": 177,
    "countryCode": "PT",
    "fipsCode": "07",
    "iso2": "06",
    "latitude": 40.2057994,
    "longitude": -8.41369
  },
  {
    "id": 2247,
    "name": "Zhejiang",
    "countryId": 45,
    "countryCode": "CN",
    "fipsCode": "02",
    "iso2": "ZJ",
    "latitude": 29.1416432,
    "longitude": 119.7889248
  },
  {
    "id": 2248,
    "name": "Fujian",
    "countryId": 45,
    "countryCode": "CN",
    "fipsCode": "07",
    "iso2": "FJ",
    "latitude": 26.4836842,
    "longitude": 117.9249002
  },
  {
    "id": 2249,
    "name": "Shanghai",
    "countryId": 45,
    "countryCode": "CN",
    "fipsCode": "23",
    "iso2": "SH",
    "latitude": 31.230416,
    "longitude": 121.473701
  },
  {
    "id": 2250,
    "name": "Jiangsu",
    "countryId": 45,
    "countryCode": "CN",
    "fipsCode": "04",
    "iso2": "JS",
    "latitude": 33.1401715,
    "longitude": 119.7889248
  },
  {
    "id": 2251,
    "name": "Anhui",
    "countryId": 45,
    "countryCode": "CN",
    "fipsCode": "01",
    "iso2": "AH",
    "latitude": 30.6006773,
    "longitude": 117.9249002
  },
  {
    "id": 2252,
    "name": "Shandong",
    "countryId": 45,
    "countryCode": "CN",
    "fipsCode": "25",
    "iso2": "SD",
    "latitude": 37.8006064,
    "longitude": -122.2699918
  },
  {
    "id": 2253,
    "name": "Jilin",
    "countryId": 45,
    "countryCode": "CN",
    "fipsCode": "05",
    "iso2": "JL",
    "latitude": 43.837883,
    "longitude": 126.549572
  },
  {
    "id": 2254,
    "name": "Shanxi",
    "countryId": 45,
    "countryCode": "CN",
    "fipsCode": "24",
    "iso2": "SX",
    "latitude": 37.2425649,
    "longitude": 111.8568586
  },
  {
    "id": 2255,
    "name": "Taiwan Province, People\"s Republic of China",
    "countryId": 45,
    "countryCode": "CN",
    "fipsCode": "04",
    "iso2": "TW",
    "latitude": 23.69781,
    "longitude": 120.960515
  },
  {
    "id": 2256,
    "name": "Jiangxi",
    "countryId": 45,
    "countryCode": "CN",
    "fipsCode": "03",
    "iso2": "JX",
    "latitude": 27.0874564,
    "longitude": 114.9042208
  },
  {
    "id": 2257,
    "name": "Beijing",
    "countryId": 45,
    "countryCode": "CN",
    "fipsCode": "22",
    "iso2": "BJ",
    "latitude": 39.9041999,
    "longitude": 116.4073963
  },
  {
    "id": 2258,
    "name": "Hunan",
    "countryId": 45,
    "countryCode": "CN",
    "fipsCode": "11",
    "iso2": "HN",
    "latitude": 36.7341294,
    "longitude": -95.9344902
  },
  {
    "id": 2259,
    "name": "Henan",
    "countryId": 45,
    "countryCode": "CN",
    "fipsCode": "09",
    "iso2": "HA",
    "latitude": 34.2904302,
    "longitude": 113.3823545
  },
  {
    "id": 2260,
    "name": "Yunnan",
    "countryId": 45,
    "countryCode": "CN",
    "fipsCode": "29",
    "iso2": "YN",
    "latitude": 24.4752847,
    "longitude": 101.3431058
  },
  {
    "id": 2261,
    "name": "Guizhou",
    "countryId": 45,
    "countryCode": "CN",
    "fipsCode": "18",
    "iso2": "GZ",
    "latitude": 26.8429645,
    "longitude": 107.2902839
  },
  {
    "id": 2262,
    "name": "Ningxia Hui Autonomous Region",
    "countryId": 45,
    "countryCode": "CN",
    "fipsCode": "21",
    "iso2": "NX",
    "latitude": 37.198731,
    "longitude": 106.1580937
  },
  {
    "id": 2263,
    "name": "Xinjiang",
    "countryId": 45,
    "countryCode": "CN",
    "fipsCode": "13",
    "iso2": "XJ",
    "latitude": 42.5246357,
    "longitude": 87.5395855
  },
  {
    "id": 2264,
    "name": "Tibet Autonomous Region",
    "countryId": 45,
    "countryCode": "CN",
    "fipsCode": "14",
    "iso2": "XZ",
    "latitude": 30.1533605,
    "longitude": 88.7878678
  },
  {
    "id": 2265,
    "name": "Heilongjiang",
    "countryId": 45,
    "countryCode": "CN",
    "fipsCode": "08",
    "iso2": "HL",
    "latitude": 47.1216472,
    "longitude": 128.738231
  },
  {
    "id": 2266,
    "name": "Macau",
    "countryId": 45,
    "countryCode": "CN",
    "fipsCode": "MC",
    "iso2": "MO",
    "latitude": 22.198745,
    "longitude": 113.543873
  },
  {
    "id": 2267,
    "name": "Hong Kong",
    "countryId": 45,
    "countryCode": "CN",
    "fipsCode": "HK",
    "iso2": "HK",
    "latitude": 22.3193039,
    "longitude": 114.1693611
  },
  {
    "id": 2268,
    "name": "Liaoning",
    "countryId": 45,
    "countryCode": "CN",
    "fipsCode": "19",
    "iso2": "LN",
    "latitude": 41.9436543,
    "longitude": 122.5290376
  },
  {
    "id": 2269,
    "name": "Inner Mongolia",
    "countryId": 45,
    "countryCode": "CN",
    "fipsCode": "20",
    "iso2": "NM",
    "latitude": 43.37822,
    "longitude": 115.0594815
  },
  {
    "id": 2270,
    "name": "Qinghai",
    "countryId": 45,
    "countryCode": "CN",
    "fipsCode": "06",
    "iso2": "QH",
    "latitude": 35.744798,
    "longitude": 96.4077358
  },
  {
    "id": 2271,
    "name": "Chongqing",
    "countryId": 45,
    "countryCode": "CN",
    "fipsCode": "33",
    "iso2": "CQ",
    "latitude": 29.4315861,
    "longitude": 106.912251
  },
  {
    "id": 2272,
    "name": "Shaanxi",
    "countryId": 45,
    "countryCode": "CN",
    "fipsCode": "26",
    "iso2": "SN",
    "latitude": 35.3939908,
    "longitude": 109.1880047
  },
  {
    "id": 2273,
    "name": "Hainan",
    "countryId": 45,
    "countryCode": "CN",
    "fipsCode": "31",
    "iso2": "HI",
    "latitude": 19.5663947,
    "longitude": 109.949686
  },
  {
    "id": 2274,
    "name": "Hubei",
    "countryId": 45,
    "countryCode": "CN",
    "fipsCode": "12",
    "iso2": "HB",
    "latitude": 30.7378118,
    "longitude": 112.2384017
  },
  {
    "id": 2275,
    "name": "Gansu",
    "countryId": 45,
    "countryCode": "CN",
    "fipsCode": "15",
    "iso2": "GS",
    "latitude": 35.7518326,
    "longitude": 104.2861116
  },
  {
    "id": 2276,
    "name": "Keelung",
    "countryId": 45,
    "countryCode": "CN",
    "fipsCode": "15",
    "iso2": "TW-KEE",
    "latitude": 25.1276033,
    "longitude": 121.7391833
  },
  {
    "id": 2277,
    "name": "Sichuan",
    "countryId": 45,
    "countryCode": "CN",
    "fipsCode": "32",
    "iso2": "SC",
    "latitude": 30.2638032,
    "longitude": 102.8054753
  },
  {
    "id": 2278,
    "name": "Guangxi Zhuang Autonomous Region",
    "countryId": 45,
    "countryCode": "CN",
    "fipsCode": "16",
    "iso2": "GX",
    "latitude": 23.7247599,
    "longitude": 108.8076195
  },
  {
    "id": 2279,
    "name": "Guangdong",
    "countryId": 45,
    "countryCode": "CN",
    "fipsCode": "30",
    "iso2": "GD",
    "latitude": 23.3790333,
    "longitude": 113.7632828
  },
  {
    "id": 2280,
    "name": "Hebei",
    "countryId": 45,
    "countryCode": "CN",
    "fipsCode": "10",
    "iso2": "HE",
    "latitude": 37.8956594,
    "longitude": 114.9042208
  },
  {
    "id": 2281,
    "name": "South Governorate",
    "countryId": 121,
    "countryCode": "LB",
    "fipsCode": "06",
    "iso2": "JA",
    "latitude": 33.2721479,
    "longitude": 35.2032778
  },
  {
    "id": 2282,
    "name": "Mount Lebanon Governorate",
    "countryId": 121,
    "countryCode": "LB",
    "fipsCode": "05",
    "iso2": "JL",
    "latitude": 33.8100858,
    "longitude": 35.5973139
  },
  {
    "id": 2283,
    "name": "Baalbek-Hermel Governorate",
    "countryId": 121,
    "countryCode": "LB",
    "fipsCode": "11",
    "iso2": "BH",
    "latitude": 34.2658556,
    "longitude": 36.3498097
  },
  {
    "id": 2284,
    "name": "North Governorate",
    "countryId": 121,
    "countryCode": "LB",
    "fipsCode": "09",
    "iso2": "AS",
    "latitude": 34.4380625,
    "longitude": 35.8308233
  },
  {
    "id": 2285,
    "name": "Akkar Governorate",
    "countryId": 121,
    "countryCode": "LB",
    "fipsCode": "10",
    "iso2": "AK",
    "latitude": 34.5328763,
    "longitude": 36.1328132
  },
  {
    "id": 2286,
    "name": "Beirut Governorate",
    "countryId": 121,
    "countryCode": "LB",
    "fipsCode": "04",
    "iso2": "BA",
    "latitude": 33.8886106,
    "longitude": 35.4954772
  },
  {
    "id": 2287,
    "name": "Beqaa Governorate",
    "countryId": 121,
    "countryCode": "LB",
    "fipsCode": "08",
    "iso2": "BI",
    "latitude": 33.8462662,
    "longitude": 35.9019489
  },
  {
    "id": 2288,
    "name": "Nabatieh Governorate",
    "countryId": 121,
    "countryCode": "LB",
    "fipsCode": "07",
    "iso2": "NA",
    "latitude": 33.3771693,
    "longitude": 35.4838293
  },
  {
    "id": 2289,
    "name": "Isle of Wight",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "G2",
    "iso2": "IOW",
    "latitude": 50.6938479,
    "longitude": -1.304734
  },
  {
    "id": 2290,
    "name": "St Helens",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "N1",
    "iso2": "SHN",
    "latitude": 45.858961,
    "longitude": -122.8212356
  },
  {
    "id": 2291,
    "name": "London Borough of Brent",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "B5",
    "iso2": "BEN",
    "latitude": 51.5672808,
    "longitude": -0.2710568
  },
  {
    "id": 2292,
    "name": "Walsall",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "O8",
    "iso2": "WLL",
    "latitude": 52.586214,
    "longitude": -1.982919
  },
  {
    "id": 2293,
    "name": "Trafford",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "O6",
    "iso2": "TRF",
    "latitude": 40.3856246,
    "longitude": -79.7589347
  },
  {
    "id": 2294,
    "name": "City of Southampton",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "O6",
    "iso2": "STH",
    "latitude": 50.9097004,
    "longitude": -1.4043509
  },
  {
    "id": 2295,
    "name": "Sheffield",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "O6",
    "iso2": "SHF",
    "latitude": 36.0950743,
    "longitude": -80.2788466
  },
  {
    "id": 2296,
    "name": "West Sussex",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "P6",
    "iso2": "WSX",
    "latitude": 50.9280143,
    "longitude": -0.4617075
  },
  {
    "id": 2297,
    "name": "City of Peterborough",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "P6",
    "iso2": "PTE",
    "latitude": 44.3093636,
    "longitude": -78.320153
  },
  {
    "id": 2298,
    "name": "Caerphilly County Borough",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "X4",
    "iso2": "CAY",
    "latitude": 51.6604465,
    "longitude": -3.2178724
  },
  {
    "id": 2299,
    "name": "Vale of Glamorgan",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "Z3",
    "iso2": "VGL",
    "latitude": 51.4095958,
    "longitude": -3.4848167
  },
  {
    "id": 2300,
    "name": "Shetland Islands",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "W3",
    "iso2": "ZET",
    "latitude": 60.5296507,
    "longitude": -1.2659409
  },
  {
    "id": 2301,
    "name": "Rhondda Cynon Taf",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "Y9",
    "iso2": "RCT",
    "latitude": 51.6490207,
    "longitude": -3.4288692
  },
  {
    "id": 2302,
    "name": "Poole",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "Y9",
    "iso2": "POL",
    "latitude": 50.71505,
    "longitude": -1.987248
  },
  {
    "id": 2303,
    "name": "Central Bedfordshire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "Y9",
    "iso2": "CBF",
    "latitude": 52.0029744,
    "longitude": -0.4651389
  },
  {
    "id": 2304,
    "name": "Down District Council",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "R9",
    "iso2": "DOW",
    "latitude": 54.2434287,
    "longitude": -5.9577959
  },
  {
    "id": 2305,
    "name": "City of Portsmouth",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "R9",
    "iso2": "POR",
    "latitude": 36.832915,
    "longitude": -76.2975549
  },
  {
    "id": 2306,
    "name": "London Borough of Haringey",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "F3",
    "iso2": "HRY",
    "latitude": 51.5906113,
    "longitude": -0.1109709
  },
  {
    "id": 2307,
    "name": "London Borough of Bexley",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "A6",
    "iso2": "BEX",
    "latitude": 51.4519021,
    "longitude": 0.1171786
  },
  {
    "id": 2308,
    "name": "Rotherham",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "L3",
    "iso2": "ROT",
    "latitude": 53.4326035,
    "longitude": -1.3635009
  },
  {
    "id": 2309,
    "name": "Hartlepool",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "F5",
    "iso2": "HPL",
    "latitude": 54.691745,
    "longitude": -1.212926
  },
  {
    "id": 2310,
    "name": "Telford and Wrekin",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "O2",
    "iso2": "TFW",
    "latitude": 52.7409916,
    "longitude": -2.4868586
  },
  {
    "id": 2311,
    "name": "Belfast district",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "R3",
    "iso2": "BFS",
    "latitude": 54.6170366,
    "longitude": -5.9531861
  },
  {
    "id": 2312,
    "name": "Cornwall",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "C6",
    "iso2": "CON",
    "latitude": 50.2660471,
    "longitude": -5.0527125
  },
  {
    "id": 2313,
    "name": "London Borough of Sutton",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "N8",
    "iso2": "STN",
    "latitude": 51.3573762,
    "longitude": -0.1752796
  },
  {
    "id": 2314,
    "name": "Omagh District Council",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "T3",
    "iso2": "OMH",
    "latitude": 54.4513524,
    "longitude": -7.7125018
  },
  {
    "id": 2315,
    "name": "Banbridge",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "R2",
    "iso2": "BNB",
    "latitude": 54.348729,
    "longitude": -6.2704803
  },
  {
    "id": 2316,
    "name": "Causeway Coast and Glens",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "R2",
    "iso2": "CCG",
    "latitude": 55.043183,
    "longitude": -6.6741288
  },
  {
    "id": 2317,
    "name": "Newtownabbey Borough Council",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "T1",
    "iso2": "NTA",
    "latitude": 54.6792422,
    "longitude": -5.9591102
  },
  {
    "id": 2318,
    "name": "City of Leicester",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "T1",
    "iso2": "LCE",
    "latitude": 52.6368778,
    "longitude": -1.1397592
  },
  {
    "id": 2319,
    "name": "London Borough of Islington",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "G3",
    "iso2": "ISL",
    "latitude": 51.5465063,
    "longitude": -0.1058058
  },
  {
    "id": 2320,
    "name": "Metropolitan Borough of Wigan",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "P7",
    "iso2": "WGN",
    "latitude": 53.5134812,
    "longitude": -2.6106999
  },
  {
    "id": 2321,
    "name": "Oxfordshire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "K2",
    "iso2": "OXF",
    "latitude": 51.7612056,
    "longitude": -1.2464674
  },
  {
    "id": 2322,
    "name": "Magherafelt District Council",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "S7",
    "iso2": "MFT",
    "latitude": 54.7553279,
    "longitude": -6.6077487
  },
  {
    "id": 2323,
    "name": "Southend-on-Sea",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "M5",
    "iso2": "SOS",
    "latitude": 51.5459269,
    "longitude": 0.7077123
  },
  {
    "id": 2324,
    "name": "Armagh, Banbridge and Craigavon",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "M5",
    "iso2": "ABC",
    "latitude": 54.3932592,
    "longitude": -6.4563401
  },
  {
    "id": 2325,
    "name": "Perth and Kinross",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "W1",
    "iso2": "PKN",
    "latitude": 56.3953817,
    "longitude": -3.4283547
  },
  {
    "id": 2326,
    "name": "London Borough of Waltham Forest",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "O9",
    "iso2": "WFT",
    "latitude": 51.5886383,
    "longitude": -0.0117625
  },
  {
    "id": 2327,
    "name": "Rochdale",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "L2",
    "iso2": "RCH",
    "latitude": 53.6097136,
    "longitude": -2.1561
  },
  {
    "id": 2328,
    "name": "Merthyr Tydfil County Borough",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "Y3",
    "iso2": "MTY",
    "latitude": 51.7467474,
    "longitude": -3.3813275
  },
  {
    "id": 2329,
    "name": "Blackburn with Darwen",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "A8",
    "iso2": "BBD",
    "latitude": 53.6957522,
    "longitude": -2.4682985
  },
  {
    "id": 2330,
    "name": "Knowsley",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "G9",
    "iso2": "KWL",
    "latitude": 53.454594,
    "longitude": -2.852907
  },
  {
    "id": 2331,
    "name": "Armagh City and District Council",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "Q8",
    "iso2": "ARM",
    "latitude": 54.3932592,
    "longitude": -6.4563401
  },
  {
    "id": 2332,
    "name": "Middlesbrough",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "I5",
    "iso2": "MDB",
    "latitude": 54.574227,
    "longitude": -1.234956
  },
  {
    "id": 2333,
    "name": "East Renfrewshire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "U7",
    "iso2": "ERW",
    "latitude": 55.7704735,
    "longitude": -4.3359821
  },
  {
    "id": 2334,
    "name": "Cumbria",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "C9",
    "iso2": "CMA",
    "latitude": 54.5772323,
    "longitude": -2.7974835
  },
  {
    "id": 2335,
    "name": "Scotland",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "SCT",
    "iso2": "SCT",
    "latitude": 56.4906712,
    "longitude": -4.2026458
  },
  {
    "id": 2336,
    "name": "England",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "ENG",
    "iso2": "ENG",
    "latitude": 52.3555177,
    "longitude": -1.1743197
  },
  {
    "id": 2337,
    "name": "Northern Ireland",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "NIR",
    "iso2": "NIR",
    "latitude": 54.7877149,
    "longitude": -6.4923145
  },
  {
    "id": 2338,
    "name": "Wales",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "WLS",
    "iso2": "WLS",
    "latitude": 52.1306607,
    "longitude": -3.7837117
  },
  {
    "id": 2339,
    "name": "Bath and North East Somerset",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "A4",
    "iso2": "BAS",
    "latitude": 51.3250102,
    "longitude": -2.4766241
  },
  {
    "id": 2340,
    "name": "Liverpool",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "A4",
    "iso2": "LIV",
    "latitude": 32.6564981,
    "longitude": -115.4763241
  },
  {
    "id": 2341,
    "name": "Sandwell",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "L7",
    "iso2": "SAW",
    "latitude": 52.5361674,
    "longitude": -2.010793
  },
  {
    "id": 2342,
    "name": "Bournemouth",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "L7",
    "iso2": "BMH",
    "latitude": 50.719164,
    "longitude": -1.880769
  },
  {
    "id": 2343,
    "name": "Isles of Scilly",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "L7",
    "iso2": "IOS",
    "latitude": 49.9277261,
    "longitude": -6.3274966
  },
  {
    "id": 2344,
    "name": "Falkirk",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "U9",
    "iso2": "FAL",
    "latitude": 56.0018775,
    "longitude": -3.7839131
  },
  {
    "id": 2345,
    "name": "Dorset",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "U9",
    "iso2": "DOR",
    "latitude": 50.7487635,
    "longitude": -2.3444786
  },
  {
    "id": 2346,
    "name": "Scottish Borders",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "T9",
    "iso2": "SCB",
    "latitude": 55.5485697,
    "longitude": -2.7861388
  },
  {
    "id": 2347,
    "name": "London Borough of Havering",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "F6",
    "iso2": "HAV",
    "latitude": 51.577924,
    "longitude": 0.2120829
  },
  {
    "id": 2348,
    "name": "Moyle District Council",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "S8",
    "iso2": "MYL",
    "latitude": 55.2047327,
    "longitude": -6.253174
  },
  {
    "id": 2349,
    "name": "London Borough of Camden",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "C4",
    "iso2": "CMD",
    "latitude": 51.5454736,
    "longitude": -0.1627902
  },
  {
    "id": 2350,
    "name": "Newry and Mourne District Council",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "S9",
    "iso2": "NYM",
    "latitude": 54.1742505,
    "longitude": -6.3391992
  },
  {
    "id": 2351,
    "name": "Neath Port Talbot County Borough",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "Y5",
    "iso2": "NTL",
    "latitude": 51.5978519,
    "longitude": -3.7839668
  },
  {
    "id": 2352,
    "name": "Conwy County Borough",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "X8",
    "iso2": "CWY",
    "latitude": 53.2935013,
    "longitude": -3.7265161
  },
  {
    "id": 2353,
    "name": "Outer Hebrides",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "W8",
    "iso2": "ELS",
    "latitude": 57.7598918,
    "longitude": -7.0194034
  },
  {
    "id": 2354,
    "name": "West Lothian",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "W9",
    "iso2": "WLN",
    "latitude": 55.9070198,
    "longitude": -3.5517167
  },
  {
    "id": 2355,
    "name": "Lincolnshire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "W9",
    "iso2": "LIN",
    "latitude": 52.9451889,
    "longitude": -0.1601246
  },
  {
    "id": 2356,
    "name": "London Borough of Barking and Dagenham",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "A1",
    "iso2": "BDG",
    "latitude": 51.5540666,
    "longitude": 0.134017
  },
  {
    "id": 2357,
    "name": "City of Westminster",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "P5",
    "iso2": "WSM",
    "latitude": 39.5765977,
    "longitude": -76.9972126
  },
  {
    "id": 2358,
    "name": "London Borough of Lewisham",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "H6",
    "iso2": "LEW",
    "latitude": 51.4414579,
    "longitude": -0.0117006
  },
  {
    "id": 2359,
    "name": "City of Nottingham",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "H6",
    "iso2": "NGM",
    "latitude": 52.9547832,
    "longitude": -1.1581086
  },
  {
    "id": 2360,
    "name": "Moray",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "V6",
    "iso2": "MRY",
    "latitude": 57.6498476,
    "longitude": -3.3168039
  },
  {
    "id": 2361,
    "name": "Ballymoney",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "R1",
    "iso2": "BLY",
    "latitude": 55.0704888,
    "longitude": -6.5173708
  },
  {
    "id": 2362,
    "name": "South Lanarkshire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "W5",
    "iso2": "SLK",
    "latitude": 55.6735909,
    "longitude": -3.7819661
  },
  {
    "id": 2363,
    "name": "Ballymena Borough",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "Q9",
    "iso2": "BLA",
    "latitude": 54.86426,
    "longitude": -6.2791074
  },
  {
    "id": 2364,
    "name": "Doncaster",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "D5",
    "iso2": "DNC",
    "latitude": 53.52282,
    "longitude": -1.128462
  },
  {
    "id": 2365,
    "name": "Northumberland",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "J6",
    "iso2": "NBL",
    "latitude": 55.2082542,
    "longitude": -2.0784138
  },
  {
    "id": 2366,
    "name": "Fermanagh and Omagh",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "J6",
    "iso2": "FMO",
    "latitude": 54.4513524,
    "longitude": -7.7125018
  },
  {
    "id": 2367,
    "name": "Tameside",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "O1",
    "iso2": "TAM",
    "latitude": 53.4805828,
    "longitude": -2.0809891
  },
  {
    "id": 2368,
    "name": "Royal Borough of Kensington and Chelsea",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "G4",
    "iso2": "KEC",
    "latitude": 51.4990805,
    "longitude": -0.1938253
  },
  {
    "id": 2369,
    "name": "Hertfordshire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "F8",
    "iso2": "HRT",
    "latitude": 51.8097823,
    "longitude": -0.2376744
  },
  {
    "id": 2370,
    "name": "East Riding of Yorkshire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "F8",
    "iso2": "ERY",
    "latitude": 53.8416168,
    "longitude": -0.4344106
  },
  {
    "id": 2371,
    "name": "Kirklees",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "G8",
    "iso2": "KIR",
    "latitude": 53.5933432,
    "longitude": -1.8009509
  },
  {
    "id": 2372,
    "name": "City of Sunderland",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "N6",
    "iso2": "SND",
    "latitude": 54.8861489,
    "longitude": -1.4785797
  },
  {
    "id": 2373,
    "name": "Gloucestershire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "N6",
    "iso2": "GLS",
    "latitude": 51.8642112,
    "longitude": -2.2380335
  },
  {
    "id": 2374,
    "name": "East Ayrshire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "U4",
    "iso2": "EAY",
    "latitude": 55.4518496,
    "longitude": -4.2644478
  },
  {
    "id": 2375,
    "name": "United Kingdom",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "UK",
    "iso2": "UKM",
    "latitude": 55.378051,
    "longitude": -3.435973
  },
  {
    "id": 2376,
    "name": "London Borough of Hillingdon",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "F9",
    "iso2": "HIL",
    "latitude": 51.5351832,
    "longitude": -0.4481378
  },
  {
    "id": 2377,
    "name": "South Ayrshire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "W4",
    "iso2": "SAY",
    "latitude": 55.4588988,
    "longitude": -4.6291994
  },
  {
    "id": 2378,
    "name": "Ascension Island",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "01",
    "iso2": "SH-AC",
    "latitude": -7.9467166,
    "longitude": -14.3559158
  },
  {
    "id": 2379,
    "name": "Gwynedd",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "Y2",
    "iso2": "GWN",
    "latitude": 52.9277266,
    "longitude": -4.1334836
  },
  {
    "id": 2380,
    "name": "London Borough of Hounslow",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "G1",
    "iso2": "HNS",
    "latitude": 51.4828358,
    "longitude": -0.3882062
  },
  {
    "id": 2381,
    "name": "Medway",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "I3",
    "iso2": "MDW",
    "latitude": 42.1417641,
    "longitude": -71.3967256
  },
  {
    "id": 2382,
    "name": "Limavady Borough Council",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "S4",
    "iso2": "LMV",
    "latitude": 55.051682,
    "longitude": -6.9491944
  },
  {
    "id": 2383,
    "name": "Highland",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "V3",
    "iso2": "HLD",
    "latitude": 36.2967508,
    "longitude": -95.8380366
  },
  {
    "id": 2384,
    "name": "North East Lincolnshire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "J2",
    "iso2": "NEL",
    "latitude": 53.5668201,
    "longitude": -0.0815066
  },
  {
    "id": 2385,
    "name": "London Borough of Harrow",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "F4",
    "iso2": "HRW",
    "latitude": 51.5881627,
    "longitude": -0.3422851
  },
  {
    "id": 2386,
    "name": "Somerset",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "F4",
    "iso2": "SOM",
    "latitude": 51.105097,
    "longitude": -2.9262307
  },
  {
    "id": 2387,
    "name": "Angus",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "T7",
    "iso2": "ANS",
    "latitude": 37.2757886,
    "longitude": -95.6501033
  },
  {
    "id": 2388,
    "name": "Inverclyde",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "V4",
    "iso2": "IVC",
    "latitude": 55.9316569,
    "longitude": -4.6800158
  },
  {
    "id": 2389,
    "name": "Darlington",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "D1",
    "iso2": "DAL",
    "latitude": 34.2998762,
    "longitude": -79.8761741
  },
  {
    "id": 2390,
    "name": "London Borough of Tower Hamlets",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "O5",
    "iso2": "TWH",
    "latitude": 51.5202607,
    "longitude": -0.0293396
  },
  {
    "id": 2391,
    "name": "Wiltshire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "P8",
    "iso2": "WIL",
    "latitude": 51.3491996,
    "longitude": -1.9927105
  },
  {
    "id": 2392,
    "name": "Argyll and Bute",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "T8",
    "iso2": "AGB",
    "latitude": 56.4006214,
    "longitude": -5.480748
  },
  {
    "id": 2393,
    "name": "Strabane District Council",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "T4",
    "iso2": "STB",
    "latitude": 54.8273865,
    "longitude": -7.4633103
  },
  {
    "id": 2394,
    "name": "Stockport",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "N2",
    "iso2": "SKP",
    "latitude": 53.4106316,
    "longitude": -2.1575332
  },
  {
    "id": 2395,
    "name": "Brighton and Hove",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "B6",
    "iso2": "BNH",
    "latitude": 50.8226288,
    "longitude": -0.137047
  },
  {
    "id": 2396,
    "name": "London Borough of Lambeth",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "H1",
    "iso2": "LBH",
    "latitude": 51.4571477,
    "longitude": -0.1230681
  },
  {
    "id": 2397,
    "name": "London Borough of Redbridge",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "K8",
    "iso2": "RDB",
    "latitude": 51.5886121,
    "longitude": 0.0823982
  },
  {
    "id": 2398,
    "name": "Manchester",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "K8",
    "iso2": "MAN",
    "latitude": 53.4807593,
    "longitude": -2.2426305
  },
  {
    "id": 2399,
    "name": "Mid Ulster",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "K8",
    "iso2": "MUL",
    "latitude": 54.6411301,
    "longitude": -6.7522549
  },
  {
    "id": 2400,
    "name": "South Gloucestershire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "M6",
    "iso2": "SGC",
    "latitude": 51.5264361,
    "longitude": -2.4728487
  },
  {
    "id": 2401,
    "name": "Aberdeenshire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "T6",
    "iso2": "ABD",
    "latitude": 57.2868723,
    "longitude": -2.3815684
  },
  {
    "id": 2402,
    "name": "Monmouthshire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "Y4",
    "iso2": "MON",
    "latitude": 51.81161,
    "longitude": -2.7163417
  },
  {
    "id": 2403,
    "name": "Derbyshire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "Y4",
    "iso2": "DBY",
    "latitude": 53.1046782,
    "longitude": -1.5623885
  },
  {
    "id": 2404,
    "name": "Glasgow",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "V2",
    "iso2": "GLG",
    "latitude": 55.864237,
    "longitude": -4.251806
  },
  {
    "id": 2405,
    "name": "Buckinghamshire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "V2",
    "iso2": "BKM",
    "latitude": 51.8072204,
    "longitude": -0.8127664
  },
  {
    "id": 2406,
    "name": "County Durham",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "D8",
    "iso2": "DUR",
    "latitude": 54.7294099,
    "longitude": -1.8811598
  },
  {
    "id": 2407,
    "name": "Shropshire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "D8",
    "iso2": "SHR",
    "latitude": 52.7063657,
    "longitude": -2.7417849
  },
  {
    "id": 2408,
    "name": "Wirral",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "Q1",
    "iso2": "WRL",
    "latitude": 53.3727181,
    "longitude": -3.073754
  },
  {
    "id": 2409,
    "name": "South Tyneside",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "M7",
    "iso2": "STY",
    "latitude": 54.9636693,
    "longitude": -1.4418634
  },
  {
    "id": 2410,
    "name": "Essex",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "M7",
    "iso2": "ESS",
    "latitude": 51.5742447,
    "longitude": 0.4856781
  },
  {
    "id": 2411,
    "name": "London Borough of Hackney",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "E8",
    "iso2": "HCK",
    "latitude": 51.573445,
    "longitude": -0.0724376
  },
  {
    "id": 2412,
    "name": "Antrim and Newtownabbey",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "E8",
    "iso2": "ANN",
    "latitude": 54.6956887,
    "longitude": -5.9481069
  },
  {
    "id": 2413,
    "name": "City of Bristol",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "E8",
    "iso2": "BST",
    "latitude": 41.673522,
    "longitude": -72.9465375
  },
  {
    "id": 2414,
    "name": "East Sussex",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "E8",
    "iso2": "ESX",
    "latitude": 50.9085955,
    "longitude": 0.2494166
  },
  {
    "id": 2415,
    "name": "Dumfries and Galloway",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "U2",
    "iso2": "DGY",
    "latitude": 55.0701073,
    "longitude": -3.6052581
  },
  {
    "id": 2416,
    "name": "Milton Keynes",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "I6",
    "iso2": "MIK",
    "latitude": 52.0852038,
    "longitude": -0.7333133
  },
  {
    "id": 2417,
    "name": "Derry City Council",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "S6",
    "iso2": "DRY",
    "latitude": 54.9690778,
    "longitude": -7.1958351
  },
  {
    "id": 2418,
    "name": "London Borough of Newham",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "I8",
    "iso2": "NWM",
    "latitude": 51.5255162,
    "longitude": 0.0352163
  },
  {
    "id": 2419,
    "name": "Wokingham",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "Q2",
    "iso2": "WOK",
    "latitude": 51.410457,
    "longitude": -0.833861
  },
  {
    "id": 2420,
    "name": "Warrington",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "Q2",
    "iso2": "WRT",
    "latitude": 40.2492741,
    "longitude": -75.1340604
  },
  {
    "id": 2421,
    "name": "Stockton-on-Tees",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "N3",
    "iso2": "STT",
    "latitude": 54.5704551,
    "longitude": -1.3289821
  },
  {
    "id": 2422,
    "name": "Swindon",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "N9",
    "iso2": "SWD",
    "latitude": 51.5557739,
    "longitude": -1.7797176
  },
  {
    "id": 2423,
    "name": "Cambridgeshire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "N9",
    "iso2": "CAM",
    "latitude": 52.2052973,
    "longitude": 0.1218195
  },
  {
    "id": 2424,
    "name": "City of London",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "H9",
    "iso2": "LND",
    "latitude": 51.5123443,
    "longitude": -0.0909852
  },
  {
    "id": 2425,
    "name": "Birmingham",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "H9",
    "iso2": "BIR",
    "latitude": 33.5185892,
    "longitude": -86.8103567
  },
  {
    "id": 2426,
    "name": "City of York",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "H9",
    "iso2": "YOR",
    "latitude": 53.9599651,
    "longitude": -1.0872979
  },
  {
    "id": 2427,
    "name": "Slough",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "H9",
    "iso2": "SLG",
    "latitude": 51.5105384,
    "longitude": -0.5950406
  },
  {
    "id": 2428,
    "name": "Edinburgh",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "U8",
    "iso2": "EDH",
    "latitude": 55.953252,
    "longitude": -3.188267
  },
  {
    "id": 2429,
    "name": "Mid and East Antrim",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "U8",
    "iso2": "MEA",
    "latitude": 54.9399341,
    "longitude": -6.1137423
  },
  {
    "id": 2430,
    "name": "North Somerset",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "J4",
    "iso2": "NSM",
    "latitude": 51.3879028,
    "longitude": -2.7781091
  },
  {
    "id": 2431,
    "name": "Gateshead",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "E5",
    "iso2": "GAT",
    "latitude": 54.95268,
    "longitude": -1.603411
  },
  {
    "id": 2432,
    "name": "London Borough of Southwark",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "M8",
    "iso2": "SWK",
    "latitude": 51.4880572,
    "longitude": -0.0762838
  },
  {
    "id": 2433,
    "name": "City and County of Swansea",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "Z1",
    "iso2": "SWA",
    "latitude": 51.62144,
    "longitude": -3.943646
  },
  {
    "id": 2434,
    "name": "London Borough of Wandsworth",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "P1",
    "iso2": "WND",
    "latitude": 51.4568274,
    "longitude": -0.1896638
  },
  {
    "id": 2435,
    "name": "Hampshire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "P1",
    "iso2": "HAM",
    "latitude": 51.0576948,
    "longitude": -1.3080629
  },
  {
    "id": 2436,
    "name": "Wrexham County Borough",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "Z4",
    "iso2": "WRX",
    "latitude": 53.0301378,
    "longitude": -3.0261487
  },
  {
    "id": 2437,
    "name": "Flintshire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "Y1",
    "iso2": "FLN",
    "latitude": 53.1668658,
    "longitude": -3.1418908
  },
  {
    "id": 2438,
    "name": "Coventry",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "Y1",
    "iso2": "COV",
    "latitude": 52.406822,
    "longitude": -1.519693
  },
  {
    "id": 2439,
    "name": "Carrickfergus Borough Council",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "R4",
    "iso2": "CKF",
    "latitude": 54.7256843,
    "longitude": -5.8093719
  },
  {
    "id": 2440,
    "name": "West Dunbartonshire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "W7",
    "iso2": "WDU",
    "latitude": 55.9450925,
    "longitude": -4.5646259
  },
  {
    "id": 2441,
    "name": "Powys",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "Y8",
    "iso2": "POW",
    "latitude": 52.6464249,
    "longitude": -3.3260904
  },
  {
    "id": 2442,
    "name": "Cheshire West and Chester",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "Y8",
    "iso2": "CHW",
    "latitude": 53.2302974,
    "longitude": -2.7151117
  },
  {
    "id": 2443,
    "name": "Renfrewshire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "W2",
    "iso2": "RFW",
    "latitude": 55.846654,
    "longitude": -4.5331259
  },
  {
    "id": 2444,
    "name": "Cheshire East",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "W2",
    "iso2": "CHE",
    "latitude": 53.1610446,
    "longitude": -2.2185932
  },
  {
    "id": 2445,
    "name": "Cookstown District Council",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "R7",
    "iso2": "CKT",
    "latitude": 54.6418158,
    "longitude": -6.7443895
  },
  {
    "id": 2446,
    "name": "Derry City and Strabane",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "R7",
    "iso2": "DRS",
    "latitude": 55.0047443,
    "longitude": -7.3209222
  },
  {
    "id": 2447,
    "name": "Staffordshire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "R7",
    "iso2": "STS",
    "latitude": 52.8792745,
    "longitude": -2.0571868
  },
  {
    "id": 2448,
    "name": "London Borough of Hammersmith and Fulham",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "F1",
    "iso2": "HMF",
    "latitude": 51.4990156,
    "longitude": -0.22915
  },
  {
    "id": 2449,
    "name": "Craigavon Borough Council",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "R8",
    "iso2": "CGV",
    "latitude": 54.3932592,
    "longitude": -6.4563401
  },
  {
    "id": 2450,
    "name": "Clackmannanshire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "U1",
    "iso2": "CLK",
    "latitude": 56.1075351,
    "longitude": -3.7529409
  },
  {
    "id": 2451,
    "name": "Blackpool",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "A9",
    "iso2": "BPL",
    "latitude": 53.8175053,
    "longitude": -3.0356748
  },
  {
    "id": 2452,
    "name": "Bridgend County Borough",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "X3",
    "iso2": "BGE",
    "latitude": 51.5083199,
    "longitude": -3.5812075
  },
  {
    "id": 2453,
    "name": "North Lincolnshire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "J3",
    "iso2": "NLN",
    "latitude": 53.6055592,
    "longitude": -0.5596582
  },
  {
    "id": 2454,
    "name": "East Dunbartonshire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "U5",
    "iso2": "EDU",
    "latitude": 55.9743162,
    "longitude": -4.202298
  },
  {
    "id": 2455,
    "name": "Reading",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "U5",
    "iso2": "RDG",
    "latitude": 36.1486659,
    "longitude": -95.9840012
  },
  {
    "id": 2456,
    "name": "Nottinghamshire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "U5",
    "iso2": "NTT",
    "latitude": 53.100319,
    "longitude": -0.9936306
  },
  {
    "id": 2457,
    "name": "Dudley",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "D7",
    "iso2": "DUD",
    "latitude": 42.0433661,
    "longitude": -71.9276033
  },
  {
    "id": 2458,
    "name": "Newcastle upon Tyne",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "D7",
    "iso2": "NET",
    "latitude": 54.978252,
    "longitude": -1.61778
  },
  {
    "id": 2459,
    "name": "Bury",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "C1",
    "iso2": "BUR",
    "latitude": 53.5933498,
    "longitude": -2.2966054
  },
  {
    "id": 2460,
    "name": "Lisburn and Castlereagh",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "C1",
    "iso2": "LBC",
    "latitude": 54.4981584,
    "longitude": -6.1306791
  },
  {
    "id": 2461,
    "name": "Coleraine Borough Council",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "R6",
    "iso2": "CLR",
    "latitude": 55.145157,
    "longitude": -6.6759814
  },
  {
    "id": 2462,
    "name": "East Lothian",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "U6",
    "iso2": "ELN",
    "latitude": 55.9493383,
    "longitude": -2.7704464
  },
  {
    "id": 2463,
    "name": "Aberdeen",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "T5",
    "iso2": "ABE",
    "latitude": 57.149717,
    "longitude": -2.094278
  },
  {
    "id": 2464,
    "name": "Kent",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "T5",
    "iso2": "KEN",
    "latitude": 41.1536674,
    "longitude": -81.3578859
  },
  {
    "id": 2465,
    "name": "Wakefield",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "O7",
    "iso2": "WKF",
    "latitude": 42.5039395,
    "longitude": -71.0723391
  },
  {
    "id": 2466,
    "name": "Halton",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "E9",
    "iso2": "HAL",
    "latitude": 43.5325372,
    "longitude": -79.8744836
  },
  {
    "id": 2467,
    "name": "Suffolk",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "N5",
    "iso2": "SFK",
    "latitude": 52.1872472,
    "longitude": 0.9707801
  },
  {
    "id": 2468,
    "name": "Thurrock",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "O3",
    "iso2": "THR",
    "latitude": 51.4934557,
    "longitude": 0.3529197
  },
  {
    "id": 2469,
    "name": "Solihull",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "M2",
    "iso2": "SOL",
    "latitude": 52.411811,
    "longitude": -1.77761
  },
  {
    "id": 2470,
    "name": "Bracknell Forest",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "B3",
    "iso2": "BRC",
    "latitude": 51.4153828,
    "longitude": -0.7536495
  },
  {
    "id": 2471,
    "name": "West Berkshire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "P4",
    "iso2": "WBK",
    "latitude": 51.4308255,
    "longitude": -1.1444927
  },
  {
    "id": 2472,
    "name": "Rutland",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "L4",
    "iso2": "RUT",
    "latitude": 43.6106237,
    "longitude": -72.9726065
  },
  {
    "id": 2473,
    "name": "Norfolk",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "I9",
    "iso2": "NFK",
    "latitude": 36.8507689,
    "longitude": -76.2858726
  },
  {
    "id": 2474,
    "name": "Orkney Islands",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "V9",
    "iso2": "ORK",
    "latitude": 58.9809401,
    "longitude": -2.9605206
  },
  {
    "id": 2475,
    "name": "City of Kingston upon Hull",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "V9",
    "iso2": "KHL",
    "latitude": 53.7676236,
    "longitude": -0.3274198
  },
  {
    "id": 2476,
    "name": "London Borough of Enfield",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "E3",
    "iso2": "ENF",
    "latitude": 51.6622909,
    "longitude": -0.1180651
  },
  {
    "id": 2477,
    "name": "Oldham",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "K1",
    "iso2": "OLD",
    "latitude": 42.2040598,
    "longitude": -71.2048119
  },
  {
    "id": 2478,
    "name": "Torbay",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "O4",
    "iso2": "TOB",
    "latitude": 50.4392329,
    "longitude": -3.5369899
  },
  {
    "id": 2479,
    "name": "Fife",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "V1",
    "iso2": "FIF",
    "latitude": 56.2082078,
    "longitude": -3.1495175
  },
  {
    "id": 2480,
    "name": "Northamptonshire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "J1",
    "iso2": "NTH",
    "latitude": 52.2729944,
    "longitude": -0.8755515
  },
  {
    "id": 2481,
    "name": "Royal Borough of Kingston upon Thames",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "G7",
    "iso2": "KTT",
    "latitude": 51.378117,
    "longitude": -0.292709
  },
  {
    "id": 2482,
    "name": "Windsor and Maidenhead",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "P9",
    "iso2": "WNM",
    "latitude": 51.4799712,
    "longitude": -0.6242565
  },
  {
    "id": 2483,
    "name": "London Borough of Merton",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "I4",
    "iso2": "MRT",
    "latitude": 51.4097742,
    "longitude": -0.2108084
  },
  {
    "id": 2484,
    "name": "Carmarthenshire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "X7",
    "iso2": "CMN",
    "latitude": 51.8572309,
    "longitude": -4.3115959
  },
  {
    "id": 2485,
    "name": "City of Derby",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "X7",
    "iso2": "DER",
    "latitude": 37.5483755,
    "longitude": -97.2485191
  },
  {
    "id": 2486,
    "name": "Pembrokeshire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "Y7",
    "iso2": "PEM",
    "latitude": 51.674078,
    "longitude": -4.9088785
  },
  {
    "id": 2487,
    "name": "North Lanarkshire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "V8",
    "iso2": "NLK",
    "latitude": 55.8662432,
    "longitude": -3.9613144
  },
  {
    "id": 2488,
    "name": "Stirling",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "W6",
    "iso2": "STG",
    "latitude": 56.1165227,
    "longitude": -3.9369029
  },
  {
    "id": 2489,
    "name": "City of Wolverhampton",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "W6",
    "iso2": "WLV",
    "latitude": 52.588912,
    "longitude": -2.156463
  },
  {
    "id": 2490,
    "name": "London Borough of Bromley",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "B8",
    "iso2": "BRY",
    "latitude": 51.3679705,
    "longitude": 0.070062
  },
  {
    "id": 2491,
    "name": "Devon",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "B8",
    "iso2": "DEV",
    "latitude": 50.7155591,
    "longitude": -3.530875
  },
  {
    "id": 2492,
    "name": "Royal Borough of Greenwich",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "E7",
    "iso2": "GRE",
    "latitude": 51.4834627,
    "longitude": 0.0586202
  },
  {
    "id": 2493,
    "name": "Salford",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "L5",
    "iso2": "SLF",
    "latitude": 53.4875235,
    "longitude": -2.2901264
  },
  {
    "id": 2494,
    "name": "Lisburn City Council",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "S5",
    "iso2": "LSB",
    "latitude": 54.4981584,
    "longitude": -6.1306791
  },
  {
    "id": 2495,
    "name": "Lancashire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "S5",
    "iso2": "LAN",
    "latitude": 53.7632254,
    "longitude": -2.7044052
  },
  {
    "id": 2496,
    "name": "Torfaen",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "Z2",
    "iso2": "TOF",
    "latitude": 51.7002253,
    "longitude": -3.0446015
  },
  {
    "id": 2497,
    "name": "Denbighshire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "X9",
    "iso2": "DEN",
    "latitude": 53.1842288,
    "longitude": -3.4224985
  },
  {
    "id": 2498,
    "name": "Ards",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "Q7",
    "iso2": "ARD",
    "latitude": 42.1391851,
    "longitude": -87.8614972
  },
  {
    "id": 2499,
    "name": "Barnsley",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "A3",
    "iso2": "BNS",
    "latitude": 34.2994956,
    "longitude": -84.9845809
  },
  {
    "id": 2500,
    "name": "Herefordshire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "F7",
    "iso2": "HEF",
    "latitude": 52.0765164,
    "longitude": -2.6544182
  },
  {
    "id": 2501,
    "name": "London Borough of Richmond upon Thames",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "L1",
    "iso2": "RIC",
    "latitude": 51.4613054,
    "longitude": -0.3037709
  },
  {
    "id": 2502,
    "name": "Saint Helena",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "02",
    "iso2": "SH-HL",
    "latitude": -15.9650104,
    "longitude": -5.7089241
  },
  {
    "id": 2503,
    "name": "Leeds",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "H3",
    "iso2": "LDS",
    "latitude": 53.8007554,
    "longitude": -1.5490774
  },
  {
    "id": 2504,
    "name": "Bolton",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "B1",
    "iso2": "BOL",
    "latitude": 44.3726476,
    "longitude": -72.8787625
  },
  {
    "id": 2505,
    "name": "Warwickshire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "P3",
    "iso2": "WAR",
    "latitude": 52.2671353,
    "longitude": -1.4675216
  },
  {
    "id": 2506,
    "name": "City of Stoke-on-Trent",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "P3",
    "iso2": "STE",
    "latitude": 53.002668,
    "longitude": -2.179404
  },
  {
    "id": 2507,
    "name": "Bedford",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "P3",
    "iso2": "BDF",
    "latitude": 32.844017,
    "longitude": -97.1430671
  },
  {
    "id": 2508,
    "name": "Dungannon and South Tyrone Borough Council",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "S1",
    "iso2": "DGN",
    "latitude": 54.5082684,
    "longitude": -6.7665891
  },
  {
    "id": 2509,
    "name": "Ceredigion",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "X6",
    "iso2": "CGN",
    "latitude": 52.2191429,
    "longitude": -3.9321256
  },
  {
    "id": 2510,
    "name": "Worcestershire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "Q4",
    "iso2": "WOR",
    "latitude": 52.2545225,
    "longitude": -2.2668382
  },
  {
    "id": 2511,
    "name": "Dundee",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "U3",
    "iso2": "DND",
    "latitude": 56.462018,
    "longitude": -2.970721
  },
  {
    "id": 2512,
    "name": "London Borough of Croydon",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "C8",
    "iso2": "CRY",
    "latitude": 51.3827446,
    "longitude": -0.0985163
  },
  {
    "id": 2513,
    "name": "North Down Borough Council",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "T2",
    "iso2": "NDN",
    "latitude": 54.6536297,
    "longitude": -5.6724925
  },
  {
    "id": 2514,
    "name": "City of Plymouth",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "T2",
    "iso2": "PLY",
    "latitude": 42.3708941,
    "longitude": -83.4697141
  },
  {
    "id": 2515,
    "name": "Larne Borough Council",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "S3",
    "iso2": "LRN",
    "latitude": 54.8578003,
    "longitude": -5.8236224
  },
  {
    "id": 2516,
    "name": "Leicestershire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "S3",
    "iso2": "LEC",
    "latitude": 52.772571,
    "longitude": -1.2052126
  },
  {
    "id": 2517,
    "name": "Calderdale",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "C2",
    "iso2": "CLD",
    "latitude": 53.7247845,
    "longitude": -1.8658357
  },
  {
    "id": 2518,
    "name": "Sefton",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "L8",
    "iso2": "SFT",
    "latitude": 53.5034449,
    "longitude": -2.970359
  },
  {
    "id": 2519,
    "name": "Midlothian",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "V5",
    "iso2": "MLN",
    "latitude": 32.475335,
    "longitude": -97.0103181
  },
  {
    "id": 2520,
    "name": "London Borough of Barnet",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "A2",
    "iso2": "BNE",
    "latitude": 51.6049673,
    "longitude": -0.2076295
  },
  {
    "id": 2521,
    "name": "North Tyneside",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "J5",
    "iso2": "NTY",
    "latitude": 55.0182399,
    "longitude": -1.4858436
  },
  {
    "id": 2522,
    "name": "North Yorkshire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "NIR",
    "iso2": "NYK",
    "latitude": 53.9915028,
    "longitude": -1.5412015
  },
  {
    "id": 2523,
    "name": "Ards and North Down",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "NIR",
    "iso2": "AND",
    "latitude": 54.5899645,
    "longitude": -5.5984972
  },
  {
    "id": 2524,
    "name": "Newport",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "Y6",
    "iso2": "NWP",
    "latitude": 37.5278234,
    "longitude": -94.1043876
  },
  {
    "id": 2525,
    "name": "Castlereagh",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "R5",
    "iso2": "CSR",
    "latitude": 54.575679,
    "longitude": -5.8884028
  },
  {
    "id": 2526,
    "name": "Surrey",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "N7",
    "iso2": "SRY",
    "latitude": 51.3147593,
    "longitude": -0.5599501
  },
  {
    "id": 2527,
    "name": "Redcar and Cleveland",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "K9",
    "iso2": "RCC",
    "latitude": 54.5971344,
    "longitude": -1.0775997
  },
  {
    "id": 2528,
    "name": "City and County of Cardiff",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "X5",
    "iso2": "CRF",
    "latitude": 51.481581,
    "longitude": -3.17909
  },
  {
    "id": 2529,
    "name": "Bradford",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "B4",
    "iso2": "BRD",
    "latitude": 53.795984,
    "longitude": -1.759398
  },
  {
    "id": 2530,
    "name": "Blaenau Gwent County Borough",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "X2",
    "iso2": "BGW",
    "latitude": 51.7875779,
    "longitude": -3.2043931
  },
  {
    "id": 2531,
    "name": "Fermanagh District Council",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "S2",
    "iso2": "FER",
    "latitude": 54.3447978,
    "longitude": -7.6384218
  },
  {
    "id": 2532,
    "name": "London Borough of Ealing",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "D9",
    "iso2": "EAL",
    "latitude": 51.5250366,
    "longitude": -0.3413965
  },
  {
    "id": 2533,
    "name": "Antrim",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "Q6",
    "iso2": "ANT",
    "latitude": 54.7195338,
    "longitude": -6.2072498
  },
  {
    "id": 2534,
    "name": "Newry, Mourne and Down",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "Q6",
    "iso2": "NMD",
    "latitude": 54.2434287,
    "longitude": -5.9577959
  },
  {
    "id": 2535,
    "name": "North Ayrshire",
    "countryId": 232,
    "countryCode": "GB",
    "fipsCode": "V7",
    "iso2": "NAY",
    "latitude": 55.6416731,
    "longitude": -4.75946
  },
  {
    "id": 2536,
    "name": "Tashkent",
    "countryId": 236,
    "countryCode": "UZ",
    "fipsCode": "13",
    "iso2": "TK",
    "latitude": 41.2994958,
    "longitude": 69.2400734
  },
  {
    "id": 2537,
    "name": "Namangan Region",
    "countryId": 236,
    "countryCode": "UZ",
    "fipsCode": "06",
    "iso2": "NG",
    "latitude": 41.0510037,
    "longitude": 71.097317
  },
  {
    "id": 2538,
    "name": "Fergana Region",
    "countryId": 236,
    "countryCode": "UZ",
    "fipsCode": "03",
    "iso2": "FA",
    "latitude": 40.4568081,
    "longitude": 71.2874209
  },
  {
    "id": 2539,
    "name": "Xorazm Region",
    "countryId": 236,
    "countryCode": "UZ",
    "fipsCode": "05",
    "iso2": "XO",
    "latitude": 41.3565336,
    "longitude": 60.8566686
  },
  {
    "id": 2540,
    "name": "Andijan Region",
    "countryId": 236,
    "countryCode": "UZ",
    "fipsCode": "01",
    "iso2": "AN",
    "latitude": 40.7685941,
    "longitude": 72.236379
  },
  {
    "id": 2541,
    "name": "Bukhara Region",
    "countryId": 236,
    "countryCode": "UZ",
    "fipsCode": "02",
    "iso2": "BU",
    "latitude": 40.2504162,
    "longitude": 63.2032151
  },
  {
    "id": 2542,
    "name": "Navoiy Region",
    "countryId": 236,
    "countryCode": "UZ",
    "fipsCode": "07",
    "iso2": "NW",
    "latitude": 42.6988575,
    "longitude": 64.6337685
  },
  {
    "id": 2543,
    "name": "Qashqadaryo Region",
    "countryId": 236,
    "countryCode": "UZ",
    "fipsCode": "08",
    "iso2": "QA",
    "latitude": 38.8986231,
    "longitude": 66.0463534
  },
  {
    "id": 2544,
    "name": "Samarqand Region",
    "countryId": 236,
    "countryCode": "UZ",
    "fipsCode": "10",
    "iso2": "SA",
    "latitude": 39.627012,
    "longitude": 66.9749731
  },
  {
    "id": 2545,
    "name": "Jizzakh Region",
    "countryId": 236,
    "countryCode": "UZ",
    "fipsCode": "15",
    "iso2": "JI",
    "latitude": 40.4706415,
    "longitude": 67.5708536
  },
  {
    "id": 2546,
    "name": "Surxondaryo Region",
    "countryId": 236,
    "countryCode": "UZ",
    "fipsCode": "12",
    "iso2": "SU",
    "latitude": 37.9409005,
    "longitude": 67.5708536
  },
  {
    "id": 2547,
    "name": "Sirdaryo Region",
    "countryId": 236,
    "countryCode": "UZ",
    "fipsCode": "16",
    "iso2": "SI",
    "latitude": 40.3863808,
    "longitude": 68.7154975
  },
  {
    "id": 2548,
    "name": "Karakalpakstan",
    "countryId": 236,
    "countryCode": "UZ",
    "fipsCode": "09",
    "iso2": "QR",
    "latitude": 43.8041334,
    "longitude": 59.4457988
  },
  {
    "id": 2549,
    "name": "Tashkent Region",
    "countryId": 236,
    "countryCode": "UZ",
    "fipsCode": "14",
    "iso2": "TO",
    "latitude": 41.2213234,
    "longitude": 69.8597406
  },
  {
    "id": 2550,
    "name": "Ariana Governorate",
    "countryId": 224,
    "countryCode": "TN",
    "fipsCode": "38",
    "iso2": "12",
    "latitude": 36.9922751,
    "longitude": 10.1255164
  },
  {
    "id": 2551,
    "name": "Bizerte Governorate",
    "countryId": 224,
    "countryCode": "TN",
    "fipsCode": "18",
    "iso2": "23",
    "latitude": 37.1609397,
    "longitude": 9.634135
  },
  {
    "id": 2552,
    "name": "Jendouba Governorate",
    "countryId": 224,
    "countryCode": "TN",
    "fipsCode": "06",
    "iso2": "32",
    "latitude": 36.7181862,
    "longitude": 8.7481167
  },
  {
    "id": 2553,
    "name": "Monastir Governorate",
    "countryId": 224,
    "countryCode": "TN",
    "fipsCode": "16",
    "iso2": "52",
    "latitude": 35.7642515,
    "longitude": 10.8112885
  },
  {
    "id": 2554,
    "name": "Tunis Governorate",
    "countryId": 224,
    "countryCode": "TN",
    "fipsCode": "36",
    "iso2": "11",
    "latitude": 36.8374946,
    "longitude": 10.1927389
  },
  {
    "id": 2555,
    "name": "Manouba Governorate",
    "countryId": 224,
    "countryCode": "TN",
    "fipsCode": "39",
    "iso2": "14",
    "latitude": 36.8446504,
    "longitude": 9.8571416
  },
  {
    "id": 2556,
    "name": "Gafsa Governorate",
    "countryId": 224,
    "countryCode": "TN",
    "fipsCode": "30",
    "iso2": "71",
    "latitude": 34.3788505,
    "longitude": 8.6600586
  },
  {
    "id": 2557,
    "name": "Sfax Governorate",
    "countryId": 224,
    "countryCode": "TN",
    "fipsCode": "32",
    "iso2": "61",
    "latitude": 34.8606581,
    "longitude": 10.3497895
  },
  {
    "id": 2558,
    "name": "Gabès Governorate",
    "countryId": 224,
    "countryCode": "TN",
    "fipsCode": "29",
    "iso2": "81",
    "latitude": 33.9459648,
    "longitude": 9.7232673
  },
  {
    "id": 2559,
    "name": "Tataouine Governorate",
    "countryId": 224,
    "countryCode": "TN",
    "fipsCode": "34",
    "iso2": "83",
    "latitude": 32.1344122,
    "longitude": 10.0807298
  },
  {
    "id": 2560,
    "name": "Medenine Governorate",
    "countryId": 224,
    "countryCode": "TN",
    "fipsCode": "28",
    "iso2": "82",
    "latitude": 33.2280565,
    "longitude": 10.8903099
  },
  {
    "id": 2561,
    "name": "Kef Governorate",
    "countryId": 224,
    "countryCode": "TN",
    "fipsCode": "14",
    "iso2": "33",
    "latitude": 36.1230512,
    "longitude": 8.6600586
  },
  {
    "id": 2562,
    "name": "Kebili Governorate",
    "countryId": 224,
    "countryCode": "TN",
    "fipsCode": "31",
    "iso2": "73",
    "latitude": 33.7071551,
    "longitude": 8.9714623
  },
  {
    "id": 2563,
    "name": "Siliana Governorate",
    "countryId": 224,
    "countryCode": "TN",
    "fipsCode": "22",
    "iso2": "34",
    "latitude": 36.0887208,
    "longitude": 9.3645335
  },
  {
    "id": 2564,
    "name": "Kairouan Governorate",
    "countryId": 224,
    "countryCode": "TN",
    "fipsCode": "03",
    "iso2": "41",
    "latitude": 35.6711663,
    "longitude": 10.1005469
  },
  {
    "id": 2565,
    "name": "Zaghouan Governorate",
    "countryId": 224,
    "countryCode": "TN",
    "fipsCode": "37",
    "iso2": "22",
    "latitude": 36.4091188,
    "longitude": 10.1423172
  },
  {
    "id": 2566,
    "name": "Ben Arous Governorate",
    "countryId": 224,
    "countryCode": "TN",
    "fipsCode": "27",
    "iso2": "13",
    "latitude": 36.6435606,
    "longitude": 10.2151578
  },
  {
    "id": 2567,
    "name": "Sidi Bouzid Governorate",
    "countryId": 224,
    "countryCode": "TN",
    "fipsCode": "33",
    "iso2": "43",
    "latitude": 35.0354386,
    "longitude": 9.4839392
  },
  {
    "id": 2568,
    "name": "Mahdia Governorate",
    "countryId": 224,
    "countryCode": "TN",
    "fipsCode": "15",
    "iso2": "53",
    "latitude": 35.3352558,
    "longitude": 10.8903099
  },
  {
    "id": 2569,
    "name": "Tozeur Governorate",
    "countryId": 224,
    "countryCode": "TN",
    "fipsCode": "35",
    "iso2": "72",
    "latitude": 33.9789491,
    "longitude": 8.0465185
  },
  {
    "id": 2570,
    "name": "Kasserine Governorate",
    "countryId": 224,
    "countryCode": "TN",
    "fipsCode": "02",
    "iso2": "42",
    "latitude": 35.0809148,
    "longitude": 8.6600586
  },
  {
    "id": 2571,
    "name": "Sousse Governorate",
    "countryId": 224,
    "countryCode": "TN",
    "fipsCode": "23",
    "iso2": "51",
    "latitude": 35.9022267,
    "longitude": 10.3497895
  },
  {
    "id": 2572,
    "name": "Kassrine",
    "countryId": 224,
    "countryCode": "TN",
    "fipsCode": "17",
    "iso2": "31",
    "latitude": 35.1722716,
    "longitude": 8.8307626
  },
  {
    "id": 2573,
    "name": "Ratak Chain",
    "countryId": 137,
    "countryCode": "MH",
    "fipsCode": "17",
    "iso2": "T",
    "latitude": 10.2763276,
    "longitude": 170.5500937
  },
  {
    "id": 2574,
    "name": "Ralik Chain",
    "countryId": 137,
    "countryCode": "MH",
    "fipsCode": "17",
    "iso2": "L",
    "latitude": 8.136146,
    "longitude": 164.8867956
  },
  {
    "id": 2575,
    "name": "Centrale Region",
    "countryId": 220,
    "countryCode": "TG",
    "fipsCode": "22",
    "iso2": "C",
    "latitude": 8.6586029,
    "longitude": 1.0586135
  },
  {
    "id": 2576,
    "name": "Maritime",
    "countryId": 220,
    "countryCode": "TG",
    "fipsCode": "24",
    "iso2": "M",
    "latitude": 41.6551493,
    "longitude": -83.5278467
  },
  {
    "id": 2577,
    "name": "Plateaux Region",
    "countryId": 220,
    "countryCode": "TG",
    "fipsCode": "25",
    "iso2": "P",
    "latitude": 7.6101378,
    "longitude": 1.0586135
  },
  {
    "id": 2578,
    "name": "Savanes Region",
    "countryId": 220,
    "countryCode": "TG",
    "fipsCode": "26",
    "iso2": "S",
    "latitude": 10.5291781,
    "longitude": 0.5257823
  },
  {
    "id": 2579,
    "name": "Kara Region",
    "countryId": 220,
    "countryCode": "TG",
    "fipsCode": "23",
    "iso2": "K",
    "latitude": 9.7216393,
    "longitude": 1.0586135
  },
  {
    "id": 2580,
    "name": "Chuuk State",
    "countryId": 143,
    "countryCode": "FM",
    "fipsCode": "03",
    "iso2": "TRK",
    "latitude": 7.1386759,
    "longitude": 151.5593065
  },
  {
    "id": 2581,
    "name": "Pohnpei State",
    "countryId": 143,
    "countryCode": "FM",
    "fipsCode": "02",
    "iso2": "PNI",
    "latitude": 6.8541254,
    "longitude": 158.2623822
  },
  {
    "id": 2582,
    "name": "Yap State",
    "countryId": 143,
    "countryCode": "FM",
    "fipsCode": "04",
    "iso2": "YAP",
    "latitude": 8.671649,
    "longitude": 142.8439335
  },
  {
    "id": 2583,
    "name": "Kosrae State",
    "countryId": 143,
    "countryCode": "FM",
    "fipsCode": "01",
    "iso2": "KSA",
    "latitude": 5.3095618,
    "longitude": 162.9814877
  },
  {
    "id": 2584,
    "name": "Vaavu Atoll",
    "countryId": 133,
    "countryCode": "MV",
    "fipsCode": "47",
    "iso2": "04",
    "latitude": 3.3955438,
    "longitude": 73.5122928
  },
  {
    "id": 2585,
    "name": "Shaviyani Atoll",
    "countryId": 133,
    "countryCode": "MV",
    "fipsCode": "45",
    "iso2": "24",
    "latitude": 6.17511,
    "longitude": 73.1349605
  },
  {
    "id": 2586,
    "name": "Haa Alif Atoll",
    "countryId": 133,
    "countryCode": "MV",
    "fipsCode": "36",
    "iso2": "07",
    "latitude": 6.9903488,
    "longitude": 72.9460566
  },
  {
    "id": 2587,
    "name": "Alif Alif Atoll",
    "countryId": 133,
    "countryCode": "MV",
    "fipsCode": "36",
    "iso2": "02",
    "latitude": 4.085,
    "longitude": 72.8515479
  },
  {
    "id": 2588,
    "name": "North Province",
    "countryId": 133,
    "countryCode": "MV",
    "fipsCode": "30",
    "iso2": "NO",
    "latitude": 8.8855027,
    "longitude": 80.2767327
  },
  {
    "id": 2589,
    "name": "North Central Province",
    "countryId": 133,
    "countryCode": "MV",
    "fipsCode": "30",
    "iso2": "NC",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 2590,
    "name": "Dhaalu Atoll",
    "countryId": 133,
    "countryCode": "MV",
    "fipsCode": "32",
    "iso2": "17",
    "latitude": 2.8468502,
    "longitude": 72.9460566
  },
  {
    "id": 2591,
    "name": "Thaa Atoll",
    "countryId": 133,
    "countryCode": "MV",
    "fipsCode": "46",
    "iso2": "08",
    "latitude": 2.4311161,
    "longitude": 73.1821623
  },
  {
    "id": 2592,
    "name": "Noonu Atoll",
    "countryId": 133,
    "countryCode": "MV",
    "fipsCode": "43",
    "iso2": "25",
    "latitude": 5.8551276,
    "longitude": 73.323708
  },
  {
    "id": 2593,
    "name": "Upper South Province",
    "countryId": 133,
    "countryCode": "MV",
    "fipsCode": "43",
    "iso2": "US",
    "latitude": 0.2307,
    "longitude": 73.2794846
  },
  {
    "id": 2594,
    "name": "Addu Atoll",
    "countryId": 133,
    "countryCode": "MV",
    "fipsCode": "01",
    "iso2": "01",
    "latitude": -0.6300995,
    "longitude": 73.1585626
  },
  {
    "id": 2595,
    "name": "Gnaviyani Atoll",
    "countryId": 133,
    "countryCode": "MV",
    "fipsCode": "42",
    "iso2": "29",
    "latitude": -0.3006425,
    "longitude": 73.4239143
  },
  {
    "id": 2596,
    "name": "Kaafu Atoll",
    "countryId": 133,
    "countryCode": "MV",
    "fipsCode": "38",
    "iso2": "26",
    "latitude": 4.4558979,
    "longitude": 73.5594128
  },
  {
    "id": 2597,
    "name": "Haa Dhaalu Atoll",
    "countryId": 133,
    "countryCode": "MV",
    "fipsCode": "37",
    "iso2": "23",
    "latitude": 6.5782717,
    "longitude": 72.9460566
  },
  {
    "id": 2598,
    "name": "Gaafu Alif Atoll",
    "countryId": 133,
    "countryCode": "MV",
    "fipsCode": "34",
    "iso2": "27",
    "latitude": 0.6124813,
    "longitude": 73.323708
  },
  {
    "id": 2599,
    "name": "Faafu Atoll",
    "countryId": 133,
    "countryCode": "MV",
    "fipsCode": "33",
    "iso2": "14",
    "latitude": 3.2309409,
    "longitude": 72.9460566
  },
  {
    "id": 2600,
    "name": "Alif Dhaal Atoll",
    "countryId": 133,
    "countryCode": "MV",
    "fipsCode": "33",
    "iso2": "00",
    "latitude": 3.6543302,
    "longitude": 72.8042797
  },
  {
    "id": 2601,
    "name": "Laamu Atoll",
    "countryId": 133,
    "countryCode": "MV",
    "fipsCode": "05",
    "iso2": "05",
    "latitude": 1.9430737,
    "longitude": 73.4180211
  },
  {
    "id": 2602,
    "name": "Raa Atoll",
    "countryId": 133,
    "countryCode": "MV",
    "fipsCode": "44",
    "iso2": "13",
    "latitude": 5.6006457,
    "longitude": 72.9460566
  },
  {
    "id": 2603,
    "name": "Gaafu Dhaalu Atoll",
    "countryId": 133,
    "countryCode": "MV",
    "fipsCode": "35",
    "iso2": "28",
    "latitude": 0.358804,
    "longitude": 73.1821623
  },
  {
    "id": 2604,
    "name": "Central Province",
    "countryId": 133,
    "countryCode": "MV",
    "fipsCode": "35",
    "iso2": "CE",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 2605,
    "name": "South Province",
    "countryId": 133,
    "countryCode": "MV",
    "fipsCode": "10346475",
    "iso2": "SU",
    "latitude": -21.7482006,
    "longitude": 166.1783739
  },
  {
    "id": 2606,
    "name": "South Central Province",
    "countryId": 133,
    "countryCode": "MV",
    "fipsCode": "10346475",
    "iso2": "SC",
    "latitude": 7.2564996,
    "longitude": 80.7214417
  },
  {
    "id": 2607,
    "name": "Lhaviyani Atoll",
    "countryId": 133,
    "countryCode": "MV",
    "fipsCode": "39",
    "iso2": "03",
    "latitude": 5.3747021,
    "longitude": 73.5122928
  },
  {
    "id": 2608,
    "name": "Meemu Atoll",
    "countryId": 133,
    "countryCode": "MV",
    "fipsCode": "41",
    "iso2": "12",
    "latitude": 3.0090345,
    "longitude": 73.5122928
  },
  {
    "id": 2609,
    "name": "Malé",
    "countryId": 133,
    "countryCode": "MV",
    "fipsCode": "40",
    "iso2": "MLE",
    "latitude": 46.3488867,
    "longitude": 10.9072489
  },
  {
    "id": 2610,
    "name": "Utrecht",
    "countryId": 156,
    "countryCode": "NL",
    "fipsCode": "09",
    "iso2": "UT",
    "latitude": 52.0907374,
    "longitude": 5.1214201
  },
  {
    "id": 2611,
    "name": "Gelderland",
    "countryId": 156,
    "countryCode": "NL",
    "fipsCode": "03",
    "iso2": "GE",
    "latitude": 52.045155,
    "longitude": 5.8718235
  },
  {
    "id": 2612,
    "name": "North Holland",
    "countryId": 156,
    "countryCode": "NL",
    "fipsCode": "07",
    "iso2": "NH",
    "latitude": 52.5205869,
    "longitude": 4.788474
  },
  {
    "id": 2613,
    "name": "Drenthe",
    "countryId": 156,
    "countryCode": "NL",
    "fipsCode": "01",
    "iso2": "DR",
    "latitude": 52.9476012,
    "longitude": 6.6230586
  },
  {
    "id": 2614,
    "name": "South Holland",
    "countryId": 156,
    "countryCode": "NL",
    "fipsCode": "11",
    "iso2": "ZH",
    "latitude": 41.6008681,
    "longitude": -87.6069894
  },
  {
    "id": 2615,
    "name": "Limburg",
    "countryId": 156,
    "countryCode": "NL",
    "fipsCode": "05",
    "iso2": "LI",
    "latitude": 51.4427238,
    "longitude": 6.0608726
  },
  {
    "id": 2616,
    "name": "Sint Eustatius",
    "countryId": 156,
    "countryCode": "NL",
    "fipsCode": "05",
    "iso2": "BQ3",
    "latitude": 17.4890306,
    "longitude": -62.973555
  },
  {
    "id": 2617,
    "name": "Groningen",
    "countryId": 156,
    "countryCode": "NL",
    "fipsCode": "04",
    "iso2": "GR",
    "latitude": 53.2193835,
    "longitude": 6.5665017
  },
  {
    "id": 2618,
    "name": "Overijssel",
    "countryId": 156,
    "countryCode": "NL",
    "fipsCode": "15",
    "iso2": "OV",
    "latitude": 52.4387814,
    "longitude": 6.5016411
  },
  {
    "id": 2619,
    "name": "Flevoland",
    "countryId": 156,
    "countryCode": "NL",
    "fipsCode": "16",
    "iso2": "FL",
    "latitude": 52.5279781,
    "longitude": 5.5953508
  },
  {
    "id": 2620,
    "name": "Zeeland",
    "countryId": 156,
    "countryCode": "NL",
    "fipsCode": "10",
    "iso2": "ZE",
    "latitude": 51.4940309,
    "longitude": 3.8496815
  },
  {
    "id": 2621,
    "name": "Saba",
    "countryId": 156,
    "countryCode": "NL",
    "fipsCode": "10",
    "iso2": "BQ2",
    "latitude": 17.6354642,
    "longitude": -63.2326763
  },
  {
    "id": 2622,
    "name": "Friesland",
    "countryId": 156,
    "countryCode": "NL",
    "fipsCode": "02",
    "iso2": "FR",
    "latitude": 53.1641642,
    "longitude": 5.7817542
  },
  {
    "id": 2623,
    "name": "North Brabant",
    "countryId": 156,
    "countryCode": "NL",
    "fipsCode": "06",
    "iso2": "NB",
    "latitude": 51.4826537,
    "longitude": 5.2321687
  },
  {
    "id": 2624,
    "name": "Bonaire",
    "countryId": 156,
    "countryCode": "NL",
    "fipsCode": "06",
    "iso2": "BQ1",
    "latitude": 12.2018902,
    "longitude": -68.2623822
  },
  {
    "id": 2625,
    "name": "Savanes Region",
    "countryId": 54,
    "countryCode": "CI",
    "fipsCode": "87",
    "iso2": "03",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 2626,
    "name": "Agnéby",
    "countryId": 54,
    "countryCode": "CI",
    "fipsCode": "74",
    "iso2": "16",
    "latitude": 5.3224503,
    "longitude": -4.3449529
  },
  {
    "id": 2627,
    "name": "Lagunes District",
    "countryId": 54,
    "countryCode": "CI",
    "fipsCode": "82",
    "iso2": "LG",
    "latitude": 5.8827334,
    "longitude": -4.2333355
  },
  {
    "id": 2628,
    "name": "Sud-Bandama",
    "countryId": 54,
    "countryCode": "CI",
    "fipsCode": "88",
    "iso2": "15",
    "latitude": 5.5357083,
    "longitude": -5.5617279
  },
  {
    "id": 2629,
    "name": "Montagnes District",
    "countryId": 54,
    "countryCode": "CI",
    "fipsCode": "78",
    "iso2": "MG",
    "latitude": 7.3762373,
    "longitude": -7.4381355
  },
  {
    "id": 2630,
    "name": "Moyen-Comoé",
    "countryId": 54,
    "countryCode": "CI",
    "fipsCode": "85",
    "iso2": "05",
    "latitude": 6.6514917,
    "longitude": -3.5003454
  },
  {
    "id": 2631,
    "name": "Marahoué Region",
    "countryId": 54,
    "countryCode": "CI",
    "fipsCode": "83",
    "iso2": "12",
    "latitude": 6.8846207,
    "longitude": -5.8987139
  },
  {
    "id": 2632,
    "name": "Lacs District",
    "countryId": 54,
    "countryCode": "CI",
    "fipsCode": "81",
    "iso2": "LC",
    "latitude": 48.1980169,
    "longitude": -80.4564412
  },
  {
    "id": 2633,
    "name": "Fromager",
    "countryId": 54,
    "countryCode": "CI",
    "fipsCode": "79",
    "iso2": "18",
    "latitude": 45.5450213,
    "longitude": -73.6046223
  },
  {
    "id": 2634,
    "name": "Abidjan",
    "countryId": 54,
    "countryCode": "CI",
    "fipsCode": "93",
    "iso2": "AB",
    "latitude": 5.3599517,
    "longitude": -4.0082563
  },
  {
    "id": 2635,
    "name": "Bas-Sassandra Region",
    "countryId": 54,
    "countryCode": "CI",
    "fipsCode": "76",
    "iso2": "09",
    "latitude": 5.3567916,
    "longitude": -6.7493993
  },
  {
    "id": 2636,
    "name": "Bafing Region",
    "countryId": 54,
    "countryCode": "CI",
    "fipsCode": "75",
    "iso2": "17",
    "latitude": 8.3252047,
    "longitude": -7.5247243
  },
  {
    "id": 2637,
    "name": "Vallée du Bandama District",
    "countryId": 54,
    "countryCode": "CI",
    "fipsCode": "90",
    "iso2": "VB",
    "latitude": 8.278978,
    "longitude": -4.8935627
  },
  {
    "id": 2638,
    "name": "Haut-Sassandra",
    "countryId": 54,
    "countryCode": "CI",
    "fipsCode": "80",
    "iso2": "02",
    "latitude": 6.8757848,
    "longitude": -6.5783387
  },
  {
    "id": 2639,
    "name": "Lagunes region",
    "countryId": 54,
    "countryCode": "CI",
    "fipsCode": "82",
    "iso2": "01",
    "latitude": 5.8827334,
    "longitude": -4.2333355
  },
  {
    "id": 2640,
    "name": "Lacs Region",
    "countryId": 54,
    "countryCode": "CI",
    "fipsCode": "81",
    "iso2": "07",
    "latitude": 47.7395866,
    "longitude": -70.4186652
  },
  {
    "id": 2641,
    "name": "Zanzan Region",
    "countryId": 54,
    "countryCode": "CI",
    "fipsCode": "92",
    "iso2": "ZZ",
    "latitude": 8.8207904,
    "longitude": -3.4195527
  },
  {
    "id": 2642,
    "name": "Denguélé Region",
    "countryId": 54,
    "countryCode": "CI",
    "fipsCode": "77",
    "iso2": "10",
    "latitude": 9.4662372,
    "longitude": -7.4381355
  },
  {
    "id": 2643,
    "name": "Bas-Sassandra District",
    "countryId": 54,
    "countryCode": "CI",
    "fipsCode": "76",
    "iso2": "BS",
    "latitude": 5.2798356,
    "longitude": -6.1526985
  },
  {
    "id": 2644,
    "name": "Denguélé District",
    "countryId": 54,
    "countryCode": "CI",
    "fipsCode": "77",
    "iso2": "DN",
    "latitude": 48.0707763,
    "longitude": -68.5609341
  },
  {
    "id": 2645,
    "name": "Dix-Huit Montagnes",
    "countryId": 54,
    "countryCode": "CI",
    "fipsCode": "78",
    "iso2": "06",
    "latitude": 7.3762373,
    "longitude": -7.4381355
  },
  {
    "id": 2646,
    "name": "Moyen-Cavally",
    "countryId": 54,
    "countryCode": "CI",
    "fipsCode": "84",
    "iso2": "19",
    "latitude": 6.5208793,
    "longitude": -7.6114217
  },
  {
    "id": 2647,
    "name": "Vallée du Bandama Region",
    "countryId": 54,
    "countryCode": "CI",
    "fipsCode": "90",
    "iso2": "04",
    "latitude": 8.278978,
    "longitude": -4.8935627
  },
  {
    "id": 2648,
    "name": "Sassandra-Marahoué District",
    "countryId": 54,
    "countryCode": "CI",
    "fipsCode": "96",
    "iso2": "SM",
    "latitude": 6.8803348,
    "longitude": -6.2375947
  },
  {
    "id": 2649,
    "name": "Worodougou",
    "countryId": 54,
    "countryCode": "CI",
    "fipsCode": "91",
    "iso2": "14",
    "latitude": 8.2548962,
    "longitude": -6.5783387
  },
  {
    "id": 2650,
    "name": "Woroba District",
    "countryId": 54,
    "countryCode": "CI",
    "fipsCode": "97",
    "iso2": "WR",
    "latitude": 8.2491372,
    "longitude": -6.9209135
  },
  {
    "id": 2651,
    "name": "Gôh-Djiboua District",
    "countryId": 54,
    "countryCode": "CI",
    "fipsCode": "95",
    "iso2": "GD",
    "latitude": 5.8711393,
    "longitude": -5.5617279
  },
  {
    "id": 2652,
    "name": "Sud-Comoé",
    "countryId": 54,
    "countryCode": "CI",
    "fipsCode": "89",
    "iso2": "13",
    "latitude": 5.552793,
    "longitude": -3.2583626
  },
  {
    "id": 2653,
    "name": "Yamoussoukro",
    "countryId": 54,
    "countryCode": "CI",
    "fipsCode": "98",
    "iso2": "YM",
    "latitude": 6.8276228,
    "longitude": -5.2893433
  },
  {
    "id": 2654,
    "name": "Comoé District",
    "countryId": 54,
    "countryCode": "CI",
    "fipsCode": "94",
    "iso2": "CM",
    "latitude": 5.552793,
    "longitude": -3.2583626
  },
  {
    "id": 2655,
    "name": "N\"zi-Comoé",
    "countryId": 54,
    "countryCode": "CI",
    "fipsCode": "86",
    "iso2": "11",
    "latitude": 7.2456749,
    "longitude": -4.2333355
  },
  {
    "id": 2656,
    "name": "Far North",
    "countryId": 38,
    "countryCode": "CM",
    "fipsCode": "12",
    "iso2": "EN",
    "latitude": 66.7613451,
    "longitude": 124.123753
  },
  {
    "id": 2657,
    "name": "Northwest",
    "countryId": 38,
    "countryCode": "CM",
    "fipsCode": "07",
    "iso2": "NW",
    "latitude": 36.3711857,
    "longitude": -94.1934606
  },
  {
    "id": 2658,
    "name": "Southwest",
    "countryId": 38,
    "countryCode": "CM",
    "fipsCode": "09",
    "iso2": "SW",
    "latitude": 36.1908813,
    "longitude": -95.8897448
  },
  {
    "id": 2659,
    "name": "South",
    "countryId": 38,
    "countryCode": "CM",
    "fipsCode": "14",
    "iso2": "SU",
    "latitude": 37.631595,
    "longitude": -97.3458409
  },
  {
    "id": 2660,
    "name": "Centre",
    "countryId": 38,
    "countryCode": "CM",
    "fipsCode": "11",
    "iso2": "CE",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 2661,
    "name": "East",
    "countryId": 38,
    "countryCode": "CM",
    "fipsCode": "04",
    "iso2": "ES",
    "latitude": 39.0185336,
    "longitude": -94.2792411
  },
  {
    "id": 2662,
    "name": "Littoral",
    "countryId": 38,
    "countryCode": "CM",
    "fipsCode": "05",
    "iso2": "LT",
    "latitude": 48.4622757,
    "longitude": -68.5178071
  },
  {
    "id": 2663,
    "name": "Adamawa",
    "countryId": 38,
    "countryCode": "CM",
    "fipsCode": "10",
    "iso2": "AD",
    "latitude": 9.3264751,
    "longitude": 12.3983853
  },
  {
    "id": 2664,
    "name": "West",
    "countryId": 38,
    "countryCode": "CM",
    "fipsCode": "08",
    "iso2": "OU",
    "latitude": 37.0364989,
    "longitude": -95.6705987
  },
  {
    "id": 2665,
    "name": "North",
    "countryId": 38,
    "countryCode": "CM",
    "fipsCode": "13",
    "iso2": "NO",
    "latitude": 37.09024,
    "longitude": -95.712891
  },
  {
    "id": 2666,
    "name": "Banjul",
    "countryId": 80,
    "countryCode": "GM",
    "fipsCode": "01",
    "iso2": "B",
    "latitude": 13.4548761,
    "longitude": -16.5790323
  },
  {
    "id": 2667,
    "name": "West Coast Division",
    "countryId": 80,
    "countryCode": "GM",
    "fipsCode": "05",
    "iso2": "W",
    "latitude": 5.9772798,
    "longitude": 116.0754288
  },
  {
    "id": 2668,
    "name": "Upper River Division",
    "countryId": 80,
    "countryCode": "GM",
    "fipsCode": "04",
    "iso2": "U",
    "latitude": 13.4257366,
    "longitude": -14.0072348
  },
  {
    "id": 2669,
    "name": "Central River Division",
    "countryId": 80,
    "countryCode": "GM",
    "fipsCode": "03",
    "iso2": "M",
    "latitude": 13.5994469,
    "longitude": -14.8921668
  },
  {
    "id": 2670,
    "name": "Lower River Division",
    "countryId": 80,
    "countryCode": "GM",
    "fipsCode": "02",
    "iso2": "L",
    "latitude": 13.3553306,
    "longitude": -15.92299
  },
  {
    "id": 2671,
    "name": "North Bank Division",
    "countryId": 80,
    "countryCode": "GM",
    "fipsCode": "07",
    "iso2": "N",
    "latitude": 13.5285436,
    "longitude": -16.0169971
  },
  {
    "id": 2672,
    "name": "Beyla Prefecture",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "01",
    "iso2": "BE",
    "latitude": 8.9198178,
    "longitude": -8.3088441
  },
  {
    "id": 2673,
    "name": "Mandiana Prefecture",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "37",
    "iso2": "MD",
    "latitude": 10.6172827,
    "longitude": -8.6985716
  },
  {
    "id": 2674,
    "name": "Yomou Prefecture",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "29",
    "iso2": "YO",
    "latitude": 7.5696279,
    "longitude": -9.2591571
  },
  {
    "id": 2675,
    "name": "Fria Prefecture",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "11",
    "iso2": "FR",
    "latitude": 10.3674543,
    "longitude": -13.5841871
  },
  {
    "id": 2676,
    "name": "Boké Region",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "B",
    "iso2": "B",
    "latitude": 11.1864672,
    "longitude": -14.1001326
  },
  {
    "id": 2677,
    "name": "Labé Region",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "L",
    "iso2": "L",
    "latitude": 11.3232042,
    "longitude": -12.2891314
  },
  {
    "id": 2678,
    "name": "Nzérékoré Prefecture",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "24",
    "iso2": "NZ",
    "latitude": 7.7478359,
    "longitude": -8.8252502
  },
  {
    "id": 2679,
    "name": "Dabola Prefecture",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "05",
    "iso2": "DB",
    "latitude": 10.7297806,
    "longitude": -11.1107854
  },
  {
    "id": 2680,
    "name": "Labé Prefecture",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "20",
    "iso2": "LA",
    "latitude": 11.3541939,
    "longitude": -12.3463875
  },
  {
    "id": 2681,
    "name": "Dubréka Prefecture",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "08",
    "iso2": "DU",
    "latitude": 9.7907348,
    "longitude": -13.5147735
  },
  {
    "id": 2682,
    "name": "Faranah Prefecture",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "09",
    "iso2": "FA",
    "latitude": 9.9057399,
    "longitude": -10.8000051
  },
  {
    "id": 2683,
    "name": "Forécariah Prefecture",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "10",
    "iso2": "FO",
    "latitude": 9.3886187,
    "longitude": -13.0817903
  },
  {
    "id": 2684,
    "name": "Nzérékoré Region",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "N",
    "iso2": "N",
    "latitude": 8.038587,
    "longitude": -8.8362755
  },
  {
    "id": 2685,
    "name": "Gaoual Prefecture",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "12",
    "iso2": "GA",
    "latitude": 11.5762804,
    "longitude": -13.3587288
  },
  {
    "id": 2686,
    "name": "Conakry",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "04",
    "iso2": "C",
    "latitude": 9.6411855,
    "longitude": -13.5784012
  },
  {
    "id": 2687,
    "name": "Télimélé Prefecture",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "27",
    "iso2": "TE",
    "latitude": 10.9089364,
    "longitude": -13.0299331
  },
  {
    "id": 2688,
    "name": "Dinguiraye Prefecture",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "07",
    "iso2": "DI",
    "latitude": 11.6844222,
    "longitude": -10.8000051
  },
  {
    "id": 2689,
    "name": "Mamou Prefecture",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "23",
    "iso2": "MM",
    "latitude": 10.5736024,
    "longitude": -11.8891721
  },
  {
    "id": 2690,
    "name": "Lélouma Prefecture",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "35",
    "iso2": "LE",
    "latitude": 11.183333,
    "longitude": -12.933333
  },
  {
    "id": 2691,
    "name": "Kissidougou Prefecture",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "17",
    "iso2": "KS",
    "latitude": 9.2252022,
    "longitude": -10.0807298
  },
  {
    "id": 2692,
    "name": "Koubia Prefecture",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "33",
    "iso2": "KB",
    "latitude": 11.582354,
    "longitude": -11.8920237
  },
  {
    "id": 2693,
    "name": "Kindia Prefecture",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "16",
    "iso2": "KD",
    "latitude": 10.1013292,
    "longitude": -12.7135121
  },
  {
    "id": 2694,
    "name": "Pita Prefecture",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "25",
    "iso2": "PI",
    "latitude": 10.8062086,
    "longitude": -12.7135121
  },
  {
    "id": 2695,
    "name": "Kouroussa Prefecture",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "19",
    "iso2": "KO",
    "latitude": 10.6489229,
    "longitude": -9.8850586
  },
  {
    "id": 2696,
    "name": "Tougué Prefecture",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "28",
    "iso2": "TO",
    "latitude": 11.3841583,
    "longitude": -11.6157773
  },
  {
    "id": 2697,
    "name": "Kankan Region",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "K",
    "iso2": "K",
    "latitude": 10.120923,
    "longitude": -9.5450974
  },
  {
    "id": 2698,
    "name": "Mamou Region",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "M",
    "iso2": "M",
    "latitude": 10.5736024,
    "longitude": -11.8891721
  },
  {
    "id": 2699,
    "name": "Boffa Prefecture",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "02",
    "iso2": "BF",
    "latitude": 10.1808254,
    "longitude": -14.0391615
  },
  {
    "id": 2700,
    "name": "Mali Prefecture",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "22",
    "iso2": "ML",
    "latitude": 11.983709,
    "longitude": -12.2547919
  },
  {
    "id": 2701,
    "name": "Kindia Region",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "D",
    "iso2": "D",
    "latitude": 10.1781694,
    "longitude": -12.989615
  },
  {
    "id": 2702,
    "name": "Macenta Prefecture",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "21",
    "iso2": "MC",
    "latitude": 8.4615795,
    "longitude": -9.2785583
  },
  {
    "id": 2703,
    "name": "Koundara Prefecture",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "18",
    "iso2": "KN",
    "latitude": 12.4894021,
    "longitude": -13.3067562
  },
  {
    "id": 2704,
    "name": "Kankan Prefecture",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "14",
    "iso2": "KA",
    "latitude": 10.3034465,
    "longitude": -9.3673084
  },
  {
    "id": 2705,
    "name": "Coyah Prefecture",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "30",
    "iso2": "CO",
    "latitude": 9.7715535,
    "longitude": -13.3125299
  },
  {
    "id": 2706,
    "name": "Dalaba Prefecture",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "06",
    "iso2": "DL",
    "latitude": 10.6868176,
    "longitude": -12.2490697
  },
  {
    "id": 2707,
    "name": "Siguiri Prefecture",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "26",
    "iso2": "SI",
    "latitude": 11.4148113,
    "longitude": -9.1788304
  },
  {
    "id": 2708,
    "name": "Lola Prefecture",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "36",
    "iso2": "LO",
    "latitude": 7.9613818,
    "longitude": -8.3964938
  },
  {
    "id": 2709,
    "name": "Boké Prefecture",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "03",
    "iso2": "BK",
    "latitude": 11.0847379,
    "longitude": -14.3791912
  },
  {
    "id": 2710,
    "name": "Kérouané Prefecture",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "15",
    "iso2": "KE",
    "latitude": 9.2536643,
    "longitude": -9.0128926
  },
  {
    "id": 2711,
    "name": "Guéckédou Prefecture",
    "countryId": 92,
    "countryCode": "GN",
    "fipsCode": "13",
    "iso2": "GU",
    "latitude": 8.5649688,
    "longitude": -10.1311163
  },
  {
    "id": 2712,
    "name": "Tombali Region",
    "countryId": 93,
    "countryCode": "GW",
    "fipsCode": "07",
    "iso2": "TO",
    "latitude": 11.3632696,
    "longitude": -14.9856176
  },
  {
    "id": 2713,
    "name": "Cacheu Region",
    "countryId": 93,
    "countryCode": "GW",
    "fipsCode": "06",
    "iso2": "CA",
    "latitude": 12.0551416,
    "longitude": -16.0640179
  },
  {
    "id": 2714,
    "name": "Biombo Region",
    "countryId": 93,
    "countryCode": "GW",
    "fipsCode": "12",
    "iso2": "BM",
    "latitude": 11.8529061,
    "longitude": -15.7351171
  },
  {
    "id": 2715,
    "name": "Quinara Region",
    "countryId": 93,
    "countryCode": "GW",
    "fipsCode": "02",
    "iso2": "QU",
    "latitude": 11.795562,
    "longitude": -15.1726816
  },
  {
    "id": 2716,
    "name": "Sul Province",
    "countryId": 93,
    "countryCode": "GW",
    "fipsCode": "02",
    "iso2": "S",
    "latitude": -10.2866578,
    "longitude": 20.7122465
  },
  {
    "id": 2717,
    "name": "Norte Province",
    "countryId": 93,
    "countryCode": "GW",
    "fipsCode": "02",
    "iso2": "N",
    "latitude": 7.8721811,
    "longitude": 123.8857747
  },
  {
    "id": 2718,
    "name": "Oio Region",
    "countryId": 93,
    "countryCode": "GW",
    "fipsCode": "04",
    "iso2": "OI",
    "latitude": 12.2760709,
    "longitude": -15.3131185
  },
  {
    "id": 2719,
    "name": "Gabú Region",
    "countryId": 93,
    "countryCode": "GW",
    "fipsCode": "10",
    "iso2": "GA",
    "latitude": 11.8962488,
    "longitude": -14.1001326
  },
  {
    "id": 2720,
    "name": "Bafatá",
    "countryId": 93,
    "countryCode": "GW",
    "fipsCode": "01",
    "iso2": "BA",
    "latitude": 12.1735243,
    "longitude": -14.652952
  },
  {
    "id": 2721,
    "name": "Leste Province",
    "countryId": 93,
    "countryCode": "GW",
    "fipsCode": "01",
    "iso2": "L",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 2722,
    "name": "Bolama Region",
    "countryId": 93,
    "countryCode": "GW",
    "fipsCode": "05",
    "iso2": "BL",
    "latitude": 11.1480591,
    "longitude": -16.1345705
  },
  {
    "id": 2723,
    "name": "Woleu-Ntem Province",
    "countryId": 79,
    "countryCode": "GA",
    "fipsCode": "09",
    "iso2": "9",
    "latitude": 2.2989827,
    "longitude": 11.4466914
  },
  {
    "id": 2724,
    "name": "Ogooué-Ivindo Province",
    "countryId": 79,
    "countryCode": "GA",
    "fipsCode": "06",
    "iso2": "6",
    "latitude": 0.8818311,
    "longitude": 13.1740348
  },
  {
    "id": 2725,
    "name": "Nyanga Province",
    "countryId": 79,
    "countryCode": "GA",
    "fipsCode": "05",
    "iso2": "5",
    "latitude": -2.8821033,
    "longitude": 11.1617356
  },
  {
    "id": 2726,
    "name": "Haut-Ogooué Province",
    "countryId": 79,
    "countryCode": "GA",
    "fipsCode": "02",
    "iso2": "2",
    "latitude": -1.4762544,
    "longitude": 13.914399
  },
  {
    "id": 2727,
    "name": "Estuaire Province",
    "countryId": 79,
    "countryCode": "GA",
    "fipsCode": "01",
    "iso2": "1",
    "latitude": 0.4432864,
    "longitude": 10.0807298
  },
  {
    "id": 2728,
    "name": "Ogooué-Maritime Province",
    "countryId": 79,
    "countryCode": "GA",
    "fipsCode": "08",
    "iso2": "8",
    "latitude": -1.3465975,
    "longitude": 9.7232673
  },
  {
    "id": 2729,
    "name": "Ogooué-Lolo Province",
    "countryId": 79,
    "countryCode": "GA",
    "fipsCode": "07",
    "iso2": "7",
    "latitude": -0.8844093,
    "longitude": 12.4380581
  },
  {
    "id": 2730,
    "name": "Moyen-Ogooué Province",
    "countryId": 79,
    "countryCode": "GA",
    "fipsCode": "03",
    "iso2": "3",
    "latitude": -0.442784,
    "longitude": 10.439656
  },
  {
    "id": 2731,
    "name": "Ngounié Province",
    "countryId": 79,
    "countryCode": "GA",
    "fipsCode": "04",
    "iso2": "4",
    "latitude": -1.4930303,
    "longitude": 10.9807003
  },
  {
    "id": 2732,
    "name": "Tshuapa District",
    "countryId": 51,
    "countryCode": "CD",
    "fipsCode": "31",
    "iso2": "TU",
    "latitude": -0.9903023,
    "longitude": 23.0288844
  },
  {
    "id": 2733,
    "name": "Tanganyika Province",
    "countryId": 51,
    "countryCode": "CD",
    "fipsCode": "29",
    "iso2": "TA",
    "latitude": -6.2740118,
    "longitude": 27.9249002
  },
  {
    "id": 2734,
    "name": "Haut-Uele",
    "countryId": 51,
    "countryCode": "CD",
    "fipsCode": "16",
    "iso2": "HU",
    "latitude": 3.5845154,
    "longitude": 28.299435
  },
  {
    "id": 2735,
    "name": "Kasaï-Oriental",
    "countryId": 51,
    "countryCode": "CD",
    "fipsCode": "04",
    "iso2": "KE",
    "latitude": -6.033623,
    "longitude": 23.5728501
  },
  {
    "id": 2736,
    "name": "Orientale Province",
    "countryId": 51,
    "countryCode": "CD",
    "fipsCode": "09",
    "iso2": "OR",
    "latitude": 1.6406296,
    "longitude": 26.419389
  },
  {
    "id": 2737,
    "name": "Kasaï-Occidental",
    "countryId": 51,
    "countryCode": "CD",
    "fipsCode": "03",
    "iso2": "KW",
    "latitude": -5.3205473,
    "longitude": 21.8568586
  },
  {
    "id": 2738,
    "name": "South Kivu",
    "countryId": 51,
    "countryCode": "CD",
    "fipsCode": "12",
    "iso2": "SK",
    "latitude": -3.011658,
    "longitude": 28.299435
  },
  {
    "id": 2739,
    "name": "Nord-Ubangi District",
    "countryId": 51,
    "countryCode": "CD",
    "fipsCode": "26",
    "iso2": "NU",
    "latitude": 3.7878726,
    "longitude": 21.4752851
  },
  {
    "id": 2740,
    "name": "Kwango District",
    "countryId": 51,
    "countryCode": "CD",
    "fipsCode": "19",
    "iso2": "KG",
    "latitude": -6.4337409,
    "longitude": 17.668887
  },
  {
    "id": 2741,
    "name": "Kinshasa",
    "countryId": 51,
    "countryCode": "CD",
    "fipsCode": "06",
    "iso2": "KN",
    "latitude": -4.4419311,
    "longitude": 15.2662931
  },
  {
    "id": 2742,
    "name": "Katanga Province",
    "countryId": 51,
    "countryCode": "CD",
    "fipsCode": "05",
    "iso2": "KA",
    "latitude": -8.8851145,
    "longitude": 26.419389
  },
  {
    "id": 2743,
    "name": "Sankuru District",
    "countryId": 51,
    "countryCode": "CD",
    "fipsCode": "27",
    "iso2": "SA",
    "latitude": -2.8437453,
    "longitude": 23.3823545
  },
  {
    "id": 2744,
    "name": "Équateur",
    "countryId": 51,
    "countryCode": "CD",
    "fipsCode": "02",
    "iso2": "EQ",
    "latitude": -1.831239,
    "longitude": -78.183406
  },
  {
    "id": 2745,
    "name": "Maniema",
    "countryId": 51,
    "countryCode": "CD",
    "fipsCode": "10",
    "iso2": "MA",
    "latitude": -3.0730929,
    "longitude": 26.0413889
  },
  {
    "id": 2746,
    "name": "Bas-Congo province",
    "countryId": 51,
    "countryCode": "CD",
    "fipsCode": "08",
    "iso2": "BC",
    "latitude": -5.2365685,
    "longitude": 13.914399
  },
  {
    "id": 2747,
    "name": "Lomami Province",
    "countryId": 51,
    "countryCode": "CD",
    "fipsCode": "21",
    "iso2": "LO",
    "latitude": -6.1453931,
    "longitude": 24.524264
  },
  {
    "id": 2748,
    "name": "Sud-Ubangi",
    "countryId": 51,
    "countryCode": "CD",
    "fipsCode": "28",
    "iso2": "SU",
    "latitude": 3.2299942,
    "longitude": 19.1880047
  },
  {
    "id": 2749,
    "name": "North Kivu",
    "countryId": 51,
    "countryCode": "CD",
    "fipsCode": "11",
    "iso2": "NK",
    "latitude": -0.7917729,
    "longitude": 29.0459927
  },
  {
    "id": 2750,
    "name": "Haut-Katanga Province",
    "countryId": 51,
    "countryCode": "CD",
    "fipsCode": "14",
    "iso2": "HK",
    "latitude": -10.4102075,
    "longitude": 27.5495846
  },
  {
    "id": 2751,
    "name": "Ituri Interim Administration",
    "countryId": 51,
    "countryCode": "CD",
    "fipsCode": "17",
    "iso2": "IT",
    "latitude": 1.5957682,
    "longitude": 29.4179324
  },
  {
    "id": 2752,
    "name": "Mongala District",
    "countryId": 51,
    "countryCode": "CD",
    "fipsCode": "25",
    "iso2": "MO",
    "latitude": 1.9962324,
    "longitude": 21.4752851
  },
  {
    "id": 2753,
    "name": "Bas-Uele",
    "countryId": 51,
    "countryCode": "CD",
    "fipsCode": "13",
    "iso2": "BU",
    "latitude": 3.9901009,
    "longitude": 24.9042208
  },
  {
    "id": 2754,
    "name": "Bandundu Province",
    "countryId": 51,
    "countryCode": "CD",
    "fipsCode": "01",
    "iso2": "BN",
    "latitude": -4.163679,
    "longitude": 18.8076195
  },
  {
    "id": 2755,
    "name": "Mai-Ndombe Province",
    "countryId": 51,
    "countryCode": "CD",
    "fipsCode": "24",
    "iso2": "MN",
    "latitude": -2.6357434,
    "longitude": 18.4276047
  },
  {
    "id": 2756,
    "name": "Tshopo District",
    "countryId": 51,
    "countryCode": "CD",
    "fipsCode": "30",
    "iso2": "TO",
    "latitude": 0.5455462,
    "longitude": 24.9042208
  },
  {
    "id": 2757,
    "name": "Kasaï District",
    "countryId": 51,
    "countryCode": "CD",
    "fipsCode": "18",
    "iso2": "KS",
    "latitude": -5.0471979,
    "longitude": 20.7122465
  },
  {
    "id": 2758,
    "name": "Haut-Lomami District",
    "countryId": 51,
    "countryCode": "CD",
    "fipsCode": "15",
    "iso2": "HL",
    "latitude": -7.7052752,
    "longitude": 24.9042208
  },
  {
    "id": 2759,
    "name": "Kwilu District",
    "countryId": 51,
    "countryCode": "CD",
    "fipsCode": "20",
    "iso2": "KL",
    "latitude": -5.1188825,
    "longitude": 18.4276047
  },
  {
    "id": 2760,
    "name": "Cuyuni-Mazaruni",
    "countryId": 94,
    "countryCode": "GY",
    "fipsCode": "11",
    "iso2": "CU",
    "latitude": 6.4642141,
    "longitude": -60.2110752
  },
  {
    "id": 2761,
    "name": "Potaro-Siparuni",
    "countryId": 94,
    "countryCode": "GY",
    "fipsCode": "17",
    "iso2": "PT",
    "latitude": 4.7855853,
    "longitude": -59.2879977
  },
  {
    "id": 2762,
    "name": "Mahaica-Berbice",
    "countryId": 94,
    "countryCode": "GY",
    "fipsCode": "15",
    "iso2": "MA",
    "latitude": 6.238496,
    "longitude": -57.9162555
  },
  {
    "id": 2763,
    "name": "Upper Demerara-Berbice",
    "countryId": 94,
    "countryCode": "GY",
    "fipsCode": "18",
    "iso2": "UD",
    "latitude": 5.3064879,
    "longitude": -58.1892921
  },
  {
    "id": 2764,
    "name": "Barima-Waini",
    "countryId": 94,
    "countryCode": "GY",
    "fipsCode": "10",
    "iso2": "BA",
    "latitude": 7.4882419,
    "longitude": -59.6564494
  },
  {
    "id": 2765,
    "name": "Pomeroon-Supenaam",
    "countryId": 94,
    "countryCode": "GY",
    "fipsCode": "16",
    "iso2": "PM",
    "latitude": 7.1294166,
    "longitude": -58.9206295
  },
  {
    "id": 2766,
    "name": "East Berbice-Corentyne",
    "countryId": 94,
    "countryCode": "GY",
    "fipsCode": "13",
    "iso2": "EB",
    "latitude": 2.7477922,
    "longitude": -57.4627259
  },
  {
    "id": 2767,
    "name": "Demerara-Mahaica",
    "countryId": 94,
    "countryCode": "GY",
    "fipsCode": "12",
    "iso2": "DE",
    "latitude": 6.546426,
    "longitude": -58.0982046
  },
  {
    "id": 2768,
    "name": "Essequibo Islands-West Demerara",
    "countryId": 94,
    "countryCode": "GY",
    "fipsCode": "14",
    "iso2": "ES",
    "latitude": 6.5720132,
    "longitude": -58.4629997
  },
  {
    "id": 2769,
    "name": "Upper Takutu-Upper Essequibo",
    "countryId": 94,
    "countryCode": "GY",
    "fipsCode": "19",
    "iso2": "UT",
    "latitude": 2.9239595,
    "longitude": -58.7373634
  },
  {
    "id": 2770,
    "name": "Presidente Hayes Department",
    "countryId": 172,
    "countryCode": "PY",
    "fipsCode": "16",
    "iso2": "15",
    "latitude": -23.3512605,
    "longitude": -58.7373634
  },
  {
    "id": 2771,
    "name": "Canindeyú",
    "countryId": 172,
    "countryCode": "PY",
    "fipsCode": "19",
    "iso2": "14",
    "latitude": -24.1378735,
    "longitude": -55.6689636
  },
  {
    "id": 2772,
    "name": "Guairá Department",
    "countryId": 172,
    "countryCode": "PY",
    "fipsCode": "10",
    "iso2": "4",
    "latitude": -25.8810932,
    "longitude": -56.2929381
  },
  {
    "id": 2773,
    "name": "Caaguazú",
    "countryId": 172,
    "countryCode": "PY",
    "fipsCode": "04",
    "iso2": "5",
    "latitude": -25.4645818,
    "longitude": -56.013851
  },
  {
    "id": 2774,
    "name": "Paraguarí Department",
    "countryId": 172,
    "countryCode": "PY",
    "fipsCode": "15",
    "iso2": "9",
    "latitude": -25.6262174,
    "longitude": -57.1520642
  },
  {
    "id": 2775,
    "name": "Caazapá",
    "countryId": 172,
    "countryCode": "PY",
    "fipsCode": "05",
    "iso2": "6",
    "latitude": -26.1827713,
    "longitude": -56.3712327
  },
  {
    "id": 2776,
    "name": "San Pedro Department",
    "countryId": 172,
    "countryCode": "PY",
    "fipsCode": "17",
    "iso2": "2",
    "latitude": -24.1948668,
    "longitude": -56.561647
  },
  {
    "id": 2777,
    "name": "Central Department",
    "countryId": 172,
    "countryCode": "PY",
    "fipsCode": "06",
    "iso2": "11",
    "latitude": 36.1559229,
    "longitude": -95.9662075
  },
  {
    "id": 2778,
    "name": "Itapúa",
    "countryId": 172,
    "countryCode": "PY",
    "fipsCode": "11",
    "iso2": "7",
    "latitude": -26.7923623,
    "longitude": -55.6689636
  },
  {
    "id": 2779,
    "name": "Concepción Department",
    "countryId": 172,
    "countryCode": "PY",
    "fipsCode": "07",
    "iso2": "1",
    "latitude": -23.4214264,
    "longitude": -57.4344451
  },
  {
    "id": 2780,
    "name": "Boquerón Department",
    "countryId": 172,
    "countryCode": "PY",
    "fipsCode": "24",
    "iso2": "19",
    "latitude": -21.7449254,
    "longitude": -60.9540073
  },
  {
    "id": 2781,
    "name": "Ñeembucú Department",
    "countryId": 172,
    "countryCode": "PY",
    "fipsCode": "13",
    "iso2": "12",
    "latitude": -27.0299114,
    "longitude": -57.825395
  },
  {
    "id": 2782,
    "name": "Amambay Department",
    "countryId": 172,
    "countryCode": "PY",
    "fipsCode": "02",
    "iso2": "13",
    "latitude": -22.5590272,
    "longitude": -56.0249982
  },
  {
    "id": 2783,
    "name": "Cordillera Department",
    "countryId": 172,
    "countryCode": "PY",
    "fipsCode": "08",
    "iso2": "3",
    "latitude": -25.2289491,
    "longitude": -57.0111681
  },
  {
    "id": 2784,
    "name": "Alto Paraná Department",
    "countryId": 172,
    "countryCode": "PY",
    "fipsCode": "01",
    "iso2": "10",
    "latitude": -25.6075546,
    "longitude": -54.9611836
  },
  {
    "id": 2785,
    "name": "Alto Paraguay Department",
    "countryId": 172,
    "countryCode": "PY",
    "fipsCode": "23",
    "iso2": "16",
    "latitude": -20.0852508,
    "longitude": -59.4720904
  },
  {
    "id": 2786,
    "name": "Misiones Department",
    "countryId": 172,
    "countryCode": "PY",
    "fipsCode": "12",
    "iso2": "8",
    "latitude": -26.8433512,
    "longitude": -57.1013188
  },
  {
    "id": 2787,
    "name": "Jaffna District",
    "countryId": 208,
    "countryCode": "LK",
    "fipsCode": "25",
    "iso2": "41",
    "latitude": 9.6930468,
    "longitude": 80.1651854
  },
  {
    "id": 2788,
    "name": "Kandy District",
    "countryId": 208,
    "countryCode": "LK",
    "fipsCode": "10",
    "iso2": "21",
    "latitude": 7.2931588,
    "longitude": 80.6350107
  },
  {
    "id": 2789,
    "name": "Kalutara District",
    "countryId": 208,
    "countryCode": "LK",
    "fipsCode": "09",
    "iso2": "13",
    "latitude": 6.6084686,
    "longitude": 80.1428584
  },
  {
    "id": 2790,
    "name": "Badulla District",
    "countryId": 208,
    "countryCode": "LK",
    "fipsCode": "03",
    "iso2": "81",
    "latitude": 6.9934009,
    "longitude": 81.0549815
  },
  {
    "id": 2791,
    "name": "Hambantota District",
    "countryId": 208,
    "countryCode": "LK",
    "fipsCode": "07",
    "iso2": "33",
    "latitude": 6.1535816,
    "longitude": 81.127149
  },
  {
    "id": 2792,
    "name": "Galle District",
    "countryId": 208,
    "countryCode": "LK",
    "fipsCode": "06",
    "iso2": "31",
    "latitude": 6.057749,
    "longitude": 80.2175572
  },
  {
    "id": 2793,
    "name": "Kilinochchi District",
    "countryId": 208,
    "countryCode": "LK",
    "fipsCode": "06",
    "iso2": "42",
    "latitude": 9.3677971,
    "longitude": 80.3213106
  },
  {
    "id": 2794,
    "name": "Nuwara Eliya District",
    "countryId": 208,
    "countryCode": "LK",
    "fipsCode": "17",
    "iso2": "23",
    "latitude": 6.9606532,
    "longitude": 80.7692758
  },
  {
    "id": 2795,
    "name": "Trincomalee District",
    "countryId": 208,
    "countryCode": "LK",
    "fipsCode": "21",
    "iso2": "53",
    "latitude": 8.6013069,
    "longitude": 81.1196075
  },
  {
    "id": 2796,
    "name": "Puttalam District",
    "countryId": 208,
    "countryCode": "LK",
    "fipsCode": "19",
    "iso2": "62",
    "latitude": 8.0259915,
    "longitude": 79.8471272
  },
  {
    "id": 2797,
    "name": "Kegalle District",
    "countryId": 208,
    "countryCode": "LK",
    "fipsCode": "11",
    "iso2": "92",
    "latitude": 7.1204053,
    "longitude": 80.3213106
  },
  {
    "id": 2798,
    "name": "Central Province",
    "countryId": 208,
    "countryCode": "LK",
    "fipsCode": "29",
    "iso2": "2",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 2799,
    "name": "Ampara District",
    "countryId": 208,
    "countryCode": "LK",
    "fipsCode": "01",
    "iso2": "52",
    "latitude": 7.2911685,
    "longitude": 81.6723761
  },
  {
    "id": 2800,
    "name": "North Central Province",
    "countryId": 208,
    "countryCode": "LK",
    "fipsCode": "30",
    "iso2": "7",
    "latitude": 8.1995638,
    "longitude": 80.6326916
  },
  {
    "id": 2801,
    "name": "Southern Province",
    "countryId": 208,
    "countryCode": "LK",
    "fipsCode": "34",
    "iso2": "3",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 2802,
    "name": "Western Province",
    "countryId": 208,
    "countryCode": "LK",
    "fipsCode": "36",
    "iso2": "1",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 2803,
    "name": "Sabaragamuwa Province",
    "countryId": 208,
    "countryCode": "LK",
    "fipsCode": "33",
    "iso2": "9",
    "latitude": 6.7395941,
    "longitude": 80.365865
  },
  {
    "id": 2804,
    "name": "Gampaha District",
    "countryId": 208,
    "countryCode": "LK",
    "fipsCode": "24",
    "iso2": "12",
    "latitude": 7.0712619,
    "longitude": 80.0087746
  },
  {
    "id": 2805,
    "name": "Mannar District",
    "countryId": 208,
    "countryCode": "LK",
    "fipsCode": "26",
    "iso2": "43",
    "latitude": 8.9809531,
    "longitude": 79.9043975
  },
  {
    "id": 2806,
    "name": "Matara District",
    "countryId": 208,
    "countryCode": "LK",
    "fipsCode": "15",
    "iso2": "32",
    "latitude": 5.9449348,
    "longitude": 80.5487997
  },
  {
    "id": 2807,
    "name": "Ratnapura district",
    "countryId": 208,
    "countryCode": "LK",
    "fipsCode": "20",
    "iso2": "91",
    "latitude": 6.7055168,
    "longitude": 80.3848389
  },
  {
    "id": 2808,
    "name": "Eastern Province",
    "countryId": 208,
    "countryCode": "LK",
    "fipsCode": "37",
    "iso2": "5",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 2809,
    "name": "Vavuniya District",
    "countryId": 208,
    "countryCode": "LK",
    "fipsCode": "28",
    "iso2": "44",
    "latitude": 8.7594739,
    "longitude": 80.5000334
  },
  {
    "id": 2810,
    "name": "Matale District",
    "countryId": 208,
    "countryCode": "LK",
    "fipsCode": "14",
    "iso2": "22",
    "latitude": 7.4659646,
    "longitude": 80.6234259
  },
  {
    "id": 2811,
    "name": "Uva Province",
    "countryId": 208,
    "countryCode": "LK",
    "fipsCode": "35",
    "iso2": "8",
    "latitude": 6.8427612,
    "longitude": 81.3399414
  },
  {
    "id": 2812,
    "name": "Polonnaruwa District",
    "countryId": 208,
    "countryCode": "LK",
    "fipsCode": "18",
    "iso2": "72",
    "latitude": 7.9395567,
    "longitude": 81.0003403
  },
  {
    "id": 2813,
    "name": "Northern Province",
    "countryId": 208,
    "countryCode": "LK",
    "fipsCode": "38",
    "iso2": "4",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 2814,
    "name": "Mullaitivu District",
    "countryId": 208,
    "countryCode": "LK",
    "fipsCode": "27",
    "iso2": "45",
    "latitude": 9.2675388,
    "longitude": 80.8128254
  },
  {
    "id": 2815,
    "name": "Colombo District",
    "countryId": 208,
    "countryCode": "LK",
    "fipsCode": "23",
    "iso2": "11",
    "latitude": 6.9269557,
    "longitude": 79.8617306
  },
  {
    "id": 2816,
    "name": "Anuradhapura District",
    "countryId": 208,
    "countryCode": "LK",
    "fipsCode": "02",
    "iso2": "71",
    "latitude": 8.3318305,
    "longitude": 80.4029017
  },
  {
    "id": 2817,
    "name": "North Western Province",
    "countryId": 208,
    "countryCode": "LK",
    "fipsCode": "32",
    "iso2": "6",
    "latitude": 7.7584091,
    "longitude": 80.1875065
  },
  {
    "id": 2818,
    "name": "Batticaloa District",
    "countryId": 208,
    "countryCode": "LK",
    "fipsCode": "04",
    "iso2": "51",
    "latitude": 7.8292781,
    "longitude": 81.4718387
  },
  {
    "id": 2819,
    "name": "Monaragala District",
    "countryId": 208,
    "countryCode": "LK",
    "fipsCode": "16",
    "iso2": "82",
    "latitude": 6.8727781,
    "longitude": 81.3506832
  },
  {
    "id": 2820,
    "name": "Mohéli",
    "countryId": 49,
    "countryCode": "KM",
    "fipsCode": "03",
    "iso2": "M",
    "latitude": -12.3377376,
    "longitude": 43.7334089
  },
  {
    "id": 2821,
    "name": "Anjouan",
    "countryId": 49,
    "countryCode": "KM",
    "fipsCode": "01",
    "iso2": "A",
    "latitude": -12.2138145,
    "longitude": 44.4370606
  },
  {
    "id": 2822,
    "name": "Grande Comore",
    "countryId": 49,
    "countryCode": "KM",
    "fipsCode": "02",
    "iso2": "G",
    "latitude": -11.7167338,
    "longitude": 43.3680788
  },
  {
    "id": 2823,
    "name": "Atacama Region",
    "countryId": 44,
    "countryCode": "CL",
    "fipsCode": "05",
    "iso2": "AT",
    "latitude": -27.5660558,
    "longitude": -70.050314
  },
  {
    "id": 2824,
    "name": "Santiago Metropolitan Region",
    "countryId": 44,
    "countryCode": "CL",
    "fipsCode": "12",
    "iso2": "RM",
    "latitude": -33.4375545,
    "longitude": -70.6504896
  },
  {
    "id": 2825,
    "name": "Coquimbo Region",
    "countryId": 44,
    "countryCode": "CL",
    "fipsCode": "07",
    "iso2": "CO",
    "latitude": -30.540181,
    "longitude": -70.8119953
  },
  {
    "id": 2826,
    "name": "Araucanía Region",
    "countryId": 44,
    "countryCode": "CL",
    "fipsCode": "04",
    "iso2": "AR",
    "latitude": -38.948921,
    "longitude": -72.331113
  },
  {
    "id": 2827,
    "name": "Bío Bío Region",
    "countryId": 44,
    "countryCode": "CL",
    "fipsCode": "06",
    "iso2": "BI",
    "latitude": -37.4464428,
    "longitude": -72.1416132
  },
  {
    "id": 2828,
    "name": "Aysén Region",
    "countryId": 44,
    "countryCode": "CL",
    "fipsCode": "02",
    "iso2": "AI",
    "latitude": -46.378345,
    "longitude": -72.3007623
  },
  {
    "id": 2829,
    "name": "Arica y Parinacota Region",
    "countryId": 44,
    "countryCode": "CL",
    "fipsCode": "16",
    "iso2": "AP",
    "latitude": -18.5940485,
    "longitude": -69.4784541
  },
  {
    "id": 2830,
    "name": "Valparaíso",
    "countryId": 44,
    "countryCode": "CL",
    "fipsCode": "01",
    "iso2": "VS",
    "latitude": -33.047238,
    "longitude": -71.6126885
  },
  {
    "id": 2831,
    "name": "Ñuble Region",
    "countryId": 44,
    "countryCode": "CL",
    "fipsCode": "18",
    "iso2": "NB",
    "latitude": -36.7225743,
    "longitude": -71.7622481
  },
  {
    "id": 2832,
    "name": "Antofagasta Region",
    "countryId": 44,
    "countryCode": "CL",
    "fipsCode": "03",
    "iso2": "AN",
    "latitude": -23.8369104,
    "longitude": -69.2877535
  },
  {
    "id": 2833,
    "name": "Maule Region",
    "countryId": 44,
    "countryCode": "CL",
    "fipsCode": "11",
    "iso2": "ML",
    "latitude": -35.5163603,
    "longitude": -71.5723953
  },
  {
    "id": 2834,
    "name": "Los Ríos Region",
    "countryId": 44,
    "countryCode": "CL",
    "fipsCode": "17",
    "iso2": "LR",
    "latitude": -40.2310217,
    "longitude": -72.331113
  },
  {
    "id": 2835,
    "name": "Los Lagos Region",
    "countryId": 44,
    "countryCode": "CL",
    "fipsCode": "14",
    "iso2": "LL",
    "latitude": -41.9197779,
    "longitude": -72.1416132
  },
  {
    "id": 2836,
    "name": "Magellan and the Chilean Antarctic Region",
    "countryId": 44,
    "countryCode": "CL",
    "fipsCode": "10",
    "iso2": "MA",
    "latitude": -52.2064316,
    "longitude": -72.1685001
  },
  {
    "id": 2837,
    "name": "Tarapacá Region",
    "countryId": 44,
    "countryCode": "CL",
    "fipsCode": "15",
    "iso2": "TA",
    "latitude": -20.2028799,
    "longitude": -69.2877535
  },
  {
    "id": 2838,
    "name": "O\"Higgins",
    "countryId": 44,
    "countryCode": "CL",
    "fipsCode": "08",
    "iso2": "LI",
    "latitude": -34.5755374,
    "longitude": -71.0022311
  },
  {
    "id": 2839,
    "name": "Commewijne District",
    "countryId": 210,
    "countryCode": "SR",
    "fipsCode": "11",
    "iso2": "CM",
    "latitude": 5.740211,
    "longitude": -54.8731219
  },
  {
    "id": 2840,
    "name": "Nickerie District",
    "countryId": 210,
    "countryCode": "SR",
    "fipsCode": "14",
    "iso2": "NI",
    "latitude": 5.5855469,
    "longitude": -56.8311117
  },
  {
    "id": 2841,
    "name": "Para District",
    "countryId": 210,
    "countryCode": "SR",
    "fipsCode": "15",
    "iso2": "PR",
    "latitude": 5.4817318,
    "longitude": -55.2259207
  },
  {
    "id": 2842,
    "name": "Coronie District",
    "countryId": 210,
    "countryCode": "SR",
    "fipsCode": "12",
    "iso2": "CR",
    "latitude": 5.6943271,
    "longitude": -56.2929381
  },
  {
    "id": 2843,
    "name": "Paramaribo District",
    "countryId": 210,
    "countryCode": "SR",
    "fipsCode": "16",
    "iso2": "PM",
    "latitude": 5.8520355,
    "longitude": -55.2038278
  },
  {
    "id": 2844,
    "name": "Wanica District",
    "countryId": 210,
    "countryCode": "SR",
    "fipsCode": "19",
    "iso2": "WA",
    "latitude": 5.7323762,
    "longitude": -55.2701235
  },
  {
    "id": 2845,
    "name": "Marowijne District",
    "countryId": 210,
    "countryCode": "SR",
    "fipsCode": "13",
    "iso2": "MA",
    "latitude": 5.6268128,
    "longitude": -54.2593118
  },
  {
    "id": 2846,
    "name": "Brokopondo District",
    "countryId": 210,
    "countryCode": "SR",
    "fipsCode": "10",
    "iso2": "BR",
    "latitude": 4.7710247,
    "longitude": -55.0493375
  },
  {
    "id": 2847,
    "name": "Sipaliwini District",
    "countryId": 210,
    "countryCode": "SR",
    "fipsCode": "18",
    "iso2": "SI",
    "latitude": 3.6567382,
    "longitude": -56.2035387
  },
  {
    "id": 2848,
    "name": "Saramacca District",
    "countryId": 210,
    "countryCode": "SR",
    "fipsCode": "17",
    "iso2": "SA",
    "latitude": 5.7240813,
    "longitude": -55.6689636
  },
  {
    "id": 2849,
    "name": "Riyadh Region",
    "countryId": 194,
    "countryCode": "SA",
    "fipsCode": "10",
    "iso2": "01",
    "latitude": 22.7554385,
    "longitude": 46.2091547
  },
  {
    "id": 2850,
    "name": "Makkah Region",
    "countryId": 194,
    "countryCode": "SA",
    "fipsCode": "14",
    "iso2": "02",
    "latitude": 21.5235584,
    "longitude": 41.9196471
  },
  {
    "id": 2851,
    "name": "Al Madinah Region",
    "countryId": 194,
    "countryCode": "SA",
    "fipsCode": "05",
    "iso2": "03",
    "latitude": 24.8403977,
    "longitude": 39.3206241
  },
  {
    "id": 2852,
    "name": "Tabuk Region",
    "countryId": 194,
    "countryCode": "SA",
    "fipsCode": "19",
    "iso2": "07",
    "latitude": 28.2453335,
    "longitude": 37.6386622
  },
  {
    "id": 2853,
    "name": "\"Asir Region",
    "countryId": 194,
    "countryCode": "SA",
    "fipsCode": "11",
    "iso2": "14",
    "latitude": 19.0969062,
    "longitude": 42.8637875
  },
  {
    "id": 2854,
    "name": "Northern Borders Region",
    "countryId": 194,
    "countryCode": "SA",
    "fipsCode": "15",
    "iso2": "08",
    "latitude": 30.0799162,
    "longitude": 42.8637875
  },
  {
    "id": 2855,
    "name": "Ha\"il Region",
    "countryId": 194,
    "countryCode": "SA",
    "fipsCode": "13",
    "iso2": "06",
    "latitude": 27.7076143,
    "longitude": 41.9196471
  },
  {
    "id": 2856,
    "name": "Eastern Province",
    "countryId": 194,
    "countryCode": "SA",
    "fipsCode": "06",
    "iso2": "04",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 2857,
    "name": "Al Jawf Region",
    "countryId": 194,
    "countryCode": "SA",
    "fipsCode": "20",
    "iso2": "12",
    "latitude": 29.887356,
    "longitude": 39.3206241
  },
  {
    "id": 2858,
    "name": "Jizan Region",
    "countryId": 194,
    "countryCode": "SA",
    "fipsCode": "17",
    "iso2": "09",
    "latitude": 17.1738176,
    "longitude": 42.7076107
  },
  {
    "id": 2859,
    "name": "Al Bahah Region",
    "countryId": 194,
    "countryCode": "SA",
    "fipsCode": "02",
    "iso2": "11",
    "latitude": 20.2722739,
    "longitude": 41.441251
  },
  {
    "id": 2860,
    "name": "Najran Region",
    "countryId": 194,
    "countryCode": "SA",
    "fipsCode": "16",
    "iso2": "10",
    "latitude": 18.3514664,
    "longitude": 45.6007108
  },
  {
    "id": 2861,
    "name": "Al-Qassim Region",
    "countryId": 194,
    "countryCode": "SA",
    "fipsCode": "08",
    "iso2": "05",
    "latitude": 26.207826,
    "longitude": 43.483738
  },
  {
    "id": 2862,
    "name": "Plateaux Department",
    "countryId": 50,
    "countryCode": "CG",
    "fipsCode": "08",
    "iso2": "14",
    "latitude": -2.0680088,
    "longitude": 15.4068079
  },
  {
    "id": 2863,
    "name": "Pointe-Noire",
    "countryId": 50,
    "countryCode": "CG",
    "fipsCode": "15",
    "iso2": "16",
    "latitude": -4.7691623,
    "longitude": 11.866362
  },
  {
    "id": 2864,
    "name": "Cuvette Department",
    "countryId": 50,
    "countryCode": "CG",
    "fipsCode": "13",
    "iso2": "8",
    "latitude": -0.2877446,
    "longitude": 16.1580937
  },
  {
    "id": 2865,
    "name": "Likouala Department",
    "countryId": 50,
    "countryCode": "CG",
    "fipsCode": "06",
    "iso2": "7",
    "latitude": 2.043924,
    "longitude": 17.668887
  },
  {
    "id": 2866,
    "name": "Bouenza Department",
    "countryId": 50,
    "countryCode": "CG",
    "fipsCode": "01",
    "iso2": "11",
    "latitude": -4.1128079,
    "longitude": 13.7289167
  },
  {
    "id": 2867,
    "name": "Kouilou Department",
    "countryId": 50,
    "countryCode": "CG",
    "fipsCode": "04",
    "iso2": "5",
    "latitude": -4.1428413,
    "longitude": 11.8891721
  },
  {
    "id": 2868,
    "name": "Lékoumou Department",
    "countryId": 50,
    "countryCode": "CG",
    "fipsCode": "05",
    "iso2": "2",
    "latitude": -3.170382,
    "longitude": 13.3587288
  },
  {
    "id": 2869,
    "name": "Cuvette-Ouest Department",
    "countryId": 50,
    "countryCode": "CG",
    "fipsCode": "14",
    "iso2": "15",
    "latitude": 0.144755,
    "longitude": 14.4723301
  },
  {
    "id": 2870,
    "name": "Brazzaville",
    "countryId": 50,
    "countryCode": "CG",
    "fipsCode": "12",
    "iso2": "BZV",
    "latitude": -4.2633597,
    "longitude": 15.2428853
  },
  {
    "id": 2871,
    "name": "Sangha Department",
    "countryId": 50,
    "countryCode": "CG",
    "fipsCode": "10",
    "iso2": "13",
    "latitude": 1.4662328,
    "longitude": 15.4068079
  },
  {
    "id": 2872,
    "name": "Niari Department",
    "countryId": 50,
    "countryCode": "CG",
    "fipsCode": "07",
    "iso2": "9",
    "latitude": -3.18427,
    "longitude": 12.2547919
  },
  {
    "id": 2873,
    "name": "Pool Department",
    "countryId": 50,
    "countryCode": "CG",
    "fipsCode": "11",
    "iso2": "12",
    "latitude": -3.7762628,
    "longitude": 14.8454619
  },
  {
    "id": 2874,
    "name": "Quindío Department",
    "countryId": 48,
    "countryCode": "CO",
    "fipsCode": "23",
    "iso2": "QUI",
    "latitude": 4.4610191,
    "longitude": -75.667356
  },
  {
    "id": 2875,
    "name": "Cundinamarca Department",
    "countryId": 48,
    "countryCode": "CO",
    "fipsCode": "33",
    "iso2": "CUN",
    "latitude": 5.026003,
    "longitude": -74.0300122
  },
  {
    "id": 2876,
    "name": "Chocó Department",
    "countryId": 48,
    "countryCode": "CO",
    "fipsCode": "11",
    "iso2": "CHO",
    "latitude": 5.2528033,
    "longitude": -76.8259652
  },
  {
    "id": 2877,
    "name": "Norte de Santander Department",
    "countryId": 48,
    "countryCode": "CO",
    "fipsCode": "21",
    "iso2": "NSA",
    "latitude": 7.9462831,
    "longitude": -72.8988069
  },
  {
    "id": 2878,
    "name": "Meta",
    "countryId": 48,
    "countryCode": "CO",
    "fipsCode": "19",
    "iso2": "MET",
    "latitude": 39.7673258,
    "longitude": -104.9753595
  },
  {
    "id": 2879,
    "name": "Risaralda Department",
    "countryId": 48,
    "countryCode": "CO",
    "fipsCode": "24",
    "iso2": "RIS",
    "latitude": 5.3158475,
    "longitude": -75.9927652
  },
  {
    "id": 2880,
    "name": "Atlántico Department",
    "countryId": 48,
    "countryCode": "CO",
    "fipsCode": "04",
    "iso2": "ATL",
    "latitude": 10.6966159,
    "longitude": -74.8741045
  },
  {
    "id": 2881,
    "name": "Arauca Department",
    "countryId": 48,
    "countryCode": "CO",
    "fipsCode": "03",
    "iso2": "ARA",
    "latitude": 6.547306,
    "longitude": -71.0022311
  },
  {
    "id": 2882,
    "name": "Guainía Department",
    "countryId": 48,
    "countryCode": "CO",
    "fipsCode": "15",
    "iso2": "GUA",
    "latitude": 2.585393,
    "longitude": -68.5247149
  },
  {
    "id": 2883,
    "name": "Tolima Department",
    "countryId": 48,
    "countryCode": "CO",
    "fipsCode": "28",
    "iso2": "TOL",
    "latitude": 4.0925168,
    "longitude": -75.1545381
  },
  {
    "id": 2884,
    "name": "Cauca Department",
    "countryId": 48,
    "countryCode": "CO",
    "fipsCode": "09",
    "iso2": "CAU",
    "latitude": 2.7049813,
    "longitude": -76.8259652
  },
  {
    "id": 2885,
    "name": "Vaupés Department",
    "countryId": 48,
    "countryCode": "CO",
    "fipsCode": "30",
    "iso2": "VAU",
    "latitude": 0.8553561,
    "longitude": -70.8119953
  },
  {
    "id": 2886,
    "name": "Magdalena Department",
    "countryId": 48,
    "countryCode": "CO",
    "fipsCode": "38",
    "iso2": "MAG",
    "latitude": 10.4113014,
    "longitude": -74.4056612
  },
  {
    "id": 2887,
    "name": "Caldas Department",
    "countryId": 48,
    "countryCode": "CO",
    "fipsCode": "37",
    "iso2": "CAL",
    "latitude": 5.29826,
    "longitude": -75.2479061
  },
  {
    "id": 2888,
    "name": "Guaviare Department",
    "countryId": 48,
    "countryCode": "CO",
    "fipsCode": "14",
    "iso2": "GUV",
    "latitude": 2.043924,
    "longitude": -72.331113
  },
  {
    "id": 2889,
    "name": "La Guajira Department",
    "countryId": 48,
    "countryCode": "CO",
    "fipsCode": "17",
    "iso2": "LAG",
    "latitude": 11.3547743,
    "longitude": -72.5204827
  },
  {
    "id": 2890,
    "name": "Antioquia Department",
    "countryId": 48,
    "countryCode": "CO",
    "fipsCode": "02",
    "iso2": "ANT",
    "latitude": 7.1986064,
    "longitude": -75.3412179
  },
  {
    "id": 2891,
    "name": "Caquetá Department",
    "countryId": 48,
    "countryCode": "CO",
    "fipsCode": "08",
    "iso2": "CAQ",
    "latitude": 0.869892,
    "longitude": -73.8419063
  },
  {
    "id": 2892,
    "name": "Casanare Department",
    "countryId": 48,
    "countryCode": "CO",
    "fipsCode": "32",
    "iso2": "CAS",
    "latitude": 5.7589269,
    "longitude": -71.5723953
  },
  {
    "id": 2893,
    "name": "Bolívar Department",
    "countryId": 48,
    "countryCode": "CO",
    "fipsCode": "35",
    "iso2": "BOL",
    "latitude": 8.6704382,
    "longitude": -74.0300122
  },
  {
    "id": 2894,
    "name": "Vichada Department",
    "countryId": 48,
    "countryCode": "CO",
    "fipsCode": "31",
    "iso2": "VID",
    "latitude": 4.4234452,
    "longitude": -69.2877535
  },
  {
    "id": 2895,
    "name": "Amazonas Department",
    "countryId": 48,
    "countryCode": "CO",
    "fipsCode": "01",
    "iso2": "AMA",
    "latitude": -1.4429123,
    "longitude": -71.5723953
  },
  {
    "id": 2896,
    "name": "Putumayo Department",
    "countryId": 48,
    "countryCode": "CO",
    "fipsCode": "22",
    "iso2": "PUT",
    "latitude": 0.4359506,
    "longitude": -75.5276699
  },
  {
    "id": 2897,
    "name": "Nariño Department",
    "countryId": 48,
    "countryCode": "CO",
    "fipsCode": "20",
    "iso2": "NAR",
    "latitude": 1.289151,
    "longitude": -77.35794
  },
  {
    "id": 2898,
    "name": "Córdoba Department",
    "countryId": 48,
    "countryCode": "CO",
    "fipsCode": "12",
    "iso2": "COR",
    "latitude": 8.049293,
    "longitude": -75.57405
  },
  {
    "id": 2899,
    "name": "Cesar Department",
    "countryId": 48,
    "countryCode": "CO",
    "fipsCode": "10",
    "iso2": "CES",
    "latitude": 9.3372948,
    "longitude": -73.6536209
  },
  {
    "id": 2900,
    "name": "Archipelago of Saint Andréws, Providence and Saint Catalina",
    "countryId": 48,
    "countryCode": "CO",
    "fipsCode": "25",
    "iso2": "SAP",
    "latitude": 12.5567324,
    "longitude": -81.7185253
  },
  {
    "id": 2901,
    "name": "Santander Department",
    "countryId": 48,
    "countryCode": "CO",
    "fipsCode": "26",
    "iso2": "SAN",
    "latitude": 6.6437076,
    "longitude": -73.6536209
  },
  {
    "id": 2902,
    "name": "Sucre Department",
    "countryId": 48,
    "countryCode": "CO",
    "fipsCode": "27",
    "iso2": "SUC",
    "latitude": 8.813977,
    "longitude": -74.723283
  },
  {
    "id": 2903,
    "name": "Boyacá Department",
    "countryId": 48,
    "countryCode": "CO",
    "fipsCode": "36",
    "iso2": "BOY",
    "latitude": 5.454511,
    "longitude": -73.362003
  },
  {
    "id": 2904,
    "name": "Valle del Cauca Department",
    "countryId": 48,
    "countryCode": "CO",
    "fipsCode": "29",
    "iso2": "VAC",
    "latitude": 3.8008893,
    "longitude": -76.6412712
  },
  {
    "id": 2905,
    "name": "Galápagos Province",
    "countryId": 64,
    "countryCode": "EC",
    "fipsCode": "01",
    "iso2": "W",
    "latitude": -0.9537691,
    "longitude": -90.9656019
  },
  {
    "id": 2906,
    "name": "Sucumbíos Province",
    "countryId": 64,
    "countryCode": "EC",
    "fipsCode": "22",
    "iso2": "U",
    "latitude": 0.0889231,
    "longitude": -76.8897557
  },
  {
    "id": 2907,
    "name": "Pastaza Province",
    "countryId": 64,
    "countryCode": "EC",
    "fipsCode": "17",
    "iso2": "Y",
    "latitude": -1.4882265,
    "longitude": -78.0031057
  },
  {
    "id": 2908,
    "name": "Tungurahua Province",
    "countryId": 64,
    "countryCode": "EC",
    "fipsCode": "19",
    "iso2": "T",
    "latitude": -1.2635284,
    "longitude": -78.5660852
  },
  {
    "id": 2909,
    "name": "Zamora-Chinchipe Province",
    "countryId": 64,
    "countryCode": "EC",
    "fipsCode": "20",
    "iso2": "Z",
    "latitude": -4.0655892,
    "longitude": -78.9503525
  },
  {
    "id": 2910,
    "name": "Los Ríos Province",
    "countryId": 64,
    "countryCode": "EC",
    "fipsCode": "13",
    "iso2": "R",
    "latitude": -1.0230607,
    "longitude": -79.4608897
  },
  {
    "id": 2911,
    "name": "Imbabura Province",
    "countryId": 64,
    "countryCode": "EC",
    "fipsCode": "11",
    "iso2": "I",
    "latitude": 0.3499768,
    "longitude": -78.1260129
  },
  {
    "id": 2912,
    "name": "Santa Elena Province",
    "countryId": 64,
    "countryCode": "EC",
    "fipsCode": "25",
    "iso2": "SE",
    "latitude": -2.2267105,
    "longitude": -80.859499
  },
  {
    "id": 2913,
    "name": "Manabí Province",
    "countryId": 64,
    "countryCode": "EC",
    "fipsCode": "14",
    "iso2": "M",
    "latitude": -1.0543434,
    "longitude": -80.452644
  },
  {
    "id": 2914,
    "name": "Guayas Province",
    "countryId": 64,
    "countryCode": "EC",
    "fipsCode": "10",
    "iso2": "G",
    "latitude": -1.9574839,
    "longitude": -79.9192702
  },
  {
    "id": 2915,
    "name": "Carchi Province",
    "countryId": 64,
    "countryCode": "EC",
    "fipsCode": "05",
    "iso2": "C",
    "latitude": 0.5026912,
    "longitude": -77.9042521
  },
  {
    "id": 2916,
    "name": "Napo Province",
    "countryId": 64,
    "countryCode": "EC",
    "fipsCode": "23",
    "iso2": "N",
    "latitude": -0.9955964,
    "longitude": -77.8129684
  },
  {
    "id": 2917,
    "name": "Cañar Province",
    "countryId": 64,
    "countryCode": "EC",
    "fipsCode": "04",
    "iso2": "F",
    "latitude": -2.5589315,
    "longitude": -78.9388191
  },
  {
    "id": 2918,
    "name": "Morona-Santiago Province",
    "countryId": 64,
    "countryCode": "EC",
    "fipsCode": "15",
    "iso2": "S",
    "latitude": -2.3051062,
    "longitude": -78.1146866
  },
  {
    "id": 2919,
    "name": "Santo Domingo de los Tsáchilas Province",
    "countryId": 64,
    "countryCode": "EC",
    "fipsCode": "26",
    "iso2": "SD",
    "latitude": -0.2521882,
    "longitude": -79.1879383
  },
  {
    "id": 2920,
    "name": "Bolívar Province",
    "countryId": 64,
    "countryCode": "EC",
    "fipsCode": "03",
    "iso2": "B",
    "latitude": -1.7095828,
    "longitude": -79.0450429
  },
  {
    "id": 2921,
    "name": "Cotopaxi Province",
    "countryId": 64,
    "countryCode": "EC",
    "fipsCode": "07",
    "iso2": "X",
    "latitude": -0.8384206,
    "longitude": -78.6662678
  },
  {
    "id": 2922,
    "name": "Esmeraldas",
    "countryId": 64,
    "countryCode": "EC",
    "fipsCode": "09",
    "iso2": "E",
    "latitude": 0.9681789,
    "longitude": -79.6517202
  },
  {
    "id": 2923,
    "name": "Azuay Province",
    "countryId": 64,
    "countryCode": "EC",
    "fipsCode": "02",
    "iso2": "A",
    "latitude": -2.8943068,
    "longitude": -78.9968344
  },
  {
    "id": 2924,
    "name": "El Oro Province",
    "countryId": 64,
    "countryCode": "EC",
    "fipsCode": "08",
    "iso2": "O",
    "latitude": -3.2592413,
    "longitude": -79.9583541
  },
  {
    "id": 2925,
    "name": "Chimborazo Province",
    "countryId": 64,
    "countryCode": "EC",
    "fipsCode": "06",
    "iso2": "H",
    "latitude": -1.6647995,
    "longitude": -78.6543255
  },
  {
    "id": 2926,
    "name": "Orellana Province",
    "countryId": 64,
    "countryCode": "EC",
    "fipsCode": "24",
    "iso2": "D",
    "latitude": -0.4545163,
    "longitude": -76.9950286
  },
  {
    "id": 2927,
    "name": "Pichincha Province",
    "countryId": 64,
    "countryCode": "EC",
    "fipsCode": "18",
    "iso2": "P",
    "latitude": -0.1464847,
    "longitude": -78.4751945
  },
  {
    "id": 2928,
    "name": "Obock Region",
    "countryId": 60,
    "countryCode": "DJ",
    "fipsCode": "04",
    "iso2": "OB",
    "latitude": 12.3895691,
    "longitude": 43.0194897
  },
  {
    "id": 2929,
    "name": "Djibouti",
    "countryId": 60,
    "countryCode": "DJ",
    "fipsCode": "07",
    "iso2": "DJ",
    "latitude": 11.825138,
    "longitude": 42.590275
  },
  {
    "id": 2930,
    "name": "Dikhil Region",
    "countryId": 60,
    "countryCode": "DJ",
    "fipsCode": "06",
    "iso2": "DI",
    "latitude": 11.1054336,
    "longitude": 42.3704744
  },
  {
    "id": 2931,
    "name": "Tadjourah Region",
    "countryId": 60,
    "countryCode": "DJ",
    "fipsCode": "05",
    "iso2": "TA",
    "latitude": 11.9338885,
    "longitude": 42.3938375
  },
  {
    "id": 2932,
    "name": "Arta Region",
    "countryId": 60,
    "countryCode": "DJ",
    "fipsCode": "08",
    "iso2": "AR",
    "latitude": 11.5255528,
    "longitude": 42.8479474
  },
  {
    "id": 2933,
    "name": "Ali Sabieh Region",
    "countryId": 60,
    "countryCode": "DJ",
    "fipsCode": "01",
    "iso2": "AS",
    "latitude": 11.1928973,
    "longitude": 42.941698
  },
  {
    "id": 2934,
    "name": "Hama Governorate",
    "countryId": 215,
    "countryCode": "SY",
    "fipsCode": "10",
    "iso2": "HM",
    "latitude": 35.1887865,
    "longitude": 37.2115829
  },
  {
    "id": 2935,
    "name": "Rif Dimashq Governorate",
    "countryId": 215,
    "countryCode": "SY",
    "fipsCode": "08",
    "iso2": "RD",
    "latitude": 33.5167289,
    "longitude": 36.954107
  },
  {
    "id": 2936,
    "name": "As-Suwayda Governorate",
    "countryId": 215,
    "countryCode": "SY",
    "fipsCode": "05",
    "iso2": "SU",
    "latitude": 32.7989156,
    "longitude": 36.7819505
  },
  {
    "id": 2937,
    "name": "Deir ez-Zor Governorate",
    "countryId": 215,
    "countryCode": "SY",
    "fipsCode": "07",
    "iso2": "DY",
    "latitude": 35.2879798,
    "longitude": 40.3088626
  },
  {
    "id": 2938,
    "name": "Latakia Governorate",
    "countryId": 215,
    "countryCode": "SY",
    "fipsCode": "02",
    "iso2": "LA",
    "latitude": 35.6129791,
    "longitude": 36.0023225
  },
  {
    "id": 2939,
    "name": "Damascus Governorate",
    "countryId": 215,
    "countryCode": "SY",
    "fipsCode": "13",
    "iso2": "DI",
    "latitude": 33.5151444,
    "longitude": 36.3931354
  },
  {
    "id": 2940,
    "name": "Idlib Governorate",
    "countryId": 215,
    "countryCode": "SY",
    "fipsCode": "12",
    "iso2": "ID",
    "latitude": 35.8268798,
    "longitude": 36.6957216
  },
  {
    "id": 2941,
    "name": "Al-Hasakah Governorate",
    "countryId": 215,
    "countryCode": "SY",
    "fipsCode": "01",
    "iso2": "HA",
    "latitude": 36.405515,
    "longitude": 40.7969149
  },
  {
    "id": 2942,
    "name": "Homs Governorate",
    "countryId": 215,
    "countryCode": "SY",
    "fipsCode": "11",
    "iso2": "HI",
    "latitude": 34.2567123,
    "longitude": 38.3165725
  },
  {
    "id": 2943,
    "name": "Quneitra Governorate",
    "countryId": 215,
    "countryCode": "SY",
    "fipsCode": "03",
    "iso2": "QU",
    "latitude": 33.0776318,
    "longitude": 35.8934136
  },
  {
    "id": 2944,
    "name": "Al-Raqqah Governorate",
    "countryId": 215,
    "countryCode": "SY",
    "fipsCode": "04",
    "iso2": "RA",
    "latitude": 35.9594106,
    "longitude": 38.9981052
  },
  {
    "id": 2945,
    "name": "Daraa Governorate",
    "countryId": 215,
    "countryCode": "SY",
    "fipsCode": "06",
    "iso2": "DR",
    "latitude": 32.9248813,
    "longitude": 36.1762615
  },
  {
    "id": 2946,
    "name": "Aleppo Governorate",
    "countryId": 215,
    "countryCode": "SY",
    "fipsCode": "09",
    "iso2": "HL",
    "latitude": 36.2262393,
    "longitude": 37.4681396
  },
  {
    "id": 2947,
    "name": "Tartus Governorate",
    "countryId": 215,
    "countryCode": "SY",
    "fipsCode": "14",
    "iso2": "TA",
    "latitude": 35.0006652,
    "longitude": 36.0023225
  },
  {
    "id": 2948,
    "name": "Fianarantsoa Province",
    "countryId": 130,
    "countryCode": "MG",
    "fipsCode": "02",
    "iso2": "F",
    "latitude": -22.353624,
    "longitude": 46.8252838
  },
  {
    "id": 2949,
    "name": "Toliara Province",
    "countryId": 130,
    "countryCode": "MG",
    "fipsCode": "06",
    "iso2": "U",
    "latitude": -23.3516191,
    "longitude": 43.6854936
  },
  {
    "id": 2950,
    "name": "Antsiranana Province",
    "countryId": 130,
    "countryCode": "MG",
    "fipsCode": "31",
    "iso2": "D",
    "latitude": -13.771539,
    "longitude": 49.5279996
  },
  {
    "id": 2951,
    "name": "Antananarivo Province",
    "countryId": 130,
    "countryCode": "MG",
    "fipsCode": "05",
    "iso2": "T",
    "latitude": -18.7051474,
    "longitude": 46.8252838
  },
  {
    "id": 2952,
    "name": "Toamasina Province",
    "countryId": 130,
    "countryCode": "MG",
    "fipsCode": "04",
    "iso2": "A",
    "latitude": -18.1442811,
    "longitude": 49.3957836
  },
  {
    "id": 2953,
    "name": "Mahajanga Province",
    "countryId": 130,
    "countryCode": "MG",
    "fipsCode": "03",
    "iso2": "M",
    "latitude": -16.523883,
    "longitude": 46.516262
  },
  {
    "id": 2954,
    "name": "Mogilev Region",
    "countryId": 21,
    "countryCode": "BY",
    "fipsCode": "06",
    "iso2": "MA",
    "latitude": 53.5101791,
    "longitude": 30.4006444
  },
  {
    "id": 2955,
    "name": "Gomel Region",
    "countryId": 21,
    "countryCode": "BY",
    "fipsCode": "02",
    "iso2": "HO",
    "latitude": 52.1648754,
    "longitude": 29.1333251
  },
  {
    "id": 2956,
    "name": "Grodno Region",
    "countryId": 21,
    "countryCode": "BY",
    "fipsCode": "03",
    "iso2": "HR",
    "latitude": 53.6599945,
    "longitude": 25.3448571
  },
  {
    "id": 2957,
    "name": "Minsk Region",
    "countryId": 21,
    "countryCode": "BY",
    "fipsCode": "05",
    "iso2": "MI",
    "latitude": 54.1067889,
    "longitude": 27.4129245
  },
  {
    "id": 2958,
    "name": "Minsk",
    "countryId": 21,
    "countryCode": "BY",
    "fipsCode": "04",
    "iso2": "HM",
    "latitude": 53.9006011,
    "longitude": 27.558972
  },
  {
    "id": 2959,
    "name": "Brest Region",
    "countryId": 21,
    "countryCode": "BY",
    "fipsCode": "01",
    "iso2": "BR",
    "latitude": 52.5296641,
    "longitude": 25.460648
  },
  {
    "id": 2960,
    "name": "Vitebsk Region",
    "countryId": 21,
    "countryCode": "BY",
    "fipsCode": "07",
    "iso2": "VI",
    "latitude": 55.2959833,
    "longitude": 28.7583627
  },
  {
    "id": 2961,
    "name": "Murqub",
    "countryId": 124,
    "countryCode": "LY",
    "fipsCode": "82",
    "iso2": "MB",
    "latitude": 32.4599677,
    "longitude": 14.1001326
  },
  {
    "id": 2962,
    "name": "Nuqat al Khams",
    "countryId": 124,
    "countryCode": "LY",
    "fipsCode": "67",
    "iso2": "NQ",
    "latitude": 32.6914909,
    "longitude": 11.8891721
  },
  {
    "id": 2963,
    "name": "Zawiya District",
    "countryId": 124,
    "countryCode": "LY",
    "fipsCode": "68",
    "iso2": "ZA",
    "latitude": 32.7630282,
    "longitude": 12.7364962
  },
  {
    "id": 2964,
    "name": "Al Wahat District",
    "countryId": 124,
    "countryCode": "LY",
    "fipsCode": "83",
    "iso2": "WA",
    "latitude": 29.0466808,
    "longitude": 21.8568586
  },
  {
    "id": 2965,
    "name": "Sabha District",
    "countryId": 124,
    "countryCode": "LY",
    "fipsCode": "75",
    "iso2": "SB",
    "latitude": 27.0365406,
    "longitude": 14.4290236
  },
  {
    "id": 2966,
    "name": "Derna District",
    "countryId": 124,
    "countryCode": "LY",
    "fipsCode": "70",
    "iso2": "DR",
    "latitude": 32.755613,
    "longitude": 22.6377432
  },
  {
    "id": 2967,
    "name": "Murzuq District",
    "countryId": 124,
    "countryCode": "LY",
    "fipsCode": "73",
    "iso2": "MQ",
    "latitude": 25.9182262,
    "longitude": 13.9260001
  },
  {
    "id": 2968,
    "name": "Marj District",
    "countryId": 124,
    "countryCode": "LY",
    "fipsCode": "66",
    "iso2": "MJ",
    "latitude": 32.0550363,
    "longitude": 21.1891151
  },
  {
    "id": 2969,
    "name": "Ghat District",
    "countryId": 124,
    "countryCode": "LY",
    "fipsCode": "71",
    "iso2": "GT",
    "latitude": 24.9640371,
    "longitude": 10.1759285
  },
  {
    "id": 2970,
    "name": "Jufra",
    "countryId": 124,
    "countryCode": "LY",
    "fipsCode": "64",
    "iso2": "JU",
    "latitude": 27.9835135,
    "longitude": 16.912251
  },
  {
    "id": 2971,
    "name": "Tripoli District",
    "countryId": 124,
    "countryCode": "LY",
    "fipsCode": "77",
    "iso2": "TB",
    "latitude": 32.6408021,
    "longitude": 13.2663479
  },
  {
    "id": 2972,
    "name": "Kufra District",
    "countryId": 124,
    "countryCode": "LY",
    "fipsCode": "65",
    "iso2": "KF",
    "latitude": 23.3112389,
    "longitude": 21.8568586
  },
  {
    "id": 2973,
    "name": "Wadi al Hayaa District",
    "countryId": 124,
    "countryCode": "LY",
    "fipsCode": "84",
    "iso2": "WD",
    "latitude": 26.4225926,
    "longitude": 12.6216211
  },
  {
    "id": 2974,
    "name": "Jabal al Gharbi District",
    "countryId": 124,
    "countryCode": "LY",
    "fipsCode": "80",
    "iso2": "JG",
    "latitude": 30.2638032,
    "longitude": 12.8054753
  },
  {
    "id": 2975,
    "name": "Wadi al Shatii District",
    "countryId": 124,
    "countryCode": "LY",
    "fipsCode": "78",
    "iso2": "WS",
    "latitude": 27.7351468,
    "longitude": 12.4380581
  },
  {
    "id": 2976,
    "name": "Nalut District",
    "countryId": 124,
    "countryCode": "LY",
    "fipsCode": "74",
    "iso2": "NL",
    "latitude": 31.8742348,
    "longitude": 10.9750484
  },
  {
    "id": 2977,
    "name": "Sirte District",
    "countryId": 124,
    "countryCode": "LY",
    "fipsCode": "76",
    "iso2": "SR",
    "latitude": 31.189689,
    "longitude": 16.5701927
  },
  {
    "id": 2978,
    "name": "Misrata District",
    "countryId": 124,
    "countryCode": "LY",
    "fipsCode": "72",
    "iso2": "MI",
    "latitude": 32.3255884,
    "longitude": 15.0992556
  },
  {
    "id": 2979,
    "name": "Jafara",
    "countryId": 124,
    "countryCode": "LY",
    "fipsCode": "81",
    "iso2": "JI",
    "latitude": 32.4525904,
    "longitude": 12.9435536
  },
  {
    "id": 2980,
    "name": "Jabal al Akhdar",
    "countryId": 124,
    "countryCode": "LY",
    "fipsCode": "63",
    "iso2": "JA",
    "latitude": 23.1856081,
    "longitude": 57.3713879
  },
  {
    "id": 2981,
    "name": "Benghazi",
    "countryId": 124,
    "countryCode": "LY",
    "fipsCode": "69",
    "iso2": "BA",
    "latitude": 32.1194242,
    "longitude": 20.0867909
  },
  {
    "id": 2982,
    "name": "Ribeira Brava Municipality",
    "countryId": 40,
    "countryCode": "CV",
    "fipsCode": "22",
    "iso2": "RB",
    "latitude": 16.6070739,
    "longitude": -24.2033843
  },
  {
    "id": 2983,
    "name": "Tarrafal",
    "countryId": 40,
    "countryCode": "CV",
    "fipsCode": "20",
    "iso2": "TA",
    "latitude": 15.2760578,
    "longitude": -23.7484077
  },
  {
    "id": 2984,
    "name": "Ribeira Grande de Santiago",
    "countryId": 40,
    "countryCode": "CV",
    "fipsCode": "23",
    "iso2": "RS",
    "latitude": 14.9830298,
    "longitude": -23.6561725
  },
  {
    "id": 2985,
    "name": "Santa Catarina",
    "countryId": 40,
    "countryCode": "CV",
    "fipsCode": "15",
    "iso2": "CA",
    "latitude": -27.2423392,
    "longitude": -50.2188556
  },
  {
    "id": 2986,
    "name": "São Domingos",
    "countryId": 40,
    "countryCode": "CV",
    "fipsCode": "17",
    "iso2": "SD",
    "latitude": 15.0286165,
    "longitude": -23.563922
  },
  {
    "id": 2987,
    "name": "Mosteiros",
    "countryId": 40,
    "countryCode": "CV",
    "fipsCode": "13",
    "iso2": "MO",
    "latitude": 37.8904348,
    "longitude": -25.8207556
  },
  {
    "id": 2988,
    "name": "Praia",
    "countryId": 40,
    "countryCode": "CV",
    "fipsCode": "14",
    "iso2": "PR",
    "latitude": 14.93305,
    "longitude": -23.5133267
  },
  {
    "id": 2989,
    "name": "Porto Novo",
    "countryId": 40,
    "countryCode": "CV",
    "fipsCode": "21",
    "iso2": "PN",
    "latitude": 6.4968574,
    "longitude": 2.6288523
  },
  {
    "id": 2990,
    "name": "São Miguel",
    "countryId": 40,
    "countryCode": "CV",
    "fipsCode": "19",
    "iso2": "SM",
    "latitude": 37.780411,
    "longitude": -25.4970466
  },
  {
    "id": 2991,
    "name": "Maio Municipality",
    "countryId": 40,
    "countryCode": "CV",
    "fipsCode": "04",
    "iso2": "MA",
    "latitude": 15.2003098,
    "longitude": -23.1679793
  },
  {
    "id": 2992,
    "name": "Sotavento Islands",
    "countryId": 40,
    "countryCode": "CV",
    "fipsCode": "04",
    "iso2": "S",
    "latitude": 15,
    "longitude": -24
  },
  {
    "id": 2993,
    "name": "São Lourenço dos Órgãos",
    "countryId": 40,
    "countryCode": "CV",
    "fipsCode": "25",
    "iso2": "SO",
    "latitude": 15.0537841,
    "longitude": -23.6085612
  },
  {
    "id": 2994,
    "name": "Barlavento Islands",
    "countryId": 40,
    "countryCode": "CV",
    "fipsCode": "25",
    "iso2": "B",
    "latitude": 16.8236845,
    "longitude": -23.9934881
  },
  {
    "id": 2995,
    "name": "Santa Catarina do Fogo",
    "countryId": 40,
    "countryCode": "CV",
    "fipsCode": "24",
    "iso2": "CF",
    "latitude": 14.9309104,
    "longitude": -24.3222577
  },
  {
    "id": 2996,
    "name": "Brava",
    "countryId": 40,
    "countryCode": "CV",
    "fipsCode": "02",
    "iso2": "BR",
    "latitude": 40.9897778,
    "longitude": -73.6835715
  },
  {
    "id": 2997,
    "name": "Paul",
    "countryId": 40,
    "countryCode": "CV",
    "fipsCode": "05",
    "iso2": "PA",
    "latitude": 37.0625,
    "longitude": -95.677068
  },
  {
    "id": 2998,
    "name": "Sal",
    "countryId": 40,
    "countryCode": "CV",
    "fipsCode": "08",
    "iso2": "SL",
    "latitude": 26.5958122,
    "longitude": -80.2045083
  },
  {
    "id": 2999,
    "name": "Boa Vista",
    "countryId": 40,
    "countryCode": "CV",
    "fipsCode": "01",
    "iso2": "BV",
    "latitude": 38.743466,
    "longitude": -120.7304297
  },
  {
    "id": 3000,
    "name": "São Filipe",
    "countryId": 40,
    "countryCode": "CV",
    "fipsCode": "18",
    "iso2": "SF",
    "latitude": 14.8951679,
    "longitude": -24.4945636
  },
  {
    "id": 3001,
    "name": "São Vicente",
    "countryId": 40,
    "countryCode": "CV",
    "fipsCode": "11",
    "iso2": "SV",
    "latitude": -23.9607157,
    "longitude": -46.3962022
  },
  {
    "id": 3002,
    "name": "Ribeira Grande",
    "countryId": 40,
    "countryCode": "CV",
    "fipsCode": "07",
    "iso2": "RG",
    "latitude": 37.8210369,
    "longitude": -25.5148137
  },
  {
    "id": 3003,
    "name": "Tarrafal de São Nicolau",
    "countryId": 40,
    "countryCode": "CV",
    "fipsCode": "27",
    "iso2": "TS",
    "latitude": 16.5636498,
    "longitude": -24.354942
  },
  {
    "id": 3004,
    "name": "Santa Cruz",
    "countryId": 40,
    "countryCode": "CV",
    "fipsCode": "16",
    "iso2": "CR",
    "latitude": 36.9741171,
    "longitude": -122.0307963
  },
  {
    "id": 3005,
    "name": "Schleswig-Holstein",
    "countryId": 82,
    "countryCode": "DE",
    "fipsCode": "10",
    "iso2": "SH",
    "latitude": 54.2193672,
    "longitude": 9.6961167
  },
  {
    "id": 3006,
    "name": "Baden-Württemberg",
    "countryId": 82,
    "countryCode": "DE",
    "fipsCode": "01",
    "iso2": "BW",
    "latitude": 48.6616037,
    "longitude": 9.3501336
  },
  {
    "id": 3007,
    "name": "Mecklenburg-Vorpommern",
    "countryId": 82,
    "countryCode": "DE",
    "fipsCode": "12",
    "iso2": "MV",
    "latitude": 53.6126505,
    "longitude": 12.4295953
  },
  {
    "id": 3008,
    "name": "Lower Saxony",
    "countryId": 82,
    "countryCode": "DE",
    "fipsCode": "06",
    "iso2": "NI",
    "latitude": 52.6367036,
    "longitude": 9.8450766
  },
  {
    "id": 3009,
    "name": "Bavaria",
    "countryId": 82,
    "countryCode": "DE",
    "fipsCode": "02",
    "iso2": "BY",
    "latitude": 48.7904472,
    "longitude": 11.4978895
  },
  {
    "id": 3010,
    "name": "Berlin",
    "countryId": 82,
    "countryCode": "DE",
    "fipsCode": "16",
    "iso2": "BE",
    "latitude": 52.5200066,
    "longitude": 13.404954
  },
  {
    "id": 3011,
    "name": "Saxony-Anhalt",
    "countryId": 82,
    "countryCode": "DE",
    "fipsCode": "14",
    "iso2": "ST",
    "latitude": 51.9502649,
    "longitude": 11.6922734
  },
  {
    "id": 3013,
    "name": "Brandenburg",
    "countryId": 82,
    "countryCode": "DE",
    "fipsCode": "11",
    "iso2": "BB",
    "latitude": 52.4125287,
    "longitude": 12.5316444
  },
  {
    "id": 3014,
    "name": "Bremen",
    "countryId": 82,
    "countryCode": "DE",
    "fipsCode": "03",
    "iso2": "HB",
    "latitude": 53.0792962,
    "longitude": 8.8016936
  },
  {
    "id": 3015,
    "name": "Thuringia",
    "countryId": 82,
    "countryCode": "DE",
    "fipsCode": "15",
    "iso2": "TH",
    "latitude": 51.0109892,
    "longitude": 10.845346
  },
  {
    "id": 3016,
    "name": "Hamburg",
    "countryId": 82,
    "countryCode": "DE",
    "fipsCode": "04",
    "iso2": "HH",
    "latitude": 53.5510846,
    "longitude": 9.9936819
  },
  {
    "id": 3017,
    "name": "North Rhine-Westphalia",
    "countryId": 82,
    "countryCode": "DE",
    "fipsCode": "07",
    "iso2": "NW",
    "latitude": 51.4332367,
    "longitude": 7.6615938
  },
  {
    "id": 3018,
    "name": "Hesse",
    "countryId": 82,
    "countryCode": "DE",
    "fipsCode": "05",
    "iso2": "HE",
    "latitude": 50.6520515,
    "longitude": 9.1624376
  },
  {
    "id": 3019,
    "name": "Rhineland-Palatinate",
    "countryId": 82,
    "countryCode": "DE",
    "fipsCode": "08",
    "iso2": "RP",
    "latitude": 50.118346,
    "longitude": 7.3089527
  },
  {
    "id": 3020,
    "name": "Saarland",
    "countryId": 82,
    "countryCode": "DE",
    "fipsCode": "09",
    "iso2": "SL",
    "latitude": 49.3964234,
    "longitude": 7.0229607
  },
  {
    "id": 3021,
    "name": "Saxony",
    "countryId": 82,
    "countryCode": "DE",
    "fipsCode": "13",
    "iso2": "SN",
    "latitude": 51.1045407,
    "longitude": 13.2017384
  },
  {
    "id": 3022,
    "name": "Mafeteng District",
    "countryId": 122,
    "countryCode": "LS",
    "fipsCode": "13",
    "iso2": "E",
    "latitude": -29.8041008,
    "longitude": 27.5026174
  },
  {
    "id": 3023,
    "name": "Mohale\"s Hoek District",
    "countryId": 122,
    "countryCode": "LS",
    "fipsCode": "15",
    "iso2": "F",
    "latitude": -30.1425917,
    "longitude": 27.4673845
  },
  {
    "id": 3024,
    "name": "Mokhotlong District",
    "countryId": 122,
    "countryCode": "LS",
    "fipsCode": "16",
    "iso2": "J",
    "latitude": -29.2573193,
    "longitude": 28.9528645
  },
  {
    "id": 3025,
    "name": "Qacha\"s Nek District",
    "countryId": 122,
    "countryCode": "LS",
    "fipsCode": "17",
    "iso2": "H",
    "latitude": -30.1114565,
    "longitude": 28.678979
  },
  {
    "id": 3026,
    "name": "Leribe District",
    "countryId": 122,
    "countryCode": "LS",
    "fipsCode": "12",
    "iso2": "C",
    "latitude": -28.8638065,
    "longitude": 28.0478826
  },
  {
    "id": 3027,
    "name": "Quthing District",
    "countryId": 122,
    "countryCode": "LS",
    "fipsCode": "18",
    "iso2": "G",
    "latitude": -30.4015687,
    "longitude": 27.7080133
  },
  {
    "id": 3028,
    "name": "Maseru District",
    "countryId": 122,
    "countryCode": "LS",
    "fipsCode": "14",
    "iso2": "A",
    "latitude": -29.516565,
    "longitude": 27.8311428
  },
  {
    "id": 3029,
    "name": "Butha-Buthe District",
    "countryId": 122,
    "countryCode": "LS",
    "fipsCode": "11",
    "iso2": "B",
    "latitude": -28.7653754,
    "longitude": 28.2468148
  },
  {
    "id": 3030,
    "name": "Berea District",
    "countryId": 122,
    "countryCode": "LS",
    "fipsCode": "10",
    "iso2": "D",
    "latitude": 41.3661614,
    "longitude": -81.8543026
  },
  {
    "id": 3031,
    "name": "Thaba-Tseka District",
    "countryId": 122,
    "countryCode": "LS",
    "fipsCode": "19",
    "iso2": "K",
    "latitude": -29.5238975,
    "longitude": 28.6089752
  },
  {
    "id": 3032,
    "name": "Montserrado County",
    "countryId": 123,
    "countryCode": "LR",
    "fipsCode": "14",
    "iso2": "MO",
    "latitude": 6.5525815,
    "longitude": -10.5296115
  },
  {
    "id": 3033,
    "name": "River Cess County",
    "countryId": 123,
    "countryCode": "LR",
    "fipsCode": "18",
    "iso2": "RI",
    "latitude": 5.9025328,
    "longitude": -9.456155
  },
  {
    "id": 3034,
    "name": "Bong County",
    "countryId": 123,
    "countryCode": "LR",
    "fipsCode": "01",
    "iso2": "BG",
    "latitude": 6.8295019,
    "longitude": -9.3673084
  },
  {
    "id": 3035,
    "name": "Sinoe County",
    "countryId": 123,
    "countryCode": "LR",
    "fipsCode": "10",
    "iso2": "SI",
    "latitude": 5.49871,
    "longitude": -8.6600586
  },
  {
    "id": 3036,
    "name": "Grand Cape Mount County",
    "countryId": 123,
    "countryCode": "LR",
    "fipsCode": "12",
    "iso2": "CM",
    "latitude": 7.0467758,
    "longitude": -11.0711758
  },
  {
    "id": 3037,
    "name": "Lofa County",
    "countryId": 123,
    "countryCode": "LR",
    "fipsCode": "20",
    "iso2": "LO",
    "latitude": 8.1911184,
    "longitude": -9.7232673
  },
  {
    "id": 3038,
    "name": "River Gee County",
    "countryId": 123,
    "countryCode": "LR",
    "fipsCode": "22",
    "iso2": "RG",
    "latitude": 5.2604894,
    "longitude": -7.87216
  },
  {
    "id": 3039,
    "name": "Grand Gedeh County",
    "countryId": 123,
    "countryCode": "LR",
    "fipsCode": "19",
    "iso2": "GG",
    "latitude": 5.9222078,
    "longitude": -8.2212979
  },
  {
    "id": 3040,
    "name": "Grand Bassa County",
    "countryId": 123,
    "countryCode": "LR",
    "fipsCode": "11",
    "iso2": "GB",
    "latitude": 6.2308452,
    "longitude": -9.8124935
  },
  {
    "id": 3041,
    "name": "Bomi County",
    "countryId": 123,
    "countryCode": "LR",
    "fipsCode": "15",
    "iso2": "BM",
    "latitude": 6.7562926,
    "longitude": -10.8451467
  },
  {
    "id": 3042,
    "name": "Maryland County",
    "countryId": 123,
    "countryCode": "LR",
    "fipsCode": "13",
    "iso2": "MY",
    "latitude": 39.0457549,
    "longitude": -76.6412712
  },
  {
    "id": 3043,
    "name": "Margibi County",
    "countryId": 123,
    "countryCode": "LR",
    "fipsCode": "17",
    "iso2": "MG",
    "latitude": 6.5151875,
    "longitude": -10.3048897
  },
  {
    "id": 3044,
    "name": "Gbarpolu County",
    "countryId": 123,
    "countryCode": "LR",
    "fipsCode": "21",
    "iso2": "GP",
    "latitude": 7.4952637,
    "longitude": -10.0807298
  },
  {
    "id": 3045,
    "name": "Grand Kru County",
    "countryId": 123,
    "countryCode": "LR",
    "fipsCode": "16",
    "iso2": "GK",
    "latitude": 4.7613862,
    "longitude": -8.2212979
  },
  {
    "id": 3046,
    "name": "Nimba",
    "countryId": 123,
    "countryCode": "LR",
    "fipsCode": "09",
    "iso2": "NI",
    "latitude": 7.6166667,
    "longitude": -8.4166667
  },
  {
    "id": 3047,
    "name": "Ad Dhahirah Governorate",
    "countryId": 166,
    "countryCode": "OM",
    "fipsCode": "09",
    "iso2": "ZA",
    "latitude": 23.2161674,
    "longitude": 56.4907444
  },
  {
    "id": 3048,
    "name": "Al Batinah North Governorate",
    "countryId": 166,
    "countryCode": "OM",
    "fipsCode": "11",
    "iso2": "BS",
    "latitude": 24.3419846,
    "longitude": 56.7298904
  },
  {
    "id": 3049,
    "name": "Al Batinah South Governorate",
    "countryId": 166,
    "countryCode": "OM",
    "fipsCode": "02",
    "iso2": "BJ",
    "latitude": 23.4314903,
    "longitude": 57.4239796
  },
  {
    "id": 3050,
    "name": "Al Batinah Region",
    "countryId": 166,
    "countryCode": "OM",
    "fipsCode": "02",
    "iso2": "BA",
    "latitude": 24.3419846,
    "longitude": 56.7298904
  },
  {
    "id": 3051,
    "name": "Ash Sharqiyah Region",
    "countryId": 166,
    "countryCode": "OM",
    "fipsCode": "04",
    "iso2": "SH",
    "latitude": 22.7141196,
    "longitude": 58.5308064
  },
  {
    "id": 3052,
    "name": "Musandam Governorate",
    "countryId": 166,
    "countryCode": "OM",
    "fipsCode": "07",
    "iso2": "MU",
    "latitude": 26.1986144,
    "longitude": 56.2460949
  },
  {
    "id": 3053,
    "name": "Ash Sharqiyah North Governorate",
    "countryId": 166,
    "countryCode": "OM",
    "fipsCode": "07",
    "iso2": "SS",
    "latitude": 22.7141196,
    "longitude": 58.5308064
  },
  {
    "id": 3054,
    "name": "Ash Sharqiyah South Governorate",
    "countryId": 166,
    "countryCode": "OM",
    "fipsCode": "07",
    "iso2": "SJ",
    "latitude": 22.0158249,
    "longitude": 59.3251922
  },
  {
    "id": 3055,
    "name": "Muscat Governorate",
    "countryId": 166,
    "countryCode": "OM",
    "fipsCode": "06",
    "iso2": "MA",
    "latitude": 23.5880307,
    "longitude": 58.3828717
  },
  {
    "id": 3056,
    "name": "Al Wusta Governorate",
    "countryId": 166,
    "countryCode": "OM",
    "fipsCode": "03",
    "iso2": "WU",
    "latitude": 19.9571078,
    "longitude": 56.2756846
  },
  {
    "id": 3057,
    "name": "Dhofar Governorate",
    "countryId": 166,
    "countryCode": "OM",
    "fipsCode": "08",
    "iso2": "ZU",
    "latitude": 17.0322121,
    "longitude": 54.1425214
  },
  {
    "id": 3058,
    "name": "Ad Dakhiliyah Governorate",
    "countryId": 166,
    "countryCode": "OM",
    "fipsCode": "01",
    "iso2": "DA",
    "latitude": 22.8588758,
    "longitude": 57.5394356
  },
  {
    "id": 3059,
    "name": "Al Buraimi Governorate",
    "countryId": 166,
    "countryCode": "OM",
    "fipsCode": "10",
    "iso2": "BU",
    "latitude": 24.1671413,
    "longitude": 56.1142253
  },
  {
    "id": 3060,
    "name": "Ngamiland",
    "countryId": 29,
    "countryCode": "BW",
    "fipsCode": "07",
    "iso2": "NG",
    "latitude": -19.1905321,
    "longitude": 23.0011989
  },
  {
    "id": 3061,
    "name": "Ghanzi District",
    "countryId": 29,
    "countryCode": "BW",
    "fipsCode": "03",
    "iso2": "GH",
    "latitude": -21.8652314,
    "longitude": 21.8568586
  },
  {
    "id": 3062,
    "name": "Kgatleng District",
    "countryId": 29,
    "countryCode": "BW",
    "fipsCode": "05",
    "iso2": "KL",
    "latitude": -24.1970445,
    "longitude": 26.2304616
  },
  {
    "id": 3063,
    "name": "Southern District",
    "countryId": 29,
    "countryCode": "BW",
    "fipsCode": "10",
    "iso2": "SO",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 3064,
    "name": "South-East District",
    "countryId": 29,
    "countryCode": "BW",
    "fipsCode": "09",
    "iso2": "SE",
    "latitude": 31.2163798,
    "longitude": -82.3527044
  },
  {
    "id": 3065,
    "name": "North-West District",
    "countryId": 29,
    "countryCode": "BW",
    "fipsCode": "11",
    "iso2": "NW",
    "latitude": 39.3446307,
    "longitude": -76.6854283
  },
  {
    "id": 3066,
    "name": "Kgalagadi District",
    "countryId": 29,
    "countryCode": "BW",
    "fipsCode": "04",
    "iso2": "KG",
    "latitude": -24.7550285,
    "longitude": 21.8568586
  },
  {
    "id": 3067,
    "name": "Central District",
    "countryId": 29,
    "countryCode": "BW",
    "fipsCode": "01",
    "iso2": "CE",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 3068,
    "name": "North-East District",
    "countryId": 29,
    "countryCode": "BW",
    "fipsCode": "08",
    "iso2": "NE",
    "latitude": 37.5884461,
    "longitude": -94.6863782
  },
  {
    "id": 3069,
    "name": "Kweneng District",
    "countryId": 29,
    "countryCode": "BW",
    "fipsCode": "06",
    "iso2": "KW",
    "latitude": -23.8367249,
    "longitude": 25.2837585
  },
  {
    "id": 3070,
    "name": "Collines Department",
    "countryId": 24,
    "countryCode": "BJ",
    "fipsCode": "11",
    "iso2": "CO",
    "latitude": 8.3022297,
    "longitude": 2.302446
  },
  {
    "id": 3071,
    "name": "Kouffo Department",
    "countryId": 24,
    "countryCode": "BJ",
    "fipsCode": "12",
    "iso2": "KO",
    "latitude": 7.0035894,
    "longitude": 1.7538817
  },
  {
    "id": 3072,
    "name": "Donga Department",
    "countryId": 24,
    "countryCode": "BJ",
    "fipsCode": "13",
    "iso2": "DO",
    "latitude": 9.7191867,
    "longitude": 1.6760691
  },
  {
    "id": 3073,
    "name": "Zou Department",
    "countryId": 24,
    "countryCode": "BJ",
    "fipsCode": "18",
    "iso2": "ZO",
    "latitude": 7.3469268,
    "longitude": 2.0665197
  },
  {
    "id": 3074,
    "name": "Plateau Department",
    "countryId": 24,
    "countryCode": "BJ",
    "fipsCode": "17",
    "iso2": "PL",
    "latitude": 7.3445141,
    "longitude": 2.539603
  },
  {
    "id": 3075,
    "name": "Mono Department",
    "countryId": 24,
    "countryCode": "BJ",
    "fipsCode": "15",
    "iso2": "MO",
    "latitude": 37.9218608,
    "longitude": -118.9528645
  },
  {
    "id": 3076,
    "name": "Atakora Department",
    "countryId": 24,
    "countryCode": "BJ",
    "fipsCode": "08",
    "iso2": "AK",
    "latitude": 10.7954931,
    "longitude": 1.6760691
  },
  {
    "id": 3077,
    "name": "Alibori Department",
    "countryId": 24,
    "countryCode": "BJ",
    "fipsCode": "07",
    "iso2": "AL",
    "latitude": 10.9681093,
    "longitude": 2.7779813
  },
  {
    "id": 3078,
    "name": "Borgou Department",
    "countryId": 24,
    "countryCode": "BJ",
    "fipsCode": "10",
    "iso2": "BO",
    "latitude": 9.5340864,
    "longitude": 2.7779813
  },
  {
    "id": 3079,
    "name": "Atlantique Department",
    "countryId": 24,
    "countryCode": "BJ",
    "fipsCode": "09",
    "iso2": "AQ",
    "latitude": 6.6588391,
    "longitude": 2.2236667
  },
  {
    "id": 3080,
    "name": "Ouémé Department",
    "countryId": 24,
    "countryCode": "BJ",
    "fipsCode": "16",
    "iso2": "OU",
    "latitude": 6.6148152,
    "longitude": 2.4999918
  },
  {
    "id": 3081,
    "name": "Littoral Department",
    "countryId": 24,
    "countryCode": "BJ",
    "fipsCode": "14",
    "iso2": "LI",
    "latitude": 6.3806973,
    "longitude": 2.4406387
  },
  {
    "id": 3082,
    "name": "Machinga District",
    "countryId": 131,
    "countryCode": "MW",
    "fipsCode": "28",
    "iso2": "MH",
    "latitude": -14.9407263,
    "longitude": 35.4781926
  },
  {
    "id": 3083,
    "name": "Zomba District",
    "countryId": 131,
    "countryCode": "MW",
    "fipsCode": "23",
    "iso2": "ZO",
    "latitude": -15.3765857,
    "longitude": 35.3356518
  },
  {
    "id": 3084,
    "name": "Mwanza District",
    "countryId": 131,
    "countryCode": "MW",
    "fipsCode": "25",
    "iso2": "MW",
    "latitude": -2.4671197,
    "longitude": 32.8986812
  },
  {
    "id": 3085,
    "name": "Nsanje District",
    "countryId": 131,
    "countryCode": "MW",
    "fipsCode": "19",
    "iso2": "NS",
    "latitude": -16.7288202,
    "longitude": 35.1708741
  },
  {
    "id": 3086,
    "name": "Salima District",
    "countryId": 131,
    "countryCode": "MW",
    "fipsCode": "22",
    "iso2": "SA",
    "latitude": -13.6809586,
    "longitude": 34.4198243
  },
  {
    "id": 3087,
    "name": "Chitipa district",
    "countryId": 131,
    "countryCode": "MW",
    "fipsCode": "04",
    "iso2": "CT",
    "latitude": -9.7037655,
    "longitude": 33.2700253
  },
  {
    "id": 3088,
    "name": "Ntcheu District",
    "countryId": 131,
    "countryCode": "MW",
    "fipsCode": "16",
    "iso2": "NU",
    "latitude": -14.9037538,
    "longitude": 34.7740793
  },
  {
    "id": 3089,
    "name": "Rumphi District",
    "countryId": 131,
    "countryCode": "MW",
    "fipsCode": "21",
    "iso2": "RU",
    "latitude": -10.7851537,
    "longitude": 34.3310364
  },
  {
    "id": 3090,
    "name": "Dowa District",
    "countryId": 131,
    "countryCode": "MW",
    "fipsCode": "07",
    "iso2": "DO",
    "latitude": -13.6041256,
    "longitude": 33.8857747
  },
  {
    "id": 3091,
    "name": "Karonga District",
    "countryId": 131,
    "countryCode": "MW",
    "fipsCode": "08",
    "iso2": "KR",
    "latitude": -9.9036365,
    "longitude": 33.9750018
  },
  {
    "id": 3092,
    "name": "Central Region",
    "countryId": 131,
    "countryCode": "MW",
    "fipsCode": "C",
    "iso2": "C",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 3093,
    "name": "Likoma District",
    "countryId": 131,
    "countryCode": "MW",
    "fipsCode": "27",
    "iso2": "LK",
    "latitude": -12.0584005,
    "longitude": 34.7354031
  },
  {
    "id": 3094,
    "name": "Kasungu District",
    "countryId": 131,
    "countryCode": "MW",
    "fipsCode": "09",
    "iso2": "KS",
    "latitude": -13.1367065,
    "longitude": 33.258793
  },
  {
    "id": 3095,
    "name": "Nkhata Bay District",
    "countryId": 131,
    "countryCode": "MW",
    "fipsCode": "17",
    "iso2": "NB",
    "latitude": -11.7185042,
    "longitude": 34.3310364
  },
  {
    "id": 3096,
    "name": "Balaka District",
    "countryId": 131,
    "countryCode": "MW",
    "fipsCode": "26",
    "iso2": "BA",
    "latitude": -15.0506595,
    "longitude": 35.0828588
  },
  {
    "id": 3097,
    "name": "Dedza District",
    "countryId": 131,
    "countryCode": "MW",
    "fipsCode": "06",
    "iso2": "DE",
    "latitude": -14.1894585,
    "longitude": 34.2421597
  },
  {
    "id": 3098,
    "name": "Thyolo District",
    "countryId": 131,
    "countryCode": "MW",
    "fipsCode": "05",
    "iso2": "TH",
    "latitude": -16.1299177,
    "longitude": 35.1268781
  },
  {
    "id": 3099,
    "name": "Mchinji District",
    "countryId": 131,
    "countryCode": "MW",
    "fipsCode": "13",
    "iso2": "MC",
    "latitude": -13.7401525,
    "longitude": 32.9888319
  },
  {
    "id": 3100,
    "name": "Nkhotakota District",
    "countryId": 131,
    "countryCode": "MW",
    "fipsCode": "18",
    "iso2": "NK",
    "latitude": -12.7541961,
    "longitude": 34.2421597
  },
  {
    "id": 3101,
    "name": "Lilongwe District",
    "countryId": 131,
    "countryCode": "MW",
    "fipsCode": "11",
    "iso2": "LI",
    "latitude": -14.0475228,
    "longitude": 33.617577
  },
  {
    "id": 3102,
    "name": "Blantyre District",
    "countryId": 131,
    "countryCode": "MW",
    "fipsCode": "24",
    "iso2": "BL",
    "latitude": -15.6778541,
    "longitude": 34.9506625
  },
  {
    "id": 3103,
    "name": "Mulanje District",
    "countryId": 131,
    "countryCode": "MW",
    "fipsCode": "29",
    "iso2": "MU",
    "latitude": -15.9346434,
    "longitude": 35.5220012
  },
  {
    "id": 3104,
    "name": "Mzimba District",
    "countryId": 131,
    "countryCode": "MW",
    "fipsCode": "15",
    "iso2": "MZ",
    "latitude": -11.7475452,
    "longitude": 33.5280072
  },
  {
    "id": 3105,
    "name": "Northern Region",
    "countryId": 131,
    "countryCode": "MW",
    "fipsCode": "N",
    "iso2": "N",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 3106,
    "name": "Southern Region",
    "countryId": 131,
    "countryCode": "MW",
    "fipsCode": "S",
    "iso2": "S",
    "latitude": 32.7504957,
    "longitude": -97.3315476
  },
  {
    "id": 3107,
    "name": "Chikwawa District",
    "countryId": 131,
    "countryCode": "MW",
    "fipsCode": "02",
    "iso2": "CK",
    "latitude": -16.1958446,
    "longitude": 34.7740793
  },
  {
    "id": 3108,
    "name": "Phalombe District",
    "countryId": 131,
    "countryCode": "MW",
    "fipsCode": "30",
    "iso2": "PH",
    "latitude": -15.7092038,
    "longitude": 35.6532848
  },
  {
    "id": 3109,
    "name": "Chiradzulu District",
    "countryId": 131,
    "countryCode": "MW",
    "fipsCode": "03",
    "iso2": "CR",
    "latitude": -15.7423151,
    "longitude": 35.2587964
  },
  {
    "id": 3110,
    "name": "Mangochi District",
    "countryId": 131,
    "countryCode": "MW",
    "fipsCode": "12",
    "iso2": "MG",
    "latitude": -14.1388248,
    "longitude": 35.0388164
  },
  {
    "id": 3111,
    "name": "Ntchisi District",
    "countryId": 131,
    "countryCode": "MW",
    "fipsCode": "20",
    "iso2": "NI",
    "latitude": -13.2841992,
    "longitude": 33.8857747
  },
  {
    "id": 3112,
    "name": "Kénédougou Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "54",
    "iso2": "KEN",
    "latitude": 11.3919395,
    "longitude": -4.976654
  },
  {
    "id": 3113,
    "name": "Namentenga Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "64",
    "iso2": "NAM",
    "latitude": 13.0812584,
    "longitude": -0.5257823
  },
  {
    "id": 3114,
    "name": "Sahel Region",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "12",
    "iso2": "12",
    "latitude": 14.1000865,
    "longitude": -0.1494988
  },
  {
    "id": 3115,
    "name": "Centre-Ouest Region",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "06",
    "iso2": "06",
    "latitude": 11.8798466,
    "longitude": -2.302446
  },
  {
    "id": 3116,
    "name": "Nahouri Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "65",
    "iso2": "NAO",
    "latitude": 11.2502267,
    "longitude": -1.135302
  },
  {
    "id": 3117,
    "name": "Passoré Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "34",
    "iso2": "PAS",
    "latitude": 12.8881221,
    "longitude": -2.2236667
  },
  {
    "id": 3118,
    "name": "Zoundwéogo Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "44",
    "iso2": "ZOU",
    "latitude": 11.6141174,
    "longitude": -0.9820668
  },
  {
    "id": 3119,
    "name": "Sissili Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "72",
    "iso2": "SIS",
    "latitude": 11.2441219,
    "longitude": -2.2236667
  },
  {
    "id": 3120,
    "name": "Banwa Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "46",
    "iso2": "BAN",
    "latitude": 12.1323053,
    "longitude": -4.1513764
  },
  {
    "id": 3121,
    "name": "Bougouriba Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "48",
    "iso2": "BGR",
    "latitude": 10.8722646,
    "longitude": -3.3388917
  },
  {
    "id": 3122,
    "name": "Gnagna Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "21",
    "iso2": "GNA",
    "latitude": 12.8974992,
    "longitude": 0.0746767
  },
  {
    "id": 3123,
    "name": "Mouhoun",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "63",
    "iso2": "MOU",
    "latitude": 12.1432381,
    "longitude": -3.3388917
  },
  {
    "id": 3124,
    "name": "Yagha Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "75",
    "iso2": "YAG",
    "latitude": 13.3576157,
    "longitude": 0.7532809
  },
  {
    "id": 3125,
    "name": "Plateau-Central Region",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "11",
    "iso2": "11",
    "latitude": 12.2537648,
    "longitude": -0.7532809
  },
  {
    "id": 3126,
    "name": "Sanmatenga Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "70",
    "iso2": "SMT",
    "latitude": 13.3565304,
    "longitude": -1.0586135
  },
  {
    "id": 3127,
    "name": "Centre-Nord Region",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "05",
    "iso2": "05",
    "latitude": 13.1724464,
    "longitude": -0.9056623
  },
  {
    "id": 3128,
    "name": "Tapoa Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "42",
    "iso2": "TAP",
    "latitude": 12.2497072,
    "longitude": 1.6760691
  },
  {
    "id": 3129,
    "name": "Houet Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "51",
    "iso2": "HOU",
    "latitude": 11.1320447,
    "longitude": -4.2333355
  },
  {
    "id": 3130,
    "name": "Zondoma Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "78",
    "iso2": "ZON",
    "latitude": 13.1165926,
    "longitude": -2.4208713
  },
  {
    "id": 3131,
    "name": "Boulgou",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "49",
    "iso2": "BLG",
    "latitude": 11.4336766,
    "longitude": -0.3748354
  },
  {
    "id": 3132,
    "name": "Komondjari Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "56",
    "iso2": "KMD",
    "latitude": 12.7126527,
    "longitude": 0.6773046
  },
  {
    "id": 3133,
    "name": "Koulpélogo Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "59",
    "iso2": "KOP",
    "latitude": 11.5247674,
    "longitude": 0.1494988
  },
  {
    "id": 3134,
    "name": "Tuy Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "74",
    "iso2": "TUI",
    "latitude": 38.888684,
    "longitude": -77.004719
  },
  {
    "id": 3135,
    "name": "Ioba Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "52",
    "iso2": "IOB",
    "latitude": 11.0562034,
    "longitude": -3.0175712
  },
  {
    "id": 3136,
    "name": "Centre",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "03",
    "iso2": "03",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 3137,
    "name": "Sourou Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "73",
    "iso2": "SOR",
    "latitude": 13.341803,
    "longitude": -2.9375739
  },
  {
    "id": 3138,
    "name": "Boucle du Mouhoun Region",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "01",
    "iso2": "01",
    "latitude": 12.4166,
    "longitude": -3.4195527
  },
  {
    "id": 3139,
    "name": "Séno Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "71",
    "iso2": "SEN",
    "latitude": 14.0072234,
    "longitude": -0.0746767
  },
  {
    "id": 3140,
    "name": "Sud-Ouest Region",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "13",
    "iso2": "13",
    "latitude": 10.4231493,
    "longitude": -3.2583626
  },
  {
    "id": 3141,
    "name": "Oubritenga Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "68",
    "iso2": "OUB",
    "latitude": 12.7096087,
    "longitude": -1.443469
  },
  {
    "id": 3142,
    "name": "Nayala Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "66",
    "iso2": "NAY",
    "latitude": 12.6964558,
    "longitude": -3.0175712
  },
  {
    "id": 3143,
    "name": "Gourma Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "50",
    "iso2": "GOU",
    "latitude": 12.1624473,
    "longitude": 0.6773046
  },
  {
    "id": 3144,
    "name": "Oudalan Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "33",
    "iso2": "OUD",
    "latitude": 14.471902,
    "longitude": -0.4502368
  },
  {
    "id": 3145,
    "name": "Ziro Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "77",
    "iso2": "ZIR",
    "latitude": 11.6094995,
    "longitude": -1.9099238
  },
  {
    "id": 3146,
    "name": "Kossi Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "58",
    "iso2": "KOS",
    "latitude": 12.960458,
    "longitude": -3.9062688
  },
  {
    "id": 3147,
    "name": "Kourwéogo Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "60",
    "iso2": "KOW",
    "latitude": 12.7077495,
    "longitude": -1.7538817
  },
  {
    "id": 3148,
    "name": "Ganzourgou Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "20",
    "iso2": "GAN",
    "latitude": 12.2537648,
    "longitude": -0.7532809
  },
  {
    "id": 3149,
    "name": "Centre-Sud Region",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "07",
    "iso2": "07",
    "latitude": 11.5228911,
    "longitude": -1.0586135
  },
  {
    "id": 3150,
    "name": "Yatenga Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "76",
    "iso2": "YAT",
    "latitude": 13.6249344,
    "longitude": -2.3813621
  },
  {
    "id": 3151,
    "name": "Loroum Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "62",
    "iso2": "LOR",
    "latitude": 13.8129814,
    "longitude": -2.0665197
  },
  {
    "id": 3152,
    "name": "Bazèga Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "47",
    "iso2": "BAZ",
    "latitude": 11.9767692,
    "longitude": -1.443469
  },
  {
    "id": 3153,
    "name": "Cascades Region",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "02",
    "iso2": "02",
    "latitude": 10.4072992,
    "longitude": -4.5624426
  },
  {
    "id": 3154,
    "name": "Sanguié Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "36",
    "iso2": "SNG",
    "latitude": 12.1501861,
    "longitude": -2.6983868
  },
  {
    "id": 3155,
    "name": "Bam Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "15",
    "iso2": "BAM",
    "latitude": 13.446133,
    "longitude": -1.5983959
  },
  {
    "id": 3156,
    "name": "Noumbiel Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "67",
    "iso2": "NOU",
    "latitude": 9.8440946,
    "longitude": -2.9775558
  },
  {
    "id": 3157,
    "name": "Kompienga Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "57",
    "iso2": "KMP",
    "latitude": 11.5238362,
    "longitude": 0.7532809
  },
  {
    "id": 3158,
    "name": "Est Region",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "57",
    "iso2": "08",
    "latitude": 12.4365526,
    "longitude": 0.9056623
  },
  {
    "id": 3159,
    "name": "Léraba Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "61",
    "iso2": "LER",
    "latitude": 10.6648785,
    "longitude": -5.3102505
  },
  {
    "id": 3160,
    "name": "Balé Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "45",
    "iso2": "BAL",
    "latitude": 11.7820602,
    "longitude": -3.0175712
  },
  {
    "id": 3161,
    "name": "Kouritenga Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "28",
    "iso2": "KOT",
    "latitude": 12.1631813,
    "longitude": -0.2244662
  },
  {
    "id": 3162,
    "name": "Centre-Est Region",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "28",
    "iso2": "04",
    "latitude": 11.5247674,
    "longitude": -0.1494988
  },
  {
    "id": 3163,
    "name": "Poni Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "69",
    "iso2": "PON",
    "latitude": 10.3325996,
    "longitude": -3.3388917
  },
  {
    "id": 3164,
    "name": "Nord Region, Burkina Faso",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "69",
    "iso2": "10",
    "latitude": 13.718252,
    "longitude": -2.302446
  },
  {
    "id": 3165,
    "name": "Hauts-Bassins Region",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "09",
    "iso2": "09",
    "latitude": 11.4942003,
    "longitude": -4.2333355
  },
  {
    "id": 3166,
    "name": "Soum Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "40",
    "iso2": "SOM",
    "latitude": 14.0962841,
    "longitude": -1.366216
  },
  {
    "id": 3167,
    "name": "Comoé Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "55",
    "iso2": "COM",
    "latitude": 10.4072992,
    "longitude": -4.5624426
  },
  {
    "id": 3168,
    "name": "Kadiogo Province",
    "countryId": 35,
    "countryCode": "BF",
    "fipsCode": "53",
    "iso2": "KAD",
    "latitude": 12.3425897,
    "longitude": -1.443469
  },
  {
    "id": 3169,
    "name": "Islamabad Capital Territory",
    "countryId": 167,
    "countryCode": "PK",
    "fipsCode": "08",
    "iso2": "IS",
    "latitude": 33.7204997,
    "longitude": 73.0405277
  },
  {
    "id": 3170,
    "name": "Gilgit-Baltistan",
    "countryId": 167,
    "countryCode": "PK",
    "fipsCode": "07",
    "iso2": "GB",
    "latitude": 35.8025667,
    "longitude": 74.9831808
  },
  {
    "id": 3171,
    "name": "Khyber Pakhtunkhwa",
    "countryId": 167,
    "countryCode": "PK",
    "fipsCode": "03",
    "iso2": "KP",
    "latitude": 34.9526205,
    "longitude": 72.331113
  },
  {
    "id": 3172,
    "name": "Azad Kashmir",
    "countryId": 167,
    "countryCode": "PK",
    "fipsCode": "06",
    "iso2": "JK",
    "latitude": 33.9259055,
    "longitude": 73.7810334
  },
  {
    "id": 3173,
    "name": "Federally Administered Tribal Areas",
    "countryId": 167,
    "countryCode": "PK",
    "fipsCode": "01",
    "iso2": "TA",
    "latitude": 32.667476,
    "longitude": 69.8597406
  },
  {
    "id": 3174,
    "name": "Balochistan",
    "countryId": 167,
    "countryCode": "PK",
    "fipsCode": "02",
    "iso2": "BA",
    "latitude": 28.4907332,
    "longitude": 65.0957792
  },
  {
    "id": 3175,
    "name": "Sindh",
    "countryId": 167,
    "countryCode": "PK",
    "fipsCode": "05",
    "iso2": "SD",
    "latitude": 25.8943018,
    "longitude": 68.5247149
  },
  {
    "id": 3176,
    "name": "Punjab",
    "countryId": 167,
    "countryCode": "PK",
    "fipsCode": "04",
    "iso2": "PB",
    "latitude": 31.1471305,
    "longitude": 75.3412179
  },
  {
    "id": 3177,
    "name": "Al Rayyan Municipality",
    "countryId": 179,
    "countryCode": "QA",
    "fipsCode": "06",
    "iso2": "RA",
    "latitude": 25.2522551,
    "longitude": 51.4388713
  },
  {
    "id": 3178,
    "name": "Al-Shahaniya",
    "countryId": 179,
    "countryCode": "QA",
    "fipsCode": "14",
    "iso2": "SH",
    "latitude": 25.4106386,
    "longitude": 51.1846025
  },
  {
    "id": 3179,
    "name": "Al Wakrah",
    "countryId": 179,
    "countryCode": "QA",
    "fipsCode": "10",
    "iso2": "WA",
    "latitude": 25.1659314,
    "longitude": 51.5975524
  },
  {
    "id": 3180,
    "name": "Madinat ash Shamal",
    "countryId": 179,
    "countryCode": "QA",
    "fipsCode": "08",
    "iso2": "MS",
    "latitude": 26.1182743,
    "longitude": 51.2157265
  },
  {
    "id": 3181,
    "name": "Doha",
    "countryId": 179,
    "countryCode": "QA",
    "fipsCode": "01",
    "iso2": "DA",
    "latitude": 25.2854473,
    "longitude": 51.5310398
  },
  {
    "id": 3182,
    "name": "Al Daayen",
    "countryId": 179,
    "countryCode": "QA",
    "fipsCode": "01",
    "iso2": "ZA",
    "latitude": 25.5784559,
    "longitude": 51.4821387
  },
  {
    "id": 3183,
    "name": "Al Khor",
    "countryId": 179,
    "countryCode": "QA",
    "fipsCode": "04",
    "iso2": "KH",
    "latitude": 25.6804078,
    "longitude": 51.4968502
  },
  {
    "id": 3184,
    "name": "Umm Salal Municipality",
    "countryId": 179,
    "countryCode": "QA",
    "fipsCode": "09",
    "iso2": "US",
    "latitude": 25.4875242,
    "longitude": 51.396568
  },
  {
    "id": 3185,
    "name": "Rumonge Province",
    "countryId": 36,
    "countryCode": "BI",
    "fipsCode": "26",
    "iso2": "RM",
    "latitude": -3.9754049,
    "longitude": 29.4388014
  },
  {
    "id": 3186,
    "name": "Muyinga Province",
    "countryId": 36,
    "countryCode": "BI",
    "fipsCode": "18",
    "iso2": "MY",
    "latitude": -2.7793511,
    "longitude": 30.2974199
  },
  {
    "id": 3187,
    "name": "Mwaro Province",
    "countryId": 36,
    "countryCode": "BI",
    "fipsCode": "23",
    "iso2": "MW",
    "latitude": -3.5025918,
    "longitude": 29.6499162
  },
  {
    "id": 3188,
    "name": "Makamba Province",
    "countryId": 36,
    "countryCode": "BI",
    "fipsCode": "17",
    "iso2": "MA",
    "latitude": -4.3257062,
    "longitude": 29.6962677
  },
  {
    "id": 3189,
    "name": "Rutana Province",
    "countryId": 36,
    "countryCode": "BI",
    "fipsCode": "20",
    "iso2": "RT",
    "latitude": -3.8791523,
    "longitude": 30.0665236
  },
  {
    "id": 3190,
    "name": "Cibitoke Province",
    "countryId": 36,
    "countryCode": "BI",
    "fipsCode": "12",
    "iso2": "CI",
    "latitude": -2.8102897,
    "longitude": 29.1855785
  },
  {
    "id": 3191,
    "name": "Ruyigi Province",
    "countryId": 36,
    "countryCode": "BI",
    "fipsCode": "21",
    "iso2": "RY",
    "latitude": -3.446207,
    "longitude": 30.2512728
  },
  {
    "id": 3192,
    "name": "Kayanza Province",
    "countryId": 36,
    "countryCode": "BI",
    "fipsCode": "15",
    "iso2": "KY",
    "latitude": -3.0077981,
    "longitude": 29.6499162
  },
  {
    "id": 3193,
    "name": "Muramvya Province",
    "countryId": 36,
    "countryCode": "BI",
    "fipsCode": "22",
    "iso2": "MU",
    "latitude": -3.2898398,
    "longitude": 29.6499162
  },
  {
    "id": 3194,
    "name": "Karuzi Province",
    "countryId": 36,
    "countryCode": "BI",
    "fipsCode": "14",
    "iso2": "KR",
    "latitude": -3.1340347,
    "longitude": 30.112735
  },
  {
    "id": 3195,
    "name": "Kirundo Province",
    "countryId": 36,
    "countryCode": "BI",
    "fipsCode": "16",
    "iso2": "KI",
    "latitude": -2.5762882,
    "longitude": 30.112735
  },
  {
    "id": 3196,
    "name": "Bubanza Province",
    "countryId": 36,
    "countryCode": "BI",
    "fipsCode": "09",
    "iso2": "BB",
    "latitude": -3.1572403,
    "longitude": 29.3714909
  },
  {
    "id": 3197,
    "name": "Gitega Province",
    "countryId": 36,
    "countryCode": "BI",
    "fipsCode": "13",
    "iso2": "GI",
    "latitude": -3.4929051,
    "longitude": 29.9277947
  },
  {
    "id": 3198,
    "name": "Bujumbura Mairie Province",
    "countryId": 36,
    "countryCode": "BI",
    "fipsCode": "24",
    "iso2": "BM",
    "latitude": -3.3884141,
    "longitude": 29.3482646
  },
  {
    "id": 3199,
    "name": "Ngozi Province",
    "countryId": 36,
    "countryCode": "BI",
    "fipsCode": "19",
    "iso2": "NG",
    "latitude": -2.8958243,
    "longitude": 29.8815203
  },
  {
    "id": 3200,
    "name": "Bujumbura Rural Province",
    "countryId": 36,
    "countryCode": "BI",
    "fipsCode": "25",
    "iso2": "BL",
    "latitude": -3.5090144,
    "longitude": 29.464359
  },
  {
    "id": 3201,
    "name": "Cankuzo Province",
    "countryId": 36,
    "countryCode": "BI",
    "fipsCode": "11",
    "iso2": "CA",
    "latitude": -3.1527788,
    "longitude": 30.6199895
  },
  {
    "id": 3202,
    "name": "Bururi Province",
    "countryId": 36,
    "countryCode": "BI",
    "fipsCode": "10",
    "iso2": "BR",
    "latitude": -3.9006851,
    "longitude": 29.5107708
  },
  {
    "id": 3203,
    "name": "Flores Department",
    "countryId": 235,
    "countryCode": "UY",
    "fipsCode": "06",
    "iso2": "FS",
    "latitude": -33.5733753,
    "longitude": -56.8945028
  },
  {
    "id": 3204,
    "name": "San José Department",
    "countryId": 235,
    "countryCode": "UY",
    "fipsCode": "16",
    "iso2": "SJ",
    "latitude": 37.3492968,
    "longitude": -121.9056049
  },
  {
    "id": 3205,
    "name": "Artigas Department",
    "countryId": 235,
    "countryCode": "UY",
    "fipsCode": "01",
    "iso2": "AR",
    "latitude": -30.6175112,
    "longitude": -56.9594559
  },
  {
    "id": 3206,
    "name": "Maldonado Department",
    "countryId": 235,
    "countryCode": "UY",
    "fipsCode": "09",
    "iso2": "MA",
    "latitude": -34.5597932,
    "longitude": -54.8628552
  },
  {
    "id": 3207,
    "name": "Rivera Department",
    "countryId": 235,
    "countryCode": "UY",
    "fipsCode": "13",
    "iso2": "RV",
    "latitude": -31.4817421,
    "longitude": -55.2435759
  },
  {
    "id": 3208,
    "name": "Colonia Department",
    "countryId": 235,
    "countryCode": "UY",
    "fipsCode": "04",
    "iso2": "CO",
    "latitude": -34.1294678,
    "longitude": -57.6605184
  },
  {
    "id": 3209,
    "name": "Durazno Department",
    "countryId": 235,
    "countryCode": "UY",
    "fipsCode": "05",
    "iso2": "DU",
    "latitude": -33.0232454,
    "longitude": -56.0284644
  },
  {
    "id": 3210,
    "name": "Río Negro Department",
    "countryId": 235,
    "countryCode": "UY",
    "fipsCode": "12",
    "iso2": "RN",
    "latitude": -32.7676356,
    "longitude": -57.4295207
  },
  {
    "id": 3211,
    "name": "Cerro Largo Department",
    "countryId": 235,
    "countryCode": "UY",
    "fipsCode": "03",
    "iso2": "CL",
    "latitude": -32.4411032,
    "longitude": -54.3521753
  },
  {
    "id": 3212,
    "name": "Paysandú Department",
    "countryId": 235,
    "countryCode": "UY",
    "fipsCode": "11",
    "iso2": "PA",
    "latitude": -32.0667366,
    "longitude": -57.3364789
  },
  {
    "id": 3213,
    "name": "Canelones Department",
    "countryId": 235,
    "countryCode": "UY",
    "fipsCode": "02",
    "iso2": "CA",
    "latitude": -34.5408717,
    "longitude": -55.93076
  },
  {
    "id": 3214,
    "name": "Treinta y Tres Department",
    "countryId": 235,
    "countryCode": "UY",
    "fipsCode": "19",
    "iso2": "TT",
    "latitude": -33.0685086,
    "longitude": -54.2858627
  },
  {
    "id": 3215,
    "name": "Lavalleja Department",
    "countryId": 235,
    "countryCode": "UY",
    "fipsCode": "08",
    "iso2": "LA",
    "latitude": -33.9226175,
    "longitude": -54.9765794
  },
  {
    "id": 3216,
    "name": "Rocha Department",
    "countryId": 235,
    "countryCode": "UY",
    "fipsCode": "14",
    "iso2": "RO",
    "latitude": -33.9690081,
    "longitude": -54.021485
  },
  {
    "id": 3217,
    "name": "Florida Department",
    "countryId": 235,
    "countryCode": "UY",
    "fipsCode": "07",
    "iso2": "FD",
    "latitude": 28.0359495,
    "longitude": -82.4579289
  },
  {
    "id": 3218,
    "name": "Montevideo Department",
    "countryId": 235,
    "countryCode": "UY",
    "fipsCode": "10",
    "iso2": "MO",
    "latitude": -34.8181587,
    "longitude": -56.2138256
  },
  {
    "id": 3219,
    "name": "Soriano Department",
    "countryId": 235,
    "countryCode": "UY",
    "fipsCode": "17",
    "iso2": "SO",
    "latitude": -33.5102792,
    "longitude": -57.7498103
  },
  {
    "id": 3220,
    "name": "Salto Department",
    "countryId": 235,
    "countryCode": "UY",
    "fipsCode": "15",
    "iso2": "SA",
    "latitude": -31.388028,
    "longitude": -57.9612455
  },
  {
    "id": 3221,
    "name": "Tacuarembó Department",
    "countryId": 235,
    "countryCode": "UY",
    "fipsCode": "18",
    "iso2": "TA",
    "latitude": -31.7206837,
    "longitude": -55.9859887
  },
  {
    "id": 3222,
    "name": "Kafr el-Sheikh Governorate",
    "countryId": 65,
    "countryCode": "EG",
    "fipsCode": "21",
    "iso2": "KFS",
    "latitude": 31.3085444,
    "longitude": 30.8039474
  },
  {
    "id": 3223,
    "name": "Cairo Governorate",
    "countryId": 65,
    "countryCode": "EG",
    "fipsCode": "11",
    "iso2": "C",
    "latitude": 29.9537564,
    "longitude": 31.5370003
  },
  {
    "id": 3224,
    "name": "Damietta Governorate",
    "countryId": 65,
    "countryCode": "EG",
    "fipsCode": "20",
    "iso2": "DT",
    "latitude": 31.3625799,
    "longitude": 31.6739371
  },
  {
    "id": 3225,
    "name": "Aswan Governorate",
    "countryId": 65,
    "countryCode": "EG",
    "fipsCode": "16",
    "iso2": "ASN",
    "latitude": 23.6966498,
    "longitude": 32.7181375
  },
  {
    "id": 3226,
    "name": "Sohag Governorate",
    "countryId": 65,
    "countryCode": "EG",
    "fipsCode": "24",
    "iso2": "SHG",
    "latitude": 26.693834,
    "longitude": 32.174605
  },
  {
    "id": 3227,
    "name": "North Sinai Governorate",
    "countryId": 65,
    "countryCode": "EG",
    "fipsCode": "27",
    "iso2": "SIN",
    "latitude": 30.282365,
    "longitude": 33.617577
  },
  {
    "id": 3228,
    "name": "Monufia Governorate",
    "countryId": 65,
    "countryCode": "EG",
    "fipsCode": "09",
    "iso2": "MNF",
    "latitude": 30.5972455,
    "longitude": 30.9876321
  },
  {
    "id": 3229,
    "name": "Port Said Governorate",
    "countryId": 65,
    "countryCode": "EG",
    "fipsCode": "19",
    "iso2": "PTS",
    "latitude": 31.0758606,
    "longitude": 32.2653887
  },
  {
    "id": 3230,
    "name": "Beni Suef Governorate",
    "countryId": 65,
    "countryCode": "EG",
    "fipsCode": "18",
    "iso2": "BNS",
    "latitude": 28.8938837,
    "longitude": 31.4456179
  },
  {
    "id": 3231,
    "name": "Matrouh Governorate",
    "countryId": 65,
    "countryCode": "EG",
    "fipsCode": "22",
    "iso2": "MT",
    "latitude": 29.569635,
    "longitude": 26.419389
  },
  {
    "id": 3232,
    "name": "Qalyubia Governorate",
    "countryId": 65,
    "countryCode": "EG",
    "fipsCode": "12",
    "iso2": "KB",
    "latitude": 30.3292368,
    "longitude": 31.2168466
  },
  {
    "id": 3233,
    "name": "Suez Governorate",
    "countryId": 65,
    "countryCode": "EG",
    "fipsCode": "15",
    "iso2": "SUZ",
    "latitude": 29.3682255,
    "longitude": 32.174605
  },
  {
    "id": 3234,
    "name": "Gharbia Governorate",
    "countryId": 65,
    "countryCode": "EG",
    "fipsCode": "05",
    "iso2": "GH",
    "latitude": 30.8753556,
    "longitude": 31.03351
  },
  {
    "id": 3235,
    "name": "Alexandria Governorate",
    "countryId": 65,
    "countryCode": "EG",
    "fipsCode": "06",
    "iso2": "ALX",
    "latitude": 30.8760568,
    "longitude": 29.742604
  },
  {
    "id": 3236,
    "name": "Asyut Governorate",
    "countryId": 65,
    "countryCode": "EG",
    "fipsCode": "17",
    "iso2": "AST",
    "latitude": 27.2133831,
    "longitude": 31.4456179
  },
  {
    "id": 3237,
    "name": "South Sinai Governorate",
    "countryId": 65,
    "countryCode": "EG",
    "fipsCode": "26",
    "iso2": "JS",
    "latitude": 29.3101828,
    "longitude": 34.1531947
  },
  {
    "id": 3238,
    "name": "Faiyum Governorate",
    "countryId": 65,
    "countryCode": "EG",
    "fipsCode": "04",
    "iso2": "FYM",
    "latitude": 29.3084021,
    "longitude": 30.8428497
  },
  {
    "id": 3239,
    "name": "Giza Governorate",
    "countryId": 65,
    "countryCode": "EG",
    "fipsCode": "08",
    "iso2": "GZ",
    "latitude": 28.7666216,
    "longitude": 29.2320784
  },
  {
    "id": 3240,
    "name": "Red Sea Governorate",
    "countryId": 65,
    "countryCode": "EG",
    "fipsCode": "02",
    "iso2": "BA",
    "latitude": 24.6826316,
    "longitude": 34.1531947
  },
  {
    "id": 3241,
    "name": "Beheira Governorate",
    "countryId": 65,
    "countryCode": "EG",
    "fipsCode": "03",
    "iso2": "BH",
    "latitude": 30.8480986,
    "longitude": 30.3435506
  },
  {
    "id": 3242,
    "name": "Luxor Governorate",
    "countryId": 65,
    "countryCode": "EG",
    "fipsCode": "28",
    "iso2": "LX",
    "latitude": 25.3944444,
    "longitude": 32.4920088
  },
  {
    "id": 3243,
    "name": "Minya Governorate",
    "countryId": 65,
    "countryCode": "EG",
    "fipsCode": "10",
    "iso2": "MN",
    "latitude": 28.284729,
    "longitude": 30.5279096
  },
  {
    "id": 3244,
    "name": "Ismailia Governorate",
    "countryId": 65,
    "countryCode": "EG",
    "fipsCode": "07",
    "iso2": "IS",
    "latitude": 30.5830934,
    "longitude": 32.2653887
  },
  {
    "id": 3245,
    "name": "Dakahlia Governorate",
    "countryId": 65,
    "countryCode": "EG",
    "fipsCode": "01",
    "iso2": "DK",
    "latitude": 31.1656044,
    "longitude": 31.4913182
  },
  {
    "id": 3246,
    "name": "New Valley Governorate",
    "countryId": 65,
    "countryCode": "EG",
    "fipsCode": "13",
    "iso2": "WAD",
    "latitude": 24.5455638,
    "longitude": 27.1735316
  },
  {
    "id": 3247,
    "name": "Qena Governorate",
    "countryId": 65,
    "countryCode": "EG",
    "fipsCode": "23",
    "iso2": "KN",
    "latitude": 26.2346033,
    "longitude": 32.9888319
  },
  {
    "id": 3248,
    "name": "Agaléga",
    "countryId": 140,
    "countryCode": "MU",
    "fipsCode": "21",
    "iso2": "AG",
    "latitude": -10.4,
    "longitude": 56.6166667
  },
  {
    "id": 3249,
    "name": "Rodrigues",
    "countryId": 140,
    "countryCode": "MU",
    "fipsCode": "23",
    "iso2": "RO",
    "latitude": -19.7245385,
    "longitude": 63.4272185
  },
  {
    "id": 3250,
    "name": "Pamplemousses District",
    "countryId": 140,
    "countryCode": "MU",
    "fipsCode": "16",
    "iso2": "PA",
    "latitude": -20.1136008,
    "longitude": 57.575926
  },
  {
    "id": 3251,
    "name": "Cargados Carajos",
    "countryId": 140,
    "countryCode": "MU",
    "fipsCode": "22",
    "iso2": "CC",
    "latitude": -16.583333,
    "longitude": 59.616667
  },
  {
    "id": 3252,
    "name": "Vacoas-Phoenix",
    "countryId": 140,
    "countryCode": "MU",
    "fipsCode": "22",
    "iso2": "VP",
    "latitude": -20.2984026,
    "longitude": 57.4938355
  },
  {
    "id": 3253,
    "name": "Moka District",
    "countryId": 140,
    "countryCode": "MU",
    "fipsCode": "15",
    "iso2": "MO",
    "latitude": -20.2399782,
    "longitude": 57.575926
  },
  {
    "id": 3254,
    "name": "Flacq District",
    "countryId": 140,
    "countryCode": "MU",
    "fipsCode": "13",
    "iso2": "FL",
    "latitude": -20.2257836,
    "longitude": 57.7119274
  },
  {
    "id": 3255,
    "name": "Curepipe",
    "countryId": 140,
    "countryCode": "MU",
    "fipsCode": "13",
    "iso2": "CU",
    "latitude": -20.3170872,
    "longitude": 57.5265289
  },
  {
    "id": 3256,
    "name": "Port Louis",
    "countryId": 140,
    "countryCode": "MU",
    "fipsCode": "18",
    "iso2": "PU",
    "latitude": -20.1608912,
    "longitude": 57.5012222
  },
  {
    "id": 3257,
    "name": "Savanne District",
    "countryId": 140,
    "countryCode": "MU",
    "fipsCode": "20",
    "iso2": "SA",
    "latitude": -20.473953,
    "longitude": 57.4853561
  },
  {
    "id": 3258,
    "name": "Quatre Bornes",
    "countryId": 140,
    "countryCode": "MU",
    "fipsCode": "20",
    "iso2": "QB",
    "latitude": -20.2674718,
    "longitude": 57.4796981
  },
  {
    "id": 3259,
    "name": "Rivière Noire District",
    "countryId": 140,
    "countryCode": "MU",
    "fipsCode": "12",
    "iso2": "BL",
    "latitude": -20.3708492,
    "longitude": 57.3948649
  },
  {
    "id": 3260,
    "name": "Port Louis District",
    "countryId": 140,
    "countryCode": "MU",
    "fipsCode": "18",
    "iso2": "PL",
    "latitude": -20.1608912,
    "longitude": 57.5012222
  },
  {
    "id": 3261,
    "name": "Rivière du Rempart District",
    "countryId": 140,
    "countryCode": "MU",
    "fipsCode": "19",
    "iso2": "RR",
    "latitude": -20.0560983,
    "longitude": 57.6552389
  },
  {
    "id": 3262,
    "name": "Beau Bassin-Rose Hill",
    "countryId": 140,
    "countryCode": "MU",
    "fipsCode": "19",
    "iso2": "BR",
    "latitude": -20.2230305,
    "longitude": 57.468383
  },
  {
    "id": 3263,
    "name": "Plaines Wilhems District",
    "countryId": 140,
    "countryCode": "MU",
    "fipsCode": "17",
    "iso2": "PW",
    "latitude": -20.3054872,
    "longitude": 57.4853561
  },
  {
    "id": 3264,
    "name": "Grand Port District",
    "countryId": 140,
    "countryCode": "MU",
    "fipsCode": "14",
    "iso2": "GP",
    "latitude": -20.3851546,
    "longitude": 57.6665742
  },
  {
    "id": 3265,
    "name": "Guelmim Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "10",
    "iso2": "GUE",
    "latitude": 28.9883659,
    "longitude": -10.0527498
  },
  {
    "id": 3266,
    "name": "Aousserd Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "10",
    "iso2": "AOU",
    "latitude": 22.5521538,
    "longitude": -14.3297353
  },
  {
    "id": 3267,
    "name": "Al Hoceïma Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "01",
    "iso2": "HOC",
    "latitude": 35.2445589,
    "longitude": -3.9317468
  },
  {
    "id": 3268,
    "name": "Larache Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "01",
    "iso2": "LAR",
    "latitude": 35.1744271,
    "longitude": -6.1473964
  },
  {
    "id": 3269,
    "name": "Ouarzazate Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "01",
    "iso2": "OUA",
    "latitude": 30.9335436,
    "longitude": -6.937016
  },
  {
    "id": 3270,
    "name": "Boulemane Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "01",
    "iso2": "BOM",
    "latitude": 33.3625159,
    "longitude": -4.7303397
  },
  {
    "id": 3271,
    "name": "Oriental",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "02",
    "iso2": "02",
    "latitude": 37.069683,
    "longitude": -94.512277
  },
  {
    "id": 3272,
    "name": "Béni-Mellal Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "05",
    "iso2": "BEM",
    "latitude": 32.342443,
    "longitude": -6.375799
  },
  {
    "id": 3273,
    "name": "Sidi Youssef Ben Ali",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "05",
    "iso2": "SYB",
    "latitude": 31.6084373,
    "longitude": -7.9653067
  },
  {
    "id": 3274,
    "name": "Chichaoua Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "05",
    "iso2": "CHI",
    "latitude": 31.5383581,
    "longitude": -8.7646388
  },
  {
    "id": 3275,
    "name": "Boujdour Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "05",
    "iso2": "BOD",
    "latitude": 26.1252493,
    "longitude": -14.4847347
  },
  {
    "id": 3276,
    "name": "Khémisset Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "05",
    "iso2": "KHE",
    "latitude": 33.8153704,
    "longitude": -6.0573302
  },
  {
    "id": 3277,
    "name": "Tiznit Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "05",
    "iso2": "TIZ",
    "latitude": 29.693392,
    "longitude": -9.732157
  },
  {
    "id": 3278,
    "name": "Béni Mellal-Khénifra",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "05",
    "iso2": "05",
    "latitude": 32.5719184,
    "longitude": -6.0679194
  },
  {
    "id": 3279,
    "name": "Sidi Kacem Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "05",
    "iso2": "SIK",
    "latitude": 34.2260172,
    "longitude": -5.7129164
  },
  {
    "id": 3280,
    "name": "El Jadida Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "05",
    "iso2": "JDI",
    "latitude": 33.2316326,
    "longitude": -8.5007116
  },
  {
    "id": 3281,
    "name": "Nador Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "05",
    "iso2": "NAD",
    "latitude": 34.9171926,
    "longitude": -2.8577105
  },
  {
    "id": 3282,
    "name": "Settat Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "06",
    "iso2": "SET",
    "latitude": 32.9924242,
    "longitude": -7.6222665
  },
  {
    "id": 3283,
    "name": "Zagora Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "06",
    "iso2": "ZAG",
    "latitude": 30.5786093,
    "longitude": -5.8987139
  },
  {
    "id": 3284,
    "name": "Mediouna Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "06",
    "iso2": "MED",
    "latitude": 33.4540939,
    "longitude": -7.516602
  },
  {
    "id": 3285,
    "name": "Berkane Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "06",
    "iso2": "BER",
    "latitude": 34.8840876,
    "longitude": -2.341887
  },
  {
    "id": 3286,
    "name": "Tan-Tan Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "01",
    "iso2": "TNT",
    "latitude": 28.03012,
    "longitude": -11.1617356
  },
  {
    "id": 3287,
    "name": "Nouaceur Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "01",
    "iso2": "NOU",
    "latitude": 33.3670393,
    "longitude": -7.5732537
  },
  {
    "id": 3288,
    "name": "Marrakesh-Safi",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "07",
    "iso2": "07",
    "latitude": 31.7330833,
    "longitude": -8.1338558
  },
  {
    "id": 3289,
    "name": "Sefrou Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "07",
    "iso2": "SEF",
    "latitude": 33.8305244,
    "longitude": -4.8353154
  },
  {
    "id": 3290,
    "name": "Drâa-Tafilalet",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "08",
    "iso2": "08",
    "latitude": 31.1499538,
    "longitude": -5.3939551
  },
  {
    "id": 3291,
    "name": "El Hajeb Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "08",
    "iso2": "HAJ",
    "latitude": 33.685735,
    "longitude": -5.3677844
  },
  {
    "id": 3292,
    "name": "Es Semara Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "08",
    "iso2": "ESM",
    "latitude": 26.741856,
    "longitude": -11.6783671
  },
  {
    "id": 3293,
    "name": "Laâyoune Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "11",
    "iso2": "LAA",
    "latitude": 27.1500384,
    "longitude": -13.1990758
  },
  {
    "id": 3294,
    "name": "Inezgane-Aït Melloul Prefecture",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "11",
    "iso2": "INE",
    "latitude": 30.3509098,
    "longitude": -9.389511
  },
  {
    "id": 3295,
    "name": "Souss-Massa",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "09",
    "iso2": "09",
    "latitude": 30.2750611,
    "longitude": -8.1338558
  },
  {
    "id": 3296,
    "name": "Taza Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "09",
    "iso2": "TAZ",
    "latitude": 34.2788953,
    "longitude": -3.5812692
  },
  {
    "id": 3297,
    "name": "Assa-Zag Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "09",
    "iso2": "ASZ",
    "latitude": 28.1402395,
    "longitude": -9.7232673
  },
  {
    "id": 3298,
    "name": "Laâyoune-Sakia El Hamra",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "11",
    "iso2": "11",
    "latitude": 27.8683194,
    "longitude": -11.9804613
  },
  {
    "id": 3299,
    "name": "Errachidia Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "11",
    "iso2": "ERR",
    "latitude": 31.9051275,
    "longitude": -4.7277528
  },
  {
    "id": 3300,
    "name": "Fahs Anjra Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "11",
    "iso2": "FAH",
    "latitude": 35.7601992,
    "longitude": -5.6668306
  },
  {
    "id": 3301,
    "name": "Figuig Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "11",
    "iso2": "FIG",
    "latitude": 32.1092613,
    "longitude": -1.229806
  },
  {
    "id": 3302,
    "name": "Shtouka Ait Baha Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "11",
    "iso2": "CHT",
    "latitude": 30.1072422,
    "longitude": -9.2785583
  },
  {
    "id": 3303,
    "name": "Casablanca-Settat",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "06",
    "iso2": "06",
    "latitude": 33.2160872,
    "longitude": -7.4381355
  },
  {
    "id": 3304,
    "name": "Ben Slimane Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "05",
    "iso2": "BES",
    "latitude": 33.6189698,
    "longitude": -7.1305536
  },
  {
    "id": 3305,
    "name": "Guelmim-Oued Noun",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "10",
    "iso2": "10",
    "latitude": 28.4844281,
    "longitude": -10.0807298
  },
  {
    "id": 3306,
    "name": "Dakhla-Oued Ed-Dahab",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "12",
    "iso2": "12",
    "latitude": 22.7337892,
    "longitude": -14.2861116
  },
  {
    "id": 3307,
    "name": "Jerada Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "12",
    "iso2": "JRA",
    "latitude": 34.3061791,
    "longitude": -2.1794136
  },
  {
    "id": 3308,
    "name": "Kénitra Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "04",
    "iso2": "KEN",
    "latitude": 34.2540503,
    "longitude": -6.5890166
  },
  {
    "id": 3309,
    "name": "Kelaat Sraghna Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "04",
    "iso2": "KES",
    "latitude": 32.0522767,
    "longitude": -7.3516558
  },
  {
    "id": 3310,
    "name": "Chefchaouen Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "04",
    "iso2": "CHE",
    "latitude": 35.018172,
    "longitude": -5.1432068
  },
  {
    "id": 3311,
    "name": "Safi Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "07",
    "iso2": "SAF",
    "latitude": 32.2989872,
    "longitude": -9.1013498
  },
  {
    "id": 3312,
    "name": "Tata Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "07",
    "iso2": "TAT",
    "latitude": 29.750877,
    "longitude": -7.9756343
  },
  {
    "id": 3313,
    "name": "Fès-Meknès",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "03",
    "iso2": "03",
    "latitude": 34.062529,
    "longitude": -4.7277528
  },
  {
    "id": 3314,
    "name": "Taroudant Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "03",
    "iso2": "TAR",
    "latitude": 30.4727126,
    "longitude": -8.8748765
  },
  {
    "id": 3315,
    "name": "Moulay Yacoub Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "03",
    "iso2": "MOU",
    "latitude": 34.0874479,
    "longitude": -5.1784019
  },
  {
    "id": 3316,
    "name": "Essaouira Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "03",
    "iso2": "ESI",
    "latitude": 31.5084926,
    "longitude": -9.7595041
  },
  {
    "id": 3317,
    "name": "Khénifra Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "05",
    "iso2": "KHN",
    "latitude": 32.9340471,
    "longitude": -5.661571
  },
  {
    "id": 3318,
    "name": "Tétouan Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "01",
    "iso2": "TET",
    "latitude": 35.5888995,
    "longitude": -5.3625516
  },
  {
    "id": 3319,
    "name": "Oued Ed-Dahab Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "12",
    "iso2": "OUD",
    "latitude": 22.7337892,
    "longitude": -14.2861116
  },
  {
    "id": 3320,
    "name": "Al Haouz Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "12",
    "iso2": "HAO",
    "latitude": 31.2956729,
    "longitude": -7.87216
  },
  {
    "id": 3321,
    "name": "Azilal Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "12",
    "iso2": "AZI",
    "latitude": 32.004262,
    "longitude": -6.5783387
  },
  {
    "id": 3322,
    "name": "Taourirt Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "12",
    "iso2": "TAI",
    "latitude": 34.212598,
    "longitude": -2.6983868
  },
  {
    "id": 3323,
    "name": "Taounate Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "12",
    "iso2": "TAO",
    "latitude": 34.536917,
    "longitude": -4.6398693
  },
  {
    "id": 3324,
    "name": "Tanger-Tétouan-Al Hoceïma",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "01",
    "iso2": "01",
    "latitude": 35.2629558,
    "longitude": -5.5617279
  },
  {
    "id": 3325,
    "name": "Ifrane Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "01",
    "iso2": "IFR",
    "latitude": 33.5228062,
    "longitude": -5.1109552
  },
  {
    "id": 3326,
    "name": "Khouribga Province",
    "countryId": 149,
    "countryCode": "MA",
    "fipsCode": "01",
    "iso2": "KHO",
    "latitude": 32.886023,
    "longitude": -6.9208655
  },
  {
    "id": 3327,
    "name": "Cabo Delgado Province",
    "countryId": 150,
    "countryCode": "MZ",
    "fipsCode": "01",
    "iso2": "P",
    "latitude": -12.3335474,
    "longitude": 39.3206241
  },
  {
    "id": 3328,
    "name": "Zambezia Province",
    "countryId": 150,
    "countryCode": "MZ",
    "fipsCode": "09",
    "iso2": "Q",
    "latitude": -16.5638987,
    "longitude": 36.6093926
  },
  {
    "id": 3329,
    "name": "Gaza Province",
    "countryId": 150,
    "countryCode": "MZ",
    "fipsCode": "02",
    "iso2": "G",
    "latitude": -23.0221928,
    "longitude": 32.7181375
  },
  {
    "id": 3330,
    "name": "Inhambane Province",
    "countryId": 150,
    "countryCode": "MZ",
    "fipsCode": "03",
    "iso2": "I",
    "latitude": -22.8527997,
    "longitude": 34.5508758
  },
  {
    "id": 3331,
    "name": "Sofala Province",
    "countryId": 150,
    "countryCode": "MZ",
    "fipsCode": "05",
    "iso2": "S",
    "latitude": -19.2039073,
    "longitude": 34.8624166
  },
  {
    "id": 3332,
    "name": "Maputo Province",
    "countryId": 150,
    "countryCode": "MZ",
    "fipsCode": "04",
    "iso2": "L",
    "latitude": -25.2569876,
    "longitude": 32.5372741
  },
  {
    "id": 3333,
    "name": "Niassa Province",
    "countryId": 150,
    "countryCode": "MZ",
    "fipsCode": "07",
    "iso2": "A",
    "latitude": -12.7826202,
    "longitude": 36.6093926
  },
  {
    "id": 3334,
    "name": "Tete Province",
    "countryId": 150,
    "countryCode": "MZ",
    "fipsCode": "08",
    "iso2": "T",
    "latitude": -15.6596056,
    "longitude": 32.7181375
  },
  {
    "id": 3335,
    "name": "Maputo",
    "countryId": 150,
    "countryCode": "MZ",
    "fipsCode": "11",
    "iso2": "MPM",
    "latitude": -25.969248,
    "longitude": 32.5731746
  },
  {
    "id": 3336,
    "name": "Nampula Province",
    "countryId": 150,
    "countryCode": "MZ",
    "fipsCode": "06",
    "iso2": "N",
    "latitude": -14.7604931,
    "longitude": 39.3206241
  },
  {
    "id": 3337,
    "name": "Manica Province",
    "countryId": 150,
    "countryCode": "MZ",
    "fipsCode": "10",
    "iso2": "B",
    "latitude": -19.5059787,
    "longitude": 33.438353
  },
  {
    "id": 3338,
    "name": "Hodh Ech Chargui Region",
    "countryId": 139,
    "countryCode": "MR",
    "fipsCode": "01",
    "iso2": "01",
    "latitude": 18.6737026,
    "longitude": -7.092877
  },
  {
    "id": 3339,
    "name": "Brakna Region",
    "countryId": 139,
    "countryCode": "MR",
    "fipsCode": "05",
    "iso2": "05",
    "latitude": 17.2317561,
    "longitude": -13.1740348
  },
  {
    "id": 3340,
    "name": "Tiris Zemmour Region",
    "countryId": 139,
    "countryCode": "MR",
    "fipsCode": "11",
    "iso2": "11",
    "latitude": 24.5773764,
    "longitude": -9.9018131
  },
  {
    "id": 3341,
    "name": "Gorgol Region",
    "countryId": 139,
    "countryCode": "MR",
    "fipsCode": "04",
    "iso2": "04",
    "latitude": 15.9717357,
    "longitude": -12.6216211
  },
  {
    "id": 3342,
    "name": "Inchiri Region",
    "countryId": 139,
    "countryCode": "MR",
    "fipsCode": "12",
    "iso2": "12",
    "latitude": 20.0280561,
    "longitude": -15.4068079
  },
  {
    "id": 3343,
    "name": "Nouakchott-Nord Region",
    "countryId": 139,
    "countryCode": "MR",
    "fipsCode": "14",
    "iso2": "14",
    "latitude": 18.1130205,
    "longitude": -15.8994956
  },
  {
    "id": 3344,
    "name": "Adrar Region",
    "countryId": 139,
    "countryCode": "MR",
    "fipsCode": "07",
    "iso2": "07",
    "latitude": 19.8652176,
    "longitude": -12.8054753
  },
  {
    "id": 3345,
    "name": "Tagant Region",
    "countryId": 139,
    "countryCode": "MR",
    "fipsCode": "09",
    "iso2": "09",
    "latitude": 18.5467527,
    "longitude": -9.9018131
  },
  {
    "id": 3346,
    "name": "Dakhlet Nouadhibou",
    "countryId": 139,
    "countryCode": "MR",
    "fipsCode": "08",
    "iso2": "08",
    "latitude": 20.5985588,
    "longitude": -16.2522143
  },
  {
    "id": 3347,
    "name": "Nouakchott-Sud Region",
    "countryId": 139,
    "countryCode": "MR",
    "fipsCode": "15",
    "iso2": "15",
    "latitude": 17.9709288,
    "longitude": -15.9464874
  },
  {
    "id": 3348,
    "name": "Trarza Region",
    "countryId": 139,
    "countryCode": "MR",
    "fipsCode": "06",
    "iso2": "06",
    "latitude": 17.8664964,
    "longitude": -14.6587821
  },
  {
    "id": 3349,
    "name": "Assaba Region",
    "countryId": 139,
    "countryCode": "MR",
    "fipsCode": "03",
    "iso2": "03",
    "latitude": 16.7759558,
    "longitude": -11.5248055
  },
  {
    "id": 3350,
    "name": "Guidimaka Region",
    "countryId": 139,
    "countryCode": "MR",
    "fipsCode": "10",
    "iso2": "10",
    "latitude": 15.2557331,
    "longitude": -12.2547919
  },
  {
    "id": 3351,
    "name": "Hodh El Gharbi Region",
    "countryId": 139,
    "countryCode": "MR",
    "fipsCode": "02",
    "iso2": "02",
    "latitude": 16.6912149,
    "longitude": -9.5450974
  },
  {
    "id": 3352,
    "name": "Nouakchott-Ouest Region",
    "countryId": 139,
    "countryCode": "MR",
    "fipsCode": "13",
    "iso2": "13",
    "latitude": 18.1511357,
    "longitude": -15.993491
  },
  {
    "id": 3353,
    "name": "Western Tobago",
    "countryId": 223,
    "countryCode": "TT",
    "fipsCode": "03",
    "iso2": "WTO",
    "latitude": 11.1897072,
    "longitude": -60.7795452
  },
  {
    "id": 3354,
    "name": "Couva-Tabaquite-Talparo Regional Corporation",
    "countryId": 223,
    "countryCode": "TT",
    "fipsCode": "CTT",
    "iso2": "CTT",
    "latitude": 10.4297145,
    "longitude": -61.373521
  },
  {
    "id": 3355,
    "name": "Eastern Tobago",
    "countryId": 223,
    "countryCode": "TT",
    "fipsCode": "11",
    "iso2": "ETO",
    "latitude": 11.2979348,
    "longitude": -60.5588524
  },
  {
    "id": 3356,
    "name": "Rio Claro-Mayaro Regional Corporation",
    "countryId": 223,
    "countryCode": "TT",
    "fipsCode": "11",
    "iso2": "MRC",
    "latitude": 10.2412832,
    "longitude": -61.0937206
  },
  {
    "id": 3357,
    "name": "San Juan-Laventille Regional Corporation",
    "countryId": 223,
    "countryCode": "TT",
    "fipsCode": "SJL",
    "iso2": "SJL",
    "latitude": 10.6908578,
    "longitude": -61.4552213
  },
  {
    "id": 3358,
    "name": "Tunapuna-Piarco Regional Corporation",
    "countryId": 223,
    "countryCode": "TT",
    "fipsCode": "TUP",
    "iso2": "TUP",
    "latitude": 10.6859096,
    "longitude": -61.3035248
  },
  {
    "id": 3359,
    "name": "San Fernando",
    "countryId": 223,
    "countryCode": "TT",
    "fipsCode": "10",
    "iso2": "SFO",
    "latitude": 34.2819461,
    "longitude": -118.4389719
  },
  {
    "id": 3360,
    "name": "Point Fortin",
    "countryId": 223,
    "countryCode": "TT",
    "fipsCode": "PTF",
    "iso2": "PTF",
    "latitude": 10.1702737,
    "longitude": -61.6713386
  },
  {
    "id": 3361,
    "name": "Sangre Grande Regional Corporation",
    "countryId": 223,
    "countryCode": "TT",
    "fipsCode": "SGE",
    "iso2": "SGE",
    "latitude": 10.5852939,
    "longitude": -61.1315813
  },
  {
    "id": 3362,
    "name": "Arima",
    "countryId": 223,
    "countryCode": "TT",
    "fipsCode": "01",
    "iso2": "ARI",
    "latitude": 46.7931604,
    "longitude": -71.2584311
  },
  {
    "id": 3363,
    "name": "Port of Spain",
    "countryId": 223,
    "countryCode": "TT",
    "fipsCode": "05",
    "iso2": "POS",
    "latitude": 10.6603196,
    "longitude": -61.5085625
  },
  {
    "id": 3364,
    "name": "Siparia Regional Corporation",
    "countryId": 223,
    "countryCode": "TT",
    "fipsCode": "SIP",
    "iso2": "SIP",
    "latitude": 10.1245626,
    "longitude": -61.5603244
  },
  {
    "id": 3365,
    "name": "Penal-Debe Regional Corporation",
    "countryId": 223,
    "countryCode": "TT",
    "fipsCode": "PED",
    "iso2": "PED",
    "latitude": 10.1337402,
    "longitude": -61.4435474
  },
  {
    "id": 3366,
    "name": "Chaguanas",
    "countryId": 223,
    "countryCode": "TT",
    "fipsCode": "CHA",
    "iso2": "CHA",
    "latitude": 10.5168387,
    "longitude": -61.4114482
  },
  {
    "id": 3367,
    "name": "Diego Martin Regional Corporation",
    "countryId": 223,
    "countryCode": "TT",
    "fipsCode": "DMN",
    "iso2": "DMN",
    "latitude": 10.7362286,
    "longitude": -61.5544836
  },
  {
    "id": 3368,
    "name": "Princes Town Regional Corporation",
    "countryId": 223,
    "countryCode": "TT",
    "fipsCode": "PRT",
    "iso2": "PRT",
    "latitude": 10.1786746,
    "longitude": -61.2801996
  },
  {
    "id": 3369,
    "name": "Mary Region",
    "countryId": 226,
    "countryCode": "TM",
    "fipsCode": "05",
    "iso2": "M",
    "latitude": 36.9481623,
    "longitude": 62.4504154
  },
  {
    "id": 3370,
    "name": "Lebap Region",
    "countryId": 226,
    "countryCode": "TM",
    "fipsCode": "04",
    "iso2": "L",
    "latitude": 38.1272462,
    "longitude": 64.7162415
  },
  {
    "id": 3371,
    "name": "Ashgabat",
    "countryId": 226,
    "countryCode": "TM",
    "fipsCode": "S",
    "iso2": "S",
    "latitude": 37.9600766,
    "longitude": 58.3260629
  },
  {
    "id": 3372,
    "name": "Balkan Region",
    "countryId": 226,
    "countryCode": "TM",
    "fipsCode": "02",
    "iso2": "B",
    "latitude": 41.8101472,
    "longitude": 21.0937311
  },
  {
    "id": 3373,
    "name": "Daşoguz Region",
    "countryId": 226,
    "countryCode": "TM",
    "fipsCode": "03",
    "iso2": "D",
    "latitude": 41.8368737,
    "longitude": 59.9651904
  },
  {
    "id": 3374,
    "name": "Ahal Region",
    "countryId": 226,
    "countryCode": "TM",
    "fipsCode": "01",
    "iso2": "A",
    "latitude": 38.6399398,
    "longitude": 59.4720904
  },
  {
    "id": 3375,
    "name": "Beni Department",
    "countryId": 27,
    "countryCode": "BO",
    "fipsCode": "03",
    "iso2": "B",
    "latitude": -14.3782747,
    "longitude": -65.0957792
  },
  {
    "id": 3376,
    "name": "Oruro Department",
    "countryId": 27,
    "countryCode": "BO",
    "fipsCode": "05",
    "iso2": "O",
    "latitude": -18.5711579,
    "longitude": -67.7615983
  },
  {
    "id": 3377,
    "name": "Santa Cruz Department",
    "countryId": 27,
    "countryCode": "BO",
    "fipsCode": "08",
    "iso2": "S",
    "latitude": -16.7476037,
    "longitude": -62.0750998
  },
  {
    "id": 3378,
    "name": "Tarija Department",
    "countryId": 27,
    "countryCode": "BO",
    "fipsCode": "09",
    "iso2": "T",
    "latitude": -21.5831595,
    "longitude": -63.9586111
  },
  {
    "id": 3379,
    "name": "Pando Department",
    "countryId": 27,
    "countryCode": "BO",
    "fipsCode": "06",
    "iso2": "N",
    "latitude": -10.7988901,
    "longitude": -66.9988011
  },
  {
    "id": 3380,
    "name": "La Paz Department",
    "countryId": 27,
    "countryCode": "BO",
    "fipsCode": "04",
    "iso2": "L",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 3381,
    "name": "Cochabamba Department",
    "countryId": 27,
    "countryCode": "BO",
    "fipsCode": "02",
    "iso2": "C",
    "latitude": -17.5681675,
    "longitude": -65.475736
  },
  {
    "id": 3382,
    "name": "Chuquisaca Department",
    "countryId": 27,
    "countryCode": "BO",
    "fipsCode": "01",
    "iso2": "H",
    "latitude": -20.0249144,
    "longitude": -64.1478236
  },
  {
    "id": 3383,
    "name": "Potosí Department",
    "countryId": 27,
    "countryCode": "BO",
    "fipsCode": "07",
    "iso2": "P",
    "latitude": -20.624713,
    "longitude": -66.9988011
  },
  {
    "id": 3384,
    "name": "Saint George Parish",
    "countryId": 188,
    "countryCode": "VC",
    "fipsCode": "04",
    "iso2": "04",
    "latitude": 42.957609,
    "longitude": -81.326705
  },
  {
    "id": 3385,
    "name": "Saint Patrick Parish",
    "countryId": 188,
    "countryCode": "VC",
    "fipsCode": "05",
    "iso2": "05",
    "latitude": 39.7509186,
    "longitude": -94.8450556
  },
  {
    "id": 3386,
    "name": "Saint Andrew Parish",
    "countryId": 188,
    "countryCode": "VC",
    "fipsCode": "02",
    "iso2": "02",
    "latitude": 43.0242999,
    "longitude": -81.2025
  },
  {
    "id": 3387,
    "name": "Saint David Parish",
    "countryId": 188,
    "countryCode": "VC",
    "fipsCode": "03",
    "iso2": "03",
    "latitude": 43.8523095,
    "longitude": -79.5236654
  },
  {
    "id": 3388,
    "name": "Grenadines Parish",
    "countryId": 188,
    "countryCode": "VC",
    "fipsCode": "06",
    "iso2": "06",
    "latitude": 13.0122965,
    "longitude": -61.2277301
  },
  {
    "id": 3389,
    "name": "Charlotte Parish",
    "countryId": 188,
    "countryCode": "VC",
    "fipsCode": "01",
    "iso2": "01",
    "latitude": 13.2175451,
    "longitude": -61.1636244
  },
  {
    "id": 3390,
    "name": "Sharjah Emirate",
    "countryId": 231,
    "countryCode": "AE",
    "fipsCode": "06",
    "iso2": "SH",
    "latitude": 25.0753974,
    "longitude": 55.7578403
  },
  {
    "id": 3391,
    "name": "Dubai",
    "countryId": 231,
    "countryCode": "AE",
    "fipsCode": "03",
    "iso2": "DU",
    "latitude": 25.2048493,
    "longitude": 55.2707828
  },
  {
    "id": 3392,
    "name": "Umm al-Quwain",
    "countryId": 231,
    "countryCode": "AE",
    "fipsCode": "07",
    "iso2": "UQ",
    "latitude": 25.5426324,
    "longitude": 55.5475348
  },
  {
    "id": 3393,
    "name": "Fujairah",
    "countryId": 231,
    "countryCode": "AE",
    "fipsCode": "04",
    "iso2": "FU",
    "latitude": 25.1288099,
    "longitude": 56.3264849
  },
  {
    "id": 3394,
    "name": "Ras al-Khaimah",
    "countryId": 231,
    "countryCode": "AE",
    "fipsCode": "05",
    "iso2": "RK",
    "latitude": 25.6741343,
    "longitude": 55.9804173
  },
  {
    "id": 3395,
    "name": "Ajman Emirate",
    "countryId": 231,
    "countryCode": "AE",
    "fipsCode": "02",
    "iso2": "AJ",
    "latitude": 25.4052165,
    "longitude": 55.5136433
  },
  {
    "id": 3396,
    "name": "Abu Dhabi Emirate",
    "countryId": 231,
    "countryCode": "AE",
    "fipsCode": "01",
    "iso2": "AZ",
    "latitude": 24.453884,
    "longitude": 54.3773438
  },
  {
    "id": 3397,
    "name": "districts of Republican Subordination",
    "countryId": 217,
    "countryCode": "TJ",
    "fipsCode": "RR",
    "iso2": "RA",
    "latitude": 39.0857902,
    "longitude": 70.2408325
  },
  {
    "id": 3398,
    "name": "Khatlon Province",
    "countryId": 217,
    "countryCode": "TJ",
    "fipsCode": "02",
    "iso2": "KT",
    "latitude": 37.9113562,
    "longitude": 69.097023
  },
  {
    "id": 3399,
    "name": "Gorno-Badakhshan Autonomous Province",
    "countryId": 217,
    "countryCode": "TJ",
    "fipsCode": "01",
    "iso2": "GB",
    "latitude": 38.412732,
    "longitude": 73.087749
  },
  {
    "id": 3400,
    "name": "Sughd Province",
    "countryId": 217,
    "countryCode": "TJ",
    "fipsCode": "03",
    "iso2": "SU",
    "latitude": 39.5155326,
    "longitude": 69.097023
  },
  {
    "id": 3401,
    "name": "Tainan County",
    "countryId": 216,
    "countryCode": "TW",
    "fipsCode": "03",
    "iso2": "TNQ",
    "latitude": 22.9997281,
    "longitude": 120.2270277
  },
  {
    "id": 3402,
    "name": "Yilan County",
    "countryId": 216,
    "countryCode": "TW",
    "fipsCode": "03",
    "iso2": "ILA",
    "latitude": 24.7021073,
    "longitude": 121.7377502
  },
  {
    "id": 3403,
    "name": "Penghu County",
    "countryId": 216,
    "countryCode": "TW",
    "fipsCode": "03",
    "iso2": "PEN",
    "latitude": 23.5711899,
    "longitude": 119.5793157
  },
  {
    "id": 3404,
    "name": "Changhua County",
    "countryId": 216,
    "countryCode": "TW",
    "fipsCode": "03",
    "iso2": "CHA",
    "latitude": 24.0517963,
    "longitude": 120.5161352
  },
  {
    "id": 3405,
    "name": "Pingtung County",
    "countryId": 216,
    "countryCode": "TW",
    "fipsCode": "03",
    "iso2": "PIF",
    "latitude": 22.5519759,
    "longitude": 120.5487597
  },
  {
    "id": 3406,
    "name": "Taichung",
    "countryId": 216,
    "countryCode": "TW",
    "fipsCode": "03",
    "iso2": "TXG",
    "latitude": 24.1477358,
    "longitude": 120.6736482
  },
  {
    "id": 3407,
    "name": "Nantou County",
    "countryId": 216,
    "countryCode": "TW",
    "fipsCode": "03",
    "iso2": "NAN",
    "latitude": 23.9609981,
    "longitude": 120.9718638
  },
  {
    "id": 3408,
    "name": "Chiayi County",
    "countryId": 216,
    "countryCode": "TW",
    "fipsCode": "03",
    "iso2": "CYI",
    "latitude": 23.4518428,
    "longitude": 120.2554615
  },
  {
    "id": 3409,
    "name": "Kaohsiung County",
    "countryId": 216,
    "countryCode": "TW",
    "fipsCode": "03",
    "iso2": "KHQ",
    "latitude": 22.6272784,
    "longitude": 120.3014353
  },
  {
    "id": 3410,
    "name": "Taitung County",
    "countryId": 216,
    "countryCode": "TW",
    "fipsCode": "03",
    "iso2": "TTT",
    "latitude": 22.7972447,
    "longitude": 121.0713702
  },
  {
    "id": 3411,
    "name": "Hualien County",
    "countryId": 216,
    "countryCode": "TW",
    "fipsCode": "03",
    "iso2": "HUA",
    "latitude": 23.9871589,
    "longitude": 121.6015714
  },
  {
    "id": 3412,
    "name": "Kaohsiung",
    "countryId": 216,
    "countryCode": "TW",
    "fipsCode": "02",
    "iso2": "KHH",
    "latitude": 22.6272784,
    "longitude": 120.3014353
  },
  {
    "id": 3413,
    "name": "Miaoli County",
    "countryId": 216,
    "countryCode": "TW",
    "fipsCode": "02",
    "iso2": "MIA",
    "latitude": 24.560159,
    "longitude": 120.8214265
  },
  {
    "id": 3414,
    "name": "Taichung County",
    "countryId": 216,
    "countryCode": "TW",
    "fipsCode": "02",
    "iso2": "TXQ",
    "latitude": 24.1477358,
    "longitude": 120.6736482
  },
  {
    "id": 3415,
    "name": "Kinmen",
    "countryId": 216,
    "countryCode": "TW",
    "fipsCode": "02",
    "iso2": "KIN",
    "latitude": 24.3487792,
    "longitude": 118.3285644
  },
  {
    "id": 3416,
    "name": "Yunlin County",
    "countryId": 216,
    "countryCode": "TW",
    "fipsCode": "02",
    "iso2": "YUN",
    "latitude": 23.7092033,
    "longitude": 120.4313373
  },
  {
    "id": 3417,
    "name": "Hsinchu",
    "countryId": 216,
    "countryCode": "TW",
    "fipsCode": "02",
    "iso2": "HSZ",
    "latitude": 24.8138287,
    "longitude": 120.9674798
  },
  {
    "id": 3418,
    "name": "Chiayi City",
    "countryId": 216,
    "countryCode": "TW",
    "fipsCode": "02",
    "iso2": "CYQ",
    "latitude": 23.4800751,
    "longitude": 120.4491113
  },
  {
    "id": 3419,
    "name": "Taoyuan City",
    "countryId": 216,
    "countryCode": "TW",
    "fipsCode": "02",
    "iso2": "TAO",
    "latitude": 24.9936281,
    "longitude": 121.3009798
  },
  {
    "id": 3420,
    "name": "Lienchiang County",
    "countryId": 216,
    "countryCode": "TW",
    "fipsCode": "02",
    "iso2": "LIE",
    "latitude": 26.1505556,
    "longitude": 119.9288889
  },
  {
    "id": 3421,
    "name": "Tainan",
    "countryId": 216,
    "countryCode": "TW",
    "fipsCode": "02",
    "iso2": "TNN",
    "latitude": 22.9997281,
    "longitude": 120.2270277
  },
  {
    "id": 3422,
    "name": "Taipei",
    "countryId": 216,
    "countryCode": "TW",
    "fipsCode": "03",
    "iso2": "TPE",
    "latitude": 25.0329694,
    "longitude": 121.5654177
  },
  {
    "id": 3423,
    "name": "Hsinchu County",
    "countryId": 216,
    "countryCode": "TW",
    "fipsCode": "03",
    "iso2": "HSQ",
    "latitude": 24.8387226,
    "longitude": 121.0177246
  },
  {
    "id": 3424,
    "name": "Northern Red Sea Region",
    "countryId": 68,
    "countryCode": "ER",
    "fipsCode": "06",
    "iso2": "SK",
    "latitude": 16.2583997,
    "longitude": 38.8205454
  },
  {
    "id": 3425,
    "name": "Anseba Region",
    "countryId": 68,
    "countryCode": "ER",
    "fipsCode": "01",
    "iso2": "AN",
    "latitude": 16.4745531,
    "longitude": 37.8087693
  },
  {
    "id": 3426,
    "name": "Maekel Region",
    "countryId": 68,
    "countryCode": "ER",
    "fipsCode": "05",
    "iso2": "MA",
    "latitude": 15.3551409,
    "longitude": 38.8623683
  },
  {
    "id": 3427,
    "name": "Debub Region",
    "countryId": 68,
    "countryCode": "ER",
    "fipsCode": "02",
    "iso2": "DU",
    "latitude": 14.9478692,
    "longitude": 39.1543677
  },
  {
    "id": 3428,
    "name": "Gash-Barka Region",
    "countryId": 68,
    "countryCode": "ER",
    "fipsCode": "04",
    "iso2": "GB",
    "latitude": 15.4068825,
    "longitude": 37.6386622
  },
  {
    "id": 3429,
    "name": "Southern Red Sea Region",
    "countryId": 68,
    "countryCode": "ER",
    "fipsCode": "03",
    "iso2": "DK",
    "latitude": 13.5137103,
    "longitude": 41.7606472
  },
  {
    "id": 3430,
    "name": "Southern Peninsula Region",
    "countryId": 100,
    "countryCode": "IS",
    "fipsCode": "43",
    "iso2": "2",
    "latitude": 63.9154803,
    "longitude": -22.3649667
  },
  {
    "id": 3431,
    "name": "Capital Region",
    "countryId": 100,
    "countryCode": "IS",
    "fipsCode": "39",
    "iso2": "1",
    "latitude": 38.5656957,
    "longitude": -92.1816949
  },
  {
    "id": 3432,
    "name": "Westfjords",
    "countryId": 100,
    "countryCode": "IS",
    "fipsCode": "44",
    "iso2": "4",
    "latitude": 65.919615,
    "longitude": -21.8811764
  },
  {
    "id": 3433,
    "name": "Eastern Region",
    "countryId": 100,
    "countryCode": "IS",
    "fipsCode": "38",
    "iso2": "7",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 3434,
    "name": "Southern Region",
    "countryId": 100,
    "countryCode": "IS",
    "fipsCode": "42",
    "iso2": "8",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 3435,
    "name": "Northwestern Region",
    "countryId": 100,
    "countryCode": "IS",
    "fipsCode": "41",
    "iso2": "5",
    "latitude": 41.9133932,
    "longitude": -73.0471688
  },
  {
    "id": 3436,
    "name": "Western Region",
    "countryId": 100,
    "countryCode": "IS",
    "fipsCode": "45",
    "iso2": "3",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 3437,
    "name": "Northeastern Region",
    "countryId": 100,
    "countryCode": "IS",
    "fipsCode": "40",
    "iso2": "6",
    "latitude": 43.2994285,
    "longitude": -74.2179326
  },
  {
    "id": 3438,
    "name": "Río Muni",
    "countryId": 67,
    "countryCode": "GQ",
    "fipsCode": "40",
    "iso2": "C",
    "latitude": 1.4610606,
    "longitude": 9.6786894
  },
  {
    "id": 3439,
    "name": "Kié-Ntem Province",
    "countryId": 67,
    "countryCode": "GQ",
    "fipsCode": "07",
    "iso2": "KN",
    "latitude": 2.028093,
    "longitude": 11.0711758
  },
  {
    "id": 3440,
    "name": "Wele-Nzas Province",
    "countryId": 67,
    "countryCode": "GQ",
    "fipsCode": "09",
    "iso2": "WN",
    "latitude": 1.4166162,
    "longitude": 11.0711758
  },
  {
    "id": 3441,
    "name": "Litoral Province",
    "countryId": 67,
    "countryCode": "GQ",
    "fipsCode": "08",
    "iso2": "LI",
    "latitude": 1.5750244,
    "longitude": 9.8124935
  },
  {
    "id": 3442,
    "name": "Insular Region",
    "countryId": 67,
    "countryCode": "GQ",
    "fipsCode": "08",
    "iso2": "I",
    "latitude": 37.09024,
    "longitude": -95.712891
  },
  {
    "id": 3443,
    "name": "Bioko Sur Province",
    "countryId": 67,
    "countryCode": "GQ",
    "fipsCode": "05",
    "iso2": "BS",
    "latitude": 3.4209785,
    "longitude": 8.6160674
  },
  {
    "id": 3444,
    "name": "Annobón Province",
    "countryId": 67,
    "countryCode": "GQ",
    "fipsCode": "03",
    "iso2": "AN",
    "latitude": -1.4268782,
    "longitude": 5.6352801
  },
  {
    "id": 3445,
    "name": "Centro Sur Province",
    "countryId": 67,
    "countryCode": "GQ",
    "fipsCode": "06",
    "iso2": "CS",
    "latitude": 1.3436084,
    "longitude": 10.439656
  },
  {
    "id": 3446,
    "name": "Bioko Norte Province",
    "countryId": 67,
    "countryCode": "GQ",
    "fipsCode": "04",
    "iso2": "BN",
    "latitude": 3.6595072,
    "longitude": 8.7921836
  },
  {
    "id": 3447,
    "name": "Chihuahua",
    "countryId": 142,
    "countryCode": "MX",
    "fipsCode": "06",
    "iso2": "CHH",
    "latitude": 28.6329957,
    "longitude": -106.0691004
  },
  {
    "id": 3448,
    "name": "Oaxaca",
    "countryId": 142,
    "countryCode": "MX",
    "fipsCode": "20",
    "iso2": "OAX",
    "latitude": 17.0731842,
    "longitude": -96.7265889
  },
  {
    "id": 3449,
    "name": "Sinaloa",
    "countryId": 142,
    "countryCode": "MX",
    "fipsCode": "25",
    "iso2": "SIN",
    "latitude": 25.1721091,
    "longitude": -107.4795173
  },
  {
    "id": 3450,
    "name": "México",
    "countryId": 142,
    "countryCode": "MX",
    "fipsCode": "15",
    "iso2": "MEX",
    "latitude": 23.634501,
    "longitude": -102.552784
  },
  {
    "id": 3451,
    "name": "Chiapas",
    "countryId": 142,
    "countryCode": "MX",
    "fipsCode": "05",
    "iso2": "CHP",
    "latitude": 16.7569318,
    "longitude": -93.1292353
  },
  {
    "id": 3452,
    "name": "Nuevo León",
    "countryId": 142,
    "countryCode": "MX",
    "fipsCode": "19",
    "iso2": "NLE",
    "latitude": 25.592172,
    "longitude": -99.9961947
  },
  {
    "id": 3453,
    "name": "Durango",
    "countryId": 142,
    "countryCode": "MX",
    "fipsCode": "10",
    "iso2": "DUR",
    "latitude": 37.27528,
    "longitude": -107.8800667
  },
  {
    "id": 3454,
    "name": "Tabasco",
    "countryId": 142,
    "countryCode": "MX",
    "fipsCode": "27",
    "iso2": "TAB",
    "latitude": 17.8409173,
    "longitude": -92.6189273
  },
  {
    "id": 3455,
    "name": "Querétaro",
    "countryId": 142,
    "countryCode": "MX",
    "fipsCode": "22",
    "iso2": "QUE",
    "latitude": 20.5887932,
    "longitude": -100.3898881
  },
  {
    "id": 3456,
    "name": "Aguascalientes",
    "countryId": 142,
    "countryCode": "MX",
    "fipsCode": "01",
    "iso2": "AGU",
    "latitude": 21.8852562,
    "longitude": -102.2915677
  },
  {
    "id": 3457,
    "name": "Baja California",
    "countryId": 142,
    "countryCode": "MX",
    "fipsCode": "02",
    "iso2": "BCN",
    "latitude": 30.8406338,
    "longitude": -115.2837585
  },
  {
    "id": 3458,
    "name": "Tlaxcala",
    "countryId": 142,
    "countryCode": "MX",
    "fipsCode": "29",
    "iso2": "TLA",
    "latitude": 19.318154,
    "longitude": -98.2374954
  },
  {
    "id": 3459,
    "name": "Guerrero",
    "countryId": 142,
    "countryCode": "MX",
    "fipsCode": "12",
    "iso2": "GRO",
    "latitude": 17.4391926,
    "longitude": -99.5450974
  },
  {
    "id": 3460,
    "name": "Baja California Sur",
    "countryId": 142,
    "countryCode": "MX",
    "fipsCode": "03",
    "iso2": "BCS",
    "latitude": 26.0444446,
    "longitude": -111.6660725
  },
  {
    "id": 3461,
    "name": "San Luis Potosí",
    "countryId": 142,
    "countryCode": "MX",
    "fipsCode": "24",
    "iso2": "SLP",
    "latitude": 22.1564699,
    "longitude": -100.9855409
  },
  {
    "id": 3462,
    "name": "Zacatecas",
    "countryId": 142,
    "countryCode": "MX",
    "fipsCode": "32",
    "iso2": "ZAC",
    "latitude": 22.7708555,
    "longitude": -102.5832426
  },
  {
    "id": 3463,
    "name": "Tamaulipas",
    "countryId": 142,
    "countryCode": "MX",
    "fipsCode": "28",
    "iso2": "TAM",
    "latitude": 24.26694,
    "longitude": -98.8362755
  },
  {
    "id": 3464,
    "name": "Veracruz",
    "countryId": 142,
    "countryCode": "MX",
    "fipsCode": "30",
    "iso2": "VER",
    "latitude": 19.173773,
    "longitude": -96.1342241
  },
  {
    "id": 3465,
    "name": "Morelos",
    "countryId": 142,
    "countryCode": "MX",
    "fipsCode": "17",
    "iso2": "MOR",
    "latitude": 18.6813049,
    "longitude": -99.1013498
  },
  {
    "id": 3466,
    "name": "Yucatán",
    "countryId": 142,
    "countryCode": "MX",
    "fipsCode": "31",
    "iso2": "YUC",
    "latitude": 20.7098786,
    "longitude": -89.0943377
  },
  {
    "id": 3467,
    "name": "Quintana Roo",
    "countryId": 142,
    "countryCode": "MX",
    "fipsCode": "23",
    "iso2": "ROO",
    "latitude": 19.1817393,
    "longitude": -88.4791376
  },
  {
    "id": 3468,
    "name": "Sonora",
    "countryId": 142,
    "countryCode": "MX",
    "fipsCode": "26",
    "iso2": "SON",
    "latitude": 37.9829496,
    "longitude": -120.3821724
  },
  {
    "id": 3469,
    "name": "Guanajuato",
    "countryId": 142,
    "countryCode": "MX",
    "fipsCode": "11",
    "iso2": "GUA",
    "latitude": 21.0190145,
    "longitude": -101.2573586
  },
  {
    "id": 3470,
    "name": "Hidalgo",
    "countryId": 142,
    "countryCode": "MX",
    "fipsCode": "13",
    "iso2": "HID",
    "latitude": 26.1003547,
    "longitude": -98.2630684
  },
  {
    "id": 3471,
    "name": "Coahuila",
    "countryId": 142,
    "countryCode": "MX",
    "fipsCode": "07",
    "iso2": "COA",
    "latitude": 27.058676,
    "longitude": -101.7068294
  },
  {
    "id": 3472,
    "name": "Colima",
    "countryId": 142,
    "countryCode": "MX",
    "fipsCode": "08",
    "iso2": "COL",
    "latitude": 19.2452342,
    "longitude": -103.7240868
  },
  {
    "id": 3473,
    "name": "Mexico City",
    "countryId": 142,
    "countryCode": "MX",
    "fipsCode": "09",
    "iso2": "CMX",
    "latitude": 19.4326077,
    "longitude": -99.133208
  },
  {
    "id": 3474,
    "name": "Michoacán",
    "countryId": 142,
    "countryCode": "MX",
    "fipsCode": "16",
    "iso2": "MIC",
    "latitude": 19.5665192,
    "longitude": -101.7068294
  },
  {
    "id": 3475,
    "name": "Campeche",
    "countryId": 142,
    "countryCode": "MX",
    "fipsCode": "04",
    "iso2": "CAM",
    "latitude": 19.8301251,
    "longitude": -90.5349087
  },
  {
    "id": 3476,
    "name": "Puebla",
    "countryId": 142,
    "countryCode": "MX",
    "fipsCode": "21",
    "iso2": "PUE",
    "latitude": 19.0414398,
    "longitude": -98.2062727
  },
  {
    "id": 3477,
    "name": "Nayarit",
    "countryId": 142,
    "countryCode": "MX",
    "fipsCode": "18",
    "iso2": "NAY",
    "latitude": 21.7513844,
    "longitude": -104.8454619
  },
  {
    "id": 3478,
    "name": "Krabi",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "63",
    "iso2": "81",
    "latitude": 8.0862997,
    "longitude": 98.9062835
  },
  {
    "id": 3479,
    "name": "Ranong",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "59",
    "iso2": "85",
    "latitude": 9.9528702,
    "longitude": 98.6084641
  },
  {
    "id": 3480,
    "name": "Nong Bua Lam Phu",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "79",
    "iso2": "39",
    "latitude": 17.2218247,
    "longitude": 102.4260368
  },
  {
    "id": 3481,
    "name": "Samut Prakan",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "42",
    "iso2": "11",
    "latitude": 13.5990961,
    "longitude": 100.5998319
  },
  {
    "id": 3482,
    "name": "Surat Thani",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "60",
    "iso2": "84",
    "latitude": 9.1341949,
    "longitude": 99.3334198
  },
  {
    "id": 3483,
    "name": "Lamphun",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "05",
    "iso2": "51",
    "latitude": 18.5744606,
    "longitude": 99.0087221
  },
  {
    "id": 3484,
    "name": "Nong Khai",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "17",
    "iso2": "43",
    "latitude": 17.8782803,
    "longitude": 102.7412638
  },
  {
    "id": 3485,
    "name": "Khon Kaen",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "22",
    "iso2": "40",
    "latitude": 16.4321938,
    "longitude": 102.8236214
  },
  {
    "id": 3486,
    "name": "Chanthaburi",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "48",
    "iso2": "22",
    "latitude": 12.6112485,
    "longitude": 102.1037806
  },
  {
    "id": 3487,
    "name": "Saraburi",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "37",
    "iso2": "19",
    "latitude": 14.5289154,
    "longitude": 100.9101421
  },
  {
    "id": 3488,
    "name": "Phatthalung",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "66",
    "iso2": "93",
    "latitude": 7.6166823,
    "longitude": 100.0740231
  },
  {
    "id": 3489,
    "name": "Uttaradit",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "10",
    "iso2": "53",
    "latitude": 17.6200886,
    "longitude": 100.0992942
  },
  {
    "id": 3490,
    "name": "Sing Buri",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "33",
    "iso2": "17",
    "latitude": 14.8936253,
    "longitude": 100.3967314
  },
  {
    "id": 3491,
    "name": "Chiang Mai",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "02",
    "iso2": "50",
    "latitude": 18.7883439,
    "longitude": 98.9853008
  },
  {
    "id": 3492,
    "name": "Nakhon Sawan",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "16",
    "iso2": "60",
    "latitude": 15.6987382,
    "longitude": 100.11996
  },
  {
    "id": 3493,
    "name": "Yala",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "70",
    "iso2": "95",
    "latitude": 44.0579117,
    "longitude": -123.1653848
  },
  {
    "id": 3494,
    "name": "Phra Nakhon Si Ayutthaya",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "36",
    "iso2": "14",
    "latitude": 14.3692325,
    "longitude": 100.5876634
  },
  {
    "id": 3495,
    "name": "Nonthaburi",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "38",
    "iso2": "12",
    "latitude": 13.8591084,
    "longitude": 100.5216508
  },
  {
    "id": 3496,
    "name": "Trat",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "49",
    "iso2": "23",
    "latitude": 12.2427563,
    "longitude": 102.5174734
  },
  {
    "id": 3497,
    "name": "Nakhon Ratchasima",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "27",
    "iso2": "30",
    "latitude": 14.9738493,
    "longitude": 102.083652
  },
  {
    "id": 3498,
    "name": "Chiang Rai",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "03",
    "iso2": "57",
    "latitude": 19.9104798,
    "longitude": 99.840576
  },
  {
    "id": 3499,
    "name": "Ratchaburi",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "52",
    "iso2": "70",
    "latitude": 13.5282893,
    "longitude": 99.8134211
  },
  {
    "id": 3500,
    "name": "Pathum Thani",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "39",
    "iso2": "13",
    "latitude": 14.0208391,
    "longitude": 100.5250276
  },
  {
    "id": 3501,
    "name": "Sakon Nakhon",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "20",
    "iso2": "47",
    "latitude": 17.1664211,
    "longitude": 104.1486055
  },
  {
    "id": 3502,
    "name": "Samut Songkhram",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "54",
    "iso2": "75",
    "latitude": 13.4098217,
    "longitude": 100.0022645
  },
  {
    "id": 3503,
    "name": "Nakhon Pathom",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "53",
    "iso2": "73",
    "latitude": 13.8140293,
    "longitude": 100.0372929
  },
  {
    "id": 3504,
    "name": "Samut Sakhon",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "55",
    "iso2": "74",
    "latitude": 13.5475216,
    "longitude": 100.2743956
  },
  {
    "id": 3505,
    "name": "Mae Hong Son",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "01",
    "iso2": "58",
    "latitude": 19.3020296,
    "longitude": 97.9654368
  },
  {
    "id": 3506,
    "name": "Phitsanulok",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "12",
    "iso2": "65",
    "latitude": 16.8211238,
    "longitude": 100.2658516
  },
  {
    "id": 3507,
    "name": "Pattaya",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "12",
    "iso2": "S",
    "latitude": 12.9235557,
    "longitude": 100.8824551
  },
  {
    "id": 3508,
    "name": "Prachuap Khiri Khan",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "57",
    "iso2": "77",
    "latitude": 11.7938389,
    "longitude": 99.7957564
  },
  {
    "id": 3509,
    "name": "Loei",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "18",
    "iso2": "42",
    "latitude": 17.4860232,
    "longitude": 101.7223002
  },
  {
    "id": 3510,
    "name": "Roi Et",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "25",
    "iso2": "45",
    "latitude": 16.0538196,
    "longitude": 103.6520036
  },
  {
    "id": 3511,
    "name": "Kanchanaburi",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "50",
    "iso2": "71",
    "latitude": 14.1011393,
    "longitude": 99.4179431
  },
  {
    "id": 3512,
    "name": "Ubon Ratchathani",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "75",
    "iso2": "34",
    "latitude": 15.2448453,
    "longitude": 104.8472995
  },
  {
    "id": 3513,
    "name": "Chon Buri",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "46",
    "iso2": "20",
    "latitude": 13.3611431,
    "longitude": 100.9846717
  },
  {
    "id": 3514,
    "name": "Phichit",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "13",
    "iso2": "66",
    "latitude": 16.2740876,
    "longitude": 100.3346991
  },
  {
    "id": 3515,
    "name": "Phetchabun",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "14",
    "iso2": "67",
    "latitude": 16.301669,
    "longitude": 101.1192804
  },
  {
    "id": 3516,
    "name": "Kamphaeng Phet",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "11",
    "iso2": "62",
    "latitude": 16.4827798,
    "longitude": 99.5226618
  },
  {
    "id": 3517,
    "name": "Maha Sarakham",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "24",
    "iso2": "44",
    "latitude": 16.0132015,
    "longitude": 103.1615169
  },
  {
    "id": 3518,
    "name": "Rayong",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "47",
    "iso2": "21",
    "latitude": 12.6813957,
    "longitude": 101.2816261
  },
  {
    "id": 3519,
    "name": "Ang Thong",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "35",
    "iso2": "15",
    "latitude": 14.5896054,
    "longitude": 100.455052
  },
  {
    "id": 3520,
    "name": "Nakhon Si Thammarat",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "64",
    "iso2": "80",
    "latitude": 8.4324831,
    "longitude": 99.9599033
  },
  {
    "id": 3521,
    "name": "Yasothon",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "72",
    "iso2": "35",
    "latitude": 15.792641,
    "longitude": 104.1452827
  },
  {
    "id": 3522,
    "name": "Chai Nat",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "32",
    "iso2": "18",
    "latitude": 15.1851971,
    "longitude": 100.125125
  },
  {
    "id": 3523,
    "name": "Amnat Charoen",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "77",
    "iso2": "37",
    "latitude": 15.8656783,
    "longitude": 104.6257774
  },
  {
    "id": 3524,
    "name": "Suphanburi",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "51",
    "iso2": "72",
    "latitude": 14.4744892,
    "longitude": 100.1177128
  },
  {
    "id": 3525,
    "name": "Tak",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "08",
    "iso2": "63",
    "latitude": 45.0299646,
    "longitude": -93.1049815
  },
  {
    "id": 3526,
    "name": "Chumphon",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "58",
    "iso2": "86",
    "latitude": 10.4930496,
    "longitude": 99.1800199
  },
  {
    "id": 3527,
    "name": "Udon Thani",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "76",
    "iso2": "41",
    "latitude": 17.3646969,
    "longitude": 102.8158924
  },
  {
    "id": 3528,
    "name": "Phrae",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "07",
    "iso2": "54",
    "latitude": 18.1445774,
    "longitude": 100.1402831
  },
  {
    "id": 3529,
    "name": "Sa Kaeo",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "80",
    "iso2": "27",
    "latitude": 13.824038,
    "longitude": 102.0645839
  },
  {
    "id": 3530,
    "name": "Nan",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "04",
    "iso2": "55",
    "latitude": 45.522208,
    "longitude": -122.9863281
  },
  {
    "id": 3531,
    "name": "Surin",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "29",
    "iso2": "32",
    "latitude": 37.0358271,
    "longitude": -95.6276367
  },
  {
    "id": 3532,
    "name": "Phetchaburi",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "56",
    "iso2": "76",
    "latitude": 12.9649215,
    "longitude": 99.6425883
  },
  {
    "id": 3533,
    "name": "Bueng Kan",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "81",
    "iso2": "38",
    "latitude": 18.3609104,
    "longitude": 103.6464463
  },
  {
    "id": 3534,
    "name": "Buri Ram",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "28",
    "iso2": "31",
    "latitude": 14.9951003,
    "longitude": 103.1115915
  },
  {
    "id": 3535,
    "name": "Nakhon Nayok",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "43",
    "iso2": "26",
    "latitude": 14.2069466,
    "longitude": 101.2130511
  },
  {
    "id": 3536,
    "name": "Phuket",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "62",
    "iso2": "83",
    "latitude": 7.8804479,
    "longitude": 98.3922504
  },
  {
    "id": 3537,
    "name": "Satun",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "67",
    "iso2": "91",
    "latitude": 6.6238158,
    "longitude": 100.0673744
  },
  {
    "id": 3538,
    "name": "Phayao",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "41",
    "iso2": "56",
    "latitude": 19.2154367,
    "longitude": 100.2023692
  },
  {
    "id": 3539,
    "name": "Songkhla",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "68",
    "iso2": "90",
    "latitude": 7.1897659,
    "longitude": 100.5953813
  },
  {
    "id": 3540,
    "name": "Pattani",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "69",
    "iso2": "94",
    "latitude": 6.7618308,
    "longitude": 101.3232549
  },
  {
    "id": 3541,
    "name": "Trang",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "65",
    "iso2": "92",
    "latitude": 7.5644833,
    "longitude": 99.6239334
  },
  {
    "id": 3542,
    "name": "Prachin Buri",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "74",
    "iso2": "25",
    "latitude": 14.0420699,
    "longitude": 101.6600874
  },
  {
    "id": 3543,
    "name": "Lopburi",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "34",
    "iso2": "16",
    "latitude": 14.7995081,
    "longitude": 100.6533706
  },
  {
    "id": 3544,
    "name": "Lampang",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "06",
    "iso2": "52",
    "latitude": 18.2855395,
    "longitude": 99.5127895
  },
  {
    "id": 3545,
    "name": "Sukhothai",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "09",
    "iso2": "64",
    "latitude": 43.6485556,
    "longitude": -79.3746639
  },
  {
    "id": 3546,
    "name": "Mukdahan",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "78",
    "iso2": "49",
    "latitude": 16.5435914,
    "longitude": 104.7024121
  },
  {
    "id": 3547,
    "name": "Si Sa Ket",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "30",
    "iso2": "33",
    "latitude": 15.1186009,
    "longitude": 104.3220095
  },
  {
    "id": 3548,
    "name": "Nakhon Phanom",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "73",
    "iso2": "48",
    "latitude": 17.392039,
    "longitude": 104.7695508
  },
  {
    "id": 3549,
    "name": "Phang Nga",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "61",
    "iso2": "82",
    "latitude": 8.4501414,
    "longitude": 98.5255317
  },
  {
    "id": 3550,
    "name": "Kalasin",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "23",
    "iso2": "46",
    "latitude": 16.438508,
    "longitude": 103.5060994
  },
  {
    "id": 3551,
    "name": "Uthai Thani",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "15",
    "iso2": "61",
    "latitude": 15.3835001,
    "longitude": 100.0245527
  },
  {
    "id": 3552,
    "name": "Chachoengsao",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "44",
    "iso2": "24",
    "latitude": 13.6904194,
    "longitude": 101.0779596
  },
  {
    "id": 3553,
    "name": "Narathiwat",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "31",
    "iso2": "96",
    "latitude": 6.4254607,
    "longitude": 101.8253143
  },
  {
    "id": 3554,
    "name": "Bangkok",
    "countryId": 219,
    "countryCode": "TH",
    "fipsCode": "40",
    "iso2": "10",
    "latitude": 13.7563309,
    "longitude": 100.5017651
  },
  {
    "id": 3555,
    "name": "Hiiu County",
    "countryId": 69,
    "countryCode": "EE",
    "fipsCode": "02",
    "iso2": "39",
    "latitude": 58.9239553,
    "longitude": 22.5919468
  },
  {
    "id": 3556,
    "name": "Viljandi County",
    "countryId": 69,
    "countryCode": "EE",
    "fipsCode": "20",
    "iso2": "84",
    "latitude": 58.2821746,
    "longitude": 25.5752233
  },
  {
    "id": 3557,
    "name": "Tartu County",
    "countryId": 69,
    "countryCode": "EE",
    "fipsCode": "18",
    "iso2": "78",
    "latitude": 58.4057128,
    "longitude": 26.801576
  },
  {
    "id": 3558,
    "name": "Valga County",
    "countryId": 69,
    "countryCode": "EE",
    "fipsCode": "19",
    "iso2": "82",
    "latitude": 57.9103441,
    "longitude": 26.1601819
  },
  {
    "id": 3559,
    "name": "Rapla County",
    "countryId": 69,
    "countryCode": "EE",
    "fipsCode": "13",
    "iso2": "70",
    "latitude": 58.8492625,
    "longitude": 24.7346569
  },
  {
    "id": 3560,
    "name": "Võru County",
    "countryId": 69,
    "countryCode": "EE",
    "fipsCode": "21",
    "iso2": "86",
    "latitude": 57.7377372,
    "longitude": 27.1398938
  },
  {
    "id": 3561,
    "name": "Saare County",
    "countryId": 69,
    "countryCode": "EE",
    "fipsCode": "14",
    "iso2": "74",
    "latitude": 58.4849721,
    "longitude": 22.6136408
  },
  {
    "id": 3562,
    "name": "Pärnu County",
    "countryId": 69,
    "countryCode": "EE",
    "fipsCode": "11",
    "iso2": "67",
    "latitude": 58.5261952,
    "longitude": 24.4020159
  },
  {
    "id": 3563,
    "name": "Põlva County",
    "countryId": 69,
    "countryCode": "EE",
    "fipsCode": "12",
    "iso2": "65",
    "latitude": 58.1160622,
    "longitude": 27.2066394
  },
  {
    "id": 3564,
    "name": "Lääne-Viru County",
    "countryId": 69,
    "countryCode": "EE",
    "fipsCode": "08",
    "iso2": "59",
    "latitude": 59.3018816,
    "longitude": 26.3280312
  },
  {
    "id": 3565,
    "name": "Jõgeva County",
    "countryId": 69,
    "countryCode": "EE",
    "fipsCode": "05",
    "iso2": "49",
    "latitude": 58.7506143,
    "longitude": 26.3604878
  },
  {
    "id": 3566,
    "name": "Järva County",
    "countryId": 69,
    "countryCode": "EE",
    "fipsCode": "04",
    "iso2": "51",
    "latitude": 58.8866713,
    "longitude": 25.5000624
  },
  {
    "id": 3567,
    "name": "Harju County",
    "countryId": 69,
    "countryCode": "EE",
    "fipsCode": "01",
    "iso2": "37",
    "latitude": 59.3334239,
    "longitude": 25.2466974
  },
  {
    "id": 3568,
    "name": "Lääne County",
    "countryId": 69,
    "countryCode": "EE",
    "fipsCode": "07",
    "iso2": "57",
    "latitude": 58.9722742,
    "longitude": 23.8740834
  },
  {
    "id": 3569,
    "name": "Ida-Viru County",
    "countryId": 69,
    "countryCode": "EE",
    "fipsCode": "03",
    "iso2": "44",
    "latitude": 59.2592663,
    "longitude": 27.4136535
  },
  {
    "id": 3570,
    "name": "Moyen-Chari Region",
    "countryId": 43,
    "countryCode": "TD",
    "fipsCode": "17",
    "iso2": "MC",
    "latitude": 9.0639998,
    "longitude": 18.4276047
  },
  {
    "id": 3571,
    "name": "Mayo-Kebbi Ouest Region",
    "countryId": 43,
    "countryCode": "TD",
    "fipsCode": "20",
    "iso2": "MO",
    "latitude": 10.4113014,
    "longitude": 15.5943388
  },
  {
    "id": 3572,
    "name": "Sila Region",
    "countryId": 43,
    "countryCode": "TD",
    "fipsCode": "25",
    "iso2": "SI",
    "latitude": 12.13074,
    "longitude": 21.2845025
  },
  {
    "id": 3573,
    "name": "Hadjer-Lamis",
    "countryId": 43,
    "countryCode": "TD",
    "fipsCode": "18",
    "iso2": "HL",
    "latitude": 12.4577273,
    "longitude": 16.7234639
  },
  {
    "id": 3574,
    "name": "Borkou",
    "countryId": 43,
    "countryCode": "TD",
    "fipsCode": "23",
    "iso2": "BO",
    "latitude": 17.8688845,
    "longitude": 18.8076195
  },
  {
    "id": 3575,
    "name": "Ennedi-Est",
    "countryId": 43,
    "countryCode": "TD",
    "fipsCode": "27",
    "iso2": "EE",
    "latitude": 16.3420496,
    "longitude": 23.0011989
  },
  {
    "id": 3576,
    "name": "Guéra Region",
    "countryId": 43,
    "countryCode": "TD",
    "fipsCode": "05",
    "iso2": "GR",
    "latitude": 11.1219015,
    "longitude": 18.4276047
  },
  {
    "id": 3577,
    "name": "Lac Region",
    "countryId": 43,
    "countryCode": "TD",
    "fipsCode": "07",
    "iso2": "LC",
    "latitude": 13.6915377,
    "longitude": 14.1001326
  },
  {
    "id": 3578,
    "name": "Ennedi Region",
    "countryId": 43,
    "countryCode": "TD",
    "fipsCode": "07",
    "iso2": "EN",
    "latitude": 17.5414578,
    "longitude": 21.8568586
  },
  {
    "id": 3579,
    "name": "Tandjilé Region",
    "countryId": 43,
    "countryCode": "TD",
    "fipsCode": "14",
    "iso2": "TA",
    "latitude": 9.6625729,
    "longitude": 16.7234639
  },
  {
    "id": 3580,
    "name": "Mayo-Kebbi Est Region",
    "countryId": 43,
    "countryCode": "TD",
    "fipsCode": "16",
    "iso2": "ME",
    "latitude": 9.4046039,
    "longitude": 14.8454619
  },
  {
    "id": 3581,
    "name": "Wadi Fira Region",
    "countryId": 43,
    "countryCode": "TD",
    "fipsCode": "02",
    "iso2": "WF",
    "latitude": 15.0892416,
    "longitude": 21.4752851
  },
  {
    "id": 3582,
    "name": "Ouaddaï Region",
    "countryId": 43,
    "countryCode": "TD",
    "fipsCode": "12",
    "iso2": "OD",
    "latitude": 13.748476,
    "longitude": 20.7122465
  },
  {
    "id": 3583,
    "name": "Bahr el Gazel",
    "countryId": 43,
    "countryCode": "TD",
    "fipsCode": "22",
    "iso2": "BG",
    "latitude": 14.7702266,
    "longitude": 16.912251
  },
  {
    "id": 3584,
    "name": "Ennedi-Ouest",
    "countryId": 43,
    "countryCode": "TD",
    "fipsCode": "28",
    "iso2": "EO",
    "latitude": 18.977563,
    "longitude": 21.8568586
  },
  {
    "id": 3585,
    "name": "Logone Occidental Region",
    "countryId": 43,
    "countryCode": "TD",
    "fipsCode": "08",
    "iso2": "LO",
    "latitude": 8.759676,
    "longitude": 15.876004
  },
  {
    "id": 3586,
    "name": "N\"Djamena",
    "countryId": 43,
    "countryCode": "TD",
    "fipsCode": "21",
    "iso2": "ND",
    "latitude": 12.1348457,
    "longitude": 15.0557415
  },
  {
    "id": 3587,
    "name": "Tibesti Region",
    "countryId": 43,
    "countryCode": "TD",
    "fipsCode": "26",
    "iso2": "TI",
    "latitude": 21.3650031,
    "longitude": 16.912251
  },
  {
    "id": 3588,
    "name": "Kanem Region",
    "countryId": 43,
    "countryCode": "TD",
    "fipsCode": "06",
    "iso2": "KA",
    "latitude": 14.8781262,
    "longitude": 15.4068079
  },
  {
    "id": 3589,
    "name": "Mandoul Region",
    "countryId": 43,
    "countryCode": "TD",
    "fipsCode": "19",
    "iso2": "MA",
    "latitude": 8.603091,
    "longitude": 17.4795173
  },
  {
    "id": 3590,
    "name": "Batha Region",
    "countryId": 43,
    "countryCode": "TD",
    "fipsCode": "01",
    "iso2": "BA",
    "latitude": 13.9371775,
    "longitude": 18.4276047
  },
  {
    "id": 3591,
    "name": "Logone Oriental Region",
    "countryId": 43,
    "countryCode": "TD",
    "fipsCode": "09",
    "iso2": "LR",
    "latitude": 8.3149949,
    "longitude": 16.3463791
  },
  {
    "id": 3592,
    "name": "Salamat Region",
    "countryId": 43,
    "countryCode": "TD",
    "fipsCode": "13",
    "iso2": "SA",
    "latitude": 10.9691601,
    "longitude": 20.7122465
  },
  {
    "id": 3593,
    "name": "Berry Islands",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "32",
    "iso2": "BY",
    "latitude": 25.6250042,
    "longitude": -77.8252203
  },
  {
    "id": 3594,
    "name": "Nichollstown and Berry Islands",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "32",
    "iso2": "NB",
    "latitude": 25.7236234,
    "longitude": -77.8310104
  },
  {
    "id": 3595,
    "name": "Green Turtle Cay",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "28",
    "iso2": "GT",
    "latitude": 26.7747107,
    "longitude": -77.3295708
  },
  {
    "id": 3596,
    "name": "Central Eleuthera",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "39",
    "iso2": "CE",
    "latitude": 25.1362037,
    "longitude": -76.1435915
  },
  {
    "id": 3597,
    "name": "Governor\"s Harbour",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "27",
    "iso2": "GH",
    "latitude": 25.1948096,
    "longitude": -76.2439622
  },
  {
    "id": 3598,
    "name": "High Rock",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "29",
    "iso2": "HR",
    "latitude": 46.6843415,
    "longitude": -121.9017461
  },
  {
    "id": 3599,
    "name": "West Grand Bahama",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "54",
    "iso2": "WG",
    "latitude": 26.659447,
    "longitude": -78.52065
  },
  {
    "id": 3600,
    "name": "Rum Cay District",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "49",
    "iso2": "RC",
    "latitude": 23.6854676,
    "longitude": -74.8390162
  },
  {
    "id": 3601,
    "name": "Acklins",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "24",
    "iso2": "AK",
    "latitude": 22.3657708,
    "longitude": -74.0535126
  },
  {
    "id": 3602,
    "name": "North Eleuthera",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "48",
    "iso2": "NE",
    "latitude": 25.4647517,
    "longitude": -76.675922
  },
  {
    "id": 3603,
    "name": "Central Abaco",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "37",
    "iso2": "CO",
    "latitude": 26.3555029,
    "longitude": -77.1485163
  },
  {
    "id": 3604,
    "name": "Marsh Harbour",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "31",
    "iso2": "MH",
    "latitude": 26.5241653,
    "longitude": -77.0909809
  },
  {
    "id": 3605,
    "name": "Black Point",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "36",
    "iso2": "BP",
    "latitude": 41.3951024,
    "longitude": -71.4650556
  },
  {
    "id": 3606,
    "name": "Sandy Point",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "34",
    "iso2": "SP",
    "latitude": 39.0145464,
    "longitude": -76.3998925
  },
  {
    "id": 3607,
    "name": "South Eleuthera",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "52",
    "iso2": "SE",
    "latitude": 24.7708562,
    "longitude": -76.2131474
  },
  {
    "id": 3608,
    "name": "South Abaco",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "50",
    "iso2": "SO",
    "latitude": 26.0640591,
    "longitude": -77.2635038
  },
  {
    "id": 3609,
    "name": "Inagua",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "13",
    "iso2": "IN",
    "latitude": 21.0656066,
    "longitude": -73.323708
  },
  {
    "id": 3610,
    "name": "Long Island",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "15",
    "iso2": "LI",
    "latitude": 40.789142,
    "longitude": -73.134961
  },
  {
    "id": 3611,
    "name": "Cat Island",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "06",
    "iso2": "CI",
    "latitude": 30.2280136,
    "longitude": -89.1014933
  },
  {
    "id": 3612,
    "name": "Exuma",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "10",
    "iso2": "EX",
    "latitude": 23.6192598,
    "longitude": -75.9695465
  },
  {
    "id": 3613,
    "name": "Harbour Island",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "22",
    "iso2": "HI",
    "latitude": 25.50011,
    "longitude": -76.6340511
  },
  {
    "id": 3614,
    "name": "East Grand Bahama",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "41",
    "iso2": "EG",
    "latitude": 26.6582823,
    "longitude": -78.2248291
  },
  {
    "id": 3615,
    "name": "Ragged Island",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "18",
    "iso2": "RI",
    "latitude": 41.597431,
    "longitude": -71.260202
  },
  {
    "id": 3616,
    "name": "North Abaco",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "46",
    "iso2": "NO",
    "latitude": 26.7871697,
    "longitude": -77.4357739
  },
  {
    "id": 3617,
    "name": "North Andros",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "47",
    "iso2": "NS",
    "latitude": 24.7063805,
    "longitude": -78.0195387
  },
  {
    "id": 3618,
    "name": "Kemps Bay",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "30",
    "iso2": "KB",
    "latitude": 24.02364,
    "longitude": -77.545349
  },
  {
    "id": 3619,
    "name": "Fresh Creek",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "26",
    "iso2": "FC",
    "latitude": 40.6543756,
    "longitude": -73.8947939
  },
  {
    "id": 3620,
    "name": "San Salvador and Rum Cay",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "35",
    "iso2": "SR",
    "latitude": 23.6854676,
    "longitude": -74.8390162
  },
  {
    "id": 3621,
    "name": "Crooked Island",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "40",
    "iso2": "CK",
    "latitude": 22.6390982,
    "longitude": -74.006509
  },
  {
    "id": 3622,
    "name": "South Andros",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "51",
    "iso2": "SA",
    "latitude": 23.9713556,
    "longitude": -77.6077865
  },
  {
    "id": 3623,
    "name": "Rock Sound",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "33",
    "iso2": "RS",
    "latitude": 39.0142443,
    "longitude": -95.6708989
  },
  {
    "id": 3624,
    "name": "Hope Town",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "43",
    "iso2": "HT",
    "latitude": 26.5009504,
    "longitude": -76.9959872
  },
  {
    "id": 3625,
    "name": "Mangrove Cay",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "44",
    "iso2": "MC",
    "latitude": 24.1481425,
    "longitude": -77.7680952
  },
  {
    "id": 3626,
    "name": "Freeport",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "25",
    "iso2": "FP",
    "latitude": 42.2966861,
    "longitude": -89.6212271
  },
  {
    "id": 3627,
    "name": "San Salvador Island",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "35",
    "iso2": "SS",
    "latitude": 24.0775546,
    "longitude": -74.4760088
  },
  {
    "id": 3628,
    "name": "Acklins and Crooked Islands",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "24",
    "iso2": "AC",
    "latitude": 22.3657708,
    "longitude": -74.0535126
  },
  {
    "id": 3629,
    "name": "Bimini",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "05",
    "iso2": "BI",
    "latitude": 24.6415325,
    "longitude": -79.8506226
  },
  {
    "id": 3630,
    "name": "Spanish Wells",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "53",
    "iso2": "SW",
    "latitude": 26.3250599,
    "longitude": -81.7980328
  },
  {
    "id": 3631,
    "name": "Central Andros",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "38",
    "iso2": "CS",
    "latitude": 24.4688482,
    "longitude": -77.973865
  },
  {
    "id": 3632,
    "name": "Grand Cay",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "42",
    "iso2": "GC",
    "latitude": 27.2162615,
    "longitude": -78.3230559
  },
  {
    "id": 3633,
    "name": "Mayaguana District",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "16",
    "iso2": "MG",
    "latitude": 22.4017714,
    "longitude": -73.0641396
  },
  {
    "id": 3634,
    "name": "San Juan Province",
    "countryId": 11,
    "countryCode": "AR",
    "fipsCode": "18",
    "iso2": "J",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 3635,
    "name": "Santiago del Estero Province",
    "countryId": 11,
    "countryCode": "AR",
    "fipsCode": "22",
    "iso2": "G",
    "latitude": -27.7833574,
    "longitude": -64.264167
  },
  {
    "id": 3636,
    "name": "San Luis Province",
    "countryId": 11,
    "countryCode": "AR",
    "fipsCode": "19",
    "iso2": "D",
    "latitude": -33.2962042,
    "longitude": -66.3294948
  },
  {
    "id": 3637,
    "name": "Tucumán Province",
    "countryId": 11,
    "countryCode": "AR",
    "fipsCode": "24",
    "iso2": "T",
    "latitude": -26.8221127,
    "longitude": -65.2192903
  },
  {
    "id": 3638,
    "name": "Corrientes",
    "countryId": 11,
    "countryCode": "AR",
    "fipsCode": "06",
    "iso2": "W",
    "latitude": -27.4692131,
    "longitude": -58.8306349
  },
  {
    "id": 3639,
    "name": "Río Negro Province",
    "countryId": 11,
    "countryCode": "AR",
    "fipsCode": "16",
    "iso2": "R",
    "latitude": -40.8261434,
    "longitude": -63.0266339
  },
  {
    "id": 3640,
    "name": "Chaco Province",
    "countryId": 11,
    "countryCode": "AR",
    "fipsCode": "03",
    "iso2": "H",
    "latitude": -27.4257175,
    "longitude": -59.0243784
  },
  {
    "id": 3641,
    "name": "Santa Fe Province",
    "countryId": 11,
    "countryCode": "AR",
    "fipsCode": "21",
    "iso2": "S",
    "latitude": -31.5855109,
    "longitude": -60.7238016
  },
  {
    "id": 3642,
    "name": "Córdoba Province",
    "countryId": 11,
    "countryCode": "AR",
    "fipsCode": "05",
    "iso2": "X",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 3643,
    "name": "Salta Province",
    "countryId": 11,
    "countryCode": "AR",
    "fipsCode": "17",
    "iso2": "A",
    "latitude": -24.7997688,
    "longitude": -65.4150367
  },
  {
    "id": 3644,
    "name": "Misiones Province",
    "countryId": 11,
    "countryCode": "AR",
    "fipsCode": "14",
    "iso2": "N",
    "latitude": -27.4269255,
    "longitude": -55.9467076
  },
  {
    "id": 3645,
    "name": "Jujuy Province",
    "countryId": 11,
    "countryCode": "AR",
    "fipsCode": "10",
    "iso2": "Y",
    "latitude": -24.1843397,
    "longitude": -65.302177
  },
  {
    "id": 3646,
    "name": "Mendoza",
    "countryId": 11,
    "countryCode": "AR",
    "fipsCode": "13",
    "iso2": "M",
    "latitude": -32.8894587,
    "longitude": -68.8458386
  },
  {
    "id": 3647,
    "name": "Catamarca Province",
    "countryId": 11,
    "countryCode": "AR",
    "fipsCode": "02",
    "iso2": "K",
    "latitude": -28.4715877,
    "longitude": -65.7877209
  },
  {
    "id": 3648,
    "name": "Neuquén Province",
    "countryId": 11,
    "countryCode": "AR",
    "fipsCode": "15",
    "iso2": "Q",
    "latitude": -38.94587,
    "longitude": -68.0730925
  },
  {
    "id": 3649,
    "name": "Santa Cruz Province",
    "countryId": 11,
    "countryCode": "AR",
    "fipsCode": "20",
    "iso2": "Z",
    "latitude": -51.6352821,
    "longitude": -69.2474353
  },
  {
    "id": 3650,
    "name": "Tierra del Fuego Province",
    "countryId": 11,
    "countryCode": "AR",
    "fipsCode": "23",
    "iso2": "V",
    "latitude": -54.8053998,
    "longitude": -68.3242061
  },
  {
    "id": 3651,
    "name": "Chubut Province",
    "countryId": 11,
    "countryCode": "AR",
    "fipsCode": "04",
    "iso2": "U",
    "latitude": -43.2934246,
    "longitude": -65.1114818
  },
  {
    "id": 3652,
    "name": "Formosa Province",
    "countryId": 11,
    "countryCode": "AR",
    "fipsCode": "09",
    "iso2": "P",
    "latitude": -26.1894804,
    "longitude": -58.2242806
  },
  {
    "id": 3653,
    "name": "La Rioja Province",
    "countryId": 11,
    "countryCode": "AR",
    "fipsCode": "12",
    "iso2": "F",
    "latitude": -29.4193793,
    "longitude": -66.8559932
  },
  {
    "id": 3654,
    "name": "Entre Ríos Province",
    "countryId": 11,
    "countryCode": "AR",
    "fipsCode": "08",
    "iso2": "E",
    "latitude": -31.7746654,
    "longitude": -60.4956461
  },
  {
    "id": 3655,
    "name": "La Pampa",
    "countryId": 11,
    "countryCode": "AR",
    "fipsCode": "11",
    "iso2": "L",
    "latitude": -36.6147573,
    "longitude": -64.2839209
  },
  {
    "id": 3656,
    "name": "Buenos Aires Province",
    "countryId": 11,
    "countryCode": "AR",
    "fipsCode": "07",
    "iso2": "B",
    "latitude": -37.2017285,
    "longitude": -59.8410697
  },
  {
    "id": 3657,
    "name": "Quiché Department",
    "countryId": 90,
    "countryCode": "GT",
    "fipsCode": "14",
    "iso2": "QC",
    "latitude": 15.4983808,
    "longitude": -90.9820668
  },
  {
    "id": 3658,
    "name": "Jalapa Department",
    "countryId": 90,
    "countryCode": "GT",
    "fipsCode": "10",
    "iso2": "JA",
    "latitude": 14.6121446,
    "longitude": -89.9626799
  },
  {
    "id": 3659,
    "name": "Izabal Department",
    "countryId": 90,
    "countryCode": "GT",
    "fipsCode": "09",
    "iso2": "IZ",
    "latitude": 15.4976517,
    "longitude": -88.864698
  },
  {
    "id": 3660,
    "name": "Suchitepéquez Department",
    "countryId": 90,
    "countryCode": "GT",
    "fipsCode": "20",
    "iso2": "SU",
    "latitude": 14.4215982,
    "longitude": -91.4048249
  },
  {
    "id": 3661,
    "name": "Sololá Department",
    "countryId": 90,
    "countryCode": "GT",
    "fipsCode": "19",
    "iso2": "SO",
    "latitude": 14.748523,
    "longitude": -91.2891036
  },
  {
    "id": 3662,
    "name": "El Progreso Department",
    "countryId": 90,
    "countryCode": "GT",
    "fipsCode": "05",
    "iso2": "PR",
    "latitude": 14.9388732,
    "longitude": -90.0746767
  },
  {
    "id": 3663,
    "name": "Totonicapán Department",
    "countryId": 90,
    "countryCode": "GT",
    "fipsCode": "21",
    "iso2": "TO",
    "latitude": 14.9173402,
    "longitude": -91.3613923
  },
  {
    "id": 3664,
    "name": "Retalhuleu Department",
    "countryId": 90,
    "countryCode": "GT",
    "fipsCode": "15",
    "iso2": "RE",
    "latitude": 14.5245485,
    "longitude": -91.685788
  },
  {
    "id": 3665,
    "name": "Santa Rosa Department",
    "countryId": 90,
    "countryCode": "GT",
    "fipsCode": "18",
    "iso2": "SR",
    "latitude": 38.4405759,
    "longitude": -122.7037543
  },
  {
    "id": 3666,
    "name": "Chiquimula Department",
    "countryId": 90,
    "countryCode": "GT",
    "fipsCode": "04",
    "iso2": "CQ",
    "latitude": 14.7514999,
    "longitude": -89.4742177
  },
  {
    "id": 3667,
    "name": "San Marcos Department",
    "countryId": 90,
    "countryCode": "GT",
    "fipsCode": "17",
    "iso2": "SM",
    "latitude": 14.9309569,
    "longitude": -91.9099238
  },
  {
    "id": 3668,
    "name": "Quetzaltenango Department",
    "countryId": 90,
    "countryCode": "GT",
    "fipsCode": "13",
    "iso2": "QZ",
    "latitude": 14.792433,
    "longitude": -91.714958
  },
  {
    "id": 3669,
    "name": "Petén Department",
    "countryId": 90,
    "countryCode": "GT",
    "fipsCode": "12",
    "iso2": "PE",
    "latitude": 16.912033,
    "longitude": -90.2995785
  },
  {
    "id": 3670,
    "name": "Huehuetenango Department",
    "countryId": 90,
    "countryCode": "GT",
    "fipsCode": "08",
    "iso2": "HU",
    "latitude": 15.5879914,
    "longitude": -91.6760691
  },
  {
    "id": 3671,
    "name": "Alta Verapaz Department",
    "countryId": 90,
    "countryCode": "GT",
    "fipsCode": "01",
    "iso2": "AV",
    "latitude": 15.5942883,
    "longitude": -90.1494988
  },
  {
    "id": 3672,
    "name": "Guatemala Department",
    "countryId": 90,
    "countryCode": "GT",
    "fipsCode": "07",
    "iso2": "GU",
    "latitude": 14.5649401,
    "longitude": -90.5257823
  },
  {
    "id": 3673,
    "name": "Jutiapa Department",
    "countryId": 90,
    "countryCode": "GT",
    "fipsCode": "11",
    "iso2": "JU",
    "latitude": 14.1930802,
    "longitude": -89.9253233
  },
  {
    "id": 3674,
    "name": "Baja Verapaz Department",
    "countryId": 90,
    "countryCode": "GT",
    "fipsCode": "02",
    "iso2": "BV",
    "latitude": 15.1255867,
    "longitude": -90.3748354
  },
  {
    "id": 3675,
    "name": "Chimaltenango Department",
    "countryId": 90,
    "countryCode": "GT",
    "fipsCode": "03",
    "iso2": "CM",
    "latitude": 14.5634787,
    "longitude": -90.9820668
  },
  {
    "id": 3676,
    "name": "Sacatepéquez Department",
    "countryId": 90,
    "countryCode": "GT",
    "fipsCode": "16",
    "iso2": "SA",
    "latitude": 14.5178379,
    "longitude": -90.7152749
  },
  {
    "id": 3677,
    "name": "Escuintla Department",
    "countryId": 90,
    "countryCode": "GT",
    "fipsCode": "06",
    "iso2": "ES",
    "latitude": 14.1910912,
    "longitude": -90.9820668
  },
  {
    "id": 3678,
    "name": "Madre de Dios",
    "countryId": 173,
    "countryCode": "PE",
    "fipsCode": "17",
    "iso2": "MDD",
    "latitude": -11.7668705,
    "longitude": -70.8119953
  },
  {
    "id": 3679,
    "name": "Huancavelica",
    "countryId": 173,
    "countryCode": "PE",
    "fipsCode": "09",
    "iso2": "HUV",
    "latitude": -12.7861978,
    "longitude": -74.9764024
  },
  {
    "id": 3680,
    "name": "Áncash",
    "countryId": 173,
    "countryCode": "PE",
    "fipsCode": "02",
    "iso2": "ANC",
    "latitude": -9.3250497,
    "longitude": -77.5619419
  },
  {
    "id": 3681,
    "name": "Arequipa",
    "countryId": 173,
    "countryCode": "PE",
    "fipsCode": "04",
    "iso2": "ARE",
    "latitude": -16.4090474,
    "longitude": -71.537451
  },
  {
    "id": 3682,
    "name": "Puno",
    "countryId": 173,
    "countryCode": "PE",
    "fipsCode": "21",
    "iso2": "PUN",
    "latitude": -15.8402218,
    "longitude": -70.0218805
  },
  {
    "id": 3683,
    "name": "La Libertad",
    "countryId": 173,
    "countryCode": "PE",
    "fipsCode": "13",
    "iso2": "LAL",
    "latitude": 13.490697,
    "longitude": -89.3084607
  },
  {
    "id": 3684,
    "name": "Ucayali",
    "countryId": 173,
    "countryCode": "PE",
    "fipsCode": "25",
    "iso2": "UCA",
    "latitude": -9.8251183,
    "longitude": -73.087749
  },
  {
    "id": 3685,
    "name": "Amazonas",
    "countryId": 173,
    "countryCode": "PE",
    "fipsCode": "01",
    "iso2": "AMA",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 3686,
    "name": "Pasco",
    "countryId": 173,
    "countryCode": "PE",
    "fipsCode": "19",
    "iso2": "PAS",
    "latitude": 46.2305049,
    "longitude": -119.0922316
  },
  {
    "id": 3687,
    "name": "Huanuco",
    "countryId": 173,
    "countryCode": "PE",
    "fipsCode": "10",
    "iso2": "HUC",
    "latitude": -9.9207648,
    "longitude": -76.2410843
  },
  {
    "id": 3688,
    "name": "Cajamarca",
    "countryId": 173,
    "countryCode": "PE",
    "fipsCode": "06",
    "iso2": "CAJ",
    "latitude": -7.1617465,
    "longitude": -78.5127855
  },
  {
    "id": 3689,
    "name": "Tumbes",
    "countryId": 173,
    "countryCode": "PE",
    "fipsCode": "24",
    "iso2": "TUM",
    "latitude": -3.5564921,
    "longitude": -80.4270885
  },
  {
    "id": 3691,
    "name": "Cusco",
    "countryId": 173,
    "countryCode": "PE",
    "fipsCode": "08",
    "iso2": "CUS",
    "latitude": -13.53195,
    "longitude": -71.9674626
  },
  {
    "id": 3692,
    "name": "Ayacucho",
    "countryId": 173,
    "countryCode": "PE",
    "fipsCode": "05",
    "iso2": "AYA",
    "latitude": -13.1638737,
    "longitude": -74.2235641
  },
  {
    "id": 3693,
    "name": "Junín",
    "countryId": 173,
    "countryCode": "PE",
    "fipsCode": "12",
    "iso2": "JUN",
    "latitude": -11.1581925,
    "longitude": -75.9926306
  },
  {
    "id": 3694,
    "name": "San Martín",
    "countryId": 173,
    "countryCode": "PE",
    "fipsCode": "22",
    "iso2": "SAM",
    "latitude": 37.0849464,
    "longitude": -121.6102216
  },
  {
    "id": 3695,
    "name": "Lima",
    "countryId": 173,
    "countryCode": "PE",
    "fipsCode": "15",
    "iso2": "LIM",
    "latitude": -12.0463731,
    "longitude": -77.042754
  },
  {
    "id": 3696,
    "name": "Tacna",
    "countryId": 173,
    "countryCode": "PE",
    "fipsCode": "23",
    "iso2": "TAC",
    "latitude": -18.0065679,
    "longitude": -70.2462741
  },
  {
    "id": 3697,
    "name": "Piura",
    "countryId": 173,
    "countryCode": "PE",
    "fipsCode": "20",
    "iso2": "PIU",
    "latitude": -5.1782884,
    "longitude": -80.6548882
  },
  {
    "id": 3698,
    "name": "Moquegua",
    "countryId": 173,
    "countryCode": "PE",
    "fipsCode": "18",
    "iso2": "MOQ",
    "latitude": -17.1927361,
    "longitude": -70.9328138
  },
  {
    "id": 3699,
    "name": "Apurímac",
    "countryId": 173,
    "countryCode": "PE",
    "fipsCode": "03",
    "iso2": "APU",
    "latitude": -14.0504533,
    "longitude": -73.087749
  },
  {
    "id": 3700,
    "name": "Ica",
    "countryId": 173,
    "countryCode": "PE",
    "fipsCode": "11",
    "iso2": "ICA",
    "latitude": 42.3528832,
    "longitude": -71.0430097
  },
  {
    "id": 3701,
    "name": "Callao",
    "countryId": 173,
    "countryCode": "PE",
    "fipsCode": "07",
    "iso2": "CAL",
    "latitude": -12.0508491,
    "longitude": -77.1259843
  },
  {
    "id": 3702,
    "name": "Lambayeque",
    "countryId": 173,
    "countryCode": "PE",
    "fipsCode": "14",
    "iso2": "LAM",
    "latitude": -6.7197666,
    "longitude": -79.9080757
  },
  {
    "id": 3703,
    "name": "Redonda",
    "countryId": 10,
    "countryCode": "AG",
    "fipsCode": "09",
    "iso2": "11",
    "latitude": 16.938416,
    "longitude": -62.3455148
  },
  {
    "id": 3704,
    "name": "Saint Peter Parish",
    "countryId": 10,
    "countryCode": "AG",
    "fipsCode": "07",
    "iso2": "07",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 3705,
    "name": "Saint Paul Parish",
    "countryId": 10,
    "countryCode": "AG",
    "fipsCode": "06",
    "iso2": "06",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 3706,
    "name": "Saint John Parish",
    "countryId": 10,
    "countryCode": "AG",
    "fipsCode": "04",
    "iso2": "04",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 3707,
    "name": "Saint Mary Parish",
    "countryId": 10,
    "countryCode": "AG",
    "fipsCode": "05",
    "iso2": "05",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 3708,
    "name": "Barbuda",
    "countryId": 10,
    "countryCode": "AG",
    "fipsCode": "01",
    "iso2": "10",
    "latitude": 17.6266242,
    "longitude": -61.7713028
  },
  {
    "id": 3709,
    "name": "Saint George Parish",
    "countryId": 10,
    "countryCode": "AG",
    "fipsCode": "03",
    "iso2": "03",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 3710,
    "name": "Saint Philip Parish",
    "countryId": 10,
    "countryCode": "AG",
    "fipsCode": "08",
    "iso2": "08",
    "latitude": 40.4368258,
    "longitude": -80.0685532
  },
  {
    "id": 3711,
    "name": "South Bačka District",
    "countryId": 196,
    "countryCode": "RS",
    "fipsCode": "08",
    "iso2": "06",
    "latitude": 45.4890344,
    "longitude": 19.6976187
  },
  {
    "id": 3712,
    "name": "Pirot District",
    "countryId": 196,
    "countryCode": "RS",
    "fipsCode": "08",
    "iso2": "22",
    "latitude": 43.0874036,
    "longitude": 22.5983044
  },
  {
    "id": 3713,
    "name": "South Banat District",
    "countryId": 196,
    "countryCode": "RS",
    "fipsCode": "08",
    "iso2": "04",
    "latitude": 45.0027457,
    "longitude": 21.0542509
  },
  {
    "id": 3714,
    "name": "North Bačka District",
    "countryId": 196,
    "countryCode": "RS",
    "fipsCode": "08",
    "iso2": "01",
    "latitude": 45.9803394,
    "longitude": 19.5907001
  },
  {
    "id": 3715,
    "name": "Jablanica District",
    "countryId": 196,
    "countryCode": "RS",
    "fipsCode": "08",
    "iso2": "23",
    "latitude": 42.948156,
    "longitude": 21.8129321
  },
  {
    "id": 3716,
    "name": "Central Banat District",
    "countryId": 196,
    "countryCode": "RS",
    "fipsCode": "SE",
    "iso2": "02",
    "latitude": 45.4788485,
    "longitude": 20.6082522
  },
  {
    "id": 3717,
    "name": "Bor District",
    "countryId": 196,
    "countryCode": "RS",
    "fipsCode": "SE",
    "iso2": "14",
    "latitude": 44.0698918,
    "longitude": 22.0985086
  },
  {
    "id": 3718,
    "name": "Toplica District",
    "countryId": 196,
    "countryCode": "RS",
    "fipsCode": "SE",
    "iso2": "21",
    "latitude": 43.1906592,
    "longitude": 21.3407762
  },
  {
    "id": 3719,
    "name": "Mačva District",
    "countryId": 196,
    "countryCode": "RS",
    "fipsCode": "SE",
    "iso2": "08",
    "latitude": 44.5925314,
    "longitude": 19.5082246
  },
  {
    "id": 3720,
    "name": "Rasina District",
    "countryId": 196,
    "countryCode": "RS",
    "fipsCode": "SE",
    "iso2": "19",
    "latitude": 43.5263525,
    "longitude": 21.1588178
  },
  {
    "id": 3721,
    "name": "Pčinja District",
    "countryId": 196,
    "countryCode": "RS",
    "fipsCode": "SE",
    "iso2": "24",
    "latitude": 42.5836362,
    "longitude": 22.1430215
  },
  {
    "id": 3722,
    "name": "Nišava District",
    "countryId": 196,
    "countryCode": "RS",
    "fipsCode": "SE",
    "iso2": "20",
    "latitude": 43.3738902,
    "longitude": 21.9322331
  },
  {
    "id": 3723,
    "name": "Prizren District",
    "countryId": 248,
    "countryCode": "XK",
    "fipsCode": null,
    "iso2": "XPR",
    "latitude": 42.2152522,
    "longitude": 20.7414772
  },
  {
    "id": 3724,
    "name": "Kolubara District",
    "countryId": 196,
    "countryCode": "RS",
    "fipsCode": "SE",
    "iso2": "09",
    "latitude": 44.3509811,
    "longitude": 20.0004305
  },
  {
    "id": 3725,
    "name": "Raška District",
    "countryId": 196,
    "countryCode": "RS",
    "fipsCode": "SE",
    "iso2": "18",
    "latitude": 43.3373461,
    "longitude": 20.5734005
  },
  {
    "id": 3726,
    "name": "West Bačka District",
    "countryId": 196,
    "countryCode": "RS",
    "fipsCode": "SE",
    "iso2": "05",
    "latitude": 45.7355385,
    "longitude": 19.1897364
  },
  {
    "id": 3727,
    "name": "Moravica District",
    "countryId": 196,
    "countryCode": "RS",
    "fipsCode": "SE",
    "iso2": "17",
    "latitude": 43.84147,
    "longitude": 20.2904987
  },
  {
    "id": 3728,
    "name": "Belgrade",
    "countryId": 196,
    "countryCode": "RS",
    "fipsCode": "SE",
    "iso2": "00",
    "latitude": 44.786568,
    "longitude": 20.4489216
  },
  {
    "id": 3729,
    "name": "Zlatibor District",
    "countryId": 196,
    "countryCode": "RS",
    "fipsCode": "SE",
    "iso2": "16",
    "latitude": 43.645417,
    "longitude": 19.7101455
  },
  {
    "id": 3731,
    "name": "Zaječar District",
    "countryId": 196,
    "countryCode": "RS",
    "fipsCode": "SE",
    "iso2": "15",
    "latitude": 43.9015048,
    "longitude": 22.2738011
  },
  {
    "id": 3732,
    "name": "Braničevo District",
    "countryId": 196,
    "countryCode": "RS",
    "fipsCode": "SE",
    "iso2": "11",
    "latitude": 44.6982246,
    "longitude": 21.5446775
  },
  {
    "id": 3733,
    "name": "Vojvodina",
    "countryId": 196,
    "countryCode": "RS",
    "fipsCode": "VO",
    "iso2": "VO",
    "latitude": 45.2608651,
    "longitude": 19.8319338
  },
  {
    "id": 3734,
    "name": "Šumadija District",
    "countryId": 196,
    "countryCode": "RS",
    "fipsCode": "VO",
    "iso2": "12",
    "latitude": 44.2050678,
    "longitude": 20.7856565
  },
  {
    "id": 3736,
    "name": "North Banat District",
    "countryId": 196,
    "countryCode": "RS",
    "fipsCode": "VO",
    "iso2": "03",
    "latitude": 45.906839,
    "longitude": 19.9993417
  },
  {
    "id": 3737,
    "name": "Pomoravlje District",
    "countryId": 196,
    "countryCode": "RS",
    "fipsCode": "VO",
    "iso2": "13",
    "latitude": 43.9591379,
    "longitude": 21.271353
  },
  {
    "id": 3738,
    "name": "Peć District",
    "countryId": 248,
    "countryCode": "XK",
    "fipsCode": null,
    "iso2": "XPE",
    "latitude": 42.6592155,
    "longitude": 20.2887624
  },
  {
    "id": 3740,
    "name": "Srem District",
    "countryId": 196,
    "countryCode": "RS",
    "fipsCode": "VO",
    "iso2": "07",
    "latitude": 45.0029171,
    "longitude": 19.8013773
  },
  {
    "id": 3741,
    "name": "Podunavlje District",
    "countryId": 196,
    "countryCode": "RS",
    "fipsCode": "VO",
    "iso2": "10",
    "latitude": 44.4729156,
    "longitude": 20.9901426
  },
  {
    "id": 3742,
    "name": "Westmoreland Parish",
    "countryId": 108,
    "countryCode": "JM",
    "fipsCode": "16",
    "iso2": "10",
    "latitude": 18.2944378,
    "longitude": -78.1564432
  },
  {
    "id": 3743,
    "name": "Saint Elizabeth Parish",
    "countryId": 108,
    "countryCode": "JM",
    "fipsCode": "11",
    "iso2": "11",
    "latitude": 38.9925308,
    "longitude": -94.58992
  },
  {
    "id": 3744,
    "name": "Saint Ann Parish",
    "countryId": 108,
    "countryCode": "JM",
    "fipsCode": "09",
    "iso2": "06",
    "latitude": 37.2871452,
    "longitude": -77.4103533
  },
  {
    "id": 3745,
    "name": "Saint James Parish",
    "countryId": 108,
    "countryCode": "JM",
    "fipsCode": "12",
    "iso2": "08",
    "latitude": 30.0179292,
    "longitude": -90.7913227
  },
  {
    "id": 3746,
    "name": "Saint Catherine Parish",
    "countryId": 108,
    "countryCode": "JM",
    "fipsCode": "10",
    "iso2": "14",
    "latitude": 18.0364134,
    "longitude": -77.0564464
  },
  {
    "id": 3747,
    "name": "Saint Mary Parish",
    "countryId": 108,
    "countryCode": "JM",
    "fipsCode": "13",
    "iso2": "05",
    "latitude": 36.092522,
    "longitude": -95.973844
  },
  {
    "id": 3748,
    "name": "Kingston Parish",
    "countryId": 108,
    "countryCode": "JM",
    "fipsCode": "17",
    "iso2": "01",
    "latitude": 17.9683271,
    "longitude": -76.782702
  },
  {
    "id": 3749,
    "name": "Hanover Parish",
    "countryId": 108,
    "countryCode": "JM",
    "fipsCode": "02",
    "iso2": "09",
    "latitude": 18.4097707,
    "longitude": -78.133638
  },
  {
    "id": 3750,
    "name": "Saint Thomas Parish",
    "countryId": 108,
    "countryCode": "JM",
    "fipsCode": "14",
    "iso2": "03",
    "latitude": 41.4425389,
    "longitude": -81.7402218
  },
  {
    "id": 3751,
    "name": "Saint Andrew",
    "countryId": 108,
    "countryCode": "JM",
    "fipsCode": "08",
    "iso2": "02",
    "latitude": 37.2245103,
    "longitude": -95.7021189
  },
  {
    "id": 3752,
    "name": "Portland Parish",
    "countryId": 108,
    "countryCode": "JM",
    "fipsCode": "07",
    "iso2": "04",
    "latitude": 18.0844274,
    "longitude": -76.4100267
  },
  {
    "id": 3753,
    "name": "Clarendon Parish",
    "countryId": 108,
    "countryCode": "JM",
    "fipsCode": "01",
    "iso2": "13",
    "latitude": 17.9557183,
    "longitude": -77.2405153
  },
  {
    "id": 3754,
    "name": "Manchester Parish",
    "countryId": 108,
    "countryCode": "JM",
    "fipsCode": "04",
    "iso2": "12",
    "latitude": 18.0669654,
    "longitude": -77.5160788
  },
  {
    "id": 3755,
    "name": "Trelawny Parish",
    "countryId": 108,
    "countryCode": "JM",
    "fipsCode": "15",
    "iso2": "07",
    "latitude": 18.3526143,
    "longitude": -77.6077865
  },
  {
    "id": 3756,
    "name": "Dennery Quarter",
    "countryId": 186,
    "countryCode": "LC",
    "fipsCode": "05",
    "iso2": "05",
    "latitude": 13.9267393,
    "longitude": -60.9190988
  },
  {
    "id": 3757,
    "name": "Anse la Raye Quarter",
    "countryId": 186,
    "countryCode": "LC",
    "fipsCode": "01",
    "iso2": "01",
    "latitude": 13.9459424,
    "longitude": -61.0369468
  },
  {
    "id": 3758,
    "name": "Castries Quarter",
    "countryId": 186,
    "countryCode": "LC",
    "fipsCode": "03",
    "iso2": "02",
    "latitude": 14.0101094,
    "longitude": -60.9874687
  },
  {
    "id": 3759,
    "name": "Laborie Quarter",
    "countryId": 186,
    "countryCode": "LC",
    "fipsCode": "07",
    "iso2": "07",
    "latitude": 13.7522783,
    "longitude": -60.9932889
  },
  {
    "id": 3760,
    "name": "Choiseul Quarter",
    "countryId": 186,
    "countryCode": "LC",
    "fipsCode": "04",
    "iso2": "03",
    "latitude": 13.7750154,
    "longitude": -61.048591
  },
  {
    "id": 3761,
    "name": "Canaries",
    "countryId": 186,
    "countryCode": "LC",
    "fipsCode": "12",
    "iso2": "12",
    "latitude": 28.2915637,
    "longitude": -16.6291304
  },
  {
    "id": 3762,
    "name": "Micoud Quarter",
    "countryId": 186,
    "countryCode": "LC",
    "fipsCode": "08",
    "iso2": "08",
    "latitude": 13.8211871,
    "longitude": -60.9001934
  },
  {
    "id": 3763,
    "name": "Vieux Fort Quarter",
    "countryId": 186,
    "countryCode": "LC",
    "fipsCode": "10",
    "iso2": "11",
    "latitude": 13.720608,
    "longitude": -60.9496433
  },
  {
    "id": 3764,
    "name": "Soufrière Quarter",
    "countryId": 186,
    "countryCode": "LC",
    "fipsCode": "09",
    "iso2": "10",
    "latitude": 13.8570986,
    "longitude": -61.0573248
  },
  {
    "id": 3765,
    "name": "Praslin Quarter",
    "countryId": 186,
    "countryCode": "LC",
    "fipsCode": "11",
    "iso2": "09",
    "latitude": 13.8752392,
    "longitude": -60.8994663
  },
  {
    "id": 3766,
    "name": "Gros Islet Quarter",
    "countryId": 186,
    "countryCode": "LC",
    "fipsCode": "06",
    "iso2": "06",
    "latitude": 14.0843578,
    "longitude": -60.9452794
  },
  {
    "id": 3767,
    "name": "Dauphin Quarter",
    "countryId": 186,
    "countryCode": "LC",
    "fipsCode": "02",
    "iso2": "04",
    "latitude": 14.0103396,
    "longitude": -60.9190988
  },
  {
    "id": 3768,
    "name": "Hưng Yên",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "81",
    "iso2": "66",
    "latitude": 20.8525711,
    "longitude": 106.0169971
  },
  {
    "id": 3769,
    "name": "Đồng Tháp",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "09",
    "iso2": "45",
    "latitude": 10.4937989,
    "longitude": 105.6881788
  },
  {
    "id": 3770,
    "name": "Bà Rịa-Vũng Tàu",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "45",
    "iso2": "43",
    "latitude": 10.5417397,
    "longitude": 107.2429976
  },
  {
    "id": 3771,
    "name": "Thanh Hóa",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "34",
    "iso2": "21",
    "latitude": 19.806692,
    "longitude": 105.7851816
  },
  {
    "id": 3772,
    "name": "Kon Tum",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "55",
    "iso2": "28",
    "latitude": 14.3497403,
    "longitude": 108.0004606
  },
  {
    "id": 3773,
    "name": "Điện Biên",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "92",
    "iso2": "71",
    "latitude": 21.8042309,
    "longitude": 103.1076525
  },
  {
    "id": 3774,
    "name": "Vĩnh Phúc",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "86",
    "iso2": "70",
    "latitude": 21.3608805,
    "longitude": 105.5474373
  },
  {
    "id": 3775,
    "name": "Thái Bình",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "35",
    "iso2": "20",
    "latitude": 20.4463471,
    "longitude": 106.3365828
  },
  {
    "id": 3776,
    "name": "Quảng Nam",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "84",
    "iso2": "27",
    "latitude": 15.5393538,
    "longitude": 108.019102
  },
  {
    "id": 3777,
    "name": "Hậu Giang",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "93",
    "iso2": "73",
    "latitude": 9.757898,
    "longitude": 105.6412527
  },
  {
    "id": 3778,
    "name": "Cà Mau",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "77",
    "iso2": "59",
    "latitude": 9.1526728,
    "longitude": 105.1960795
  },
  {
    "id": 3779,
    "name": "Hà Giang",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "50",
    "iso2": "03",
    "latitude": 22.8025588,
    "longitude": 104.9784494
  },
  {
    "id": 3780,
    "name": "Nghệ An",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "58",
    "iso2": "22",
    "latitude": 19.2342489,
    "longitude": 104.9200365
  },
  {
    "id": 3781,
    "name": "Tiền Giang",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "37",
    "iso2": "46",
    "latitude": 10.4493324,
    "longitude": 106.3420504
  },
  {
    "id": 3782,
    "name": "Cao Bằng",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "05",
    "iso2": "04",
    "latitude": 22.635689,
    "longitude": 106.2522143
  },
  {
    "id": 3783,
    "name": "Haiphong",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "13",
    "iso2": "HP",
    "latitude": 20.8449115,
    "longitude": 106.6880841
  },
  {
    "id": 3784,
    "name": "Yên Bái",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "70",
    "iso2": "06",
    "latitude": 21.7167689,
    "longitude": 104.8985878
  },
  {
    "id": 3785,
    "name": "Bình Dương",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "75",
    "iso2": "57",
    "latitude": 11.3254024,
    "longitude": 106.477017
  },
  {
    "id": 3786,
    "name": "Ninh Bình",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "59",
    "iso2": "18",
    "latitude": 20.2506149,
    "longitude": 105.9744536
  },
  {
    "id": 3787,
    "name": "Bình Thuận",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "47",
    "iso2": "40",
    "latitude": 11.0903703,
    "longitude": 108.0720781
  },
  {
    "id": 3788,
    "name": "Ninh Thuận",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "60",
    "iso2": "36",
    "latitude": 11.6738767,
    "longitude": 108.8629572
  },
  {
    "id": 3789,
    "name": "Nam Định",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "82",
    "iso2": "67",
    "latitude": 20.4388225,
    "longitude": 106.1621053
  },
  {
    "id": 3790,
    "name": "Vĩnh Long",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "69",
    "iso2": "49",
    "latitude": 10.239574,
    "longitude": 105.9571928
  },
  {
    "id": 3791,
    "name": "Bắc Ninh",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "74",
    "iso2": "56",
    "latitude": 21.121444,
    "longitude": 106.1110501
  },
  {
    "id": 3792,
    "name": "Lạng Sơn",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "39",
    "iso2": "09",
    "latitude": 21.853708,
    "longitude": 106.761519
  },
  {
    "id": 3793,
    "name": "Khánh Hòa",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "54",
    "iso2": "34",
    "latitude": 12.2585098,
    "longitude": 109.0526076
  },
  {
    "id": 3794,
    "name": "An Giang",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "01",
    "iso2": "44",
    "latitude": 10.5215836,
    "longitude": 105.1258955
  },
  {
    "id": 3795,
    "name": "Tuyên Quang",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "68",
    "iso2": "07",
    "latitude": 21.7767246,
    "longitude": 105.2280196
  },
  {
    "id": 3796,
    "name": "Bến Tre",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "03",
    "iso2": "50",
    "latitude": 10.2433556,
    "longitude": 106.375551
  },
  {
    "id": 3797,
    "name": "Bình Phước",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "76",
    "iso2": "58",
    "latitude": 11.7511894,
    "longitude": 106.7234639
  },
  {
    "id": 3798,
    "name": "Thừa Thiên-Huế",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "66",
    "iso2": "26",
    "latitude": 16.467397,
    "longitude": 107.5905326
  },
  {
    "id": 3799,
    "name": "Hòa Bình",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "53",
    "iso2": "14",
    "latitude": 20.6861265,
    "longitude": 105.3131185
  },
  {
    "id": 3800,
    "name": "Kiên Giang",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "21",
    "iso2": "47",
    "latitude": 9.8249587,
    "longitude": 105.1258955
  },
  {
    "id": 3801,
    "name": "Phú Thọ",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "83",
    "iso2": "68",
    "latitude": 21.268443,
    "longitude": 105.2045573
  },
  {
    "id": 3802,
    "name": "Hà Nam",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "80",
    "iso2": "63",
    "latitude": 20.5835196,
    "longitude": 105.92299
  },
  {
    "id": 3803,
    "name": "Quảng Trị",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "64",
    "iso2": "25",
    "latitude": 16.7403074,
    "longitude": 107.1854679
  },
  {
    "id": 3804,
    "name": "Bạc Liêu",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "73",
    "iso2": "55",
    "latitude": 9.2940027,
    "longitude": 105.7215663
  },
  {
    "id": 3805,
    "name": "Trà Vinh",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "67",
    "iso2": "51",
    "latitude": 9.812741,
    "longitude": 106.2992912
  },
  {
    "id": 3806,
    "name": "Da Nang",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "78",
    "iso2": "DN",
    "latitude": 16.0544068,
    "longitude": 108.2021667
  },
  {
    "id": 3807,
    "name": "Thái Nguyên",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "85",
    "iso2": "69",
    "latitude": 21.5671559,
    "longitude": 105.8252038
  },
  {
    "id": 3808,
    "name": "Long An",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "24",
    "iso2": "41",
    "latitude": 10.5607168,
    "longitude": 106.6497623
  },
  {
    "id": 3809,
    "name": "Quảng Bình",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "62",
    "iso2": "24",
    "latitude": 17.6102715,
    "longitude": 106.3487474
  },
  {
    "id": 3810,
    "name": "Hanoi",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "44",
    "iso2": "HN",
    "latitude": 21.0277644,
    "longitude": 105.8341598
  },
  {
    "id": 3811,
    "name": "Ho Chi Minh City",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "20",
    "iso2": "SG",
    "latitude": 10.8230989,
    "longitude": 106.6296638
  },
  {
    "id": 3812,
    "name": "Sơn La",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "32",
    "iso2": "05",
    "latitude": 21.1022284,
    "longitude": 103.7289167
  },
  {
    "id": 3813,
    "name": "Gia Lai",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "49",
    "iso2": "30",
    "latitude": 13.8078943,
    "longitude": 108.109375
  },
  {
    "id": 3814,
    "name": "Quảng Ninh",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "30",
    "iso2": "13",
    "latitude": 21.006382,
    "longitude": 107.2925144
  },
  {
    "id": 3815,
    "name": "Bắc Giang",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "71",
    "iso2": "54",
    "latitude": 21.2819921,
    "longitude": 106.1974769
  },
  {
    "id": 3816,
    "name": "Hà Tĩnh",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "52",
    "iso2": "23",
    "latitude": 18.3559537,
    "longitude": 105.8877494
  },
  {
    "id": 3817,
    "name": "Lào Cai",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "90",
    "iso2": "02",
    "latitude": 22.4809431,
    "longitude": 103.9754959
  },
  {
    "id": 3818,
    "name": "Lâm Đồng",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "23",
    "iso2": "35",
    "latitude": 11.5752791,
    "longitude": 108.1428669
  },
  {
    "id": 3819,
    "name": "Sóc Trăng",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "65",
    "iso2": "52",
    "latitude": 9.602521,
    "longitude": 105.9739049
  },
  {
    "id": 3820,
    "name": "Hà Tây",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "51",
    "iso2": "15",
    "latitude": 39.109563,
    "longitude": 117.223371
  },
  {
    "id": 3821,
    "name": "Đồng Nai",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "43",
    "iso2": "39",
    "latitude": 11.0686305,
    "longitude": 107.1675976
  },
  {
    "id": 3822,
    "name": "Bắc Kạn",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "72",
    "iso2": "53",
    "latitude": 22.3032923,
    "longitude": 105.876004
  },
  {
    "id": 3823,
    "name": "Đắk Nông",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "91",
    "iso2": "72",
    "latitude": 12.2646476,
    "longitude": 107.609806
  },
  {
    "id": 3824,
    "name": "Phú Yên",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "61",
    "iso2": "32",
    "latitude": 13.0881861,
    "longitude": 109.0928764
  },
  {
    "id": 3825,
    "name": "Lai Châu",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "89",
    "iso2": "01",
    "latitude": 22.3862227,
    "longitude": 103.4702631
  },
  {
    "id": 3826,
    "name": "Tây Ninh",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "33",
    "iso2": "37",
    "latitude": 11.3351554,
    "longitude": 106.1098854
  },
  {
    "id": 3827,
    "name": "Hải Dương",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "79",
    "iso2": "61",
    "latitude": 20.9373413,
    "longitude": 106.3145542
  },
  {
    "id": 3828,
    "name": "Quảng Ngãi",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "63",
    "iso2": "29",
    "latitude": 15.1213873,
    "longitude": 108.8044145
  },
  {
    "id": 3829,
    "name": "Đắk Lắk",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "88",
    "iso2": "33",
    "latitude": 12.7100116,
    "longitude": 108.2377519
  },
  {
    "id": 3830,
    "name": "Bình Định",
    "countryId": 240,
    "countryCode": "VN",
    "fipsCode": "46",
    "iso2": "31",
    "latitude": 14.1665324,
    "longitude": 108.902683
  },
  {
    "id": 3831,
    "name": "Saint Peter Basseterre Parish",
    "countryId": 185,
    "countryCode": "KN",
    "fipsCode": "11",
    "iso2": "11",
    "latitude": 17.3102911,
    "longitude": -62.7147533
  },
  {
    "id": 3832,
    "name": "Nevis",
    "countryId": 185,
    "countryCode": "KN",
    "fipsCode": "11",
    "iso2": "N",
    "latitude": 17.1553558,
    "longitude": -62.5796026
  },
  {
    "id": 3833,
    "name": "Christ Church Nichola Town Parish",
    "countryId": 185,
    "countryCode": "KN",
    "fipsCode": "01",
    "iso2": "01",
    "latitude": 17.3604812,
    "longitude": -62.7617837
  },
  {
    "id": 3834,
    "name": "Saint Paul Capisterre Parish",
    "countryId": 185,
    "countryCode": "KN",
    "fipsCode": "09",
    "iso2": "09",
    "latitude": 17.4016683,
    "longitude": -62.8257332
  },
  {
    "id": 3835,
    "name": "Saint James Windward Parish",
    "countryId": 185,
    "countryCode": "KN",
    "fipsCode": "05",
    "iso2": "05",
    "latitude": 17.1769633,
    "longitude": -62.5796026
  },
  {
    "id": 3836,
    "name": "Saint Anne Sandy Point Parish",
    "countryId": 185,
    "countryCode": "KN",
    "fipsCode": "02",
    "iso2": "02",
    "latitude": 17.3725333,
    "longitude": -62.8441133
  },
  {
    "id": 3837,
    "name": "Saint George Gingerland Parish",
    "countryId": 185,
    "countryCode": "KN",
    "fipsCode": "04",
    "iso2": "04",
    "latitude": 17.1257759,
    "longitude": -62.5619811
  },
  {
    "id": 3838,
    "name": "Saint Paul Charlestown Parish",
    "countryId": 185,
    "countryCode": "KN",
    "fipsCode": "10",
    "iso2": "10",
    "latitude": 17.1346297,
    "longitude": -62.6133816
  },
  {
    "id": 3839,
    "name": "Saint Thomas Lowland Parish",
    "countryId": 185,
    "countryCode": "KN",
    "fipsCode": "12",
    "iso2": "12",
    "latitude": 17.1650513,
    "longitude": -62.6089753
  },
  {
    "id": 3840,
    "name": "Saint John Figtree Parish",
    "countryId": 185,
    "countryCode": "KN",
    "fipsCode": "07",
    "iso2": "07",
    "latitude": 17.1155748,
    "longitude": -62.6031004
  },
  {
    "id": 3841,
    "name": "Saint Kitts",
    "countryId": 185,
    "countryCode": "KN",
    "fipsCode": "07",
    "iso2": "K",
    "latitude": 17.3433796,
    "longitude": -62.7559043
  },
  {
    "id": 3842,
    "name": "Saint Thomas Middle Island Parish",
    "countryId": 185,
    "countryCode": "KN",
    "fipsCode": "13",
    "iso2": "13",
    "latitude": 17.3348813,
    "longitude": -62.8088251
  },
  {
    "id": 3843,
    "name": "Trinity Palmetto Point Parish",
    "countryId": 185,
    "countryCode": "KN",
    "fipsCode": "15",
    "iso2": "15",
    "latitude": 17.3063519,
    "longitude": -62.7617837
  },
  {
    "id": 3844,
    "name": "Saint Mary Cayon Parish",
    "countryId": 185,
    "countryCode": "KN",
    "fipsCode": "08",
    "iso2": "08",
    "latitude": 17.3462071,
    "longitude": -62.7382671
  },
  {
    "id": 3845,
    "name": "Saint John Capisterre Parish",
    "countryId": 185,
    "countryCode": "KN",
    "fipsCode": "06",
    "iso2": "06",
    "latitude": 17.3810341,
    "longitude": -62.7911833
  },
  {
    "id": 3846,
    "name": "Daegu",
    "countryId": 116,
    "countryCode": "KR",
    "fipsCode": "15",
    "iso2": "27",
    "latitude": 35.8714354,
    "longitude": 128.601445
  },
  {
    "id": 3847,
    "name": "Gyeonggi Province",
    "countryId": 116,
    "countryCode": "KR",
    "fipsCode": "13",
    "iso2": "41",
    "latitude": 37.4138,
    "longitude": 127.5183
  },
  {
    "id": 3848,
    "name": "Incheon",
    "countryId": 116,
    "countryCode": "KR",
    "fipsCode": "12",
    "iso2": "28",
    "latitude": 37.4562557,
    "longitude": 126.7052062
  },
  {
    "id": 3849,
    "name": "Seoul",
    "countryId": 116,
    "countryCode": "KR",
    "fipsCode": "11",
    "iso2": "11",
    "latitude": 37.566535,
    "longitude": 126.9779692
  },
  {
    "id": 3850,
    "name": "Daejeon",
    "countryId": 116,
    "countryCode": "KR",
    "fipsCode": "19",
    "iso2": "30",
    "latitude": 36.3504119,
    "longitude": 127.3845475
  },
  {
    "id": 3851,
    "name": "North Jeolla Province",
    "countryId": 116,
    "countryCode": "KR",
    "fipsCode": "03",
    "iso2": "45",
    "latitude": 35.7175,
    "longitude": 127.153
  },
  {
    "id": 3852,
    "name": "Ulsan",
    "countryId": 116,
    "countryCode": "KR",
    "fipsCode": "21",
    "iso2": "31",
    "latitude": 35.5383773,
    "longitude": 129.3113596
  },
  {
    "id": 3853,
    "name": "Jeju",
    "countryId": 116,
    "countryCode": "KR",
    "fipsCode": "01",
    "iso2": "49",
    "latitude": 33.9568278,
    "longitude": -84.13135
  },
  {
    "id": 3854,
    "name": "North Chungcheong Province",
    "countryId": 116,
    "countryCode": "KR",
    "fipsCode": "05",
    "iso2": "43",
    "latitude": 36.8,
    "longitude": 127.7
  },
  {
    "id": 3855,
    "name": "North Gyeongsang Province",
    "countryId": 116,
    "countryCode": "KR",
    "fipsCode": "14",
    "iso2": "47",
    "latitude": 36.4919,
    "longitude": 128.8889
  },
  {
    "id": 3856,
    "name": "South Jeolla Province",
    "countryId": 116,
    "countryCode": "KR",
    "fipsCode": "16",
    "iso2": "46",
    "latitude": 34.8679,
    "longitude": 126.991
  },
  {
    "id": 3857,
    "name": "South Gyeongsang Province",
    "countryId": 116,
    "countryCode": "KR",
    "fipsCode": "20",
    "iso2": "48",
    "latitude": 35.4606,
    "longitude": 128.2132
  },
  {
    "id": 3858,
    "name": "Gwangju",
    "countryId": 116,
    "countryCode": "KR",
    "fipsCode": "18",
    "iso2": "29",
    "latitude": 35.1595454,
    "longitude": 126.8526012
  },
  {
    "id": 3859,
    "name": "South Chungcheong Province",
    "countryId": 116,
    "countryCode": "KR",
    "fipsCode": "17",
    "iso2": "44",
    "latitude": 36.5184,
    "longitude": 126.8
  },
  {
    "id": 3860,
    "name": "Busan",
    "countryId": 116,
    "countryCode": "KR",
    "fipsCode": "10",
    "iso2": "26",
    "latitude": 35.1795543,
    "longitude": 129.0756416
  },
  {
    "id": 3861,
    "name": "Sejong City",
    "countryId": 116,
    "countryCode": "KR",
    "fipsCode": "22",
    "iso2": "50",
    "latitude": 34.0523323,
    "longitude": -118.3084897
  },
  {
    "id": 3862,
    "name": "Gangwon Province",
    "countryId": 116,
    "countryCode": "KR",
    "fipsCode": "06",
    "iso2": "42",
    "latitude": 37.8228,
    "longitude": 128.1555
  },
  {
    "id": 3863,
    "name": "Saint Patrick Parish",
    "countryId": 87,
    "countryCode": "GD",
    "fipsCode": "06",
    "iso2": "06",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 3864,
    "name": "Saint George Parish",
    "countryId": 87,
    "countryCode": "GD",
    "fipsCode": "03",
    "iso2": "03",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 3865,
    "name": "Saint Andrew Parish",
    "countryId": 87,
    "countryCode": "GD",
    "fipsCode": "01",
    "iso2": "01",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 3866,
    "name": "Saint Mark Parish",
    "countryId": 87,
    "countryCode": "GD",
    "fipsCode": "05",
    "iso2": "05",
    "latitude": 40.5881863,
    "longitude": -73.9495701
  },
  {
    "id": 3867,
    "name": "Carriacou and Petite Martinique",
    "countryId": 87,
    "countryCode": "GD",
    "fipsCode": "10",
    "iso2": "10",
    "latitude": 12.4785888,
    "longitude": -61.4493842
  },
  {
    "id": 3868,
    "name": "Saint John Parish",
    "countryId": 87,
    "countryCode": "GD",
    "fipsCode": "04",
    "iso2": "04",
    "latitude": 30.1118331,
    "longitude": -90.4879916
  },
  {
    "id": 3869,
    "name": "Saint David Parish",
    "countryId": 87,
    "countryCode": "GD",
    "fipsCode": "02",
    "iso2": "02",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 3870,
    "name": "Ghazni",
    "countryId": 1,
    "countryCode": "AF",
    "fipsCode": "08",
    "iso2": "GHA",
    "latitude": 33.5450587,
    "longitude": 68.4173972
  },
  {
    "id": 3871,
    "name": "Badghis",
    "countryId": 1,
    "countryCode": "AF",
    "fipsCode": "02",
    "iso2": "BDG",
    "latitude": 35.1671339,
    "longitude": 63.7695384
  },
  {
    "id": 3872,
    "name": "Bamyan",
    "countryId": 1,
    "countryCode": "AF",
    "fipsCode": "05",
    "iso2": "BAM",
    "latitude": 34.8100067,
    "longitude": 67.8212104
  },
  {
    "id": 3873,
    "name": "Helmand",
    "countryId": 1,
    "countryCode": "AF",
    "fipsCode": "10",
    "iso2": "HEL",
    "latitude": 39.2989361,
    "longitude": -76.6160472
  },
  {
    "id": 3874,
    "name": "Zabul",
    "countryId": 1,
    "countryCode": "AF",
    "fipsCode": "28",
    "iso2": "ZAB",
    "latitude": 32.1918782,
    "longitude": 67.1894488
  },
  {
    "id": 3875,
    "name": "Baghlan",
    "countryId": 1,
    "countryCode": "AF",
    "fipsCode": "03",
    "iso2": "BGL",
    "latitude": 36.1789026,
    "longitude": 68.7453064
  },
  {
    "id": 3876,
    "name": "Kunar",
    "countryId": 1,
    "countryCode": "AF",
    "fipsCode": "34",
    "iso2": "KNR",
    "latitude": 34.8465893,
    "longitude": 71.097317
  },
  {
    "id": 3877,
    "name": "Paktika",
    "countryId": 1,
    "countryCode": "AF",
    "fipsCode": "29",
    "iso2": "PKA",
    "latitude": 32.2645386,
    "longitude": 68.5247149
  },
  {
    "id": 3878,
    "name": "Khost",
    "countryId": 1,
    "countryCode": "AF",
    "fipsCode": "37",
    "iso2": "KHO",
    "latitude": 33.3338472,
    "longitude": 69.9371673
  },
  {
    "id": 3879,
    "name": "Kapisa",
    "countryId": 1,
    "countryCode": "AF",
    "fipsCode": "14",
    "iso2": "KAP",
    "latitude": 34.9810572,
    "longitude": 69.6214562
  },
  {
    "id": 3880,
    "name": "Nuristan",
    "countryId": 1,
    "countryCode": "AF",
    "fipsCode": "38",
    "iso2": "NUR",
    "latitude": 35.3250223,
    "longitude": 70.9071236
  },
  {
    "id": 3881,
    "name": "Panjshir",
    "countryId": 1,
    "countryCode": "AF",
    "fipsCode": "42",
    "iso2": "PAN",
    "latitude": 38.8802391,
    "longitude": -77.1717238
  },
  {
    "id": 3882,
    "name": "Nangarhar",
    "countryId": 1,
    "countryCode": "AF",
    "fipsCode": "18",
    "iso2": "NAN",
    "latitude": 34.1718313,
    "longitude": 70.6216794
  },
  {
    "id": 3883,
    "name": "Samangan",
    "countryId": 1,
    "countryCode": "AF",
    "fipsCode": "32",
    "iso2": "SAM",
    "latitude": 36.3155506,
    "longitude": 67.9642863
  },
  {
    "id": 3884,
    "name": "Balkh",
    "countryId": 1,
    "countryCode": "AF",
    "fipsCode": "30",
    "iso2": "BAL",
    "latitude": 36.7550603,
    "longitude": 66.8975372
  },
  {
    "id": 3885,
    "name": "Sar-e Pol",
    "countryId": 1,
    "countryCode": "AF",
    "fipsCode": "33",
    "iso2": "SAR",
    "latitude": 36.216628,
    "longitude": 65.93336
  },
  {
    "id": 3886,
    "name": "Jowzjan",
    "countryId": 1,
    "countryCode": "AF",
    "fipsCode": "31",
    "iso2": "JOW",
    "latitude": 36.8969692,
    "longitude": 65.6658568
  },
  {
    "id": 3887,
    "name": "Herat",
    "countryId": 1,
    "countryCode": "AF",
    "fipsCode": "11",
    "iso2": "HER",
    "latitude": 34.352865,
    "longitude": 62.2040287
  },
  {
    "id": 3888,
    "name": "Ghōr",
    "countryId": 1,
    "countryCode": "AF",
    "fipsCode": "09",
    "iso2": "GHO",
    "latitude": 34.0995776,
    "longitude": 64.905955
  },
  {
    "id": 3889,
    "name": "Faryab",
    "countryId": 1,
    "countryCode": "AF",
    "fipsCode": "07",
    "iso2": "FYB",
    "latitude": 36.0795613,
    "longitude": 64.905955
  },
  {
    "id": 3890,
    "name": "Kandahar",
    "countryId": 1,
    "countryCode": "AF",
    "fipsCode": "23",
    "iso2": "KAN",
    "latitude": 31.628871,
    "longitude": 65.7371749
  },
  {
    "id": 3891,
    "name": "Laghman",
    "countryId": 1,
    "countryCode": "AF",
    "fipsCode": "35",
    "iso2": "LAG",
    "latitude": 34.6897687,
    "longitude": 70.1455805
  },
  {
    "id": 3892,
    "name": "Daykundi",
    "countryId": 1,
    "countryCode": "AF",
    "fipsCode": "41",
    "iso2": "DAY",
    "latitude": 33.669495,
    "longitude": 66.0463534
  },
  {
    "id": 3893,
    "name": "Takhar",
    "countryId": 1,
    "countryCode": "AF",
    "fipsCode": "26",
    "iso2": "TAK",
    "latitude": 36.6698013,
    "longitude": 69.4784541
  },
  {
    "id": 3894,
    "name": "Paktia",
    "countryId": 1,
    "countryCode": "AF",
    "fipsCode": "36",
    "iso2": "PIA",
    "latitude": 33.706199,
    "longitude": 69.3831079
  },
  {
    "id": 3895,
    "name": "Parwan",
    "countryId": 1,
    "countryCode": "AF",
    "fipsCode": "40",
    "iso2": "PAR",
    "latitude": 34.9630977,
    "longitude": 68.8108849
  },
  {
    "id": 3896,
    "name": "Nimruz",
    "countryId": 1,
    "countryCode": "AF",
    "fipsCode": "19",
    "iso2": "NIM",
    "latitude": 31.0261488,
    "longitude": 62.4504154
  },
  {
    "id": 3897,
    "name": "Logar",
    "countryId": 1,
    "countryCode": "AF",
    "fipsCode": "17",
    "iso2": "LOG",
    "latitude": 34.0145518,
    "longitude": 69.1923916
  },
  {
    "id": 3898,
    "name": "Urozgan",
    "countryId": 1,
    "countryCode": "AF",
    "fipsCode": "39",
    "iso2": "URU",
    "latitude": 32.9271287,
    "longitude": 66.1415263
  },
  {
    "id": 3899,
    "name": "Farah",
    "countryId": 1,
    "countryCode": "AF",
    "fipsCode": "06",
    "iso2": "FRA",
    "latitude": 32.495328,
    "longitude": 62.2626627
  },
  {
    "id": 3900,
    "name": "Kunduz Province",
    "countryId": 1,
    "countryCode": "AF",
    "fipsCode": "24",
    "iso2": "KDZ",
    "latitude": 36.7285511,
    "longitude": 68.8678982
  },
  {
    "id": 3901,
    "name": "Badakhshan",
    "countryId": 1,
    "countryCode": "AF",
    "fipsCode": "01",
    "iso2": "BDS",
    "latitude": 36.7347725,
    "longitude": 70.8119953
  },
  {
    "id": 3902,
    "name": "Kabul",
    "countryId": 1,
    "countryCode": "AF",
    "fipsCode": "13",
    "iso2": "KAB",
    "latitude": 34.5553494,
    "longitude": 69.207486
  },
  {
    "id": 3903,
    "name": "Victoria",
    "countryId": 14,
    "countryCode": "AU",
    "fipsCode": "07",
    "iso2": "VIC",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 3904,
    "name": "South Australia",
    "countryId": 14,
    "countryCode": "AU",
    "fipsCode": "05",
    "iso2": "SA",
    "latitude": -30.0002315,
    "longitude": 136.2091547
  },
  {
    "id": 3905,
    "name": "Queensland",
    "countryId": 14,
    "countryCode": "AU",
    "fipsCode": "04",
    "iso2": "QLD",
    "latitude": -20.9175738,
    "longitude": 142.7027956
  },
  {
    "id": 3906,
    "name": "Western Australia",
    "countryId": 14,
    "countryCode": "AU",
    "fipsCode": "08",
    "iso2": "WA",
    "latitude": -27.6728168,
    "longitude": 121.6283098
  },
  {
    "id": 3907,
    "name": "Australian Capital Territory",
    "countryId": 14,
    "countryCode": "AU",
    "fipsCode": "01",
    "iso2": "ACT",
    "latitude": -35.4734679,
    "longitude": 149.0123679
  },
  {
    "id": 3908,
    "name": "Tasmania",
    "countryId": 14,
    "countryCode": "AU",
    "fipsCode": "06",
    "iso2": "TAS",
    "latitude": -41.4545196,
    "longitude": 145.9706647
  },
  {
    "id": 3909,
    "name": "New South Wales",
    "countryId": 14,
    "countryCode": "AU",
    "fipsCode": "02",
    "iso2": "NSW",
    "latitude": -31.2532183,
    "longitude": 146.921099
  },
  {
    "id": 3910,
    "name": "Northern Territory",
    "countryId": 14,
    "countryCode": "AU",
    "fipsCode": "03",
    "iso2": "NT",
    "latitude": -19.4914108,
    "longitude": 132.5509603
  },
  {
    "id": 3911,
    "name": "Vavaʻu",
    "countryId": 222,
    "countryCode": "TO",
    "fipsCode": "03",
    "iso2": "05",
    "latitude": -18.622756,
    "longitude": -173.9902982
  },
  {
    "id": 3912,
    "name": "Tongatapu",
    "countryId": 222,
    "countryCode": "TO",
    "fipsCode": "02",
    "iso2": "04",
    "latitude": -21.1465968,
    "longitude": -175.2515482
  },
  {
    "id": 3913,
    "name": "Haʻapai",
    "countryId": 222,
    "countryCode": "TO",
    "fipsCode": "01",
    "iso2": "02",
    "latitude": -19.75,
    "longitude": -174.366667
  },
  {
    "id": 3914,
    "name": "Niuas",
    "countryId": 222,
    "countryCode": "TO",
    "fipsCode": "NI",
    "iso2": "03",
    "latitude": -15.9594,
    "longitude": -173.783
  },
  {
    "id": 3915,
    "name": "ʻEua",
    "countryId": 222,
    "countryCode": "TO",
    "fipsCode": "EU",
    "iso2": "01",
    "latitude": 37.09024,
    "longitude": -95.712891
  },
  {
    "id": 3916,
    "name": "Markazi Province",
    "countryId": 103,
    "countryCode": "IR",
    "fipsCode": "34",
    "iso2": "22",
    "latitude": 34.612305,
    "longitude": 49.8547266
  },
  {
    "id": 3917,
    "name": "Khuzestan Province",
    "countryId": 103,
    "countryCode": "IR",
    "fipsCode": "15",
    "iso2": "10",
    "latitude": 31.4360149,
    "longitude": 49.041312
  },
  {
    "id": 3918,
    "name": "Ilam Province",
    "countryId": 103,
    "countryCode": "IR",
    "fipsCode": "10",
    "iso2": "05",
    "latitude": 33.2957618,
    "longitude": 46.670534
  },
  {
    "id": 3919,
    "name": "Kermanshah Province",
    "countryId": 103,
    "countryCode": "IR",
    "fipsCode": "13",
    "iso2": "17",
    "latitude": 34.4576233,
    "longitude": 46.670534
  },
  {
    "id": 3920,
    "name": "Gilan Province",
    "countryId": 103,
    "countryCode": "IR",
    "fipsCode": "08",
    "iso2": "19",
    "latitude": 37.2809455,
    "longitude": 49.5924134
  },
  {
    "id": 3921,
    "name": "Chaharmahal and Bakhtiari Province",
    "countryId": 103,
    "countryCode": "IR",
    "fipsCode": "03",
    "iso2": "08",
    "latitude": 31.9970419,
    "longitude": 50.6613849
  },
  {
    "id": 3922,
    "name": "Qom Province",
    "countryId": 103,
    "countryCode": "IR",
    "fipsCode": "39",
    "iso2": "26",
    "latitude": 34.6415764,
    "longitude": 50.8746035
  },
  {
    "id": 3923,
    "name": "Isfahan Province",
    "countryId": 103,
    "countryCode": "IR",
    "fipsCode": "28",
    "iso2": "04",
    "latitude": 33.2771073,
    "longitude": 52.3613378
  },
  {
    "id": 3924,
    "name": "West Azarbaijan Province",
    "countryId": 103,
    "countryCode": "IR",
    "fipsCode": "01",
    "iso2": "02",
    "latitude": 37.4550062,
    "longitude": 45
  },
  {
    "id": 3925,
    "name": "Zanjan Province",
    "countryId": 103,
    "countryCode": "IR",
    "fipsCode": "36",
    "iso2": "11",
    "latitude": 36.5018185,
    "longitude": 48.3988186
  },
  {
    "id": 3926,
    "name": "Kohgiluyeh and Boyer-Ahmad Province",
    "countryId": 103,
    "countryCode": "IR",
    "fipsCode": "05",
    "iso2": "18",
    "latitude": 30.724586,
    "longitude": 50.8456323
  },
  {
    "id": 3927,
    "name": "Razavi Khorasan Province",
    "countryId": 103,
    "countryCode": "IR",
    "fipsCode": "42",
    "iso2": "30",
    "latitude": 35.1020253,
    "longitude": 59.1041758
  },
  {
    "id": 3928,
    "name": "Lorestan Province",
    "countryId": 103,
    "countryCode": "IR",
    "fipsCode": "23",
    "iso2": "20",
    "latitude": 33.5818394,
    "longitude": 48.3988186
  },
  {
    "id": 3929,
    "name": "Alborz Province",
    "countryId": 103,
    "countryCode": "IR",
    "fipsCode": "44",
    "iso2": "32",
    "latitude": 35.9960467,
    "longitude": 50.9289246
  },
  {
    "id": 3930,
    "name": "South Khorasan Province",
    "countryId": 103,
    "countryCode": "IR",
    "fipsCode": "41",
    "iso2": "29",
    "latitude": 32.5175643,
    "longitude": 59.1041758
  },
  {
    "id": 3931,
    "name": "Sistan and Baluchestan",
    "countryId": 103,
    "countryCode": "IR",
    "fipsCode": "04",
    "iso2": "13",
    "latitude": 27.5299906,
    "longitude": 60.5820676
  },
  {
    "id": 3932,
    "name": "Bushehr Province",
    "countryId": 103,
    "countryCode": "IR",
    "fipsCode": "22",
    "iso2": "06",
    "latitude": 28.7620739,
    "longitude": 51.5150077
  },
  {
    "id": 3933,
    "name": "Golestan Province",
    "countryId": 103,
    "countryCode": "IR",
    "fipsCode": "37",
    "iso2": "27",
    "latitude": 37.2898123,
    "longitude": 55.1375834
  },
  {
    "id": 3934,
    "name": "Ardabil Province",
    "countryId": 103,
    "countryCode": "IR",
    "fipsCode": "32",
    "iso2": "03",
    "latitude": 38.4853276,
    "longitude": 47.8911209
  },
  {
    "id": 3935,
    "name": "Kurdistan Province",
    "countryId": 103,
    "countryCode": "IR",
    "fipsCode": "16",
    "iso2": "16",
    "latitude": 35.9553579,
    "longitude": 47.1362125
  },
  {
    "id": 3936,
    "name": "Yazd Province",
    "countryId": 103,
    "countryCode": "IR",
    "fipsCode": "40",
    "iso2": "25",
    "latitude": 32.1006387,
    "longitude": 54.4342138
  },
  {
    "id": 3937,
    "name": "Hormozgan Province",
    "countryId": 103,
    "countryCode": "IR",
    "fipsCode": "11",
    "iso2": "23",
    "latitude": 27.138723,
    "longitude": 55.1375834
  },
  {
    "id": 3938,
    "name": "Mazandaran Province",
    "countryId": 103,
    "countryCode": "IR",
    "fipsCode": "35",
    "iso2": "21",
    "latitude": 36.2262393,
    "longitude": 52.5318604
  },
  {
    "id": 3939,
    "name": "Fars Province",
    "countryId": 103,
    "countryCode": "IR",
    "fipsCode": "07",
    "iso2": "14",
    "latitude": 29.1043813,
    "longitude": 53.045893
  },
  {
    "id": 3940,
    "name": "Semnan Province",
    "countryId": 103,
    "countryCode": "IR",
    "fipsCode": "25",
    "iso2": "12",
    "latitude": 35.2255585,
    "longitude": 54.4342138
  },
  {
    "id": 3941,
    "name": "Qazvin Province",
    "countryId": 103,
    "countryCode": "IR",
    "fipsCode": "38",
    "iso2": "28",
    "latitude": 36.0881317,
    "longitude": 49.8547266
  },
  {
    "id": 3942,
    "name": "North Khorasan Province",
    "countryId": 103,
    "countryCode": "IR",
    "fipsCode": "43",
    "iso2": "31",
    "latitude": 37.4710353,
    "longitude": 57.1013188
  },
  {
    "id": 3943,
    "name": "Kerman Province",
    "countryId": 103,
    "countryCode": "IR",
    "fipsCode": "29",
    "iso2": "15",
    "latitude": 29.4850089,
    "longitude": 57.6439048
  },
  {
    "id": 3944,
    "name": "East Azerbaijan Province",
    "countryId": 103,
    "countryCode": "IR",
    "fipsCode": "33",
    "iso2": "01",
    "latitude": 37.9035733,
    "longitude": 46.2682109
  },
  {
    "id": 3945,
    "name": "Tehran Province",
    "countryId": 103,
    "countryCode": "IR",
    "fipsCode": "26",
    "iso2": "07",
    "latitude": 35.7248416,
    "longitude": 51.381653
  },
  {
    "id": 3946,
    "name": "Niutao Island Council",
    "countryId": 228,
    "countryCode": "TV",
    "fipsCode": "NIT",
    "iso2": "NIT",
    "latitude": -6.1064258,
    "longitude": 177.3438429
  },
  {
    "id": 3947,
    "name": "Nanumanga",
    "countryId": 228,
    "countryCode": "TV",
    "fipsCode": "NMG",
    "iso2": "NMG",
    "latitude": -6.2858019,
    "longitude": 176.319928
  },
  {
    "id": 3948,
    "name": "Nui",
    "countryId": 228,
    "countryCode": "TV",
    "fipsCode": "NUI",
    "iso2": "NUI",
    "latitude": -7.2388768,
    "longitude": 177.1485232
  },
  {
    "id": 3949,
    "name": "Nanumea",
    "countryId": 228,
    "countryCode": "TV",
    "fipsCode": "NMA",
    "iso2": "NMA",
    "latitude": -5.6881617,
    "longitude": 176.1370148
  },
  {
    "id": 3950,
    "name": "Vaitupu",
    "countryId": 228,
    "countryCode": "TV",
    "fipsCode": "VAI",
    "iso2": "VAI",
    "latitude": -7.4767327,
    "longitude": 178.6747675
  },
  {
    "id": 3951,
    "name": "Funafuti",
    "countryId": 228,
    "countryCode": "TV",
    "fipsCode": "FUN",
    "iso2": "FUN",
    "latitude": -8.5211471,
    "longitude": 179.1961926
  },
  {
    "id": 3952,
    "name": "Nukufetau",
    "countryId": 228,
    "countryCode": "TV",
    "fipsCode": "NKF",
    "iso2": "NKF",
    "latitude": -8,
    "longitude": 178.5
  },
  {
    "id": 3953,
    "name": "Nukulaelae",
    "countryId": 228,
    "countryCode": "TV",
    "fipsCode": "NKL",
    "iso2": "NKL",
    "latitude": -9.381111,
    "longitude": 179.852222
  },
  {
    "id": 3954,
    "name": "Dhi Qar Governorate",
    "countryId": 104,
    "countryCode": "IQ",
    "fipsCode": "09",
    "iso2": "DQ",
    "latitude": 31.1042292,
    "longitude": 46.3624686
  },
  {
    "id": 3955,
    "name": "Babylon Governorate",
    "countryId": 104,
    "countryCode": "IQ",
    "fipsCode": "06",
    "iso2": "BB",
    "latitude": 32.468191,
    "longitude": 44.5501935
  },
  {
    "id": 3956,
    "name": "Al-Qādisiyyah Governorate",
    "countryId": 104,
    "countryCode": "IQ",
    "fipsCode": "04",
    "iso2": "QA",
    "latitude": 32.043691,
    "longitude": 45.1494505
  },
  {
    "id": 3957,
    "name": "Karbala Governorate",
    "countryId": 104,
    "countryCode": "IQ",
    "fipsCode": "12",
    "iso2": "KA",
    "latitude": 32.4045493,
    "longitude": 43.8673222
  },
  {
    "id": 3958,
    "name": "Al Muthanna Governorate",
    "countryId": 104,
    "countryCode": "IQ",
    "fipsCode": "03",
    "iso2": "MU",
    "latitude": 29.9133171,
    "longitude": 45.2993862
  },
  {
    "id": 3959,
    "name": "Baghdad Governorate",
    "countryId": 104,
    "countryCode": "IQ",
    "fipsCode": "07",
    "iso2": "BG",
    "latitude": 33.3152618,
    "longitude": 44.3660653
  },
  {
    "id": 3960,
    "name": "Basra Governorate",
    "countryId": 104,
    "countryCode": "IQ",
    "fipsCode": "02",
    "iso2": "BA",
    "latitude": 30.5114252,
    "longitude": 47.8296253
  },
  {
    "id": 3961,
    "name": "Saladin Governorate",
    "countryId": 104,
    "countryCode": "IQ",
    "fipsCode": "18",
    "iso2": "SD",
    "latitude": 34.5337527,
    "longitude": 43.483738
  },
  {
    "id": 3962,
    "name": "Najaf Governorate",
    "countryId": 104,
    "countryCode": "IQ",
    "fipsCode": "17",
    "iso2": "NA",
    "latitude": 31.3517486,
    "longitude": 44.0960311
  },
  {
    "id": 3963,
    "name": "Nineveh Governorate",
    "countryId": 104,
    "countryCode": "IQ",
    "fipsCode": "15",
    "iso2": "NI",
    "latitude": 36.229574,
    "longitude": 42.2362435
  },
  {
    "id": 3964,
    "name": "Al Anbar Governorate",
    "countryId": 104,
    "countryCode": "IQ",
    "fipsCode": "01",
    "iso2": "AN",
    "latitude": 32.5597614,
    "longitude": 41.9196471
  },
  {
    "id": 3965,
    "name": "Diyala Governorate",
    "countryId": 104,
    "countryCode": "IQ",
    "fipsCode": "10",
    "iso2": "DI",
    "latitude": 33.7733487,
    "longitude": 45.1494505
  },
  {
    "id": 3966,
    "name": "Maysan Governorate",
    "countryId": 104,
    "countryCode": "IQ",
    "fipsCode": "14",
    "iso2": "MA",
    "latitude": 31.8734002,
    "longitude": 47.1362125
  },
  {
    "id": 3967,
    "name": "Dohuk Governorate",
    "countryId": 104,
    "countryCode": "IQ",
    "fipsCode": "08",
    "iso2": "DA",
    "latitude": 36.9077252,
    "longitude": 43.0631689
  },
  {
    "id": 3968,
    "name": "Erbil Governorate",
    "countryId": 104,
    "countryCode": "IQ",
    "fipsCode": "11",
    "iso2": "AR",
    "latitude": 36.5570628,
    "longitude": 44.3851263
  },
  {
    "id": 3969,
    "name": "Sulaymaniyah Governorate",
    "countryId": 104,
    "countryCode": "IQ",
    "fipsCode": "05",
    "iso2": "SU",
    "latitude": 35.5466348,
    "longitude": 45.3003683
  },
  {
    "id": 3970,
    "name": "Wasit Governorate",
    "countryId": 104,
    "countryCode": "IQ",
    "fipsCode": "16",
    "iso2": "WA",
    "latitude": 32.6024094,
    "longitude": 45.7520985
  },
  {
    "id": 3971,
    "name": "Kirkuk Governorate",
    "countryId": 104,
    "countryCode": "IQ",
    "fipsCode": "13",
    "iso2": "KI",
    "latitude": 35.3292014,
    "longitude": 43.9436788
  },
  {
    "id": 3972,
    "name": "Svay Rieng Province",
    "countryId": 37,
    "countryCode": "KH",
    "fipsCode": "18",
    "iso2": "20",
    "latitude": 11.142722,
    "longitude": 105.8290298
  },
  {
    "id": 3973,
    "name": "Preah Vihear Province",
    "countryId": 37,
    "countryCode": "KH",
    "fipsCode": "13",
    "iso2": "13",
    "latitude": 14.0085797,
    "longitude": 104.8454619
  },
  {
    "id": 3974,
    "name": "Prey Veng Province",
    "countryId": 37,
    "countryCode": "KH",
    "fipsCode": "14",
    "iso2": "14",
    "latitude": 11.3802442,
    "longitude": 105.5005483
  },
  {
    "id": 3975,
    "name": "Takéo Province",
    "countryId": 37,
    "countryCode": "KH",
    "fipsCode": "19",
    "iso2": "21",
    "latitude": 10.9321519,
    "longitude": 104.798771
  },
  {
    "id": 3976,
    "name": "Battambang Province",
    "countryId": 37,
    "countryCode": "KH",
    "fipsCode": "29",
    "iso2": "2",
    "latitude": 13.0286971,
    "longitude": 102.989615
  },
  {
    "id": 3977,
    "name": "Pursat Province",
    "countryId": 37,
    "countryCode": "KH",
    "fipsCode": "12",
    "iso2": "15",
    "latitude": 12.2720956,
    "longitude": 103.7289167
  },
  {
    "id": 3978,
    "name": "Kep Province",
    "countryId": 37,
    "countryCode": "KH",
    "fipsCode": "26",
    "iso2": "23",
    "latitude": 10.536089,
    "longitude": 104.3559158
  },
  {
    "id": 3979,
    "name": "Kampong Chhnang Province",
    "countryId": 37,
    "countryCode": "KH",
    "fipsCode": "03",
    "iso2": "4",
    "latitude": 12.1392352,
    "longitude": 104.5655273
  },
  {
    "id": 3980,
    "name": "Pailin Province",
    "countryId": 37,
    "countryCode": "KH",
    "fipsCode": "30",
    "iso2": "24",
    "latitude": 12.9092962,
    "longitude": 102.6675575
  },
  {
    "id": 3981,
    "name": "Kampot Province",
    "countryId": 37,
    "countryCode": "KH",
    "fipsCode": "21",
    "iso2": "7",
    "latitude": 10.7325351,
    "longitude": 104.3791912
  },
  {
    "id": 3982,
    "name": "Koh Kong Province",
    "countryId": 37,
    "countryCode": "KH",
    "fipsCode": "08",
    "iso2": "9",
    "latitude": 11.5762804,
    "longitude": 103.3587288
  },
  {
    "id": 3983,
    "name": "Kandal Province",
    "countryId": 37,
    "countryCode": "KH",
    "fipsCode": "07",
    "iso2": "8",
    "latitude": 11.2237383,
    "longitude": 105.1258955
  },
  {
    "id": 3984,
    "name": "Banteay Meanchey Province",
    "countryId": 37,
    "countryCode": "KH",
    "fipsCode": "25",
    "iso2": "1",
    "latitude": 13.7531914,
    "longitude": 102.989615
  },
  {
    "id": 3985,
    "name": "Mondulkiri Province",
    "countryId": 37,
    "countryCode": "KH",
    "fipsCode": "10",
    "iso2": "11",
    "latitude": 12.7879427,
    "longitude": 107.1011931
  },
  {
    "id": 3986,
    "name": "Kratié Province",
    "countryId": 37,
    "countryCode": "KH",
    "fipsCode": "09",
    "iso2": "10",
    "latitude": 12.5043608,
    "longitude": 105.9699878
  },
  {
    "id": 3987,
    "name": "Oddar Meanchey Province",
    "countryId": 37,
    "countryCode": "KH",
    "fipsCode": "27",
    "iso2": "22",
    "latitude": 14.1609738,
    "longitude": 103.8216261
  },
  {
    "id": 3988,
    "name": "Kampong Speu Province",
    "countryId": 37,
    "countryCode": "KH",
    "fipsCode": "04",
    "iso2": "5",
    "latitude": 11.6155109,
    "longitude": 104.3791912
  },
  {
    "id": 3989,
    "name": "Sihanoukville Province",
    "countryId": 37,
    "countryCode": "KH",
    "fipsCode": "28",
    "iso2": "18",
    "latitude": 10.7581899,
    "longitude": 103.8216261
  },
  {
    "id": 3990,
    "name": "Ratanakiri Province",
    "countryId": 37,
    "countryCode": "KH",
    "fipsCode": "23",
    "iso2": "16",
    "latitude": 13.8576607,
    "longitude": 107.1011931
  },
  {
    "id": 3991,
    "name": "Kampong Cham Province",
    "countryId": 37,
    "countryCode": "KH",
    "fipsCode": "02",
    "iso2": "3",
    "latitude": 12.0982918,
    "longitude": 105.3131185
  },
  {
    "id": 3992,
    "name": "Siem Reap Province",
    "countryId": 37,
    "countryCode": "KH",
    "fipsCode": "24",
    "iso2": "17",
    "latitude": 13.330266,
    "longitude": 104.1001326
  },
  {
    "id": 3993,
    "name": "Stung Treng Province",
    "countryId": 37,
    "countryCode": "KH",
    "fipsCode": "17",
    "iso2": "19",
    "latitude": 13.576473,
    "longitude": 105.9699878
  },
  {
    "id": 3994,
    "name": "Phnom Penh",
    "countryId": 37,
    "countryCode": "KH",
    "fipsCode": "22",
    "iso2": "12",
    "latitude": 11.5563738,
    "longitude": 104.9282099
  },
  {
    "id": 3995,
    "name": "North Hamgyong Province",
    "countryId": 115,
    "countryCode": "KP",
    "fipsCode": "17",
    "iso2": "09",
    "latitude": 41.8148758,
    "longitude": 129.4581955
  },
  {
    "id": 3996,
    "name": "Ryanggang Province",
    "countryId": 115,
    "countryCode": "KP",
    "fipsCode": "13",
    "iso2": "10",
    "latitude": 41.2318921,
    "longitude": 128.5076359
  },
  {
    "id": 3997,
    "name": "South Pyongan Province",
    "countryId": 115,
    "countryCode": "KP",
    "fipsCode": "15",
    "iso2": "02",
    "latitude": 39.3539178,
    "longitude": 126.168271
  },
  {
    "id": 3998,
    "name": "Chagang Province",
    "countryId": 115,
    "countryCode": "KP",
    "fipsCode": "01",
    "iso2": "04",
    "latitude": 40.7202809,
    "longitude": 126.5621137
  },
  {
    "id": 3999,
    "name": "Kangwon Province",
    "countryId": 115,
    "countryCode": "KP",
    "fipsCode": "09",
    "iso2": "07",
    "latitude": 38.8432393,
    "longitude": 127.5597067
  },
  {
    "id": 4000,
    "name": "South Hamgyong Province",
    "countryId": 115,
    "countryCode": "KP",
    "fipsCode": "03",
    "iso2": "08",
    "latitude": 40.3725339,
    "longitude": 128.298884
  },
  {
    "id": 4001,
    "name": "Rason",
    "countryId": 115,
    "countryCode": "KP",
    "fipsCode": "18",
    "iso2": "13",
    "latitude": 42.2569063,
    "longitude": 130.2977186
  },
  {
    "id": 4002,
    "name": "North Pyongan Province",
    "countryId": 115,
    "countryCode": "KP",
    "fipsCode": "11",
    "iso2": "03",
    "latitude": 39.9255618,
    "longitude": 125.3928025
  },
  {
    "id": 4003,
    "name": "South Hwanghae Province",
    "countryId": 115,
    "countryCode": "KP",
    "fipsCode": "06",
    "iso2": "05",
    "latitude": 38.2007215,
    "longitude": 125.4781926
  },
  {
    "id": 4004,
    "name": "North Hwanghae Province",
    "countryId": 115,
    "countryCode": "KP",
    "fipsCode": "07",
    "iso2": "06",
    "latitude": 38.3786085,
    "longitude": 126.4364363
  },
  {
    "id": 4005,
    "name": "Pyongyang",
    "countryId": 115,
    "countryCode": "KP",
    "fipsCode": "12",
    "iso2": "01",
    "latitude": 39.0392193,
    "longitude": 125.7625241
  },
  {
    "id": 4006,
    "name": "Meghalaya",
    "countryId": 101,
    "countryCode": "IN",
    "fipsCode": "18",
    "iso2": "ML",
    "latitude": 25.4670308,
    "longitude": 91.366216
  },
  {
    "id": 4007,
    "name": "Haryana",
    "countryId": 101,
    "countryCode": "IN",
    "fipsCode": "10",
    "iso2": "HR",
    "latitude": 29.0587757,
    "longitude": 76.085601
  },
  {
    "id": 4008,
    "name": "Maharashtra",
    "countryId": 101,
    "countryCode": "IN",
    "fipsCode": "16",
    "iso2": "MH",
    "latitude": 19.7514798,
    "longitude": 75.7138884
  },
  {
    "id": 4009,
    "name": "Goa",
    "countryId": 101,
    "countryCode": "IN",
    "fipsCode": "33",
    "iso2": "GA",
    "latitude": 15.2993265,
    "longitude": 74.123996
  },
  {
    "id": 4010,
    "name": "Manipur",
    "countryId": 101,
    "countryCode": "IN",
    "fipsCode": "17",
    "iso2": "MN",
    "latitude": 24.6637173,
    "longitude": 93.9062688
  },
  {
    "id": 4011,
    "name": "Puducherry",
    "countryId": 101,
    "countryCode": "IN",
    "fipsCode": "22",
    "iso2": "PY",
    "latitude": 11.9415915,
    "longitude": 79.8083133
  },
  {
    "id": 4012,
    "name": "Telangana",
    "countryId": 101,
    "countryCode": "IN",
    "fipsCode": "40",
    "iso2": "TG",
    "latitude": 18.1124372,
    "longitude": 79.0192997
  },
  {
    "id": 4013,
    "name": "Odisha",
    "countryId": 101,
    "countryCode": "IN",
    "fipsCode": "21",
    "iso2": "OR",
    "latitude": 20.9516658,
    "longitude": 85.0985236
  },
  {
    "id": 4014,
    "name": "Rajasthan",
    "countryId": 101,
    "countryCode": "IN",
    "fipsCode": "24",
    "iso2": "RJ",
    "latitude": 27.0238036,
    "longitude": 74.2179326
  },
  {
    "id": 4015,
    "name": "Punjab",
    "countryId": 101,
    "countryCode": "IN",
    "fipsCode": "23",
    "iso2": "PB",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 4016,
    "name": "Uttarakhand",
    "countryId": 101,
    "countryCode": "IN",
    "fipsCode": "39",
    "iso2": "UT",
    "latitude": 30.066753,
    "longitude": 79.0192997
  },
  {
    "id": 4017,
    "name": "Andhra Pradesh",
    "countryId": 101,
    "countryCode": "IN",
    "fipsCode": "02",
    "iso2": "AP",
    "latitude": 15.9128998,
    "longitude": 79.7399875
  },
  {
    "id": 4018,
    "name": "Nagaland",
    "countryId": 101,
    "countryCode": "IN",
    "fipsCode": "20",
    "iso2": "NL",
    "latitude": 26.1584354,
    "longitude": 94.5624426
  },
  {
    "id": 4019,
    "name": "Lakshadweep",
    "countryId": 101,
    "countryCode": "IN",
    "fipsCode": "14",
    "iso2": "LD",
    "latitude": 10.3280265,
    "longitude": 72.7846336
  },
  {
    "id": 4020,
    "name": "Himachal Pradesh",
    "countryId": 101,
    "countryCode": "IN",
    "fipsCode": "11",
    "iso2": "HP",
    "latitude": 31.1048294,
    "longitude": 77.1733901
  },
  {
    "id": 4021,
    "name": "Delhi",
    "countryId": 101,
    "countryCode": "IN",
    "fipsCode": "07",
    "iso2": "DL",
    "latitude": 28.7040592,
    "longitude": 77.1024902
  },
  {
    "id": 4022,
    "name": "Uttar Pradesh",
    "countryId": 101,
    "countryCode": "IN",
    "fipsCode": "36",
    "iso2": "UP",
    "latitude": 26.8467088,
    "longitude": 80.9461592
  },
  {
    "id": 4023,
    "name": "Andaman and Nicobar Islands",
    "countryId": 101,
    "countryCode": "IN",
    "fipsCode": "01",
    "iso2": "AN",
    "latitude": 11.7400867,
    "longitude": 92.6586401
  },
  {
    "id": 4024,
    "name": "Arunachal Pradesh",
    "countryId": 101,
    "countryCode": "IN",
    "fipsCode": "30",
    "iso2": "AR",
    "latitude": 28.2179994,
    "longitude": 94.7277528
  },
  {
    "id": 4025,
    "name": "Jharkhand",
    "countryId": 101,
    "countryCode": "IN",
    "fipsCode": "38",
    "iso2": "JH",
    "latitude": 23.6101808,
    "longitude": 85.2799354
  },
  {
    "id": 4026,
    "name": "Karnataka",
    "countryId": 101,
    "countryCode": "IN",
    "fipsCode": "19",
    "iso2": "KA",
    "latitude": 15.3172775,
    "longitude": 75.7138884
  },
  {
    "id": 4027,
    "name": "Assam",
    "countryId": 101,
    "countryCode": "IN",
    "fipsCode": "03",
    "iso2": "AS",
    "latitude": 26.2006043,
    "longitude": 92.9375739
  },
  {
    "id": 4028,
    "name": "Kerala",
    "countryId": 101,
    "countryCode": "IN",
    "fipsCode": "13",
    "iso2": "KL",
    "latitude": 10.8505159,
    "longitude": 76.2710833
  },
  {
    "id": 4029,
    "name": "Jammu and Kashmir",
    "countryId": 101,
    "countryCode": "IN",
    "fipsCode": "12",
    "iso2": "JK",
    "latitude": 33.277839,
    "longitude": 75.3412179
  },
  {
    "id": 4030,
    "name": "Gujarat",
    "countryId": 101,
    "countryCode": "IN",
    "fipsCode": "09",
    "iso2": "GJ",
    "latitude": 22.258652,
    "longitude": 71.1923805
  },
  {
    "id": 4031,
    "name": "Chandigarh",
    "countryId": 101,
    "countryCode": "IN",
    "fipsCode": "05",
    "iso2": "CH",
    "latitude": 30.7333148,
    "longitude": 76.7794179
  },
  {
    "id": 4032,
    "name": "Dadra and Nagar Haveli",
    "countryId": 101,
    "countryCode": "IN",
    "fipsCode": "06",
    "iso2": "DN",
    "latitude": 20.3228778,
    "longitude": 72.9667254
  },
  {
    "id": 4033,
    "name": "Daman and Diu",
    "countryId": 101,
    "countryCode": "IN",
    "fipsCode": "32",
    "iso2": "DD",
    "latitude": 20.3973736,
    "longitude": 72.8327991
  },
  {
    "id": 4034,
    "name": "Sikkim",
    "countryId": 101,
    "countryCode": "IN",
    "fipsCode": "29",
    "iso2": "SK",
    "latitude": 27.5329718,
    "longitude": 88.5122178
  },
  {
    "id": 4035,
    "name": "Tamil Nadu",
    "countryId": 101,
    "countryCode": "IN",
    "fipsCode": "25",
    "iso2": "TN",
    "latitude": 11.1271225,
    "longitude": 78.6568942
  },
  {
    "id": 4036,
    "name": "Mizoram",
    "countryId": 101,
    "countryCode": "IN",
    "fipsCode": "31",
    "iso2": "MZ",
    "latitude": 23.164543,
    "longitude": 92.9375739
  },
  {
    "id": 4037,
    "name": "Bihar",
    "countryId": 101,
    "countryCode": "IN",
    "fipsCode": "34",
    "iso2": "BR",
    "latitude": 25.0960742,
    "longitude": 85.3131194
  },
  {
    "id": 4038,
    "name": "Tripura",
    "countryId": 101,
    "countryCode": "IN",
    "fipsCode": "26",
    "iso2": "TR",
    "latitude": 23.9408482,
    "longitude": 91.9881527
  },
  {
    "id": 4039,
    "name": "Madhya Pradesh",
    "countryId": 101,
    "countryCode": "IN",
    "fipsCode": "35",
    "iso2": "MP",
    "latitude": 22.9734229,
    "longitude": 78.6568942
  },
  {
    "id": 4040,
    "name": "Chhattisgarh",
    "countryId": 101,
    "countryCode": "IN",
    "fipsCode": "37",
    "iso2": "CT",
    "latitude": 21.2786567,
    "longitude": 81.8661442
  },
  {
    "id": 4041,
    "name": "Choluteca Department",
    "countryId": 97,
    "countryCode": "HN",
    "fipsCode": "02",
    "iso2": "CH",
    "latitude": 13.2504325,
    "longitude": -87.1422895
  },
  {
    "id": 4042,
    "name": "Comayagua Department",
    "countryId": 97,
    "countryCode": "HN",
    "fipsCode": "04",
    "iso2": "CM",
    "latitude": 14.5534828,
    "longitude": -87.6186379
  },
  {
    "id": 4043,
    "name": "El Paraíso Department",
    "countryId": 97,
    "countryCode": "HN",
    "fipsCode": "07",
    "iso2": "EP",
    "latitude": 13.9821294,
    "longitude": -86.4996546
  },
  {
    "id": 4044,
    "name": "Intibucá Department",
    "countryId": 97,
    "countryCode": "HN",
    "fipsCode": "10",
    "iso2": "IN",
    "latitude": 14.372734,
    "longitude": -88.2461183
  },
  {
    "id": 4045,
    "name": "Bay Islands Department",
    "countryId": 97,
    "countryCode": "HN",
    "fipsCode": "11",
    "iso2": "IB",
    "latitude": 16.4826614,
    "longitude": -85.8793252
  },
  {
    "id": 4046,
    "name": "Cortés Department",
    "countryId": 97,
    "countryCode": "HN",
    "fipsCode": "06",
    "iso2": "CR",
    "latitude": 15.4923508,
    "longitude": -88.0900762
  },
  {
    "id": 4047,
    "name": "Atlántida Department",
    "countryId": 97,
    "countryCode": "HN",
    "fipsCode": "01",
    "iso2": "AT",
    "latitude": 15.6696283,
    "longitude": -87.1422895
  },
  {
    "id": 4048,
    "name": "Gracias a Dios Department",
    "countryId": 97,
    "countryCode": "HN",
    "fipsCode": "09",
    "iso2": "GD",
    "latitude": 15.341806,
    "longitude": -84.6060449
  },
  {
    "id": 4049,
    "name": "Copán Department",
    "countryId": 97,
    "countryCode": "HN",
    "fipsCode": "05",
    "iso2": "CP",
    "latitude": 14.9360838,
    "longitude": -88.864698
  },
  {
    "id": 4050,
    "name": "Olancho Department",
    "countryId": 97,
    "countryCode": "HN",
    "fipsCode": "15",
    "iso2": "OL",
    "latitude": 14.8067406,
    "longitude": -85.7666645
  },
  {
    "id": 4051,
    "name": "Colón Department",
    "countryId": 97,
    "countryCode": "HN",
    "fipsCode": "03",
    "iso2": "CL",
    "latitude": 15.6425965,
    "longitude": -85.520024
  },
  {
    "id": 4052,
    "name": "Francisco Morazán Department",
    "countryId": 97,
    "countryCode": "HN",
    "fipsCode": "08",
    "iso2": "FM",
    "latitude": 14.45411,
    "longitude": -87.0624261
  },
  {
    "id": 4053,
    "name": "Santa Bárbara Department",
    "countryId": 97,
    "countryCode": "HN",
    "fipsCode": "16",
    "iso2": "SB",
    "latitude": 15.1202795,
    "longitude": -88.4016041
  },
  {
    "id": 4054,
    "name": "Lempira Department",
    "countryId": 97,
    "countryCode": "HN",
    "fipsCode": "13",
    "iso2": "LE",
    "latitude": 14.1887698,
    "longitude": -88.556531
  },
  {
    "id": 4055,
    "name": "Valle Department",
    "countryId": 97,
    "countryCode": "HN",
    "fipsCode": "17",
    "iso2": "VA",
    "latitude": 13.5782936,
    "longitude": -87.5791287
  },
  {
    "id": 4056,
    "name": "Ocotepeque Department",
    "countryId": 97,
    "countryCode": "HN",
    "fipsCode": "14",
    "iso2": "OC",
    "latitude": 14.5170347,
    "longitude": -89.0561532
  },
  {
    "id": 4057,
    "name": "Yoro Department",
    "countryId": 97,
    "countryCode": "HN",
    "fipsCode": "18",
    "iso2": "YO",
    "latitude": 15.2949679,
    "longitude": -87.1422895
  },
  {
    "id": 4058,
    "name": "La Paz Department",
    "countryId": 97,
    "countryCode": "HN",
    "fipsCode": "12",
    "iso2": "LP",
    "latitude": -15.0892416,
    "longitude": -68.5247149
  },
  {
    "id": 4059,
    "name": "Northland Region",
    "countryId": 158,
    "countryCode": "NZ",
    "fipsCode": "F6",
    "iso2": "NTL",
    "latitude": -35.4136172,
    "longitude": 173.9320806
  },
  {
    "id": 4060,
    "name": "Manawatu-Wanganui Region",
    "countryId": 158,
    "countryCode": "NZ",
    "fipsCode": "F3",
    "iso2": "MWT",
    "latitude": -39.7273356,
    "longitude": 175.4375574
  },
  {
    "id": 4061,
    "name": "Waikato Region",
    "countryId": 158,
    "countryCode": "NZ",
    "fipsCode": "G1",
    "iso2": "WKO",
    "latitude": -37.6190862,
    "longitude": 175.023346
  },
  {
    "id": 4062,
    "name": "Otago Region",
    "countryId": 158,
    "countryCode": "NZ",
    "fipsCode": "F7",
    "iso2": "OTA",
    "latitude": -45.4790671,
    "longitude": 170.1547567
  },
  {
    "id": 4063,
    "name": "Marlborough Region",
    "countryId": 158,
    "countryCode": "NZ",
    "fipsCode": "F4",
    "iso2": "MBH",
    "latitude": -41.5916883,
    "longitude": 173.7624053
  },
  {
    "id": 4064,
    "name": "West Coast Region",
    "countryId": 158,
    "countryCode": "NZ",
    "fipsCode": "G3",
    "iso2": "WTC",
    "latitude": 62.4113634,
    "longitude": -149.0729714
  },
  {
    "id": 4065,
    "name": "Wellington Region",
    "countryId": 158,
    "countryCode": "NZ",
    "fipsCode": "G2",
    "iso2": "WGN",
    "latitude": -41.0299323,
    "longitude": 175.4375574
  },
  {
    "id": 4066,
    "name": "Canterbury Region",
    "countryId": 158,
    "countryCode": "NZ",
    "fipsCode": "E9",
    "iso2": "CAN",
    "latitude": -43.7542275,
    "longitude": 171.1637245
  },
  {
    "id": 4067,
    "name": "Chatham Islands",
    "countryId": 158,
    "countryCode": "NZ",
    "fipsCode": "10",
    "iso2": "CIT",
    "latitude": -44.0057523,
    "longitude": -176.5400674
  },
  {
    "id": 4068,
    "name": "Gisborne District",
    "countryId": 158,
    "countryCode": "NZ",
    "fipsCode": "F1",
    "iso2": "GIS",
    "latitude": -38.1358174,
    "longitude": 178.3239309
  },
  {
    "id": 4069,
    "name": "Taranaki Region",
    "countryId": 158,
    "countryCode": "NZ",
    "fipsCode": "F9",
    "iso2": "TKI",
    "latitude": -39.3538149,
    "longitude": 174.4382721
  },
  {
    "id": 4070,
    "name": "Nelson Region",
    "countryId": 158,
    "countryCode": "NZ",
    "fipsCode": "F5",
    "iso2": "NSN",
    "latitude": -41.2985397,
    "longitude": 173.2441491
  },
  {
    "id": 4071,
    "name": "Southland Region",
    "countryId": 158,
    "countryCode": "NZ",
    "fipsCode": "F8",
    "iso2": "STL",
    "latitude": -45.8489159,
    "longitude": 167.6755387
  },
  {
    "id": 4072,
    "name": "Auckland Region",
    "countryId": 158,
    "countryCode": "NZ",
    "fipsCode": "E7",
    "iso2": "AUK",
    "latitude": -36.6675328,
    "longitude": 174.7733325
  },
  {
    "id": 4073,
    "name": "Tasman District",
    "countryId": 158,
    "countryCode": "NZ",
    "fipsCode": "TAS",
    "iso2": "TAS",
    "latitude": -41.4571184,
    "longitude": 172.820974
  },
  {
    "id": 4074,
    "name": "Bay of Plenty Region",
    "countryId": 158,
    "countryCode": "NZ",
    "fipsCode": "E8",
    "iso2": "BOP",
    "latitude": -37.4233917,
    "longitude": 176.7416374
  },
  {
    "id": 4075,
    "name": "Hawke\"s Bay Region",
    "countryId": 158,
    "countryCode": "NZ",
    "fipsCode": "F2",
    "iso2": "HKB",
    "latitude": -39.6016597,
    "longitude": 176.5804473
  },
  {
    "id": 4076,
    "name": "Saint John Parish",
    "countryId": 61,
    "countryCode": "DM",
    "fipsCode": "05",
    "iso2": "05",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 4077,
    "name": "Saint Mark Parish",
    "countryId": 61,
    "countryCode": "DM",
    "fipsCode": "08",
    "iso2": "08",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 4078,
    "name": "Saint David Parish",
    "countryId": 61,
    "countryCode": "DM",
    "fipsCode": "03",
    "iso2": "03",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 4079,
    "name": "Saint George Parish",
    "countryId": 61,
    "countryCode": "DM",
    "fipsCode": "04",
    "iso2": "04",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 4080,
    "name": "Saint Patrick Parish",
    "countryId": 61,
    "countryCode": "DM",
    "fipsCode": "09",
    "iso2": "09",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 4081,
    "name": "Saint Peter Parish",
    "countryId": 61,
    "countryCode": "DM",
    "fipsCode": "11",
    "iso2": "11",
    "latitude": 40.4524194,
    "longitude": -80.0085056
  },
  {
    "id": 4082,
    "name": "Saint Andrew Parish",
    "countryId": 61,
    "countryCode": "DM",
    "fipsCode": "02",
    "iso2": "02",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 4083,
    "name": "Saint Luke Parish",
    "countryId": 61,
    "countryCode": "DM",
    "fipsCode": "07",
    "iso2": "07",
    "latitude": 42.1051363,
    "longitude": -80.0570722
  },
  {
    "id": 4084,
    "name": "Saint Paul Parish",
    "countryId": 61,
    "countryCode": "DM",
    "fipsCode": "10",
    "iso2": "10",
    "latitude": 38.86146,
    "longitude": -90.7435619
  },
  {
    "id": 4085,
    "name": "Saint Joseph Parish",
    "countryId": 61,
    "countryCode": "DM",
    "fipsCode": "06",
    "iso2": "06",
    "latitude": 39.0222712,
    "longitude": -94.7176504
  },
  {
    "id": 4086,
    "name": "El Seibo Province",
    "countryId": 62,
    "countryCode": "DO",
    "fipsCode": "28",
    "iso2": "08",
    "latitude": 18.7658496,
    "longitude": -69.040668
  },
  {
    "id": 4087,
    "name": "La Romana Province",
    "countryId": 62,
    "countryCode": "DO",
    "fipsCode": "12",
    "iso2": "12",
    "latitude": 18.4310271,
    "longitude": -68.9837373
  },
  {
    "id": 4088,
    "name": "Sánchez Ramírez Province",
    "countryId": 62,
    "countryCode": "DO",
    "fipsCode": "21",
    "iso2": "24",
    "latitude": 19.052706,
    "longitude": -70.1492264
  },
  {
    "id": 4089,
    "name": "Hermanas Mirabal Province",
    "countryId": 62,
    "countryCode": "DO",
    "fipsCode": "19",
    "iso2": "19",
    "latitude": 19.3747559,
    "longitude": -70.3513235
  },
  {
    "id": 4090,
    "name": "Barahona Province",
    "countryId": 62,
    "countryCode": "DO",
    "fipsCode": "03",
    "iso2": "04",
    "latitude": 18.2139066,
    "longitude": -71.1043759
  },
  {
    "id": 4091,
    "name": "San Cristóbal Province",
    "countryId": 62,
    "countryCode": "DO",
    "fipsCode": "33",
    "iso2": "21",
    "latitude": 18.4180414,
    "longitude": -70.1065849
  },
  {
    "id": 4092,
    "name": "Puerto Plata Province",
    "countryId": 62,
    "countryCode": "DO",
    "fipsCode": "18",
    "iso2": "18",
    "latitude": 19.7543225,
    "longitude": -70.8332847
  },
  {
    "id": 4093,
    "name": "Santo Domingo Province",
    "countryId": 62,
    "countryCode": "DO",
    "fipsCode": "37",
    "iso2": "32",
    "latitude": 18.5104253,
    "longitude": -69.8404054
  },
  {
    "id": 4094,
    "name": "María Trinidad Sánchez Province",
    "countryId": 62,
    "countryCode": "DO",
    "fipsCode": "14",
    "iso2": "14",
    "latitude": 19.3734597,
    "longitude": -69.8514439
  },
  {
    "id": 4095,
    "name": "Distrito Nacional",
    "countryId": 62,
    "countryCode": "DO",
    "fipsCode": "34",
    "iso2": "01",
    "latitude": 18.4860575,
    "longitude": -69.9312117
  },
  {
    "id": 4096,
    "name": "Peravia Province",
    "countryId": 62,
    "countryCode": "DO",
    "fipsCode": "35",
    "iso2": "17",
    "latitude": 18.2786594,
    "longitude": -70.3335887
  },
  {
    "id": 4097,
    "name": "Independencia",
    "countryId": 62,
    "countryCode": "DO",
    "fipsCode": "09",
    "iso2": "10",
    "latitude": 32.6335748,
    "longitude": -115.4289294
  },
  {
    "id": 4098,
    "name": "San Juan Province",
    "countryId": 62,
    "countryCode": "DO",
    "fipsCode": "23",
    "iso2": "22",
    "latitude": -31.5287127,
    "longitude": -68.5360403
  },
  {
    "id": 4099,
    "name": "Monseñor Nouel Province",
    "countryId": 62,
    "countryCode": "DO",
    "fipsCode": "31",
    "iso2": "28",
    "latitude": 18.9215234,
    "longitude": -70.3836815
  },
  {
    "id": 4100,
    "name": "Santiago Rodríguez Province",
    "countryId": 62,
    "countryCode": "DO",
    "fipsCode": "26",
    "iso2": "26",
    "latitude": 19.4713181,
    "longitude": -71.3395801
  },
  {
    "id": 4101,
    "name": "Pedernales Province",
    "countryId": 62,
    "countryCode": "DO",
    "fipsCode": "16",
    "iso2": "16",
    "latitude": 17.8537626,
    "longitude": -71.3303209
  },
  {
    "id": 4102,
    "name": "Espaillat Province",
    "countryId": 62,
    "countryCode": "DO",
    "fipsCode": "08",
    "iso2": "09",
    "latitude": 19.6277658,
    "longitude": -70.2786775
  },
  {
    "id": 4103,
    "name": "Samaná Province",
    "countryId": 62,
    "countryCode": "DO",
    "fipsCode": "20",
    "iso2": "20",
    "latitude": 19.2058371,
    "longitude": -69.3362949
  },
  {
    "id": 4104,
    "name": "Valverde Province",
    "countryId": 62,
    "countryCode": "DO",
    "fipsCode": "27",
    "iso2": "27",
    "latitude": 19.5881221,
    "longitude": -70.980331
  },
  {
    "id": 4105,
    "name": "Baoruco Province",
    "countryId": 62,
    "countryCode": "DO",
    "fipsCode": "02",
    "iso2": "03",
    "latitude": 18.4879898,
    "longitude": -71.4182249
  },
  {
    "id": 4106,
    "name": "Hato Mayor Province",
    "countryId": 62,
    "countryCode": "DO",
    "fipsCode": "29",
    "iso2": "30",
    "latitude": 18.7635799,
    "longitude": -69.2557637
  },
  {
    "id": 4107,
    "name": "Dajabón Province",
    "countryId": 62,
    "countryCode": "DO",
    "fipsCode": "04",
    "iso2": "05",
    "latitude": 19.5499241,
    "longitude": -71.7086514
  },
  {
    "id": 4108,
    "name": "Santiago Province",
    "countryId": 62,
    "countryCode": "DO",
    "fipsCode": "25",
    "iso2": "25",
    "latitude": -33.45,
    "longitude": -70.6667
  },
  {
    "id": 4109,
    "name": "La Altagracia Province",
    "countryId": 62,
    "countryCode": "DO",
    "fipsCode": "10",
    "iso2": "11",
    "latitude": 18.5850236,
    "longitude": -68.6201072
  },
  {
    "id": 4110,
    "name": "San Pedro de Macorís",
    "countryId": 62,
    "countryCode": "DO",
    "fipsCode": "24",
    "iso2": "23",
    "latitude": 18.46266,
    "longitude": -69.3051234
  },
  {
    "id": 4111,
    "name": "Monte Plata Province",
    "countryId": 62,
    "countryCode": "DO",
    "fipsCode": "32",
    "iso2": "29",
    "latitude": 18.8080878,
    "longitude": -69.7869146
  },
  {
    "id": 4112,
    "name": "San José de Ocoa Province",
    "countryId": 62,
    "countryCode": "DO",
    "fipsCode": "36",
    "iso2": "31",
    "latitude": 18.543858,
    "longitude": -70.5041816
  },
  {
    "id": 4113,
    "name": "Duarte Province",
    "countryId": 62,
    "countryCode": "DO",
    "fipsCode": "06",
    "iso2": "06",
    "latitude": 19.2090823,
    "longitude": -70.0270004
  },
  {
    "id": 4114,
    "name": "Azua Province",
    "countryId": 62,
    "countryCode": "DO",
    "fipsCode": "01",
    "iso2": "02",
    "latitude": 18.4552709,
    "longitude": -70.7380928
  },
  {
    "id": 4115,
    "name": "Monte Cristi Province",
    "countryId": 62,
    "countryCode": "DO",
    "fipsCode": "15",
    "iso2": "15",
    "latitude": 19.7396899,
    "longitude": -71.4433984
  },
  {
    "id": 4116,
    "name": "La Vega Province",
    "countryId": 62,
    "countryCode": "DO",
    "fipsCode": "30",
    "iso2": "13",
    "latitude": 19.2211554,
    "longitude": -70.5288753
  },
  {
    "id": 4117,
    "name": "Nord",
    "countryId": 95,
    "countryCode": "HT",
    "fipsCode": "09",
    "iso2": "ND",
    "latitude": 43.190526,
    "longitude": -89.437921
  },
  {
    "id": 4118,
    "name": "Nippes",
    "countryId": 95,
    "countryCode": "HT",
    "fipsCode": "15",
    "iso2": "NI",
    "latitude": 18.3990735,
    "longitude": -73.4180211
  },
  {
    "id": 4119,
    "name": "Grand\"Anse",
    "countryId": 95,
    "countryCode": "HT",
    "fipsCode": "14",
    "iso2": "GA",
    "latitude": 12.0166667,
    "longitude": -61.7666667
  },
  {
    "id": 4120,
    "name": "Ouest",
    "countryId": 95,
    "countryCode": "HT",
    "fipsCode": "11",
    "iso2": "OU",
    "latitude": 45.4547249,
    "longitude": -73.6502365
  },
  {
    "id": 4121,
    "name": "Nord-Est",
    "countryId": 95,
    "countryCode": "HT",
    "fipsCode": "10",
    "iso2": "NE",
    "latitude": 19.4889723,
    "longitude": -71.8571331
  },
  {
    "id": 4122,
    "name": "Sud",
    "countryId": 95,
    "countryCode": "HT",
    "fipsCode": "12",
    "iso2": "SD",
    "latitude": 29.9213248,
    "longitude": -90.0973772
  },
  {
    "id": 4123,
    "name": "Artibonite",
    "countryId": 95,
    "countryCode": "HT",
    "fipsCode": "06",
    "iso2": "AR",
    "latitude": 19.362902,
    "longitude": -72.4258145
  },
  {
    "id": 4124,
    "name": "Sud-Est",
    "countryId": 95,
    "countryCode": "HT",
    "fipsCode": "13",
    "iso2": "SE",
    "latitude": 18.2783598,
    "longitude": -72.3547915
  },
  {
    "id": 4125,
    "name": "Centre",
    "countryId": 95,
    "countryCode": "HT",
    "fipsCode": "07",
    "iso2": "CE",
    "latitude": 32.8370251,
    "longitude": -96.7773882
  },
  {
    "id": 4126,
    "name": "Nord-Ouest",
    "countryId": 95,
    "countryCode": "HT",
    "fipsCode": "03",
    "iso2": "NO",
    "latitude": 19.8374009,
    "longitude": -73.0405277
  },
  {
    "id": 4127,
    "name": "San Vicente Department",
    "countryId": 66,
    "countryCode": "SV",
    "fipsCode": "12",
    "iso2": "SV",
    "latitude": 13.5868561,
    "longitude": -88.7493998
  },
  {
    "id": 4128,
    "name": "Santa Ana Department",
    "countryId": 66,
    "countryCode": "SV",
    "fipsCode": "11",
    "iso2": "SA",
    "latitude": 14.1461121,
    "longitude": -89.5120084
  },
  {
    "id": 4129,
    "name": "Usulután Department",
    "countryId": 66,
    "countryCode": "SV",
    "fipsCode": "14",
    "iso2": "US",
    "latitude": 13.4470634,
    "longitude": -88.556531
  },
  {
    "id": 4130,
    "name": "Morazán Department",
    "countryId": 66,
    "countryCode": "SV",
    "fipsCode": "08",
    "iso2": "MO",
    "latitude": 13.7682,
    "longitude": -88.1291387
  },
  {
    "id": 4131,
    "name": "Chalatenango Department",
    "countryId": 66,
    "countryCode": "SV",
    "fipsCode": "03",
    "iso2": "CH",
    "latitude": 14.1916648,
    "longitude": -89.1705998
  },
  {
    "id": 4132,
    "name": "Cabañas Department",
    "countryId": 66,
    "countryCode": "SV",
    "fipsCode": "02",
    "iso2": "CA",
    "latitude": 13.8648288,
    "longitude": -88.7493998
  },
  {
    "id": 4133,
    "name": "San Salvador Department",
    "countryId": 66,
    "countryCode": "SV",
    "fipsCode": "10",
    "iso2": "SS",
    "latitude": 13.7739997,
    "longitude": -89.2086773
  },
  {
    "id": 4134,
    "name": "La Libertad Department",
    "countryId": 66,
    "countryCode": "SV",
    "fipsCode": "05",
    "iso2": "LI",
    "latitude": 13.6817661,
    "longitude": -89.3606298
  },
  {
    "id": 4135,
    "name": "San Miguel Department",
    "countryId": 66,
    "countryCode": "SV",
    "fipsCode": "09",
    "iso2": "SM",
    "latitude": 13.4451041,
    "longitude": -88.2461183
  },
  {
    "id": 4136,
    "name": "La Paz Department",
    "countryId": 66,
    "countryCode": "SV",
    "fipsCode": "06",
    "iso2": "PA",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 4137,
    "name": "Cuscatlán Department",
    "countryId": 66,
    "countryCode": "SV",
    "fipsCode": "04",
    "iso2": "CU",
    "latitude": 13.8661957,
    "longitude": -89.0561532
  },
  {
    "id": 4138,
    "name": "La Unión Department",
    "countryId": 66,
    "countryCode": "SV",
    "fipsCode": "07",
    "iso2": "UN",
    "latitude": 13.4886443,
    "longitude": -87.8942451
  },
  {
    "id": 4139,
    "name": "Ahuachapán Department",
    "countryId": 66,
    "countryCode": "SV",
    "fipsCode": "01",
    "iso2": "AH",
    "latitude": 13.8216148,
    "longitude": -89.9253233
  },
  {
    "id": 4140,
    "name": "Sonsonate Department",
    "countryId": 66,
    "countryCode": "SV",
    "fipsCode": "13",
    "iso2": "SO",
    "latitude": 13.682358,
    "longitude": -89.6628111
  },
  {
    "id": 4141,
    "name": "Braslovče Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "F7",
    "iso2": "151",
    "latitude": 46.2836192,
    "longitude": 15.041832
  },
  {
    "id": 4142,
    "name": "Lenart Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "I3",
    "iso2": "058",
    "latitude": 46.5834424,
    "longitude": 15.8262125
  },
  {
    "id": 4143,
    "name": "Oplotnica",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "J8",
    "iso2": "171",
    "latitude": 46.387163,
    "longitude": 15.4458131
  },
  {
    "id": 4144,
    "name": "Velike Lašče Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "D8",
    "iso2": "134",
    "latitude": 45.8336591,
    "longitude": 14.6362363
  },
  {
    "id": 4145,
    "name": "Hajdina Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "G9",
    "iso2": "159",
    "latitude": 46.4185014,
    "longitude": 15.8244722
  },
  {
    "id": 4146,
    "name": "Podčetrtek Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "92",
    "iso2": "092",
    "latitude": 46.1739542,
    "longitude": 15.6013816
  },
  {
    "id": 4147,
    "name": "Cankova Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "F8",
    "iso2": "152",
    "latitude": 46.718237,
    "longitude": 16.0197222
  },
  {
    "id": 4148,
    "name": "Vitanje Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "E2",
    "iso2": "137",
    "latitude": 46.3815323,
    "longitude": 15.2950687
  },
  {
    "id": 4149,
    "name": "Sežana Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "B7",
    "iso2": "111",
    "latitude": 45.7275109,
    "longitude": 13.8661931
  },
  {
    "id": 4150,
    "name": "Kidričevo Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "45",
    "iso2": "045",
    "latitude": 46.3957572,
    "longitude": 15.7925906
  },
  {
    "id": 4151,
    "name": "Črenšovci Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "15",
    "iso2": "015",
    "latitude": 46.5720029,
    "longitude": 16.2877346
  },
  {
    "id": 4152,
    "name": "Idrija Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "36",
    "iso2": "036",
    "latitude": 46.0040939,
    "longitude": 13.9775493
  },
  {
    "id": 4153,
    "name": "Trnovska Vas Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "M7",
    "iso2": "185",
    "latitude": 46.5294035,
    "longitude": 15.8853118
  },
  {
    "id": 4154,
    "name": "Vodice Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "E3",
    "iso2": "138",
    "latitude": 46.1896643,
    "longitude": 14.4938539
  },
  {
    "id": 4155,
    "name": "Ravne na Koroškem Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "K8",
    "iso2": "103",
    "latitude": 46.5521194,
    "longitude": 14.9599084
  },
  {
    "id": 4156,
    "name": "Lovrenc na Pohorju Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "I8",
    "iso2": "167",
    "latitude": 46.5419638,
    "longitude": 15.4000443
  },
  {
    "id": 4157,
    "name": "Majšperk Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "J1",
    "iso2": "069",
    "latitude": 46.3503019,
    "longitude": 15.7340595
  },
  {
    "id": 4158,
    "name": "Loški Potok Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "66",
    "iso2": "066",
    "latitude": 45.6909637,
    "longitude": 14.598597
  },
  {
    "id": 4159,
    "name": "Domžale Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "G7",
    "iso2": "023",
    "latitude": 46.1438269,
    "longitude": 14.6375279
  },
  {
    "id": 4160,
    "name": "Rečica ob Savinji Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "O9",
    "iso2": "209",
    "latitude": 46.323379,
    "longitude": 14.922367
  },
  {
    "id": 4161,
    "name": "Podlehnik Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "K1",
    "iso2": "172",
    "latitude": 46.3310782,
    "longitude": 15.8785836
  },
  {
    "id": 4162,
    "name": "Cerknica Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "13",
    "iso2": "013",
    "latitude": 45.7966255,
    "longitude": 14.392177
  },
  {
    "id": 4163,
    "name": "Vransko Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "N4",
    "iso2": "189",
    "latitude": 46.239006,
    "longitude": 14.9527249
  },
  {
    "id": 4164,
    "name": "Sveta Ana Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "M3",
    "iso2": "181",
    "latitude": 46.65,
    "longitude": 15.845278
  },
  {
    "id": 4165,
    "name": "Brezovica Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "09",
    "iso2": "008",
    "latitude": 45.9559351,
    "longitude": 14.4349952
  },
  {
    "id": 4166,
    "name": "Benedikt Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "F4",
    "iso2": "148",
    "latitude": 46.6155841,
    "longitude": 15.8957281
  },
  {
    "id": 4167,
    "name": "Divača Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "19",
    "iso2": "019",
    "latitude": 45.6806069,
    "longitude": 13.9720312
  },
  {
    "id": 4168,
    "name": "Moravče Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "77",
    "iso2": "077",
    "latitude": 46.1362781,
    "longitude": 14.746001
  },
  {
    "id": 4169,
    "name": "Slovenj Gradec City Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "C2",
    "iso2": "112",
    "latitude": 46.4877718,
    "longitude": 15.0729478
  },
  {
    "id": 4170,
    "name": "Škocjan Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "B8",
    "iso2": "121",
    "latitude": 45.9175454,
    "longitude": 15.3101736
  },
  {
    "id": 4171,
    "name": "Šentjur Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "L7",
    "iso2": "120",
    "latitude": 46.2654339,
    "longitude": 15.408
  },
  {
    "id": 4172,
    "name": "Pesnica Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "89",
    "iso2": "089",
    "latitude": 46.6088755,
    "longitude": 15.6757051
  },
  {
    "id": 4173,
    "name": "Dol pri Ljubljani Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "22",
    "iso2": "022",
    "latitude": 46.0884386,
    "longitude": 14.6424792
  },
  {
    "id": 4174,
    "name": "Loška Dolina Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "I7",
    "iso2": "065",
    "latitude": 45.6477908,
    "longitude": 14.4973147
  },
  {
    "id": 4175,
    "name": "Hoče–Slivnica Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "H1",
    "iso2": "160",
    "latitude": 46.477858,
    "longitude": 15.6476005
  },
  {
    "id": 4176,
    "name": "Cerkvenjak Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "F9",
    "iso2": "153",
    "latitude": 46.5670711,
    "longitude": 15.9429753
  },
  {
    "id": 4177,
    "name": "Naklo Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "82",
    "iso2": "082",
    "latitude": 46.2718663,
    "longitude": 14.3156932
  },
  {
    "id": 4178,
    "name": "Cerkno Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "14",
    "iso2": "014",
    "latitude": 46.1288414,
    "longitude": 13.9894027
  },
  {
    "id": 4179,
    "name": "Bistrica ob Sotli Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "F5",
    "iso2": "149",
    "latitude": 46.0565579,
    "longitude": 15.6625947
  },
  {
    "id": 4180,
    "name": "Kamnik Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "H6",
    "iso2": "043",
    "latitude": 46.2221666,
    "longitude": 14.6070727
  },
  {
    "id": 4181,
    "name": "Bovec Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "06",
    "iso2": "006",
    "latitude": 46.3380495,
    "longitude": 13.5524174
  },
  {
    "id": 4182,
    "name": "Zavrč Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "E9",
    "iso2": "143",
    "latitude": 46.35713,
    "longitude": 16.0477747
  },
  {
    "id": 4183,
    "name": "Ajdovščina Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "01",
    "iso2": "001",
    "latitude": 45.8870776,
    "longitude": 13.9042818
  },
  {
    "id": 4184,
    "name": "Pivka Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "91",
    "iso2": "091",
    "latitude": 45.6789296,
    "longitude": 14.2542689
  },
  {
    "id": 4185,
    "name": "Štore Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "C9",
    "iso2": "127",
    "latitude": 46.2222514,
    "longitude": 15.3126116
  },
  {
    "id": 4186,
    "name": "Kozje Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "51",
    "iso2": "051",
    "latitude": 46.0733211,
    "longitude": 15.5596719
  },
  {
    "id": 4187,
    "name": "Municipality of Škofljica",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "C1",
    "iso2": "123",
    "latitude": 45.9840962,
    "longitude": 14.5746626
  },
  {
    "id": 4188,
    "name": "Prebold Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "K4",
    "iso2": "174",
    "latitude": 46.2359136,
    "longitude": 15.0936912
  },
  {
    "id": 4189,
    "name": "Dobrovnik Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "G5",
    "iso2": "156",
    "latitude": 46.6538662,
    "longitude": 16.3506594
  },
  {
    "id": 4190,
    "name": "Mozirje Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "79",
    "iso2": "079",
    "latitude": 46.339435,
    "longitude": 14.9602413
  },
  {
    "id": 4191,
    "name": "City Municipality of Celje",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "11",
    "iso2": "011",
    "latitude": 46.2397495,
    "longitude": 15.2677063
  },
  {
    "id": 4192,
    "name": "Žiri Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "F2",
    "iso2": "147",
    "latitude": 46.0472499,
    "longitude": 14.1098451
  },
  {
    "id": 4193,
    "name": "Horjul Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "H3",
    "iso2": "162",
    "latitude": 46.0225378,
    "longitude": 14.2986269
  },
  {
    "id": 4194,
    "name": "Tabor Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "M5",
    "iso2": "184",
    "latitude": 46.2107921,
    "longitude": 15.0174249
  },
  {
    "id": 4195,
    "name": "Radeče Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "99",
    "iso2": "099",
    "latitude": 46.0666954,
    "longitude": 15.1820438
  },
  {
    "id": 4196,
    "name": "Vipava Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "E1",
    "iso2": "136",
    "latitude": 45.8412674,
    "longitude": 13.9609613
  },
  {
    "id": 4197,
    "name": "Kungota",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "55",
    "iso2": "055",
    "latitude": 46.6418793,
    "longitude": 15.6036288
  },
  {
    "id": 4198,
    "name": "Slovenske Konjice Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "C4",
    "iso2": "114",
    "latitude": 46.3369191,
    "longitude": 15.4214708
  },
  {
    "id": 4199,
    "name": "Osilnica Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "88",
    "iso2": "088",
    "latitude": 45.5418467,
    "longitude": 14.7156303
  },
  {
    "id": 4200,
    "name": "Borovnica Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "05",
    "iso2": "005",
    "latitude": 45.9044525,
    "longitude": 14.3824189
  },
  {
    "id": 4201,
    "name": "Piran Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "J9",
    "iso2": "090",
    "latitude": 45.5288856,
    "longitude": 13.5680735
  },
  {
    "id": 4202,
    "name": "Bled Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "03",
    "iso2": "003",
    "latitude": 46.3683266,
    "longitude": 14.1145798
  },
  {
    "id": 4203,
    "name": "Jezersko Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "H5",
    "iso2": "163",
    "latitude": 46.3942794,
    "longitude": 14.4985559
  },
  {
    "id": 4204,
    "name": "Rače–Fram Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "98",
    "iso2": "098",
    "latitude": 46.4542083,
    "longitude": 15.6329467
  },
  {
    "id": 4205,
    "name": "Nova Gorica City Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "84",
    "iso2": "084",
    "latitude": 45.976276,
    "longitude": 13.7308881
  },
  {
    "id": 4206,
    "name": "Razkrižje Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "K9",
    "iso2": "176",
    "latitude": 46.5226339,
    "longitude": 16.2668638
  },
  {
    "id": 4207,
    "name": "Ribnica na Pohorju Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "L2",
    "iso2": "177",
    "latitude": 46.5356145,
    "longitude": 15.2674538
  },
  {
    "id": 4208,
    "name": "Muta Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "81",
    "iso2": "081",
    "latitude": 46.6097366,
    "longitude": 15.1629995
  },
  {
    "id": 4209,
    "name": "Rogatec Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "A8",
    "iso2": "107",
    "latitude": 46.2286626,
    "longitude": 15.6991338
  },
  {
    "id": 4210,
    "name": "Gorišnica Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "28",
    "iso2": "028",
    "latitude": 46.4120271,
    "longitude": 16.0133089
  },
  {
    "id": 4211,
    "name": "Kuzma Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "I2",
    "iso2": "056",
    "latitude": 46.8351038,
    "longitude": 16.08071
  },
  {
    "id": 4212,
    "name": "Mislinja Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "76",
    "iso2": "076",
    "latitude": 46.4429403,
    "longitude": 15.1987678
  },
  {
    "id": 4213,
    "name": "Duplek Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "26",
    "iso2": "026",
    "latitude": 46.5010016,
    "longitude": 15.7546307
  },
  {
    "id": 4214,
    "name": "Trebnje Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "D4",
    "iso2": "130",
    "latitude": 45.9080163,
    "longitude": 15.0131905
  },
  {
    "id": 4215,
    "name": "Brežice Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "08",
    "iso2": "009",
    "latitude": 45.9041096,
    "longitude": 15.5943639
  },
  {
    "id": 4216,
    "name": "Dobrepolje Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "20",
    "iso2": "020",
    "latitude": 45.8524951,
    "longitude": 14.7083109
  },
  {
    "id": 4217,
    "name": "Grad Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "G8",
    "iso2": "158",
    "latitude": 46.808732,
    "longitude": 16.109206
  },
  {
    "id": 4218,
    "name": "Moravske Toplice Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "78",
    "iso2": "078",
    "latitude": 46.6856932,
    "longitude": 16.2224582
  },
  {
    "id": 4219,
    "name": "Luče Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "I9",
    "iso2": "067",
    "latitude": 46.3544925,
    "longitude": 14.7471504
  },
  {
    "id": 4220,
    "name": "Miren–Kostanjevica Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "J5",
    "iso2": "075",
    "latitude": 45.8436029,
    "longitude": 13.6276647
  },
  {
    "id": 4221,
    "name": "Ormož Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "87",
    "iso2": "087",
    "latitude": 46.4353333,
    "longitude": 16.154374
  },
  {
    "id": 4222,
    "name": "Šalovci Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "L4",
    "iso2": "033",
    "latitude": 46.8533568,
    "longitude": 16.2591791
  },
  {
    "id": 4223,
    "name": "Miklavž na Dravskem Polju Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "J4",
    "iso2": "169",
    "latitude": 46.5082628,
    "longitude": 15.6952065
  },
  {
    "id": 4224,
    "name": "Makole Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "O5",
    "iso2": "198",
    "latitude": 46.3168697,
    "longitude": 15.6664126
  },
  {
    "id": 4225,
    "name": "Lendava Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "I4",
    "iso2": "059",
    "latitude": 46.5513483,
    "longitude": 16.4419839
  },
  {
    "id": 4226,
    "name": "Vuzenica Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "E6",
    "iso2": "141",
    "latitude": 46.5980836,
    "longitude": 15.1657237
  },
  {
    "id": 4227,
    "name": "Kanal ob Soči Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "44",
    "iso2": "044",
    "latitude": 46.067353,
    "longitude": 13.620335
  },
  {
    "id": 4228,
    "name": "Ptuj City Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "K7",
    "iso2": "096",
    "latitude": 46.4199535,
    "longitude": 15.8696884
  },
  {
    "id": 4229,
    "name": "Sveti Andraž v Slovenskih Goricah Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "M4",
    "iso2": "182",
    "latitude": 46.5189747,
    "longitude": 15.9498262
  },
  {
    "id": 4230,
    "name": "Selnica ob Dravi Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "L5",
    "iso2": "178",
    "latitude": 46.5513918,
    "longitude": 15.492941
  },
  {
    "id": 4231,
    "name": "Radovljica Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "A3",
    "iso2": "102",
    "latitude": 46.3355827,
    "longitude": 14.2094534
  },
  {
    "id": 4232,
    "name": "Črna na Koroškem Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "16",
    "iso2": "016",
    "latitude": 46.4704529,
    "longitude": 14.8499998
  },
  {
    "id": 4233,
    "name": "Rogaška Slatina Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "A7",
    "iso2": "106",
    "latitude": 46.2453973,
    "longitude": 15.6265014
  },
  {
    "id": 4234,
    "name": "Podvelka Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "K2",
    "iso2": "093",
    "latitude": 46.6221952,
    "longitude": 15.3889922
  },
  {
    "id": 4235,
    "name": "Ribnica Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "L1",
    "iso2": "104",
    "latitude": 45.7400303,
    "longitude": 14.7265782
  },
  {
    "id": 4236,
    "name": "City Municipality of Novo Mesto",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "J7",
    "iso2": "085",
    "latitude": 45.8010824,
    "longitude": 15.1710089
  },
  {
    "id": 4237,
    "name": "Mirna Peč Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "J6",
    "iso2": "170",
    "latitude": 45.8481574,
    "longitude": 15.087945
  },
  {
    "id": 4238,
    "name": "Križevci Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "I1",
    "iso2": "166",
    "latitude": 46.5701821,
    "longitude": 16.1092653
  },
  {
    "id": 4239,
    "name": "Poljčane Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "O8",
    "iso2": "200",
    "latitude": 46.3139853,
    "longitude": 15.5784791
  },
  {
    "id": 4240,
    "name": "Brda Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "07",
    "iso2": "007",
    "latitude": 45.9975652,
    "longitude": 13.5270474
  },
  {
    "id": 4241,
    "name": "Šentjernej Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "B4",
    "iso2": "119",
    "latitude": 45.843413,
    "longitude": 15.3378312
  },
  {
    "id": 4242,
    "name": "Maribor City Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "J2",
    "iso2": "070",
    "latitude": 46.5506496,
    "longitude": 15.6205439
  },
  {
    "id": 4243,
    "name": "Kobarid Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "46",
    "iso2": "046",
    "latitude": 46.2456971,
    "longitude": 13.5786949
  },
  {
    "id": 4244,
    "name": "Markovci Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "J3",
    "iso2": "168",
    "latitude": 46.3879309,
    "longitude": 15.9586014
  },
  {
    "id": 4245,
    "name": "Vojnik Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "N3",
    "iso2": "139",
    "latitude": 46.2920581,
    "longitude": 15.302058
  },
  {
    "id": 4246,
    "name": "Trbovlje Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "D3",
    "iso2": "129",
    "latitude": 46.1503563,
    "longitude": 15.0453137
  },
  {
    "id": 4247,
    "name": "Tolmin Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "D2",
    "iso2": "128",
    "latitude": 46.1857188,
    "longitude": 13.7319838
  },
  {
    "id": 4248,
    "name": "Šoštanj Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "C7",
    "iso2": "126",
    "latitude": 46.3782836,
    "longitude": 15.0461378
  },
  {
    "id": 4249,
    "name": "Žetale Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "N6",
    "iso2": "191",
    "latitude": 46.2742833,
    "longitude": 15.7913359
  },
  {
    "id": 4250,
    "name": "Tržič Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "D5",
    "iso2": "131",
    "latitude": 46.3593514,
    "longitude": 14.3006623
  },
  {
    "id": 4251,
    "name": "Turnišče Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "D6",
    "iso2": "132",
    "latitude": 46.6137504,
    "longitude": 16.32021
  },
  {
    "id": 4252,
    "name": "Dobrna Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "G3",
    "iso2": "155",
    "latitude": 46.3356141,
    "longitude": 15.2259732
  },
  {
    "id": 4253,
    "name": "Renče–Vogrsko Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "P1",
    "iso2": "201",
    "latitude": 45.8954617,
    "longitude": 13.6785673
  },
  {
    "id": 4254,
    "name": "Kostanjevica na Krki Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "O3",
    "iso2": "197",
    "latitude": 45.8316638,
    "longitude": 15.4411906
  },
  {
    "id": 4255,
    "name": "Sveti Jurij ob Ščavnici Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "O3",
    "iso2": "116",
    "latitude": 46.5687452,
    "longitude": 16.0222528
  },
  {
    "id": 4256,
    "name": "Železniki Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "F1",
    "iso2": "146",
    "latitude": 46.2256377,
    "longitude": 14.1693617
  },
  {
    "id": 4257,
    "name": "Veržej Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "N1",
    "iso2": "188",
    "latitude": 46.5841135,
    "longitude": 16.16208
  },
  {
    "id": 4258,
    "name": "Žalec Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "N5",
    "iso2": "190",
    "latitude": 46.2519712,
    "longitude": 15.1650072
  },
  {
    "id": 4259,
    "name": "Starše Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "C8",
    "iso2": "115",
    "latitude": 46.4674331,
    "longitude": 15.7640546
  },
  {
    "id": 4260,
    "name": "Sveta Trojica v Slovenskih Goricah Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "P6",
    "iso2": "204",
    "latitude": 46.5680809,
    "longitude": 15.8823064
  },
  {
    "id": 4261,
    "name": "Solčava Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "M2",
    "iso2": "180",
    "latitude": 46.4023526,
    "longitude": 14.6802304
  },
  {
    "id": 4262,
    "name": "Vrhnika Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "E5",
    "iso2": "140",
    "latitude": 45.9502719,
    "longitude": 14.3276422
  },
  {
    "id": 4263,
    "name": "Središče ob Dravi",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "P4",
    "iso2": "202",
    "latitude": 46.3959282,
    "longitude": 16.2704915
  },
  {
    "id": 4264,
    "name": "Rogašovci Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "A6",
    "iso2": "105",
    "latitude": 46.8055785,
    "longitude": 16.0345237
  },
  {
    "id": 4265,
    "name": "Mežica Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "74",
    "iso2": "074",
    "latitude": 46.5215027,
    "longitude": 14.852134
  },
  {
    "id": 4266,
    "name": "Juršinci Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "42",
    "iso2": "042",
    "latitude": 46.4898651,
    "longitude": 15.980923
  },
  {
    "id": 4267,
    "name": "Velika Polana Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "M9",
    "iso2": "187",
    "latitude": 46.5731715,
    "longitude": 16.3444126
  },
  {
    "id": 4268,
    "name": "Sevnica Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "B6",
    "iso2": "110",
    "latitude": 46.0070317,
    "longitude": 15.3045679
  },
  {
    "id": 4269,
    "name": "Zagorje ob Savi Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "E7",
    "iso2": "142",
    "latitude": 46.1345202,
    "longitude": 14.9964384
  },
  {
    "id": 4270,
    "name": "Ljubljana City Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "61",
    "iso2": "061",
    "latitude": 46.0569465,
    "longitude": 14.5057515
  },
  {
    "id": 4271,
    "name": "Gornji Petrovci Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "31",
    "iso2": "031",
    "latitude": 46.8037128,
    "longitude": 16.2191379
  },
  {
    "id": 4272,
    "name": "Polzela Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "K3",
    "iso2": "173",
    "latitude": 46.280897,
    "longitude": 15.0737321
  },
  {
    "id": 4273,
    "name": "Sveti Tomaž Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "P8",
    "iso2": "205",
    "latitude": 46.4835283,
    "longitude": 16.079442
  },
  {
    "id": 4274,
    "name": "Prevalje Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "K6",
    "iso2": "175",
    "latitude": 46.5621146,
    "longitude": 14.8847861
  },
  {
    "id": 4275,
    "name": "Radlje ob Dravi Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "A2",
    "iso2": "101",
    "latitude": 46.6135732,
    "longitude": 15.2354438
  },
  {
    "id": 4276,
    "name": "Žirovnica Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "N7",
    "iso2": "192",
    "latitude": 46.3954403,
    "longitude": 14.1539632
  },
  {
    "id": 4277,
    "name": "Sodražica Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "M1",
    "iso2": "179",
    "latitude": 45.7616565,
    "longitude": 14.6352853
  },
  {
    "id": 4278,
    "name": "Bloke Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "F6",
    "iso2": "150",
    "latitude": 45.7728141,
    "longitude": 14.5063459
  },
  {
    "id": 4279,
    "name": "Šmartno pri Litiji Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "L9",
    "iso2": "194",
    "latitude": 46.0454971,
    "longitude": 14.8410133
  },
  {
    "id": 4280,
    "name": "Ruše Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "L3",
    "iso2": "108",
    "latitude": 46.5206265,
    "longitude": 15.4817869
  },
  {
    "id": 4281,
    "name": "Dolenjske Toplice Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "G6",
    "iso2": "157",
    "latitude": 45.7345711,
    "longitude": 15.0129493
  },
  {
    "id": 4282,
    "name": "Bohinj Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "04",
    "iso2": "004",
    "latitude": 46.3005652,
    "longitude": 13.9427195
  },
  {
    "id": 4283,
    "name": "Komenda Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "H8",
    "iso2": "164",
    "latitude": 46.206488,
    "longitude": 14.5382499
  },
  {
    "id": 4284,
    "name": "Gorje Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "H8",
    "iso2": "207",
    "latitude": 46.3802458,
    "longitude": 14.0685339
  },
  {
    "id": 4285,
    "name": "Šmarje pri Jelšah Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "C5",
    "iso2": "124",
    "latitude": 46.2287025,
    "longitude": 15.5190353
  },
  {
    "id": 4286,
    "name": "Ig Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "37",
    "iso2": "037",
    "latitude": 45.9588868,
    "longitude": 14.5270528
  },
  {
    "id": 4287,
    "name": "Kranj City Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "52",
    "iso2": "052",
    "latitude": 46.2585021,
    "longitude": 14.3543569
  },
  {
    "id": 4288,
    "name": "Puconci Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "97",
    "iso2": "097",
    "latitude": 46.7200418,
    "longitude": 16.0997792
  },
  {
    "id": 4289,
    "name": "Šmarješke Toplice Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "P3",
    "iso2": "206",
    "latitude": 45.8680377,
    "longitude": 15.2347422
  },
  {
    "id": 4290,
    "name": "Dornava Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "24",
    "iso2": "024",
    "latitude": 46.4443513,
    "longitude": 15.9889159
  },
  {
    "id": 4291,
    "name": "Črnomelj Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "17",
    "iso2": "017",
    "latitude": 45.5361225,
    "longitude": 15.1944143
  },
  {
    "id": 4292,
    "name": "Radenci Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "A1",
    "iso2": "100",
    "latitude": 46.6231121,
    "longitude": 16.0506903
  },
  {
    "id": 4293,
    "name": "Gorenja Vas–Poljane Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "27",
    "iso2": "027",
    "latitude": 46.1116582,
    "longitude": 14.1149348
  },
  {
    "id": 4294,
    "name": "Ljubno Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "62",
    "iso2": "062",
    "latitude": 46.3443125,
    "longitude": 14.8335492
  },
  {
    "id": 4295,
    "name": "Dobje Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "G2",
    "iso2": "154",
    "latitude": 46.1370037,
    "longitude": 15.394129
  },
  {
    "id": 4296,
    "name": "Šmartno ob Paki Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "C6",
    "iso2": "125",
    "latitude": 46.3290372,
    "longitude": 15.0333937
  },
  {
    "id": 4297,
    "name": "Mokronog–Trebelno Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "C6",
    "iso2": "199",
    "latitude": 45.9088529,
    "longitude": 15.1596736
  },
  {
    "id": 4298,
    "name": "Mirna Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "C6",
    "iso2": "212",
    "latitude": 45.9515647,
    "longitude": 15.0620977
  },
  {
    "id": 4299,
    "name": "Šenčur Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "B2",
    "iso2": "117",
    "latitude": 46.2433699,
    "longitude": 14.4192223
  },
  {
    "id": 4300,
    "name": "Videm Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "N2",
    "iso2": "135",
    "latitude": 46.363833,
    "longitude": 15.8781212
  },
  {
    "id": 4301,
    "name": "Beltinci Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "02",
    "iso2": "002",
    "latitude": 46.6079153,
    "longitude": 16.2365127
  },
  {
    "id": 4302,
    "name": "Lukovica Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "68",
    "iso2": "068",
    "latitude": 46.1696293,
    "longitude": 14.6907259
  },
  {
    "id": 4303,
    "name": "Preddvor Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "K5",
    "iso2": "095",
    "latitude": 46.3017139,
    "longitude": 14.4218165
  },
  {
    "id": 4304,
    "name": "Destrnik Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "G1",
    "iso2": "018",
    "latitude": 46.4922368,
    "longitude": 15.8777956
  },
  {
    "id": 4305,
    "name": "Ivančna Gorica Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "39",
    "iso2": "039",
    "latitude": 45.9395841,
    "longitude": 14.8047626
  },
  {
    "id": 4306,
    "name": "Log–Dragomer Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "39",
    "iso2": "208",
    "latitude": 46.0178747,
    "longitude": 14.3687767
  },
  {
    "id": 4307,
    "name": "Žužemberk Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "N8",
    "iso2": "193",
    "latitude": 45.820035,
    "longitude": 14.9535919
  },
  {
    "id": 4308,
    "name": "Dobrova–Polhov Gradec Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "G4",
    "iso2": "021",
    "latitude": 46.0648896,
    "longitude": 14.3168195
  },
  {
    "id": 4309,
    "name": "Municipality of Cirkulane",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "G4",
    "iso2": "196",
    "latitude": 46.3298322,
    "longitude": 15.9980666
  },
  {
    "id": 4310,
    "name": "Cerklje na Gorenjskem Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "12",
    "iso2": "012",
    "latitude": 46.2517054,
    "longitude": 14.4857979
  },
  {
    "id": 4311,
    "name": "Šentrupert Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "P2",
    "iso2": "211",
    "latitude": 45.9873142,
    "longitude": 15.0829783
  },
  {
    "id": 4312,
    "name": "Tišina Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "M6",
    "iso2": "010",
    "latitude": 46.6541884,
    "longitude": 16.0754781
  },
  {
    "id": 4313,
    "name": "Murska Sobota City Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "80",
    "iso2": "080",
    "latitude": 46.6432147,
    "longitude": 16.1515754
  },
  {
    "id": 4314,
    "name": "Municipality of Krško",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "54",
    "iso2": "054",
    "latitude": 45.9589609,
    "longitude": 15.4923555
  },
  {
    "id": 4315,
    "name": "Komen Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "49",
    "iso2": "049",
    "latitude": 45.8175235,
    "longitude": 13.7482711
  },
  {
    "id": 4316,
    "name": "Škofja Loka Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "B9",
    "iso2": "122",
    "latitude": 46.1409844,
    "longitude": 14.2811873
  },
  {
    "id": 4317,
    "name": "Šempeter–Vrtojba Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "L6",
    "iso2": "183",
    "latitude": 45.9290095,
    "longitude": 13.6415594
  },
  {
    "id": 4318,
    "name": "Municipality of Apače",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "N9",
    "iso2": "195",
    "latitude": 46.6974679,
    "longitude": 15.9102534
  },
  {
    "id": 4319,
    "name": "Koper City Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "50",
    "iso2": "050",
    "latitude": 45.548059,
    "longitude": 13.7301877
  },
  {
    "id": 4320,
    "name": "Odranci Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "86",
    "iso2": "086",
    "latitude": 46.5901017,
    "longitude": 16.2788165
  },
  {
    "id": 4321,
    "name": "Hrpelje–Kozina Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "35",
    "iso2": "035",
    "latitude": 45.6091192,
    "longitude": 13.9379148
  },
  {
    "id": 4322,
    "name": "Izola Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "40",
    "iso2": "040",
    "latitude": 45.5313557,
    "longitude": 13.6664649
  },
  {
    "id": 4323,
    "name": "Metlika Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "73",
    "iso2": "073",
    "latitude": 45.6480715,
    "longitude": 15.3177838
  },
  {
    "id": 4324,
    "name": "Šentilj Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "B3",
    "iso2": "118",
    "latitude": 46.6862839,
    "longitude": 15.7103567
  },
  {
    "id": 4325,
    "name": "Kobilje Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "47",
    "iso2": "047",
    "latitude": 46.68518,
    "longitude": 16.3936719
  },
  {
    "id": 4326,
    "name": "Ankaran Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "P9",
    "iso2": "213",
    "latitude": 45.578451,
    "longitude": 13.7369174
  },
  {
    "id": 4327,
    "name": "Hodoš Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "H2",
    "iso2": "161",
    "latitude": 46.8314134,
    "longitude": 16.321068
  },
  {
    "id": 4328,
    "name": "Sveti Jurij v Slovenskih Goricah Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "D1",
    "iso2": "210",
    "latitude": 46.6170791,
    "longitude": 15.7804677
  },
  {
    "id": 4329,
    "name": "Nazarje Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "83",
    "iso2": "083",
    "latitude": 46.2821741,
    "longitude": 14.9225629
  },
  {
    "id": 4330,
    "name": "Postojna Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "94",
    "iso2": "094",
    "latitude": 45.774939,
    "longitude": 14.2134263
  },
  {
    "id": 4331,
    "name": "Kostel Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "H9",
    "iso2": "165",
    "latitude": 45.4928255,
    "longitude": 14.8708235
  },
  {
    "id": 4332,
    "name": "Slovenska Bistrica Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "L8",
    "iso2": "113",
    "latitude": 46.3919813,
    "longitude": 15.5727869
  },
  {
    "id": 4333,
    "name": "Straža Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "P5",
    "iso2": "203",
    "latitude": 45.7768428,
    "longitude": 15.0948694
  },
  {
    "id": 4334,
    "name": "Trzin Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "M8",
    "iso2": "186",
    "latitude": 46.1298241,
    "longitude": 14.5577637
  },
  {
    "id": 4335,
    "name": "Kočevje Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "H7",
    "iso2": "048",
    "latitude": 45.6428,
    "longitude": 14.8615838
  },
  {
    "id": 4336,
    "name": "Grosuplje Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "32",
    "iso2": "032",
    "latitude": 45.9557645,
    "longitude": 14.658899
  },
  {
    "id": 4337,
    "name": "Jesenice Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "H4",
    "iso2": "041",
    "latitude": 46.4367047,
    "longitude": 14.0526057
  },
  {
    "id": 4338,
    "name": "Laško Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "57",
    "iso2": "057",
    "latitude": 46.1542236,
    "longitude": 15.2361491
  },
  {
    "id": 4339,
    "name": "Gornji Grad Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "30",
    "iso2": "030",
    "latitude": 46.2961712,
    "longitude": 14.8062347
  },
  {
    "id": 4340,
    "name": "Kranjska Gora Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "53",
    "iso2": "053",
    "latitude": 46.4845293,
    "longitude": 13.7857145
  },
  {
    "id": 4341,
    "name": "Hrastnik Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "34",
    "iso2": "034",
    "latitude": 46.1417288,
    "longitude": 15.0844894
  },
  {
    "id": 4342,
    "name": "Zreče Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "F3",
    "iso2": "144",
    "latitude": 46.4177786,
    "longitude": 15.3709431
  },
  {
    "id": 4343,
    "name": "Gornja Radgona Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "29",
    "iso2": "029",
    "latitude": 46.6767099,
    "longitude": 15.9910847
  },
  {
    "id": 4344,
    "name": "Municipality of Ilirska Bistrica",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "38",
    "iso2": "038",
    "latitude": 45.5791323,
    "longitude": 14.2809729
  },
  {
    "id": 4345,
    "name": "Dravograd Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "25",
    "iso2": "025",
    "latitude": 46.589219,
    "longitude": 15.0246021
  },
  {
    "id": 4346,
    "name": "Semič Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "B1",
    "iso2": "109",
    "latitude": 45.6520534,
    "longitude": 15.1820701
  },
  {
    "id": 4347,
    "name": "Litija Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "I5",
    "iso2": "060",
    "latitude": 46.0573226,
    "longitude": 14.8309636
  },
  {
    "id": 4348,
    "name": "Mengeš Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "72",
    "iso2": "072",
    "latitude": 46.1659122,
    "longitude": 14.5719694
  },
  {
    "id": 4349,
    "name": "Medvode Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "71",
    "iso2": "071",
    "latitude": 46.141908,
    "longitude": 14.4032596
  },
  {
    "id": 4350,
    "name": "Logatec Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "64",
    "iso2": "064",
    "latitude": 45.917611,
    "longitude": 14.2351451
  },
  {
    "id": 4351,
    "name": "Ljutomer Municipality",
    "countryId": 201,
    "countryCode": "SI",
    "fipsCode": "I6",
    "iso2": "063",
    "latitude": 46.5190848,
    "longitude": 16.1893216
  },
  {
    "id": 4352,
    "name": "Banská Bystrica Region",
    "countryId": 200,
    "countryCode": "SK",
    "fipsCode": "01",
    "iso2": "BC",
    "latitude": 48.5312499,
    "longitude": 19.382874
  },
  {
    "id": 4353,
    "name": "Košice Region",
    "countryId": 200,
    "countryCode": "SK",
    "fipsCode": "03",
    "iso2": "KI",
    "latitude": 48.6375737,
    "longitude": 21.0834225
  },
  {
    "id": 4354,
    "name": "Prešov Region",
    "countryId": 200,
    "countryCode": "SK",
    "fipsCode": "05",
    "iso2": "PV",
    "latitude": 49.1716773,
    "longitude": 21.3742001
  },
  {
    "id": 4355,
    "name": "Trnava Region",
    "countryId": 200,
    "countryCode": "SK",
    "fipsCode": "07",
    "iso2": "TA",
    "latitude": 48.3943898,
    "longitude": 17.7216205
  },
  {
    "id": 4356,
    "name": "Bratislava Region",
    "countryId": 200,
    "countryCode": "SK",
    "fipsCode": "02",
    "iso2": "BL",
    "latitude": 48.3118304,
    "longitude": 17.1973299
  },
  {
    "id": 4357,
    "name": "Nitra Region",
    "countryId": 200,
    "countryCode": "SK",
    "fipsCode": "04",
    "iso2": "NI",
    "latitude": 48.0143765,
    "longitude": 18.5416504
  },
  {
    "id": 4358,
    "name": "Trenčín Region",
    "countryId": 200,
    "countryCode": "SK",
    "fipsCode": "06",
    "iso2": "TC",
    "latitude": 48.8086758,
    "longitude": 18.2324026
  },
  {
    "id": 4359,
    "name": "Žilina Region",
    "countryId": 200,
    "countryCode": "SK",
    "fipsCode": "08",
    "iso2": "ZI",
    "latitude": 49.2031435,
    "longitude": 19.3645733
  },
  {
    "id": 4360,
    "name": "Cimișlia District",
    "countryId": 144,
    "countryCode": "MD",
    "fipsCode": "68",
    "iso2": "CM",
    "latitude": 46.5250851,
    "longitude": 28.7721835
  },
  {
    "id": 4361,
    "name": "Orhei District",
    "countryId": 144,
    "countryCode": "MD",
    "fipsCode": "82",
    "iso2": "OR",
    "latitude": 47.38604,
    "longitude": 28.8303082
  },
  {
    "id": 4362,
    "name": "Bender Municipality",
    "countryId": 144,
    "countryCode": "MD",
    "fipsCode": "62",
    "iso2": "BD",
    "latitude": 46.8227551,
    "longitude": 29.4620101
  },
  {
    "id": 4363,
    "name": "Nisporeni District",
    "countryId": 144,
    "countryCode": "MD",
    "fipsCode": "80",
    "iso2": "NI",
    "latitude": 47.0751349,
    "longitude": 28.1768155
  },
  {
    "id": 4364,
    "name": "Sîngerei District",
    "countryId": 144,
    "countryCode": "MD",
    "fipsCode": "85",
    "iso2": "SI",
    "latitude": 47.6389134,
    "longitude": 28.1371816
  },
  {
    "id": 4365,
    "name": "Căușeni District",
    "countryId": 144,
    "countryCode": "MD",
    "fipsCode": "67",
    "iso2": "CS",
    "latitude": 46.6554715,
    "longitude": 29.4091222
  },
  {
    "id": 4366,
    "name": "Călărași District",
    "countryId": 144,
    "countryCode": "MD",
    "fipsCode": "66",
    "iso2": "CL",
    "latitude": 47.286946,
    "longitude": 28.274531
  },
  {
    "id": 4367,
    "name": "Glodeni District",
    "countryId": 144,
    "countryCode": "MD",
    "fipsCode": "76",
    "iso2": "GL",
    "latitude": 47.7790156,
    "longitude": 27.516801
  },
  {
    "id": 4368,
    "name": "Anenii Noi District",
    "countryId": 144,
    "countryCode": "MD",
    "fipsCode": "59",
    "iso2": "AN",
    "latitude": 46.8795663,
    "longitude": 29.2312175
  },
  {
    "id": 4369,
    "name": "Ialoveni District",
    "countryId": 144,
    "countryCode": "MD",
    "fipsCode": "78",
    "iso2": "IA",
    "latitude": 46.863086,
    "longitude": 28.8234218
  },
  {
    "id": 4370,
    "name": "Florești District",
    "countryId": 144,
    "countryCode": "MD",
    "fipsCode": "75",
    "iso2": "FL",
    "latitude": 47.8667849,
    "longitude": 28.3391864
  },
  {
    "id": 4371,
    "name": "Telenești District",
    "countryId": 144,
    "countryCode": "MD",
    "fipsCode": "91",
    "iso2": "TE",
    "latitude": 47.4983962,
    "longitude": 28.3676019
  },
  {
    "id": 4372,
    "name": "Taraclia District",
    "countryId": 144,
    "countryCode": "MD",
    "fipsCode": "90",
    "iso2": "TA",
    "latitude": 45.898651,
    "longitude": 28.6671644
  },
  {
    "id": 4373,
    "name": "Chișinău Municipality",
    "countryId": 144,
    "countryCode": "MD",
    "fipsCode": "57",
    "iso2": "CU",
    "latitude": 47.0104529,
    "longitude": 28.8638102
  },
  {
    "id": 4374,
    "name": "Soroca District",
    "countryId": 144,
    "countryCode": "MD",
    "fipsCode": "87",
    "iso2": "SO",
    "latitude": 48.1549743,
    "longitude": 28.2870783
  },
  {
    "id": 4375,
    "name": "Briceni District",
    "countryId": 144,
    "countryCode": "MD",
    "fipsCode": "63",
    "iso2": "BR",
    "latitude": 48.3632022,
    "longitude": 27.0750398
  },
  {
    "id": 4376,
    "name": "Rîșcani District",
    "countryId": 144,
    "countryCode": "MD",
    "fipsCode": "84",
    "iso2": "RI",
    "latitude": 47.9070153,
    "longitude": 27.5374996
  },
  {
    "id": 4377,
    "name": "Strășeni District",
    "countryId": 144,
    "countryCode": "MD",
    "fipsCode": "89",
    "iso2": "ST",
    "latitude": 47.1450267,
    "longitude": 28.6136736
  },
  {
    "id": 4378,
    "name": "Ștefan Vodă District",
    "countryId": 144,
    "countryCode": "MD",
    "fipsCode": "88",
    "iso2": "SV",
    "latitude": 46.5540488,
    "longitude": 29.702242
  },
  {
    "id": 4379,
    "name": "Basarabeasca District",
    "countryId": 144,
    "countryCode": "MD",
    "fipsCode": "61",
    "iso2": "BS",
    "latitude": 46.423706,
    "longitude": 28.8935492
  },
  {
    "id": 4380,
    "name": "Cantemir District",
    "countryId": 144,
    "countryCode": "MD",
    "fipsCode": "65",
    "iso2": "CT",
    "latitude": 46.2771742,
    "longitude": 28.2009653
  },
  {
    "id": 4381,
    "name": "Fălești District",
    "countryId": 144,
    "countryCode": "MD",
    "fipsCode": "74",
    "iso2": "FA",
    "latitude": 47.5647725,
    "longitude": 27.7265593
  },
  {
    "id": 4382,
    "name": "Hîncești District",
    "countryId": 144,
    "countryCode": "MD",
    "fipsCode": "77",
    "iso2": "HI",
    "latitude": 46.8281147,
    "longitude": 28.5850889
  },
  {
    "id": 4383,
    "name": "Dubăsari District",
    "countryId": 144,
    "countryCode": "MD",
    "fipsCode": "72",
    "iso2": "DU",
    "latitude": 47.2643942,
    "longitude": 29.1550348
  },
  {
    "id": 4384,
    "name": "Dondușeni District",
    "countryId": 144,
    "countryCode": "MD",
    "fipsCode": "70",
    "iso2": "DO",
    "latitude": 48.2338305,
    "longitude": 27.5998087
  },
  {
    "id": 4385,
    "name": "Gagauzia",
    "countryId": 144,
    "countryCode": "MD",
    "fipsCode": "51",
    "iso2": "GA",
    "latitude": 46.0979435,
    "longitude": 28.6384645
  },
  {
    "id": 4386,
    "name": "Ungheni District",
    "countryId": 144,
    "countryCode": "MD",
    "fipsCode": "92",
    "iso2": "UN",
    "latitude": 47.2305767,
    "longitude": 27.7892661
  },
  {
    "id": 4387,
    "name": "Edineț District",
    "countryId": 144,
    "countryCode": "MD",
    "fipsCode": "73",
    "iso2": "ED",
    "latitude": 48.1678991,
    "longitude": 27.2936143
  },
  {
    "id": 4388,
    "name": "Șoldănești District",
    "countryId": 144,
    "countryCode": "MD",
    "fipsCode": "86",
    "iso2": "SD",
    "latitude": 47.8147389,
    "longitude": 28.7889586
  },
  {
    "id": 4389,
    "name": "Ocnița District",
    "countryId": 144,
    "countryCode": "MD",
    "fipsCode": "81",
    "iso2": "OC",
    "latitude": 48.4110435,
    "longitude": 27.4768092
  },
  {
    "id": 4390,
    "name": "Criuleni District",
    "countryId": 144,
    "countryCode": "MD",
    "fipsCode": "69",
    "iso2": "CR",
    "latitude": 47.2136114,
    "longitude": 29.1557519
  },
  {
    "id": 4391,
    "name": "Cahul District",
    "countryId": 144,
    "countryCode": "MD",
    "fipsCode": "64",
    "iso2": "CA",
    "latitude": 45.8939404,
    "longitude": 28.1890275
  },
  {
    "id": 4392,
    "name": "Drochia District",
    "countryId": 144,
    "countryCode": "MD",
    "fipsCode": "71",
    "iso2": "DR",
    "latitude": 48.0797788,
    "longitude": 27.8604114
  },
  {
    "id": 4393,
    "name": "Bălți Municipality",
    "countryId": 144,
    "countryCode": "MD",
    "fipsCode": "60",
    "iso2": "BA",
    "latitude": 47.7539947,
    "longitude": 27.9184148
  },
  {
    "id": 4394,
    "name": "Rezina District",
    "countryId": 144,
    "countryCode": "MD",
    "fipsCode": "83",
    "iso2": "RE",
    "latitude": 47.7180447,
    "longitude": 28.8871024
  },
  {
    "id": 4395,
    "name": "Transnistria autonomous territorial unit",
    "countryId": 144,
    "countryCode": "MD",
    "fipsCode": "58",
    "iso2": "SN",
    "latitude": 47.2152972,
    "longitude": 29.4638054
  },
  {
    "id": 4396,
    "name": "Salacgrīva Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "C1",
    "iso2": "086",
    "latitude": 57.7580883,
    "longitude": 24.3543181
  },
  {
    "id": 4397,
    "name": "Vecumnieki Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "E4",
    "iso2": "105",
    "latitude": 56.6062337,
    "longitude": 24.5221891
  },
  {
    "id": 4398,
    "name": "Naukšēni Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "97",
    "iso2": "064",
    "latitude": 57.9295361,
    "longitude": 25.5119266
  },
  {
    "id": 4399,
    "name": "Ilūkste Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "69",
    "iso2": "036",
    "latitude": 55.9782547,
    "longitude": 26.2965088
  },
  {
    "id": 4400,
    "name": "Gulbene Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "09",
    "iso2": "033",
    "latitude": 57.2155645,
    "longitude": 26.6452955
  },
  {
    "id": 4401,
    "name": "Līvāni Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "90",
    "iso2": "056",
    "latitude": 56.3550942,
    "longitude": 26.172519
  },
  {
    "id": 4402,
    "name": "Salaspils Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "C3",
    "iso2": "087",
    "latitude": 56.8608152,
    "longitude": 24.3497881
  },
  {
    "id": 4403,
    "name": "Ventspils Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "33",
    "iso2": "106",
    "latitude": 57.2833682,
    "longitude": 21.8587558
  },
  {
    "id": 4404,
    "name": "Rundāle Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "B9",
    "iso2": "083",
    "latitude": 56.409721,
    "longitude": 24.0124139
  },
  {
    "id": 4405,
    "name": "Pļaviņas Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "A6",
    "iso2": "072",
    "latitude": 56.6177313,
    "longitude": 25.7194043
  },
  {
    "id": 4406,
    "name": "Vārkava Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "E2",
    "iso2": "103",
    "latitude": 56.2465744,
    "longitude": 26.5664371
  },
  {
    "id": 4407,
    "name": "Jaunpiebalga Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "72",
    "iso2": "039",
    "latitude": 57.1433471,
    "longitude": 25.9951888
  },
  {
    "id": 4408,
    "name": "Sēja Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "29",
    "iso2": "090",
    "latitude": 57.2006995,
    "longitude": 24.5922821
  },
  {
    "id": 4409,
    "name": "Tukums Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "29",
    "iso2": "099",
    "latitude": 56.9672868,
    "longitude": 23.1524379
  },
  {
    "id": 4410,
    "name": "Cibla Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "56",
    "iso2": "023",
    "latitude": 56.6102344,
    "longitude": 27.8696598
  },
  {
    "id": 4411,
    "name": "Burtnieki Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "52",
    "iso2": "019",
    "latitude": 57.6949004,
    "longitude": 25.2764777
  },
  {
    "id": 4412,
    "name": "Ķegums Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "79",
    "iso2": "051",
    "latitude": 56.7475357,
    "longitude": 24.7173645
  },
  {
    "id": 4413,
    "name": "Krustpils Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "85",
    "iso2": "049",
    "latitude": 56.5415578,
    "longitude": 26.2446397
  },
  {
    "id": 4414,
    "name": "Cesvaine Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "55",
    "iso2": "021",
    "latitude": 56.9679264,
    "longitude": 26.3083172
  },
  {
    "id": 4415,
    "name": "Skrīveri Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "C8",
    "iso2": "092",
    "latitude": 56.6761391,
    "longitude": 25.0978849
  },
  {
    "id": 4416,
    "name": "Ogre Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "21",
    "iso2": "067",
    "latitude": 56.8147355,
    "longitude": 24.6044555
  },
  {
    "id": 4417,
    "name": "Olaine Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "A2",
    "iso2": "068",
    "latitude": 56.7952353,
    "longitude": 24.0153589
  },
  {
    "id": 4418,
    "name": "Limbaži Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "18",
    "iso2": "054",
    "latitude": 57.5403227,
    "longitude": 24.7134451
  },
  {
    "id": 4419,
    "name": "Lubāna Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "91",
    "iso2": "057",
    "latitude": 56.8999269,
    "longitude": 26.7198789
  },
  {
    "id": 4420,
    "name": "Kandava Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "77",
    "iso2": "043",
    "latitude": 57.0340673,
    "longitude": 22.7801813
  },
  {
    "id": 4421,
    "name": "Ventspils",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "32",
    "iso2": "VEN",
    "latitude": 57.3937216,
    "longitude": 21.5647066
  },
  {
    "id": 4422,
    "name": "Krimulda Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "84",
    "iso2": "048",
    "latitude": 57.1791273,
    "longitude": 24.7140127
  },
  {
    "id": 4423,
    "name": "Rugāji Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "B7",
    "iso2": "082",
    "latitude": 57.0056023,
    "longitude": 27.1317203
  },
  {
    "id": 4424,
    "name": "Jelgava Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "12",
    "iso2": "041",
    "latitude": 56.5895689,
    "longitude": 23.6610481
  },
  {
    "id": 4425,
    "name": "Valka Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "30",
    "iso2": "101",
    "latitude": 57.77439,
    "longitude": 26.017005
  },
  {
    "id": 4426,
    "name": "Rūjiena Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "B8",
    "iso2": "084",
    "latitude": 57.8937291,
    "longitude": 25.3391008
  },
  {
    "id": 4427,
    "name": "Babīte Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "45",
    "iso2": "012",
    "latitude": 56.954155,
    "longitude": 23.945399
  },
  {
    "id": 4428,
    "name": "Dundaga Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "60",
    "iso2": "027",
    "latitude": 57.5049167,
    "longitude": 22.3505114
  },
  {
    "id": 4429,
    "name": "Priekule Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "A8",
    "iso2": "074",
    "latitude": 56.4179413,
    "longitude": 21.5503336
  },
  {
    "id": 4430,
    "name": "Zilupe Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "E9",
    "iso2": "110",
    "latitude": 56.3018985,
    "longitude": 28.133959
  },
  {
    "id": 4431,
    "name": "Varakļāni Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "E1",
    "iso2": "102",
    "latitude": 56.6688006,
    "longitude": 26.5636414
  },
  {
    "id": 4432,
    "name": "Nereta Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "98",
    "iso2": "065",
    "latitude": 56.1986655,
    "longitude": 25.3252969
  },
  {
    "id": 4433,
    "name": "Madona Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "20",
    "iso2": "059",
    "latitude": 56.8598923,
    "longitude": 26.2276201
  },
  {
    "id": 4434,
    "name": "Sala Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "20",
    "iso2": "085",
    "latitude": 59.9679613,
    "longitude": 16.4978217
  },
  {
    "id": 4435,
    "name": "Ķekava Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "80",
    "iso2": "052",
    "latitude": 56.8064351,
    "longitude": 24.1939493
  },
  {
    "id": 4436,
    "name": "Nīca Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "99",
    "iso2": "066",
    "latitude": 56.3464983,
    "longitude": 21.065493
  },
  {
    "id": 4437,
    "name": "Dobele Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "08",
    "iso2": "026",
    "latitude": 56.626305,
    "longitude": 23.2809066
  },
  {
    "id": 4438,
    "name": "Jēkabpils Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "10",
    "iso2": "042",
    "latitude": 56.291932,
    "longitude": 25.9812017
  },
  {
    "id": 4439,
    "name": "Saldus Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "27",
    "iso2": "088",
    "latitude": 56.6665088,
    "longitude": 22.4935493
  },
  {
    "id": 4440,
    "name": "Roja Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "B4",
    "iso2": "079",
    "latitude": 57.5046713,
    "longitude": 22.8012164
  },
  {
    "id": 4441,
    "name": "Iecava Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "67",
    "iso2": "034",
    "latitude": 56.5986793,
    "longitude": 24.1996272
  },
  {
    "id": 4442,
    "name": "Ozolnieki Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "A3",
    "iso2": "069",
    "latitude": 56.6756305,
    "longitude": 23.8994816
  },
  {
    "id": 4443,
    "name": "Saulkrasti Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "C5",
    "iso2": "089",
    "latitude": 57.2579418,
    "longitude": 24.4183146
  },
  {
    "id": 4444,
    "name": "Ērgļi Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "63",
    "iso2": "030",
    "latitude": 56.9237065,
    "longitude": 25.6753852
  },
  {
    "id": 4445,
    "name": "Aglona Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "35",
    "iso2": "001",
    "latitude": 56.1089006,
    "longitude": 27.1286227
  },
  {
    "id": 4446,
    "name": "Jūrmala",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "13",
    "iso2": "JUR",
    "latitude": 56.947079,
    "longitude": 23.6168485
  },
  {
    "id": 4447,
    "name": "Skrunda Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "C9",
    "iso2": "093",
    "latitude": 56.6643458,
    "longitude": 22.0045729
  },
  {
    "id": 4448,
    "name": "Engure Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "62",
    "iso2": "029",
    "latitude": 57.16235,
    "longitude": 23.2196634
  },
  {
    "id": 4449,
    "name": "Inčukalns Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "70",
    "iso2": "037",
    "latitude": 57.0994342,
    "longitude": 24.685557
  },
  {
    "id": 4450,
    "name": "Mārupe Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "95",
    "iso2": "062",
    "latitude": 56.8965717,
    "longitude": 24.0460049
  },
  {
    "id": 4451,
    "name": "Mērsrags Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "95",
    "iso2": "063",
    "latitude": 57.3306881,
    "longitude": 23.1023707
  },
  {
    "id": 4452,
    "name": "Koknese Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "82",
    "iso2": "046",
    "latitude": 56.720556,
    "longitude": 25.4893909
  },
  {
    "id": 4453,
    "name": "Kārsava Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "78",
    "iso2": "044",
    "latitude": 56.7645842,
    "longitude": 27.7358295
  },
  {
    "id": 4454,
    "name": "Carnikava Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "53",
    "iso2": "020",
    "latitude": 57.1024121,
    "longitude": 24.2108662
  },
  {
    "id": 4455,
    "name": "Rēzekne Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "53",
    "iso2": "077",
    "latitude": 56.3273638,
    "longitude": 27.3284331
  },
  {
    "id": 4456,
    "name": "Viesīte Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "E6",
    "iso2": "107",
    "latitude": 56.3113085,
    "longitude": 25.5070464
  },
  {
    "id": 4457,
    "name": "Ape Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "43",
    "iso2": "009",
    "latitude": 57.5392697,
    "longitude": 26.6941649
  },
  {
    "id": 4458,
    "name": "Durbe Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "61",
    "iso2": "028",
    "latitude": 56.6279857,
    "longitude": 21.4916245
  },
  {
    "id": 4459,
    "name": "Talsi Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "28",
    "iso2": "097",
    "latitude": 57.3415208,
    "longitude": 22.5713125
  },
  {
    "id": 4460,
    "name": "Liepāja",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "16",
    "iso2": "LPX",
    "latitude": 56.5046678,
    "longitude": 21.010806
  },
  {
    "id": 4461,
    "name": "Mālpils Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "94",
    "iso2": "061",
    "latitude": 57.0084119,
    "longitude": 24.9574278
  },
  {
    "id": 4462,
    "name": "Smiltene Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "D1",
    "iso2": "094",
    "latitude": 57.4230332,
    "longitude": 25.900278
  },
  {
    "id": 4463,
    "name": "Daugavpils",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "06",
    "iso2": "DGV",
    "latitude": 55.874736,
    "longitude": 26.536179
  },
  {
    "id": 4464,
    "name": "Jēkabpils",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "74",
    "iso2": "JKB",
    "latitude": 56.501455,
    "longitude": 25.878299
  },
  {
    "id": 4465,
    "name": "Bauska Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "04",
    "iso2": "016",
    "latitude": 56.4101868,
    "longitude": 24.2000689
  },
  {
    "id": 4466,
    "name": "Vecpiebalga Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "E3",
    "iso2": "104",
    "latitude": 57.0603356,
    "longitude": 25.8161592
  },
  {
    "id": 4467,
    "name": "Pāvilosta Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "A5",
    "iso2": "071",
    "latitude": 56.8865424,
    "longitude": 21.1946849
  },
  {
    "id": 4468,
    "name": "Brocēni Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "51",
    "iso2": "018",
    "latitude": 56.7347541,
    "longitude": 22.6357371
  },
  {
    "id": 4469,
    "name": "Cēsis Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "05",
    "iso2": "022",
    "latitude": 57.3102897,
    "longitude": 25.2676125
  },
  {
    "id": 4470,
    "name": "Grobiņa Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "65",
    "iso2": "032",
    "latitude": 56.539632,
    "longitude": 21.166892
  },
  {
    "id": 4471,
    "name": "Beverīna Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "50",
    "iso2": "017",
    "latitude": 57.5197109,
    "longitude": 25.6073654
  },
  {
    "id": 4472,
    "name": "Aizkraukle Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "01",
    "iso2": "002",
    "latitude": 56.646108,
    "longitude": 25.2370854
  },
  {
    "id": 4473,
    "name": "Valmiera",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "31",
    "iso2": "VMR",
    "latitude": 57.5384659,
    "longitude": 25.4263618
  },
  {
    "id": 4474,
    "name": "Krāslava Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "14",
    "iso2": "047",
    "latitude": 55.8951464,
    "longitude": 27.1814577
  },
  {
    "id": 4475,
    "name": "Jaunjelgava Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "71",
    "iso2": "038",
    "latitude": 56.5283659,
    "longitude": 25.3921443
  },
  {
    "id": 4476,
    "name": "Sigulda Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "C7",
    "iso2": "091",
    "latitude": 57.1055092,
    "longitude": 24.8314259
  },
  {
    "id": 4477,
    "name": "Viļaka Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "E7",
    "iso2": "108",
    "latitude": 57.1722263,
    "longitude": 27.6673188
  },
  {
    "id": 4478,
    "name": "Stopiņi Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "D2",
    "iso2": "095",
    "latitude": 56.936449,
    "longitude": 24.2872949
  },
  {
    "id": 4479,
    "name": "Rauna Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "B1",
    "iso2": "076",
    "latitude": 57.331693,
    "longitude": 25.6100339
  },
  {
    "id": 4480,
    "name": "Tērvete Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "D5",
    "iso2": "098",
    "latitude": 56.4119201,
    "longitude": 23.3188332
  },
  {
    "id": 4481,
    "name": "Auce Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "44",
    "iso2": "010",
    "latitude": 56.460168,
    "longitude": 22.9054781
  },
  {
    "id": 4482,
    "name": "Baldone Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "46",
    "iso2": "013",
    "latitude": 56.74246,
    "longitude": 24.3911544
  },
  {
    "id": 4483,
    "name": "Preiļi Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "22",
    "iso2": "073",
    "latitude": 56.1511157,
    "longitude": 26.7439767
  },
  {
    "id": 4484,
    "name": "Aloja Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "39",
    "iso2": "005",
    "latitude": 57.767136,
    "longitude": 24.8770839
  },
  {
    "id": 4485,
    "name": "Alsunga Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "40",
    "iso2": "006",
    "latitude": 56.9828531,
    "longitude": 21.5555919
  },
  {
    "id": 4486,
    "name": "Viļāni Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "E8",
    "iso2": "109",
    "latitude": 56.5456171,
    "longitude": 26.9167927
  },
  {
    "id": 4487,
    "name": "Alūksne Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "02",
    "iso2": "007",
    "latitude": 57.4254485,
    "longitude": 27.0424968
  },
  {
    "id": 4488,
    "name": "Līgatne Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "88",
    "iso2": "055",
    "latitude": 57.1944204,
    "longitude": 25.0940681
  },
  {
    "id": 4489,
    "name": "Jaunpils Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "73",
    "iso2": "040",
    "latitude": 56.7314194,
    "longitude": 23.0125616
  },
  {
    "id": 4490,
    "name": "Kuldīga Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "15",
    "iso2": "050",
    "latitude": 56.9687257,
    "longitude": 21.9613739
  },
  {
    "id": 4491,
    "name": "Riga",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "25",
    "iso2": "RIX",
    "latitude": 56.9496487,
    "longitude": 24.1051865
  },
  {
    "id": 4492,
    "name": "Daugavpils Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "07",
    "iso2": "025",
    "latitude": 55.8991783,
    "longitude": 26.6102012
  },
  {
    "id": 4493,
    "name": "Ropaži Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "B5",
    "iso2": "080",
    "latitude": 56.9615786,
    "longitude": 24.6010476
  },
  {
    "id": 4494,
    "name": "Strenči Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "D3",
    "iso2": "096",
    "latitude": 57.6225471,
    "longitude": 25.8048086
  },
  {
    "id": 4495,
    "name": "Kocēni Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "81",
    "iso2": "045",
    "latitude": 57.5226292,
    "longitude": 25.3349507
  },
  {
    "id": 4496,
    "name": "Aizpute Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "37",
    "iso2": "003",
    "latitude": 56.7182596,
    "longitude": 21.6072759
  },
  {
    "id": 4497,
    "name": "Amata Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "42",
    "iso2": "008",
    "latitude": 56.9938726,
    "longitude": 25.2627675
  },
  {
    "id": 4498,
    "name": "Baltinava Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "47",
    "iso2": "014",
    "latitude": 56.9458468,
    "longitude": 27.6441066
  },
  {
    "id": 4499,
    "name": "Aknīste Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "38",
    "iso2": "004",
    "latitude": 56.1613037,
    "longitude": 25.7484827
  },
  {
    "id": 4500,
    "name": "Jelgava",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "11",
    "iso2": "JEL",
    "latitude": 56.6511091,
    "longitude": 23.7213541
  },
  {
    "id": 4501,
    "name": "Ludza Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "19",
    "iso2": "058",
    "latitude": 56.545959,
    "longitude": 27.7143199
  },
  {
    "id": 4502,
    "name": "Riebiņi Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "B3",
    "iso2": "078",
    "latitude": 56.343619,
    "longitude": 26.8018138
  },
  {
    "id": 4503,
    "name": "Rucava Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "B6",
    "iso2": "081",
    "latitude": 56.1593124,
    "longitude": 21.1618121
  },
  {
    "id": 4504,
    "name": "Dagda Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "57",
    "iso2": "024",
    "latitude": 56.0956089,
    "longitude": 27.532459
  },
  {
    "id": 4505,
    "name": "Balvi Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "03",
    "iso2": "015",
    "latitude": 57.132624,
    "longitude": 27.2646685
  },
  {
    "id": 4506,
    "name": "Priekuļi Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "A9",
    "iso2": "075",
    "latitude": 57.3617138,
    "longitude": 25.4410423
  },
  {
    "id": 4507,
    "name": "Pārgauja Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "A4",
    "iso2": "070",
    "latitude": 57.3648122,
    "longitude": 24.9822045
  },
  {
    "id": 4508,
    "name": "Vaiņode Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "D7",
    "iso2": "100",
    "latitude": 56.4154271,
    "longitude": 21.8513984
  },
  {
    "id": 4509,
    "name": "Rēzekne",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "23",
    "iso2": "REZ",
    "latitude": 56.5099223,
    "longitude": 27.3331357
  },
  {
    "id": 4510,
    "name": "Garkalne Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "64",
    "iso2": "031",
    "latitude": 57.0190387,
    "longitude": 24.3826181
  },
  {
    "id": 4511,
    "name": "Ikšķile Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "68",
    "iso2": "035",
    "latitude": 56.8373667,
    "longitude": 24.4974745
  },
  {
    "id": 4512,
    "name": "Lielvārde Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "87",
    "iso2": "053",
    "latitude": 56.7392976,
    "longitude": 24.9711618
  },
  {
    "id": 4513,
    "name": "Mazsalaca Municipality",
    "countryId": 120,
    "countryCode": "LV",
    "fipsCode": "96",
    "iso2": "060",
    "latitude": 57.9267749,
    "longitude": 25.0669895
  },
  {
    "id": 4514,
    "name": "Viqueque Municipality",
    "countryId": 63,
    "countryCode": "TL",
    "fipsCode": "VI",
    "iso2": "VI",
    "latitude": -8.8597918,
    "longitude": 126.3633516
  },
  {
    "id": 4515,
    "name": "Liquiçá Municipality",
    "countryId": 63,
    "countryCode": "TL",
    "fipsCode": "LI",
    "iso2": "LI",
    "latitude": -8.6674095,
    "longitude": 125.2587964
  },
  {
    "id": 4516,
    "name": "Ermera District",
    "countryId": 63,
    "countryCode": "TL",
    "fipsCode": "ER",
    "iso2": "ER",
    "latitude": -8.7524802,
    "longitude": 125.3987294
  },
  {
    "id": 4517,
    "name": "Manatuto District",
    "countryId": 63,
    "countryCode": "TL",
    "fipsCode": "MT",
    "iso2": "MT",
    "latitude": -8.5155608,
    "longitude": 126.0159255
  },
  {
    "id": 4518,
    "name": "Ainaro Municipality",
    "countryId": 63,
    "countryCode": "TL",
    "fipsCode": "AN",
    "iso2": "AN",
    "latitude": -9.0113171,
    "longitude": 125.5220012
  },
  {
    "id": 4519,
    "name": "Manufahi Municipality",
    "countryId": 63,
    "countryCode": "TL",
    "fipsCode": "MF",
    "iso2": "MF",
    "latitude": -9.0145495,
    "longitude": 125.8279959
  },
  {
    "id": 4520,
    "name": "Aileu municipality",
    "countryId": 63,
    "countryCode": "TL",
    "fipsCode": "AL",
    "iso2": "AL",
    "latitude": -8.7043994,
    "longitude": 125.6095474
  },
  {
    "id": 4521,
    "name": "Baucau Municipality",
    "countryId": 63,
    "countryCode": "TL",
    "fipsCode": "BA",
    "iso2": "BA",
    "latitude": -8.4714308,
    "longitude": 126.4575991
  },
  {
    "id": 4522,
    "name": "Cova Lima Municipality",
    "countryId": 63,
    "countryCode": "TL",
    "fipsCode": "CO",
    "iso2": "CO",
    "latitude": -9.2650375,
    "longitude": 125.2587964
  },
  {
    "id": 4523,
    "name": "Lautém Municipality",
    "countryId": 63,
    "countryCode": "TL",
    "fipsCode": "LA",
    "iso2": "LA",
    "latitude": -8.3642307,
    "longitude": 126.9043845
  },
  {
    "id": 4524,
    "name": "Dili municipality",
    "countryId": 63,
    "countryCode": "TL",
    "fipsCode": "DI",
    "iso2": "DI",
    "latitude": -8.2449613,
    "longitude": 125.5876697
  },
  {
    "id": 4525,
    "name": "Bobonaro Municipality",
    "countryId": 63,
    "countryCode": "TL",
    "fipsCode": "BO",
    "iso2": "BO",
    "latitude": -8.9655406,
    "longitude": 125.2587964
  },
  {
    "id": 4526,
    "name": "Peleliu",
    "countryId": 168,
    "countryCode": "PW",
    "fipsCode": "15",
    "iso2": "350",
    "latitude": 7.0022906,
    "longitude": 134.2431628
  },
  {
    "id": 4527,
    "name": "Ngardmau",
    "countryId": 168,
    "countryCode": "PW",
    "fipsCode": "10",
    "iso2": "222",
    "latitude": 7.5850486,
    "longitude": 134.5596089
  },
  {
    "id": 4528,
    "name": "Airai",
    "countryId": 168,
    "countryCode": "PW",
    "fipsCode": "02",
    "iso2": "004",
    "latitude": 7.3966118,
    "longitude": 134.5690225
  },
  {
    "id": 4529,
    "name": "Hatohobei",
    "countryId": 168,
    "countryCode": "PW",
    "fipsCode": "04",
    "iso2": "050",
    "latitude": 3.0070658,
    "longitude": 131.1237781
  },
  {
    "id": 4530,
    "name": "Melekeok",
    "countryId": 168,
    "countryCode": "PW",
    "fipsCode": "07",
    "iso2": "212",
    "latitude": 7.5150286,
    "longitude": 134.5972518
  },
  {
    "id": 4531,
    "name": "Ngatpang",
    "countryId": 168,
    "countryCode": "PW",
    "fipsCode": "11",
    "iso2": "224",
    "latitude": 7.4710994,
    "longitude": 134.5266466
  },
  {
    "id": 4532,
    "name": "Koror",
    "countryId": 168,
    "countryCode": "PW",
    "fipsCode": "06",
    "iso2": "150",
    "latitude": 7.3375646,
    "longitude": 134.4889469
  },
  {
    "id": 4533,
    "name": "Ngarchelong",
    "countryId": 168,
    "countryCode": "PW",
    "fipsCode": "09",
    "iso2": "218",
    "latitude": 7.7105469,
    "longitude": 134.6301646
  },
  {
    "id": 4534,
    "name": "Ngiwal",
    "countryId": 168,
    "countryCode": "PW",
    "fipsCode": "14",
    "iso2": "228",
    "latitude": 7.5614764,
    "longitude": 134.6160619
  },
  {
    "id": 4535,
    "name": "Sonsorol",
    "countryId": 168,
    "countryCode": "PW",
    "fipsCode": "16",
    "iso2": "370",
    "latitude": 5.3268119,
    "longitude": 132.2239117
  },
  {
    "id": 4536,
    "name": "Ngchesar",
    "countryId": 168,
    "countryCode": "PW",
    "fipsCode": "12",
    "iso2": "226",
    "latitude": 7.452328,
    "longitude": 134.5784342
  },
  {
    "id": 4537,
    "name": "Ngaraard",
    "countryId": 168,
    "countryCode": "PW",
    "fipsCode": "08",
    "iso2": "214",
    "latitude": 7.60794,
    "longitude": 134.6348645
  },
  {
    "id": 4538,
    "name": "Angaur",
    "countryId": 168,
    "countryCode": "PW",
    "fipsCode": "03",
    "iso2": "010",
    "latitude": 6.909223,
    "longitude": 134.1387934
  },
  {
    "id": 4539,
    "name": "Kayangel",
    "countryId": 168,
    "countryCode": "PW",
    "fipsCode": "05",
    "iso2": "100",
    "latitude": 8.07,
    "longitude": 134.702778
  },
  {
    "id": 4540,
    "name": "Aimeliik",
    "countryId": 168,
    "countryCode": "PW",
    "fipsCode": "01",
    "iso2": "002",
    "latitude": 7.4455859,
    "longitude": 134.5030878
  },
  {
    "id": 4541,
    "name": "Ngeremlengui",
    "countryId": 168,
    "countryCode": "PW",
    "fipsCode": "13",
    "iso2": "227",
    "latitude": 7.5198397,
    "longitude": 134.5596089
  },
  {
    "id": 4542,
    "name": "Břeclav District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "13",
    "iso2": "644",
    "latitude": 48.75314,
    "longitude": 16.8825169
  },
  {
    "id": 4543,
    "name": "Český Krumlov District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "79",
    "iso2": "312",
    "latitude": 48.8127354,
    "longitude": 14.3174657
  },
  {
    "id": 4544,
    "name": "Plzeň-City District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "87",
    "iso2": "323",
    "latitude": 49.7384314,
    "longitude": 13.3736371
  },
  {
    "id": 4545,
    "name": "Brno-Country District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "87",
    "iso2": "643",
    "latitude": 49.1250138,
    "longitude": 16.4558824
  },
  {
    "id": 4546,
    "name": "Příbram District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "87",
    "iso2": "20B",
    "latitude": 49.6947959,
    "longitude": 14.082381
  },
  {
    "id": 4547,
    "name": "Pardubice District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "87",
    "iso2": "532",
    "latitude": 49.9444479,
    "longitude": 16.2856916
  },
  {
    "id": 4548,
    "name": "Nový Jičín District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "87",
    "iso2": "804",
    "latitude": 49.5943251,
    "longitude": 18.0135356
  },
  {
    "id": 4549,
    "name": "Prague 12",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "87",
    "iso2": "112",
    "latitude": 50.0039305,
    "longitude": 14.4171875
  },
  {
    "id": 4550,
    "name": "Náchod District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "87",
    "iso2": "523",
    "latitude": 50.4145722,
    "longitude": 16.1656347
  },
  {
    "id": 4551,
    "name": "Prostějov District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "87",
    "iso2": "713",
    "latitude": 49.4418401,
    "longitude": 17.1277904
  },
  {
    "id": 4552,
    "name": "Zlín Region",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "90",
    "iso2": "72",
    "latitude": 49.2162296,
    "longitude": 17.7720353
  },
  {
    "id": 4553,
    "name": "Chomutov District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "90",
    "iso2": "422",
    "latitude": 50.4583872,
    "longitude": 13.301791
  },
  {
    "id": 4554,
    "name": "Central Bohemian Region",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "88",
    "iso2": "20",
    "latitude": 49.8782223,
    "longitude": 14.9362955
  },
  {
    "id": 4555,
    "name": "Prague 13",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "88",
    "iso2": "113",
    "latitude": 50.053234,
    "longitude": 14.3096392
  },
  {
    "id": 4556,
    "name": "České Budějovice District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "88",
    "iso2": "311",
    "latitude": 48.9775553,
    "longitude": 14.5150747
  },
  {
    "id": 4557,
    "name": "Prague 5",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "88",
    "iso2": "105",
    "latitude": 50.0697589,
    "longitude": 14.3777983
  },
  {
    "id": 4558,
    "name": "Rakovník District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "88",
    "iso2": "20C",
    "latitude": 50.106123,
    "longitude": 13.7396623
  },
  {
    "id": 4559,
    "name": "Frýdek-Místek District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "88",
    "iso2": "802",
    "latitude": 49.6819305,
    "longitude": 18.3673216
  },
  {
    "id": 4560,
    "name": "Písek District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "88",
    "iso2": "314",
    "latitude": 49.3419938,
    "longitude": 14.246976
  },
  {
    "id": 4561,
    "name": "Hodonín District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "88",
    "iso2": "645",
    "latitude": 48.8529391,
    "longitude": 17.1260025
  },
  {
    "id": 4562,
    "name": "Prague 1",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "88",
    "iso2": "101",
    "latitude": 50.0887101,
    "longitude": 14.4155981
  },
  {
    "id": 4563,
    "name": "Zlín District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "90",
    "iso2": "724",
    "latitude": 49.1696052,
    "longitude": 17.802522
  },
  {
    "id": 4564,
    "name": "Plzeň-North District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "87",
    "iso2": "325",
    "latitude": 49.8774893,
    "longitude": 13.2537428
  },
  {
    "id": 4565,
    "name": "Tábor District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "87",
    "iso2": "317",
    "latitude": 49.3646293,
    "longitude": 14.7191293
  },
  {
    "id": 4566,
    "name": "Prague 9",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "87",
    "iso2": "109",
    "latitude": 50.111297,
    "longitude": 14.5025507
  },
  {
    "id": 4567,
    "name": "Prague 16",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "87",
    "iso2": "116",
    "latitude": 49.9831867,
    "longitude": 14.3617133
  },
  {
    "id": 4568,
    "name": "Brno-City District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "87",
    "iso2": "642",
    "latitude": 49.1950602,
    "longitude": 16.6068371
  },
  {
    "id": 4569,
    "name": "Prague 6",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "87",
    "iso2": "106",
    "latitude": 50.1005785,
    "longitude": 14.3954363
  },
  {
    "id": 4570,
    "name": "Prague 11",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "87",
    "iso2": "111",
    "latitude": 50.031167,
    "longitude": 14.5070817
  },
  {
    "id": 4571,
    "name": "Svitavy District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "87",
    "iso2": "533",
    "latitude": 49.7551629,
    "longitude": 16.4691861
  },
  {
    "id": 4572,
    "name": "Vsetín District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "87",
    "iso2": "723",
    "latitude": 49.379325,
    "longitude": 18.0618162
  },
  {
    "id": 4573,
    "name": "Cheb District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "87",
    "iso2": "411",
    "latitude": 50.0795334,
    "longitude": 12.3698636
  },
  {
    "id": 4574,
    "name": "Olomouc District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "84",
    "iso2": "712",
    "latitude": 49.593778,
    "longitude": 17.2508787
  },
  {
    "id": 4575,
    "name": "Vysočina Region",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "80",
    "iso2": "63",
    "latitude": 49.4490052,
    "longitude": 15.6405934
  },
  {
    "id": 4576,
    "name": "Ústí nad Labem Region",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "89",
    "iso2": "42",
    "latitude": 50.6119037,
    "longitude": 13.7870086
  },
  {
    "id": 4577,
    "name": "Horní Počernice",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "89",
    "iso2": "120",
    "latitude": 50.1127167,
    "longitude": 14.5976685
  },
  {
    "id": 4578,
    "name": "Prachatice District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "89",
    "iso2": "315",
    "latitude": 49.01091,
    "longitude": 14.0000005
  },
  {
    "id": 4579,
    "name": "Trutnov District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "89",
    "iso2": "525",
    "latitude": 50.5653838,
    "longitude": 15.9090923
  },
  {
    "id": 4580,
    "name": "Hradec Králové District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "82",
    "iso2": "521",
    "latitude": 50.2414805,
    "longitude": 15.6743
  },
  {
    "id": 4581,
    "name": "Karlovy Vary Region",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "81",
    "iso2": "41",
    "latitude": 50.1435,
    "longitude": 12.7501899
  },
  {
    "id": 4582,
    "name": "Nymburk District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "81",
    "iso2": "208",
    "latitude": 50.1855816,
    "longitude": 15.0436604
  },
  {
    "id": 4583,
    "name": "Rokycany District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "81",
    "iso2": "326",
    "latitude": 49.8262827,
    "longitude": 13.6874943
  },
  {
    "id": 4584,
    "name": "Ostrava-City District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "81",
    "iso2": "806",
    "latitude": 49.8209226,
    "longitude": 18.2625243
  },
  {
    "id": 4585,
    "name": "Prague 14",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "81",
    "iso2": "114",
    "latitude": 50.1060036,
    "longitude": 14.5571837
  },
  {
    "id": 4586,
    "name": "Karviná District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "81",
    "iso2": "803",
    "latitude": 49.8566524,
    "longitude": 18.5432186
  },
  {
    "id": 4587,
    "name": "Prague 4",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "81",
    "iso2": "104",
    "latitude": 50.0433092,
    "longitude": 14.4388741
  },
  {
    "id": 4588,
    "name": "Pardubice Region",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "86",
    "iso2": "53",
    "latitude": 49.9444479,
    "longitude": 16.2856916
  },
  {
    "id": 4589,
    "name": "Olomouc Region",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "84",
    "iso2": "71",
    "latitude": 49.6586549,
    "longitude": 17.0811406
  },
  {
    "id": 4590,
    "name": "Liberec District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "83",
    "iso2": "513",
    "latitude": 50.7564101,
    "longitude": 14.9965041
  },
  {
    "id": 4591,
    "name": "Klatovy District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "83",
    "iso2": "322",
    "latitude": 49.3955549,
    "longitude": 13.2950937
  },
  {
    "id": 4592,
    "name": "Uherské Hradiště District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "83",
    "iso2": "722",
    "latitude": 49.0597969,
    "longitude": 17.4958501
  },
  {
    "id": 4593,
    "name": "Kroměříž District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "83",
    "iso2": "721",
    "latitude": 49.2916582,
    "longitude": 17.39938
  },
  {
    "id": 4594,
    "name": "Prague 8",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "83",
    "iso2": "108",
    "latitude": 50.1176575,
    "longitude": 14.4670668
  },
  {
    "id": 4595,
    "name": "Sokolov District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "83",
    "iso2": "413",
    "latitude": 50.2013434,
    "longitude": 12.6054636
  },
  {
    "id": 4596,
    "name": "Semily District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "83",
    "iso2": "514",
    "latitude": 50.6051576,
    "longitude": 15.3281409
  },
  {
    "id": 4597,
    "name": "Třebíč District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "83",
    "iso2": "634",
    "latitude": 49.2147869,
    "longitude": 15.8795516
  },
  {
    "id": 4598,
    "name": "Prague",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "52",
    "iso2": "10",
    "latitude": 50.0755381,
    "longitude": 14.4378005
  },
  {
    "id": 4599,
    "name": "Ústí nad Labem District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "52",
    "iso2": "427",
    "latitude": 50.6119037,
    "longitude": 13.7870086
  },
  {
    "id": 4600,
    "name": "Moravian-Silesian Region",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "85",
    "iso2": "80",
    "latitude": 49.7305327,
    "longitude": 18.2332637
  },
  {
    "id": 4601,
    "name": "Liberec Region",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "83",
    "iso2": "51",
    "latitude": 50.659424,
    "longitude": 14.7632424
  },
  {
    "id": 4602,
    "name": "South Moravian Region",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "78",
    "iso2": "64",
    "latitude": 48.9544528,
    "longitude": 16.7676899
  },
  {
    "id": 4603,
    "name": "Prague 10",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "78",
    "iso2": "110",
    "latitude": 50.0717466,
    "longitude": 14.4871656
  },
  {
    "id": 4604,
    "name": "Karlovy Vary District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "78",
    "iso2": "412",
    "latitude": 50.1435,
    "longitude": 12.7501899
  },
  {
    "id": 4605,
    "name": "Litoměřice District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "78",
    "iso2": "423",
    "latitude": 50.5384197,
    "longitude": 14.1305458
  },
  {
    "id": 4606,
    "name": "Prague-East District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "78",
    "iso2": "209",
    "latitude": 49.9389307,
    "longitude": 14.7924472
  },
  {
    "id": 4607,
    "name": "Plzeň Region",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "87",
    "iso2": "32",
    "latitude": 49.4134812,
    "longitude": 13.3157246
  },
  {
    "id": 4608,
    "name": "Plzeň-South District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "87",
    "iso2": "324",
    "latitude": 49.5904885,
    "longitude": 13.5715861
  },
  {
    "id": 4609,
    "name": "Děčín District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "87",
    "iso2": "421",
    "latitude": 50.7725563,
    "longitude": 14.2127612
  },
  {
    "id": 4610,
    "name": "Prague 7",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "87",
    "iso2": "107",
    "latitude": 50.102049,
    "longitude": 14.4329519
  },
  {
    "id": 4611,
    "name": "Havlíčkův Brod District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "87",
    "iso2": "631",
    "latitude": 49.6043364,
    "longitude": 15.5796552
  },
  {
    "id": 4612,
    "name": "Jablonec nad Nisou District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "87",
    "iso2": "512",
    "latitude": 50.7220528,
    "longitude": 15.1703135
  },
  {
    "id": 4613,
    "name": "Jihlava District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "87",
    "iso2": "632",
    "latitude": 49.3983782,
    "longitude": 15.5870415
  },
  {
    "id": 4614,
    "name": "Hradec Králové Region",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "82",
    "iso2": "52",
    "latitude": 50.3512484,
    "longitude": 15.7976459
  },
  {
    "id": 4615,
    "name": "Blansko District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "82",
    "iso2": "641",
    "latitude": 49.3648502,
    "longitude": 16.6477552
  },
  {
    "id": 4616,
    "name": "Prague 2",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "82",
    "iso2": "102",
    "latitude": 50.0744958,
    "longitude": 14.4355247
  },
  {
    "id": 4617,
    "name": "Louny District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "82",
    "iso2": "424",
    "latitude": 50.3539812,
    "longitude": 13.8033551
  },
  {
    "id": 4618,
    "name": "Kolín District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "82",
    "iso2": "204",
    "latitude": 49.9883293,
    "longitude": 15.0551977
  },
  {
    "id": 4619,
    "name": "Prague-West District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "82",
    "iso2": "20A",
    "latitude": 49.8935235,
    "longitude": 14.3293779
  },
  {
    "id": 4620,
    "name": "Beroun District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "82",
    "iso2": "202",
    "latitude": 49.9573428,
    "longitude": 13.9840715
  },
  {
    "id": 4621,
    "name": "Teplice District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "82",
    "iso2": "426",
    "latitude": 50.6584605,
    "longitude": 13.7513227
  },
  {
    "id": 4622,
    "name": "Vyškov District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "82",
    "iso2": "646",
    "latitude": 49.2127445,
    "longitude": 16.9855927
  },
  {
    "id": 4623,
    "name": "Opava District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "82",
    "iso2": "805",
    "latitude": 49.9083757,
    "longitude": 17.916338
  },
  {
    "id": 4624,
    "name": "Jindřichův Hradec District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "82",
    "iso2": "313",
    "latitude": 49.1444823,
    "longitude": 15.0061389
  },
  {
    "id": 4625,
    "name": "Jeseník District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "82",
    "iso2": "711",
    "latitude": 50.2246249,
    "longitude": 17.1980471
  },
  {
    "id": 4626,
    "name": "Přerov District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "82",
    "iso2": "714",
    "latitude": 49.4671356,
    "longitude": 17.5077332
  },
  {
    "id": 4627,
    "name": "Benešov District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "82",
    "iso2": "201",
    "latitude": 49.6900828,
    "longitude": 14.7764399
  },
  {
    "id": 4628,
    "name": "Strakonice District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "82",
    "iso2": "316",
    "latitude": 49.2604043,
    "longitude": 13.9103085
  },
  {
    "id": 4629,
    "name": "Most District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "82",
    "iso2": "425",
    "latitude": 37.1554083,
    "longitude": -94.2948884
  },
  {
    "id": 4630,
    "name": "Znojmo District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "82",
    "iso2": "647",
    "latitude": 48.9272327,
    "longitude": 16.1037808
  },
  {
    "id": 4631,
    "name": "Kladno District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "82",
    "iso2": "203",
    "latitude": 50.1940258,
    "longitude": 14.1043657
  },
  {
    "id": 4632,
    "name": "Prague 21",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "82",
    "iso2": "121",
    "latitude": 50.0745502,
    "longitude": 14.6691854
  },
  {
    "id": 4633,
    "name": "Česká Lípa District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "82",
    "iso2": "511",
    "latitude": 50.6785201,
    "longitude": 14.5396991
  },
  {
    "id": 4634,
    "name": "Chrudim District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "82",
    "iso2": "531",
    "latitude": 49.8830216,
    "longitude": 15.8290866
  },
  {
    "id": 4635,
    "name": "Prague 3",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "82",
    "iso2": "103",
    "latitude": 50.0843739,
    "longitude": 14.470725
  },
  {
    "id": 4636,
    "name": "Rychnov nad Kněžnou District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "82",
    "iso2": "524",
    "latitude": 50.1659651,
    "longitude": 16.2776842
  },
  {
    "id": 4637,
    "name": "Prague 15",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "82",
    "iso2": "115",
    "latitude": 50.0527083,
    "longitude": 14.5306647
  },
  {
    "id": 4638,
    "name": "Mělník District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "82",
    "iso2": "206",
    "latitude": 50.3104415,
    "longitude": 14.5179223
  },
  {
    "id": 4639,
    "name": "South Bohemian Region",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "79",
    "iso2": "31",
    "latitude": 48.9457789,
    "longitude": 14.4416055
  },
  {
    "id": 4640,
    "name": "Jičín District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "79",
    "iso2": "522",
    "latitude": 50.4353325,
    "longitude": 15.361044
  },
  {
    "id": 4641,
    "name": "Domažlice District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "79",
    "iso2": "321",
    "latitude": 49.4397027,
    "longitude": 12.9311435
  },
  {
    "id": 4642,
    "name": "Šumperk District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "79",
    "iso2": "715",
    "latitude": 49.9778407,
    "longitude": 16.9717754
  },
  {
    "id": 4643,
    "name": "Mladá Boleslav District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "79",
    "iso2": "207",
    "latitude": 50.4252317,
    "longitude": 14.9362477
  },
  {
    "id": 4644,
    "name": "Bruntál District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "79",
    "iso2": "801",
    "latitude": 49.9881767,
    "longitude": 17.4636941
  },
  {
    "id": 4645,
    "name": "Pelhřimov District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "79",
    "iso2": "633",
    "latitude": 49.4306207,
    "longitude": 15.222983
  },
  {
    "id": 4646,
    "name": "Tachov District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "79",
    "iso2": "327",
    "latitude": 49.7987803,
    "longitude": 12.6361921
  },
  {
    "id": 4647,
    "name": "Ústí nad Orlicí District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "79",
    "iso2": "534",
    "latitude": 49.9721801,
    "longitude": 16.3996617
  },
  {
    "id": 4648,
    "name": "Žďár nad Sázavou District",
    "countryId": 58,
    "countryCode": "CZ",
    "fipsCode": "79",
    "iso2": "635",
    "latitude": 49.5643012,
    "longitude": 15.939103
  },
  {
    "id": 4649,
    "name": "North East Community Development Council",
    "countryId": 199,
    "countryCode": "SG",
    "fipsCode": "79",
    "iso2": "02",
    "latitude": 45.0118113,
    "longitude": -93.2468107
  },
  {
    "id": 4650,
    "name": "South East Community Development Council",
    "countryId": 199,
    "countryCode": "SG",
    "fipsCode": "79",
    "iso2": "04",
    "latitude": 39.286307,
    "longitude": -76.5691237
  },
  {
    "id": 4651,
    "name": "Central Singapore Community Development Council",
    "countryId": 199,
    "countryCode": "SG",
    "fipsCode": "79",
    "iso2": "01",
    "latitude": 1.289514,
    "longitude": 103.8143879
  },
  {
    "id": 4652,
    "name": "South West Community Development Council",
    "countryId": 199,
    "countryCode": "SG",
    "fipsCode": "79",
    "iso2": "05",
    "latitude": 39.925691,
    "longitude": -75.231058
  },
  {
    "id": 4653,
    "name": "North West Community Development Council",
    "countryId": 199,
    "countryCode": "SG",
    "fipsCode": "79",
    "iso2": "03",
    "latitude": 39.107093,
    "longitude": -94.457336
  },
  {
    "id": 4654,
    "name": "Ewa District",
    "countryId": 153,
    "countryCode": "NR",
    "fipsCode": "09",
    "iso2": "09",
    "latitude": -0.5087241,
    "longitude": 166.9369384
  },
  {
    "id": 4655,
    "name": "Uaboe District",
    "countryId": 153,
    "countryCode": "NR",
    "fipsCode": "13",
    "iso2": "13",
    "latitude": -0.5202222,
    "longitude": 166.9311761
  },
  {
    "id": 4656,
    "name": "Aiwo District",
    "countryId": 153,
    "countryCode": "NR",
    "fipsCode": "01",
    "iso2": "01",
    "latitude": -0.5340012,
    "longitude": 166.9138873
  },
  {
    "id": 4657,
    "name": "Meneng District",
    "countryId": 153,
    "countryCode": "NR",
    "fipsCode": "11",
    "iso2": "11",
    "latitude": -0.546724,
    "longitude": 166.938379
  },
  {
    "id": 4658,
    "name": "Anabar District",
    "countryId": 153,
    "countryCode": "NR",
    "fipsCode": "02",
    "iso2": "02",
    "latitude": -0.5133517,
    "longitude": 166.9484624
  },
  {
    "id": 4659,
    "name": "Nibok District",
    "countryId": 153,
    "countryCode": "NR",
    "fipsCode": "12",
    "iso2": "12",
    "latitude": -0.5196208,
    "longitude": 166.9189301
  },
  {
    "id": 4660,
    "name": "Baiti District",
    "countryId": 153,
    "countryCode": "NR",
    "fipsCode": "05",
    "iso2": "05",
    "latitude": -0.510431,
    "longitude": 166.9275744
  },
  {
    "id": 4661,
    "name": "Ijuw District",
    "countryId": 153,
    "countryCode": "NR",
    "fipsCode": "10",
    "iso2": "10",
    "latitude": -0.5202767,
    "longitude": 166.9571046
  },
  {
    "id": 4662,
    "name": "Buada District",
    "countryId": 153,
    "countryCode": "NR",
    "fipsCode": "07",
    "iso2": "07",
    "latitude": -0.5328777,
    "longitude": 166.9268541
  },
  {
    "id": 4663,
    "name": "Anibare District",
    "countryId": 153,
    "countryCode": "NR",
    "fipsCode": "04",
    "iso2": "04",
    "latitude": -0.5294758,
    "longitude": 166.9513432
  },
  {
    "id": 4664,
    "name": "Yaren District",
    "countryId": 153,
    "countryCode": "NR",
    "fipsCode": "14",
    "iso2": "14",
    "latitude": -0.5466857,
    "longitude": 166.9210913
  },
  {
    "id": 4665,
    "name": "Boe District",
    "countryId": 153,
    "countryCode": "NR",
    "fipsCode": "06",
    "iso2": "06",
    "latitude": 39.0732776,
    "longitude": -94.5710498
  },
  {
    "id": 4666,
    "name": "Denigomodu District",
    "countryId": 153,
    "countryCode": "NR",
    "fipsCode": "08",
    "iso2": "08",
    "latitude": -0.5247964,
    "longitude": 166.9167689
  },
  {
    "id": 4667,
    "name": "Anetan District",
    "countryId": 153,
    "countryCode": "NR",
    "fipsCode": "03",
    "iso2": "03",
    "latitude": -0.5064343,
    "longitude": 166.9427006
  },
  {
    "id": 4668,
    "name": "Zhytomyr Oblast",
    "countryId": 230,
    "countryCode": "UA",
    "fipsCode": "27",
    "iso2": "18",
    "latitude": 50.25465,
    "longitude": 28.6586669
  },
  {
    "id": 4669,
    "name": "Vinnytsia Oblast",
    "countryId": 230,
    "countryCode": "UA",
    "fipsCode": "23",
    "iso2": "05",
    "latitude": 49.233083,
    "longitude": 28.4682169
  },
  {
    "id": 4670,
    "name": "Zakarpattia Oblast",
    "countryId": 230,
    "countryCode": "UA",
    "fipsCode": "25",
    "iso2": "21",
    "latitude": 48.6208,
    "longitude": 22.287883
  },
  {
    "id": 4671,
    "name": "Kyiv Oblast",
    "countryId": 230,
    "countryCode": "UA",
    "fipsCode": "13",
    "iso2": "32",
    "latitude": 50.0529506,
    "longitude": 30.7667134
  },
  {
    "id": 4672,
    "name": "Lviv Oblast",
    "countryId": 230,
    "countryCode": "UA",
    "fipsCode": "15",
    "iso2": "46",
    "latitude": 49.839683,
    "longitude": 24.029717
  },
  {
    "id": 4673,
    "name": "Luhansk Oblast",
    "countryId": 230,
    "countryCode": "UA",
    "fipsCode": "14",
    "iso2": "09",
    "latitude": 48.574041,
    "longitude": 39.307815
  },
  {
    "id": 4674,
    "name": "Ternopil Oblast",
    "countryId": 230,
    "countryCode": "UA",
    "fipsCode": "22",
    "iso2": "61",
    "latitude": 49.553517,
    "longitude": 25.594767
  },
  {
    "id": 4675,
    "name": "Dnipropetrovsk Oblast",
    "countryId": 230,
    "countryCode": "UA",
    "fipsCode": "04",
    "iso2": "12",
    "latitude": 48.464717,
    "longitude": 35.046183
  },
  {
    "id": 4676,
    "name": "Kiev",
    "countryId": 230,
    "countryCode": "UA",
    "fipsCode": "12",
    "iso2": "30",
    "latitude": 50.4501,
    "longitude": 30.5234
  },
  {
    "id": 4677,
    "name": "Kirovohrad Oblast",
    "countryId": 230,
    "countryCode": "UA",
    "fipsCode": "10",
    "iso2": "35",
    "latitude": 48.507933,
    "longitude": 32.262317
  },
  {
    "id": 4678,
    "name": "Chernivtsi Oblast",
    "countryId": 230,
    "countryCode": "UA",
    "fipsCode": "03",
    "iso2": "77",
    "latitude": 48.291683,
    "longitude": 25.935217
  },
  {
    "id": 4679,
    "name": "Mykolaiv Oblast",
    "countryId": 230,
    "countryCode": "UA",
    "fipsCode": "16",
    "iso2": "48",
    "latitude": 46.975033,
    "longitude": 31.9945829
  },
  {
    "id": 4680,
    "name": "Cherkasy Oblast",
    "countryId": 230,
    "countryCode": "UA",
    "fipsCode": "01",
    "iso2": "71",
    "latitude": 49.444433,
    "longitude": 32.059767
  },
  {
    "id": 4681,
    "name": "Khmelnytsky Oblast",
    "countryId": 230,
    "countryCode": "UA",
    "fipsCode": "09",
    "iso2": "68",
    "latitude": 49.422983,
    "longitude": 26.9871331
  },
  {
    "id": 4682,
    "name": "Ivano-Frankivsk Oblast",
    "countryId": 230,
    "countryCode": "UA",
    "fipsCode": "06",
    "iso2": "26",
    "latitude": 48.922633,
    "longitude": 24.711117
  },
  {
    "id": 4683,
    "name": "Rivne Oblast",
    "countryId": 230,
    "countryCode": "UA",
    "fipsCode": "19",
    "iso2": "56",
    "latitude": 50.6199,
    "longitude": 26.251617
  },
  {
    "id": 4684,
    "name": "Kherson Oblast",
    "countryId": 230,
    "countryCode": "UA",
    "fipsCode": "08",
    "iso2": "65",
    "latitude": 46.635417,
    "longitude": 32.616867
  },
  {
    "id": 4685,
    "name": "Sumy Oblast",
    "countryId": 230,
    "countryCode": "UA",
    "fipsCode": "21",
    "iso2": "59",
    "latitude": 50.9077,
    "longitude": 34.7981
  },
  {
    "id": 4686,
    "name": "Kharkiv Oblast",
    "countryId": 230,
    "countryCode": "UA",
    "fipsCode": "07",
    "iso2": "63",
    "latitude": 49.9935,
    "longitude": 36.230383
  },
  {
    "id": 4687,
    "name": "Zaporizhzhya Oblast",
    "countryId": 230,
    "countryCode": "UA",
    "fipsCode": "26",
    "iso2": "23",
    "latitude": 47.8388,
    "longitude": 35.139567
  },
  {
    "id": 4688,
    "name": "Odessa Oblast",
    "countryId": 230,
    "countryCode": "UA",
    "fipsCode": "17",
    "iso2": "51",
    "latitude": 46.484583,
    "longitude": 30.7326
  },
  {
    "id": 4689,
    "name": "Autonomous Republic of Crimea",
    "countryId": 230,
    "countryCode": "UA",
    "fipsCode": "11",
    "iso2": "43",
    "latitude": 44.952117,
    "longitude": 34.102417
  },
  {
    "id": 4690,
    "name": "Volyn Oblast",
    "countryId": 230,
    "countryCode": "UA",
    "fipsCode": "24",
    "iso2": "07",
    "latitude": 50.747233,
    "longitude": 25.325383
  },
  {
    "id": 4691,
    "name": "Donetsk Oblast",
    "countryId": 230,
    "countryCode": "UA",
    "fipsCode": "05",
    "iso2": "14",
    "latitude": 48.015883,
    "longitude": 37.80285
  },
  {
    "id": 4692,
    "name": "Chernihiv Oblast",
    "countryId": 230,
    "countryCode": "UA",
    "fipsCode": "02",
    "iso2": "74",
    "latitude": 51.4982,
    "longitude": 31.2893499
  },
  {
    "id": 4693,
    "name": "Gabrovo Province",
    "countryId": 34,
    "countryCode": "BG",
    "fipsCode": "41",
    "iso2": "07",
    "latitude": 42.86847,
    "longitude": 25.316889
  },
  {
    "id": 4694,
    "name": "Smolyan Province",
    "countryId": 34,
    "countryCode": "BG",
    "fipsCode": "57",
    "iso2": "21",
    "latitude": 41.5774148,
    "longitude": 24.7010871
  },
  {
    "id": 4695,
    "name": "Pernik Province",
    "countryId": 34,
    "countryCode": "BG",
    "fipsCode": "49",
    "iso2": "14",
    "latitude": 42.605199,
    "longitude": 23.0377916
  },
  {
    "id": 4696,
    "name": "Montana Province",
    "countryId": 34,
    "countryCode": "BG",
    "fipsCode": "47",
    "iso2": "12",
    "latitude": 43.4085148,
    "longitude": 23.2257589
  },
  {
    "id": 4697,
    "name": "Vidin Province",
    "countryId": 34,
    "countryCode": "BG",
    "fipsCode": "63",
    "iso2": "05",
    "latitude": 43.9961739,
    "longitude": 22.8679515
  },
  {
    "id": 4698,
    "name": "Razgrad Province",
    "countryId": 34,
    "countryCode": "BG",
    "fipsCode": "52",
    "iso2": "17",
    "latitude": 43.5271705,
    "longitude": 26.5241228
  },
  {
    "id": 4699,
    "name": "Blagoevgrad Province",
    "countryId": 34,
    "countryCode": "BG",
    "fipsCode": "38",
    "iso2": "01",
    "latitude": 42.0208614,
    "longitude": 23.0943356
  },
  {
    "id": 4700,
    "name": "Sliven Province",
    "countryId": 34,
    "countryCode": "BG",
    "fipsCode": "56",
    "iso2": "20",
    "latitude": 42.6816702,
    "longitude": 26.3228569
  },
  {
    "id": 4701,
    "name": "Plovdiv Province",
    "countryId": 34,
    "countryCode": "BG",
    "fipsCode": "51",
    "iso2": "16",
    "latitude": 42.1354079,
    "longitude": 24.7452904
  },
  {
    "id": 4702,
    "name": "Kardzhali Province",
    "countryId": 34,
    "countryCode": "BG",
    "fipsCode": "44",
    "iso2": "09",
    "latitude": 41.6338416,
    "longitude": 25.3776687
  },
  {
    "id": 4703,
    "name": "Kyustendil Province",
    "countryId": 34,
    "countryCode": "BG",
    "fipsCode": "45",
    "iso2": "10",
    "latitude": 42.2868799,
    "longitude": 22.6939635
  },
  {
    "id": 4704,
    "name": "Haskovo Province",
    "countryId": 34,
    "countryCode": "BG",
    "fipsCode": "43",
    "iso2": "26",
    "latitude": 41.9344178,
    "longitude": 25.5554672
  },
  {
    "id": 4705,
    "name": "Sofia City Province",
    "countryId": 34,
    "countryCode": "BG",
    "fipsCode": "42",
    "iso2": "22",
    "latitude": 42.7570109,
    "longitude": 23.4504683
  },
  {
    "id": 4706,
    "name": "Pleven Province",
    "countryId": 34,
    "countryCode": "BG",
    "fipsCode": "50",
    "iso2": "15",
    "latitude": 43.4170169,
    "longitude": 24.6066708
  },
  {
    "id": 4707,
    "name": "Stara Zagora Province",
    "countryId": 34,
    "countryCode": "BG",
    "fipsCode": "59",
    "iso2": "24",
    "latitude": 42.4257709,
    "longitude": 25.6344855
  },
  {
    "id": 4708,
    "name": "Silistra Province",
    "countryId": 34,
    "countryCode": "BG",
    "fipsCode": "55",
    "iso2": "19",
    "latitude": 44.1147101,
    "longitude": 27.2671454
  },
  {
    "id": 4709,
    "name": "Veliko Tarnovo Province",
    "countryId": 34,
    "countryCode": "BG",
    "fipsCode": "62",
    "iso2": "04",
    "latitude": 43.0756539,
    "longitude": 25.61715
  },
  {
    "id": 4710,
    "name": "Lovech Province",
    "countryId": 34,
    "countryCode": "BG",
    "fipsCode": "46",
    "iso2": "11",
    "latitude": 43.1367798,
    "longitude": 24.7139335
  },
  {
    "id": 4711,
    "name": "Vratsa Province",
    "countryId": 34,
    "countryCode": "BG",
    "fipsCode": "64",
    "iso2": "06",
    "latitude": 43.2101806,
    "longitude": 23.552921
  },
  {
    "id": 4712,
    "name": "Pazardzhik Province",
    "countryId": 34,
    "countryCode": "BG",
    "fipsCode": "48",
    "iso2": "13",
    "latitude": 42.1927567,
    "longitude": 24.3336226
  },
  {
    "id": 4713,
    "name": "Ruse Province",
    "countryId": 34,
    "countryCode": "BG",
    "fipsCode": "53",
    "iso2": "18",
    "latitude": 43.8355964,
    "longitude": 25.9656144
  },
  {
    "id": 4714,
    "name": "Targovishte Province",
    "countryId": 34,
    "countryCode": "BG",
    "fipsCode": "60",
    "iso2": "25",
    "latitude": 43.2462349,
    "longitude": 26.5691251
  },
  {
    "id": 4715,
    "name": "Burgas Province",
    "countryId": 34,
    "countryCode": "BG",
    "fipsCode": "39",
    "iso2": "02",
    "latitude": 42.5048,
    "longitude": 27.4626079
  },
  {
    "id": 4716,
    "name": "Yambol Province",
    "countryId": 34,
    "countryCode": "BG",
    "fipsCode": "65",
    "iso2": "28",
    "latitude": 42.4841494,
    "longitude": 26.5035296
  },
  {
    "id": 4717,
    "name": "Varna Province",
    "countryId": 34,
    "countryCode": "BG",
    "fipsCode": "61",
    "iso2": "03",
    "latitude": 43.2046477,
    "longitude": 27.9105488
  },
  {
    "id": 4718,
    "name": "Dobrich Province",
    "countryId": 34,
    "countryCode": "BG",
    "fipsCode": "40",
    "iso2": "08",
    "latitude": 43.572786,
    "longitude": 27.8272802
  },
  {
    "id": 4719,
    "name": "Sofia Province",
    "countryId": 34,
    "countryCode": "BG",
    "fipsCode": "58",
    "iso2": "23",
    "latitude": 42.67344,
    "longitude": 23.8334937
  },
  {
    "id": 4720,
    "name": "Suceava County",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "34",
    "iso2": "SV",
    "latitude": 47.5505548,
    "longitude": 25.741062
  },
  {
    "id": 4721,
    "name": "Hunedoara County",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "21",
    "iso2": "HD",
    "latitude": 45.793638,
    "longitude": 22.9975993
  },
  {
    "id": 4722,
    "name": "Arges",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "03",
    "iso2": "AG",
    "latitude": 45.0722527,
    "longitude": 24.8142726
  },
  {
    "id": 4723,
    "name": "Bihor County",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "05",
    "iso2": "BH",
    "latitude": 47.0157516,
    "longitude": 22.172266
  },
  {
    "id": 4724,
    "name": "Alba",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "01",
    "iso2": "AB",
    "latitude": 44.7009153,
    "longitude": 8.0356911
  },
  {
    "id": 4725,
    "name": "Ilfov County",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "43",
    "iso2": "IF",
    "latitude": 44.535548,
    "longitude": 26.2324886
  },
  {
    "id": 4726,
    "name": "Giurgiu County",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "42",
    "iso2": "GR",
    "latitude": 43.9037076,
    "longitude": 25.9699265
  },
  {
    "id": 4727,
    "name": "Tulcea County",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "37",
    "iso2": "TL",
    "latitude": 45.0450565,
    "longitude": 29.0324912
  },
  {
    "id": 4728,
    "name": "Teleorman County",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "35",
    "iso2": "TR",
    "latitude": 44.0160491,
    "longitude": 25.2986628
  },
  {
    "id": 4729,
    "name": "Prahova County",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "30",
    "iso2": "PH",
    "latitude": 45.0891906,
    "longitude": 26.0829313
  },
  {
    "id": 4730,
    "name": "Bucharest",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "10",
    "iso2": "B",
    "latitude": 44.4267674,
    "longitude": 26.1025384
  },
  {
    "id": 4731,
    "name": "Neamț County",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "28",
    "iso2": "NT",
    "latitude": 46.9758685,
    "longitude": 26.3818764
  },
  {
    "id": 4732,
    "name": "Călărași County",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "41",
    "iso2": "CL",
    "latitude": 44.3658715,
    "longitude": 26.7548607
  },
  {
    "id": 4733,
    "name": "Bistrița-Năsăud County",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "06",
    "iso2": "BN",
    "latitude": 47.2486107,
    "longitude": 24.5322814
  },
  {
    "id": 4734,
    "name": "Cluj County",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "13",
    "iso2": "CJ",
    "latitude": 46.7941797,
    "longitude": 23.6121492
  },
  {
    "id": 4735,
    "name": "Iași County",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "23",
    "iso2": "IS",
    "latitude": 47.2679653,
    "longitude": 27.2185662
  },
  {
    "id": 4736,
    "name": "Braila",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "08",
    "iso2": "BR",
    "latitude": 45.2652463,
    "longitude": 27.9594714
  },
  {
    "id": 4737,
    "name": "Constanța County",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "14",
    "iso2": "CT",
    "latitude": 44.212987,
    "longitude": 28.2550055
  },
  {
    "id": 4738,
    "name": "Olt County",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "29",
    "iso2": "OT",
    "latitude": 44.200797,
    "longitude": 24.5022981
  },
  {
    "id": 4739,
    "name": "Arad County",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "02",
    "iso2": "AR",
    "latitude": 46.2283651,
    "longitude": 21.6597819
  },
  {
    "id": 4740,
    "name": "Botoșani County",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "07",
    "iso2": "BT",
    "latitude": 47.8924042,
    "longitude": 26.7591781
  },
  {
    "id": 4741,
    "name": "Sălaj County",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "31",
    "iso2": "SJ",
    "latitude": 47.2090813,
    "longitude": 23.2121901
  },
  {
    "id": 4742,
    "name": "Dolj County",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "17",
    "iso2": "DJ",
    "latitude": 44.1623022,
    "longitude": 23.6325054
  },
  {
    "id": 4743,
    "name": "Ialomița County",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "22",
    "iso2": "IL",
    "latitude": 44.603133,
    "longitude": 27.3789914
  },
  {
    "id": 4744,
    "name": "Bacău County",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "04",
    "iso2": "BC",
    "latitude": 46.3258184,
    "longitude": 26.662378
  },
  {
    "id": 4745,
    "name": "Dâmbovița County",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "16",
    "iso2": "DB",
    "latitude": 44.9289893,
    "longitude": 25.425385
  },
  {
    "id": 4746,
    "name": "Satu Mare County",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "32",
    "iso2": "SM",
    "latitude": 47.7668905,
    "longitude": 22.9241377
  },
  {
    "id": 4747,
    "name": "Galați County",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "18",
    "iso2": "GL",
    "latitude": 45.7800569,
    "longitude": 27.8251576
  },
  {
    "id": 4748,
    "name": "Timiș County",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "36",
    "iso2": "TM",
    "latitude": 45.8138902,
    "longitude": 21.3331055
  },
  {
    "id": 4749,
    "name": "Harghita County",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "20",
    "iso2": "HR",
    "latitude": 46.4928507,
    "longitude": 25.6456696
  },
  {
    "id": 4750,
    "name": "Gorj County",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "19",
    "iso2": "GJ",
    "latitude": 44.9485595,
    "longitude": 23.2427079
  },
  {
    "id": 4751,
    "name": "Mehedinți County",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "26",
    "iso2": "MH",
    "latitude": 44.5515053,
    "longitude": 22.9044157
  },
  {
    "id": 4752,
    "name": "Vaslui County",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "38",
    "iso2": "VS",
    "latitude": 46.4631059,
    "longitude": 27.7398031
  },
  {
    "id": 4753,
    "name": "Caraș-Severin County",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "12",
    "iso2": "CS",
    "latitude": 45.1139646,
    "longitude": 22.0740993
  },
  {
    "id": 4754,
    "name": "Covasna County",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "15",
    "iso2": "CV",
    "latitude": 45.9426347,
    "longitude": 25.8918984
  },
  {
    "id": 4755,
    "name": "Sibiu County",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "33",
    "iso2": "SB",
    "latitude": 45.9269106,
    "longitude": 24.2254807
  },
  {
    "id": 4756,
    "name": "Buzău County",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "11",
    "iso2": "BZ",
    "latitude": 45.3350912,
    "longitude": 26.7107578
  },
  {
    "id": 4757,
    "name": "Vâlcea County",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "39",
    "iso2": "VL",
    "latitude": 45.0798051,
    "longitude": 24.0835283
  },
  {
    "id": 4758,
    "name": "Vrancea County",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "40",
    "iso2": "VN",
    "latitude": 45.8134876,
    "longitude": 27.0657531
  },
  {
    "id": 4759,
    "name": "Brașov County",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "09",
    "iso2": "BV",
    "latitude": 45.7781844,
    "longitude": 25.22258
  },
  {
    "id": 4760,
    "name": "Mureș County",
    "countryId": 181,
    "countryCode": "RO",
    "fipsCode": "25",
    "iso2": "MM",
    "latitude": 46.5569904,
    "longitude": 24.6723215
  },
  {
    "id": 4761,
    "name": "Aiga-i-le-Tai",
    "countryId": 191,
    "countryCode": "WS",
    "fipsCode": "02",
    "iso2": "AL",
    "latitude": -13.8513791,
    "longitude": -172.0325401
  },
  {
    "id": 4762,
    "name": "Satupa\"itea",
    "countryId": 191,
    "countryCode": "WS",
    "fipsCode": "09",
    "iso2": "SA",
    "latitude": -13.6538214,
    "longitude": -172.6159271
  },
  {
    "id": 4763,
    "name": "A\"ana",
    "countryId": 191,
    "countryCode": "WS",
    "fipsCode": "01",
    "iso2": "AA",
    "latitude": -13.898418,
    "longitude": -171.9752995
  },
  {
    "id": 4764,
    "name": "Fa\"asaleleaga",
    "countryId": 191,
    "countryCode": "WS",
    "fipsCode": "04",
    "iso2": "FA",
    "latitude": -13.6307638,
    "longitude": -172.2365981
  },
  {
    "id": 4765,
    "name": "Atua",
    "countryId": 191,
    "countryCode": "WS",
    "fipsCode": "03",
    "iso2": "AT",
    "latitude": -13.9787053,
    "longitude": -171.6254283
  },
  {
    "id": 4766,
    "name": "Vaisigano",
    "countryId": 191,
    "countryCode": "WS",
    "fipsCode": "11",
    "iso2": "VS",
    "latitude": -13.5413827,
    "longitude": -172.7023383
  },
  {
    "id": 4767,
    "name": "Palauli",
    "countryId": 191,
    "countryCode": "WS",
    "fipsCode": "08",
    "iso2": "PA",
    "latitude": -13.7294579,
    "longitude": -172.4536115
  },
  {
    "id": 4768,
    "name": "Va\"a-o-Fonoti",
    "countryId": 191,
    "countryCode": "WS",
    "fipsCode": "06",
    "iso2": "VF",
    "latitude": -13.9470903,
    "longitude": -171.5431872
  },
  {
    "id": 4769,
    "name": "Gaga\"emauga",
    "countryId": 191,
    "countryCode": "WS",
    "fipsCode": "05",
    "iso2": "GE",
    "latitude": -13.5428666,
    "longitude": -172.366887
  },
  {
    "id": 4770,
    "name": "Tuamasaga",
    "countryId": 191,
    "countryCode": "WS",
    "fipsCode": "10",
    "iso2": "TU",
    "latitude": -13.9163592,
    "longitude": -171.8224362
  },
  {
    "id": 4771,
    "name": "Gaga\"ifomauga",
    "countryId": 191,
    "countryCode": "WS",
    "fipsCode": "07",
    "iso2": "GI",
    "latitude": -13.5468007,
    "longitude": -172.4969331
  },
  {
    "id": 4772,
    "name": "Torba",
    "countryId": 237,
    "countryCode": "VU",
    "fipsCode": "07",
    "iso2": "TOB",
    "latitude": 37.07653,
    "longitude": 27.456573
  },
  {
    "id": 4773,
    "name": "Penama",
    "countryId": 237,
    "countryCode": "VU",
    "fipsCode": "17",
    "iso2": "PAM",
    "latitude": -15.3795758,
    "longitude": 167.9053182
  },
  {
    "id": 4774,
    "name": "Shefa",
    "countryId": 237,
    "countryCode": "VU",
    "fipsCode": "18",
    "iso2": "SEE",
    "latitude": 32.805765,
    "longitude": 35.169971
  },
  {
    "id": 4775,
    "name": "Malampa",
    "countryId": 237,
    "countryCode": "VU",
    "fipsCode": "16",
    "iso2": "MAP",
    "latitude": -16.4011405,
    "longitude": 167.6077865
  },
  {
    "id": 4776,
    "name": "Sanma",
    "countryId": 237,
    "countryCode": "VU",
    "fipsCode": "13",
    "iso2": "SAM",
    "latitude": -15.4840017,
    "longitude": 166.9182097
  },
  {
    "id": 4777,
    "name": "Tafea",
    "countryId": 237,
    "countryCode": "VU",
    "fipsCode": "15",
    "iso2": "TAE",
    "latitude": -18.7237827,
    "longitude": 169.0645056
  },
  {
    "id": 4778,
    "name": "Honiara",
    "countryId": 202,
    "countryCode": "SB",
    "fipsCode": "14",
    "iso2": "CT",
    "latitude": -9.4456381,
    "longitude": 159.9728999
  },
  {
    "id": 4779,
    "name": "Temotu Province",
    "countryId": 202,
    "countryCode": "SB",
    "fipsCode": "09",
    "iso2": "TE",
    "latitude": -10.686929,
    "longitude": 166.0623979
  },
  {
    "id": 4780,
    "name": "Isabel Province",
    "countryId": 202,
    "countryCode": "SB",
    "fipsCode": "07",
    "iso2": "IS",
    "latitude": -8.0592353,
    "longitude": 159.1447081
  },
  {
    "id": 4781,
    "name": "Choiseul Province",
    "countryId": 202,
    "countryCode": "SB",
    "fipsCode": "12",
    "iso2": "CH",
    "latitude": -7.0501494,
    "longitude": 156.9511459
  },
  {
    "id": 4782,
    "name": "Makira-Ulawa Province",
    "countryId": 202,
    "countryCode": "SB",
    "fipsCode": "08",
    "iso2": "MK",
    "latitude": -10.5737447,
    "longitude": 161.8096941
  },
  {
    "id": 4783,
    "name": "Malaita Province",
    "countryId": 202,
    "countryCode": "SB",
    "fipsCode": "03",
    "iso2": "ML",
    "latitude": -8.9446168,
    "longitude": 160.9071236
  },
  {
    "id": 4784,
    "name": "Central Province",
    "countryId": 202,
    "countryCode": "SB",
    "fipsCode": "10",
    "iso2": "CE",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 4785,
    "name": "Guadalcanal Province",
    "countryId": 202,
    "countryCode": "SB",
    "fipsCode": "06",
    "iso2": "GU",
    "latitude": -9.5773284,
    "longitude": 160.1455805
  },
  {
    "id": 4786,
    "name": "Western Province",
    "countryId": 202,
    "countryCode": "SB",
    "fipsCode": "11",
    "iso2": "WE",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 4787,
    "name": "Rennell and Bellona Province",
    "countryId": 202,
    "countryCode": "SB",
    "fipsCode": "13",
    "iso2": "RB",
    "latitude": -11.6131435,
    "longitude": 160.1693949
  },
  {
    "id": 4788,
    "name": "Burgundy",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "A1",
    "iso2": "D",
    "latitude": 47.0525047,
    "longitude": 4.3837215
  },
  {
    "id": 4789,
    "name": "Auvergne",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "98",
    "iso2": "C",
    "latitude": 45.7032695,
    "longitude": 3.3448536
  },
  {
    "id": 4790,
    "name": "Picardy",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "B6",
    "iso2": "S",
    "latitude": 49.6636127,
    "longitude": 2.5280732
  },
  {
    "id": 4791,
    "name": "Champagne-Ardenne",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "A4",
    "iso2": "G",
    "latitude": 48.7934092,
    "longitude": 4.4725249
  },
  {
    "id": 4792,
    "name": "Limousin",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "B1",
    "iso2": "L",
    "latitude": 45.8932231,
    "longitude": 1.5696018
  },
  {
    "id": 4793,
    "name": "Nord-Pas-de-Calais",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "B4",
    "iso2": "O",
    "latitude": 50.4801153,
    "longitude": 2.7937265
  },
  {
    "id": 4794,
    "name": "Saint Barthélemy",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "TB",
    "iso2": "BL",
    "latitude": 17.9005134,
    "longitude": -62.8205871
  },
  {
    "id": 4795,
    "name": "Nouvelle-Aquitaine",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "75",
    "iso2": "NAQ",
    "latitude": 45.7087182,
    "longitude": 0.626891
  },
  {
    "id": 4796,
    "name": "Île-de-France",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "A8",
    "iso2": "IDF",
    "latitude": 48.8499198,
    "longitude": 2.6370411
  },
  {
    "id": 4797,
    "name": "Mayotte",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "MF",
    "iso2": "YT",
    "latitude": -12.8275,
    "longitude": 45.166244
  },
  {
    "id": 4798,
    "name": "Auvergne-Rhône-Alpes",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "84",
    "iso2": "ARA",
    "latitude": 45.4471431,
    "longitude": 4.3852507
  },
  {
    "id": 4799,
    "name": "Occitania",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "84",
    "iso2": "OCC",
    "latitude": 43.8927232,
    "longitude": 3.2827625
  },
  {
    "id": 4800,
    "name": "Alo",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "84",
    "iso2": "WF-AL",
    "latitude": 40.7158362,
    "longitude": -73.9596317
  },
  {
    "id": 4801,
    "name": "Lorraine",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "B2",
    "iso2": "M",
    "latitude": 48.8744233,
    "longitude": 6.2080932
  },
  {
    "id": 4802,
    "name": "Pays de la Loire",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "B5",
    "iso2": "PDL",
    "latitude": 47.7632836,
    "longitude": -0.3299687
  },
  {
    "id": 4803,
    "name": "Languedoc-Roussillon",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "A9",
    "iso2": "K",
    "latitude": 43.5912356,
    "longitude": 3.2583626
  },
  {
    "id": 4804,
    "name": "Normandy",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "28",
    "iso2": "NOR",
    "latitude": 48.8798704,
    "longitude": 0.1712529
  },
  {
    "id": 4805,
    "name": "Franche-Comté",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "A6",
    "iso2": "I",
    "latitude": 47.1343207,
    "longitude": 6.0223016
  },
  {
    "id": 4806,
    "name": "Corsica",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "A5",
    "iso2": "COR",
    "latitude": 42.0396042,
    "longitude": 9.0128926
  },
  {
    "id": 4807,
    "name": "Brittany",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "A2",
    "iso2": "BRE",
    "latitude": 48.2020471,
    "longitude": -2.9326435
  },
  {
    "id": 4808,
    "name": "Aquitaine",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "97",
    "iso2": "B",
    "latitude": 44.7002222,
    "longitude": -0.2995785
  },
  {
    "id": 4809,
    "name": "Saint Martin",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "RN",
    "iso2": "MF",
    "latitude": 18.0708298,
    "longitude": -63.0500809
  },
  {
    "id": 4810,
    "name": "Wallis and Futuna",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "WF",
    "iso2": "WF",
    "latitude": -14.2938,
    "longitude": -178.1165
  },
  {
    "id": 4811,
    "name": "Alsace",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "C1",
    "iso2": "A",
    "latitude": 48.3181795,
    "longitude": 7.4416241
  },
  {
    "id": 4812,
    "name": "Provence-Alpes-Côte d\"Azur",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "B8",
    "iso2": "PAC",
    "latitude": 43.9351691,
    "longitude": 6.0679194
  },
  {
    "id": 4813,
    "name": "Rhône-Alpes",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "B9",
    "iso2": "V",
    "latitude": 45.6402905,
    "longitude": 5.6864994
  },
  {
    "id": 4814,
    "name": "Lower Normandy",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "99",
    "iso2": "P",
    "latitude": 48.8788472,
    "longitude": -0.5157492
  },
  {
    "id": 4815,
    "name": "Poitou-Charentes",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "B7",
    "iso2": "T",
    "latitude": 45.903552,
    "longitude": -0.3091837
  },
  {
    "id": 4816,
    "name": "Paris",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "B7",
    "iso2": "75",
    "latitude": 48.856614,
    "longitude": 2.3522219
  },
  {
    "id": 4817,
    "name": "Uvea",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "B7",
    "iso2": "WF-UV",
    "latitude": 41.983298,
    "longitude": -87.668362
  },
  {
    "id": 4818,
    "name": "Centre-Val de Loire",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "A3",
    "iso2": "CVL",
    "latitude": 47.7515686,
    "longitude": 1.6750631
  },
  {
    "id": 4819,
    "name": "Sigave",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "A3",
    "iso2": "WF-SG",
    "latitude": -14.2732592,
    "longitude": -178.16329
  },
  {
    "id": 4820,
    "name": "Grand Est",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "44",
    "iso2": "GES",
    "latitude": 48.699803,
    "longitude": 6.1878074
  },
  {
    "id": 4821,
    "name": "Saint Pierre and Miquelon",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "SB",
    "iso2": "PM",
    "latitude": 46.8852,
    "longitude": -56.3159
  },
  {
    "id": 4822,
    "name": "French Guiana",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "FG",
    "iso2": "GF",
    "latitude": 3.933889,
    "longitude": -53.125782
  },
  {
    "id": 4823,
    "name": "Réunion",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "RE",
    "iso2": "RE",
    "latitude": -21.115141,
    "longitude": 55.536384
  },
  {
    "id": 4824,
    "name": "French Polynesia",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "FP",
    "iso2": "PF",
    "latitude": -17.679742,
    "longitude": -149.406843
  },
  {
    "id": 4825,
    "name": "Bourgogne-Franche-Comté",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "27",
    "iso2": "BFC",
    "latitude": 47.2805127,
    "longitude": 4.9994372
  },
  {
    "id": 4826,
    "name": "Upper Normandy",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "A7",
    "iso2": "Q",
    "latitude": 49.524641,
    "longitude": 0.8828329
  },
  {
    "id": 4827,
    "name": "Martinique",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "MB",
    "iso2": "MQ",
    "latitude": 14.641528,
    "longitude": -61.024174
  },
  {
    "id": 4828,
    "name": "Hauts-de-France",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "32",
    "iso2": "HDF",
    "latitude": 50.4801153,
    "longitude": 2.7937265
  },
  {
    "id": 4829,
    "name": "Guadeloupe",
    "countryId": 75,
    "countryCode": "FR",
    "fipsCode": "GP",
    "iso2": "GP",
    "latitude": 16.265,
    "longitude": -61.551
  },
  {
    "id": 4830,
    "name": "West New Britain Province",
    "countryId": 171,
    "countryCode": "PG",
    "fipsCode": "17",
    "iso2": "WBK",
    "latitude": -5.7047432,
    "longitude": 150.0259466
  },
  {
    "id": 4831,
    "name": "Bougainville",
    "countryId": 171,
    "countryCode": "PG",
    "fipsCode": "07",
    "iso2": "NSB",
    "latitude": -6.3753919,
    "longitude": 155.3807101
  },
  {
    "id": 4832,
    "name": "Jiwaka Province",
    "countryId": 171,
    "countryCode": "PG",
    "fipsCode": "22",
    "iso2": "JWK",
    "latitude": -5.8691154,
    "longitude": 144.6972774
  },
  {
    "id": 4833,
    "name": "Hela",
    "countryId": 171,
    "countryCode": "PG",
    "fipsCode": "21",
    "iso2": "HLA",
    "latitude": 42.3329516,
    "longitude": -83.0482618
  },
  {
    "id": 4834,
    "name": "East New Britain",
    "countryId": 171,
    "countryCode": "PG",
    "fipsCode": "10",
    "iso2": "EBR",
    "latitude": -4.6128943,
    "longitude": 151.8877321
  },
  {
    "id": 4835,
    "name": "Morobe Province",
    "countryId": 171,
    "countryCode": "PG",
    "fipsCode": "14",
    "iso2": "MPL",
    "latitude": -6.8013737,
    "longitude": 146.561647
  },
  {
    "id": 4836,
    "name": "Sandaun Province",
    "countryId": 171,
    "countryCode": "PG",
    "fipsCode": "18",
    "iso2": "SAN",
    "latitude": -3.7126179,
    "longitude": 141.6834275
  },
  {
    "id": 4837,
    "name": "Port Moresby",
    "countryId": 171,
    "countryCode": "PG",
    "fipsCode": "20",
    "iso2": "NCD",
    "latitude": -9.4438004,
    "longitude": 147.1802671
  },
  {
    "id": 4838,
    "name": "Oro Province",
    "countryId": 171,
    "countryCode": "PG",
    "fipsCode": "04",
    "iso2": "NPP",
    "latitude": -8.8988063,
    "longitude": 148.1892921
  },
  {
    "id": 4839,
    "name": "Gulf",
    "countryId": 171,
    "countryCode": "PG",
    "fipsCode": "02",
    "iso2": "GPK",
    "latitude": 37.0548315,
    "longitude": -94.4370419
  },
  {
    "id": 4840,
    "name": "Western Highlands Province",
    "countryId": 171,
    "countryCode": "PG",
    "fipsCode": "16",
    "iso2": "WHM",
    "latitude": -5.6268128,
    "longitude": 144.2593118
  },
  {
    "id": 4841,
    "name": "New Ireland Province",
    "countryId": 171,
    "countryCode": "PG",
    "fipsCode": "15",
    "iso2": "NIK",
    "latitude": -4.2853256,
    "longitude": 152.9205918
  },
  {
    "id": 4842,
    "name": "Manus Province",
    "countryId": 171,
    "countryCode": "PG",
    "fipsCode": "13",
    "iso2": "MRL",
    "latitude": -2.0941169,
    "longitude": 146.8760951
  },
  {
    "id": 4843,
    "name": "Madang Province",
    "countryId": 171,
    "countryCode": "PG",
    "fipsCode": "12",
    "iso2": "MPM",
    "latitude": -4.9849733,
    "longitude": 145.1375834
  },
  {
    "id": 4844,
    "name": "Southern Highlands Province",
    "countryId": 171,
    "countryCode": "PG",
    "fipsCode": "05",
    "iso2": "SHM",
    "latitude": -6.4179083,
    "longitude": 143.5635637
  },
  {
    "id": 4845,
    "name": "Eastern Highlands Province",
    "countryId": 171,
    "countryCode": "PG",
    "fipsCode": "09",
    "iso2": "EHG",
    "latitude": -6.5861674,
    "longitude": 145.6689636
  },
  {
    "id": 4846,
    "name": "Chimbu Province",
    "countryId": 171,
    "countryCode": "PG",
    "fipsCode": "08",
    "iso2": "CPK",
    "latitude": -6.3087682,
    "longitude": 144.8731219
  },
  {
    "id": 4847,
    "name": "Central Province",
    "countryId": 171,
    "countryCode": "PG",
    "fipsCode": "01",
    "iso2": "CPM",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 4848,
    "name": "Enga Province",
    "countryId": 171,
    "countryCode": "PG",
    "fipsCode": "19",
    "iso2": "EPW",
    "latitude": -5.3005849,
    "longitude": 143.5635637
  },
  {
    "id": 4849,
    "name": "Milne Bay Province",
    "countryId": 171,
    "countryCode": "PG",
    "fipsCode": "03",
    "iso2": "MBA",
    "latitude": -9.5221451,
    "longitude": 150.6749653
  },
  {
    "id": 4850,
    "name": "Western Province",
    "countryId": 171,
    "countryCode": "PG",
    "fipsCode": "06",
    "iso2": "WPD",
    "latitude": null,
    "longitude": null
  },
  {
    "id": 4851,
    "name": "Ohio",
    "countryId": 233,
    "countryCode": "US",
    "fipsCode": "39",
    "iso2": "OH",
    "latitude": 40.4172871,
    "longitude": -82.907123
  },
  {
    "id": 4852,
    "name": "Ladakh",
    "countryId": 101,
    "countryCode": "IN",
    "fipsCode": null,
    "iso2": "LA",
    "latitude": 34.2268475,
    "longitude": 77.5619419
  },
  {
    "id": 4853,
    "name": "West Bengal",
    "countryId": 101,
    "countryCode": "IN",
    "fipsCode": "28",
    "iso2": "WB",
    "latitude": 22.9867569,
    "longitude": 87.8549755
  },
  {
    "id": 4854,
    "name": "Sinop Province",
    "countryId": 225,
    "countryCode": "TR",
    "fipsCode": "57",
    "iso2": "57",
    "latitude": 41.5594749,
    "longitude": 34.8580532
  },
  {
    "id": 4855,
    "name": "Capital District",
    "countryId": 239,
    "countryCode": "VE",
    "fipsCode": "25",
    "iso2": "A",
    "latitude": 41.2614846,
    "longitude": -95.9310807
  },
  {
    "id": 4856,
    "name": "Apure",
    "countryId": 239,
    "countryCode": "VE",
    "fipsCode": "03",
    "iso2": "C",
    "latitude": 6.9269483,
    "longitude": -68.5247149
  },
  {
    "id": 4857,
    "name": "Jalisco",
    "countryId": 142,
    "countryCode": "MX",
    "fipsCode": "14",
    "iso2": "JAL",
    "latitude": 20.6595382,
    "longitude": -103.3494376
  },
  {
    "id": 4858,
    "name": "Roraima",
    "countryId": 31,
    "countryCode": "BR",
    "fipsCode": "25",
    "iso2": "RR",
    "latitude": 2.7375971,
    "longitude": -62.0750998
  },
  {
    "id": 4859,
    "name": "Guarda District",
    "countryId": 177,
    "countryCode": "PT",
    "fipsCode": "11",
    "iso2": "09",
    "latitude": 40.5385972,
    "longitude": -7.2675772
  },
  {
    "id": 4860,
    "name": "Devonshire Parish",
    "countryId": 25,
    "countryCode": "BM",
    "fipsCode": "01",
    "iso2": "DEV",
    "latitude": 32.3038062,
    "longitude": -64.7606954
  },
  {
    "id": 4861,
    "name": "Hamilton Parish",
    "countryId": 25,
    "countryCode": "BM",
    "fipsCode": "02",
    "iso2": "HA",
    "latitude": 32.3449432,
    "longitude": -64.72365
  },
  {
    "id": 4862,
    "name": "Hamilton Municipality",
    "countryId": 25,
    "countryCode": "BM",
    "fipsCode": "03",
    "iso2": "HAM",
    "latitude": 43.323944,
    "longitude": -79.9059219
  },
  {
    "id": 4863,
    "name": "Paget Parish",
    "countryId": 25,
    "countryCode": "BM",
    "fipsCode": "04",
    "iso2": "PAG",
    "latitude": 32.281074,
    "longitude": -64.7784787
  },
  {
    "id": 4864,
    "name": "Pembroke Parish",
    "countryId": 25,
    "countryCode": "BM",
    "fipsCode": "05",
    "iso2": "PEM",
    "latitude": 32.3007672,
    "longitude": -64.796263
  },
  {
    "id": 4865,
    "name": "Saint George\"s Municipality",
    "countryId": 25,
    "countryCode": "BM",
    "fipsCode": "06",
    "iso2": "SG",
    "latitude": 37.0965278,
    "longitude": -113.5684164
  },
  {
    "id": 4866,
    "name": "Saint George\"s Parish",
    "countryId": 25,
    "countryCode": "BM",
    "fipsCode": "07",
    "iso2": "SGE",
    "latitude": 17.1257759,
    "longitude": -62.5619811
  },
  {
    "id": 4867,
    "name": "Sandys Parish",
    "countryId": 25,
    "countryCode": "BM",
    "fipsCode": "08",
    "iso2": "SAN",
    "latitude": 32.2999528,
    "longitude": -64.8674103
  },
  {
    "id": 4868,
    "name": "Smith\"s Parish,",
    "countryId": 25,
    "countryCode": "BM",
    "fipsCode": "09",
    "iso2": "SMI",
    "latitude": 32.3133966,
    "longitude": -64.7310588
  },
  {
    "id": 4869,
    "name": "Southampton Parish",
    "countryId": 25,
    "countryCode": "BM",
    "fipsCode": "10",
    "iso2": "SOU",
    "latitude": 32.2540095,
    "longitude": -64.8259058
  },
  {
    "id": 4870,
    "name": "Warwick Parish",
    "countryId": 25,
    "countryCode": "BM",
    "fipsCode": "11",
    "iso2": "WAR",
    "latitude": 32.2661534,
    "longitude": -64.8081198
  },
  {
    "id": 4871,
    "name": "Huila Department",
    "countryId": 48,
    "countryCode": "CO",
    "fipsCode": "16",
    "iso2": "HUI",
    "latitude": 2.5359349,
    "longitude": -75.5276699
  },
  {
    "id": 4874,
    "name": "Uroševac District (Ferizaj)",
    "countryId": 248,
    "countryCode": "XK",
    "fipsCode": null,
    "iso2": "XUF",
    "latitude": 42.3701844,
    "longitude": 21.1483281
  },
  {
    "id": 4876,
    "name": "Đakovica District (Gjakove)",
    "countryId": 248,
    "countryCode": "XK",
    "fipsCode": null,
    "iso2": "XDG",
    "latitude": 42.4375756,
    "longitude": 20.3785438
  },
  {
    "id": 4877,
    "name": "Gjilan District",
    "countryId": 248,
    "countryCode": "XK",
    "fipsCode": null,
    "iso2": "XGJ",
    "latitude": 42.4635206,
    "longitude": 21.4694011
  },
  {
    "id": 4878,
    "name": "Kosovska Mitrovica District",
    "countryId": 248,
    "countryCode": "XK",
    "fipsCode": null,
    "iso2": "XKM",
    "latitude": 42.8913909,
    "longitude": 20.8659995
  },
  {
    "id": 4879,
    "name": "Pristina (Priştine)",
    "countryId": 248,
    "countryCode": "XK",
    "fipsCode": null,
    "iso2": "XPI",
    "latitude": 42.6629138,
    "longitude": 21.1655028
  },
  {
    "id": 4880,
    "name": "Autonomous City Of Buenos Aires",
    "countryId": 11,
    "countryCode": "AR",
    "fipsCode": null,
    "iso2": "C",
    "latitude": -34.6036844,
    "longitude": -58.3815591
  },
  {
    "id": 4881,
    "name": "New Providence",
    "countryId": 17,
    "countryCode": "BS",
    "fipsCode": "23",
    "iso2": "NP",
    "latitude": 40.6984348,
    "longitude": -74.4015405
  },
  {
    "id": 4882,
    "name": "Shumen",
    "countryId": 34,
    "countryCode": "BG",
    "fipsCode": "54",
    "iso2": "27",
    "latitude": 43.2712398,
    "longitude": 26.9361286
  },
  {
    "id": 4883,
    "name": "Yuen Long District",
    "countryId": 98,
    "countryCode": "HK",
    "fipsCode": null,
    "iso2": "NYL",
    "latitude": 22.44559,
    "longitude": 114.02218
  },
  {
    "id": 4884,
    "name": "Tsuen Wan District",
    "countryId": 98,
    "countryCode": "HK",
    "fipsCode": null,
    "iso2": "NTW",
    "latitude": 22.36281,
    "longitude": 114.12907
  },
  {
    "id": 4885,
    "name": "Tai Po District",
    "countryId": 98,
    "countryCode": "KH",
    "fipsCode": null,
    "iso2": "NTP",
    "latitude": 22.45085,
    "longitude": 114.16422
  },
  {
    "id": 4887,
    "name": "Sai Kung District",
    "countryId": 98,
    "countryCode": "HK",
    "fipsCode": null,
    "iso2": "NSK",
    "latitude": 22.38143,
    "longitude": 114.27052
  },
  {
    "id": 4888,
    "name": "Islands District",
    "countryId": 98,
    "countryCode": "HK",
    "fipsCode": null,
    "iso2": "NIS",
    "latitude": 22.26114,
    "longitude": 113.94608
  },
  {
    "id": 4889,
    "name": "Central and Western District",
    "countryId": 98,
    "countryCode": "HK",
    "fipsCode": null,
    "iso2": "HCW",
    "latitude": 22.28666,
    "longitude": 114.15497
  },
  {
    "id": 4890,
    "name": "Wan Chai",
    "countryId": 98,
    "countryCode": "HK",
    "fipsCode": null,
    "iso2": "HWC",
    "latitude": 22.27968,
    "longitude": 114.17168
  },
  {
    "id": 4891,
    "name": "Eastern",
    "countryId": 98,
    "countryCode": "HK",
    "fipsCode": null,
    "iso2": "HEA",
    "latitude": 22.28411,
    "longitude": 114.22414
  },
  {
    "id": 4892,
    "name": "Southern",
    "countryId": 98,
    "countryCode": "HK",
    "fipsCode": null,
    "iso2": "HSO",
    "latitude": 22.24725,
    "longitude": 114.15884
  },
  {
    "id": 4893,
    "name": "Yau Tsim Mong",
    "countryId": 98,
    "countryCode": "HK",
    "fipsCode": null,
    "iso2": "KYT",
    "latitude": 22.32138,
    "longitude": 114.1726
  },
  {
    "id": 4894,
    "name": "Sham Shui Po",
    "countryId": 98,
    "countryCode": "HK",
    "fipsCode": null,
    "iso2": "KSS",
    "latitude": 22.33074,
    "longitude": 114.1622
  },
  {
    "id": 4895,
    "name": "Kowloon City",
    "countryId": 98,
    "countryCode": "HK",
    "fipsCode": null,
    "iso2": "KKC",
    "latitude": 22.3282,
    "longitude": 114.19155
  },
  {
    "id": 4896,
    "name": "Wong Tai Sin",
    "countryId": 98,
    "countryCode": "HK",
    "fipsCode": null,
    "iso2": "KWT",
    "latitude": 22.33353,
    "longitude": 114.19686
  },
  {
    "id": 4897,
    "name": "Kwun Tong",
    "countryId": 98,
    "countryCode": "HK",
    "fipsCode": null,
    "iso2": "KKT",
    "latitude": 22.31326,
    "longitude": 114.22581
  },
  {
    "id": 4898,
    "name": "Kwai Tsing",
    "countryId": 98,
    "countryCode": "HK",
    "fipsCode": null,
    "iso2": "NKT",
    "latitude": 22.35488,
    "longitude": 114.08401
  },
  {
    "id": 4899,
    "name": "Tuen Mun",
    "countryId": 98,
    "countryCode": "HK",
    "fipsCode": null,
    "iso2": "NTM",
    "latitude": 22.39163,
    "longitude": 113.9770885
  },
  {
    "id": 4900,
    "name": "North",
    "countryId": 98,
    "countryCode": "HK",
    "fipsCode": null,
    "iso2": "NNO",
    "latitude": 22.49471,
    "longitude": 114.13812
  },
  {
    "id": 4901,
    "name": "Sha Tin",
    "countryId": 98,
    "countryCode": "HK",
    "fipsCode": null,
    "iso2": "NST",
    "latitude": 22.38715,
    "longitude": 114.19534
  },
  {
    "id": 4902,
    "name": "Sidi Bel Abbès",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": "30",
    "iso2": "22",
    "latitude": 34.6806024,
    "longitude": -1.0999495
  },
  {
    "id": 4905,
    "name": "El M\"ghair",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": null,
    "iso2": "49",
    "latitude": 33.9540561,
    "longitude": 5.1346418
  },
  {
    "id": 4906,
    "name": "El Menia",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": null,
    "iso2": "50",
    "latitude": 31.364225,
    "longitude": 2.5784495
  },
  {
    "id": 4907,
    "name": "Ouled Djellal",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": null,
    "iso2": "51",
    "latitude": 34.4178221,
    "longitude": 4.9685843
  },
  {
    "id": 4908,
    "name": "Bordj Baji Mokhtar",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": null,
    "iso2": "52",
    "latitude": 22.966335,
    "longitude": -3.9472732
  },
  {
    "id": 4909,
    "name": "Béni Abbès",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": null,
    "iso2": "53",
    "latitude": 30.0831042,
    "longitude": -2.8345052
  },
  {
    "id": 4910,
    "name": "Timimoun",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": null,
    "iso2": "54",
    "latitude": 29.678906,
    "longitude": 0.5004608
  },
  {
    "id": 4911,
    "name": "Touggourt",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": null,
    "iso2": "55",
    "latitude": 33.1248476,
    "longitude": 5.7832715
  },
  {
    "id": 4912,
    "name": "Djanet",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": null,
    "iso2": "56",
    "latitude": 23.8310872,
    "longitude": 8.7004672
  },
  {
    "id": 4913,
    "name": "In Salah",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": null,
    "iso2": "57",
    "latitude": 27.2149229,
    "longitude": 1.8484396
  },
  {
    "id": 4914,
    "name": "In Guezzam",
    "countryId": 4,
    "countryCode": "DZ",
    "fipsCode": null,
    "iso2": "58",
    "latitude": 20.3864323,
    "longitude": 4.7789394
  }
] as any;
  }

  public async runAsync(): Promise<void> {
    await this.loadSeedEntityAsync();
    if (!this.shouldRun()) {
      return;
    }
    this.logger.info("Seeding " + this.name + "...");
    try {
      const data = await this.transformSeedDataAsync();
      if (data.length === 0) return;
      
      const chunkSize = 1000;
      let totalInserted = 0;
      for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);
        await this.repo.createQueryBuilder()
          .insert()
          .into(StateEntity)
          .values(chunk)
          .orIgnore()
          .execute();
        totalInserted += chunk.length;
      }

      await this.updateSeedEntityAsync();
      this.logger.info("Seeding " + this.name + " finished. Total records: " + totalInserted);
      await this.postSeedAsync();
    } catch (ex) {
      this.logger.error(ex, "Seeding " + this.name + " failed");
      throw ex;
    }
  }

  constructor(
    dataSource: DataSource,
    @InjectRepository(StateEntity) repo: Repository<StateEntity>,
    @InjectPinoLogger(RefStatesSeed.name) logger: PinoLogger,
  ) {
    super(dataSource, repo, logger);
  }

  protected equalityCheck(x: Partial<StateEntity>, y: Partial<StateEntity>): boolean {
    return (x as any).id ? x.id === y.id : (x as any).code === (y as any).code;
  }
  protected createFilter(): FindOptionsWhere<StateEntity> { return {}; }
}
