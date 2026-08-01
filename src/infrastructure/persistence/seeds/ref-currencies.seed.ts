import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { FindOptionsWhere, Repository, DataSource } from "typeorm";
import { BaseSeed } from "../../../common";
import { CurrencyEntity } from "../entities";

@Injectable()
export class RefCurrenciesSeed extends BaseSeed<CurrencyEntity> {
  public get version(): number { return 1; }
  public get seedingData(): Partial<CurrencyEntity>[] {
    return [
  {
    "code": "USD",
    "name": "US Dollar",
    "symbol": "$",
    "symbolNative": "$",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "US dollars"
  },
  {
    "code": "CAD",
    "name": "Canadian Dollar",
    "symbol": "CA$",
    "symbolNative": "$",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Canadian dollars"
  },
  {
    "code": "EUR",
    "name": "Euro",
    "symbol": "€",
    "symbolNative": "€",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "euros"
  },
  {
    "code": "AED",
    "name": "United Arab Emirates Dirham",
    "symbol": "AED",
    "symbolNative": "د.إ.‏",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "UAE dirhams"
  },
  {
    "code": "AFN",
    "name": "Afghan Afghani",
    "symbol": "Af",
    "symbolNative": "؋",
    "decimalDigits": 0,
    "rounding": 0,
    "namePlural": "Afghan Afghanis"
  },
  {
    "code": "ALL",
    "name": "Albanian Lek",
    "symbol": "ALL",
    "symbolNative": "Lek",
    "decimalDigits": 0,
    "rounding": 0,
    "namePlural": "Albanian lekë"
  },
  {
    "code": "AMD",
    "name": "Armenian Dram",
    "symbol": "AMD",
    "symbolNative": "դր.",
    "decimalDigits": 0,
    "rounding": 0,
    "namePlural": "Armenian drams"
  },
  {
    "code": "ARS",
    "name": "Argentine Peso",
    "symbol": "AR$",
    "symbolNative": "$",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Argentine pesos"
  },
  {
    "code": "AUD",
    "name": "Australian Dollar",
    "symbol": "AU$",
    "symbolNative": "$",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Australian dollars"
  },
  {
    "code": "AZN",
    "name": "Azerbaijani Manat",
    "symbol": "man.",
    "symbolNative": "ман.",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Azerbaijani manats"
  },
  {
    "code": "BAM",
    "name": "Bosnia-Herzegovina Convertible Mark",
    "symbol": "KM",
    "symbolNative": "KM",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Bosnia-Herzegovina convertible marks"
  },
  {
    "code": "BDT",
    "name": "Bangladeshi Taka",
    "symbol": "Tk",
    "symbolNative": "৳",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Bangladeshi takas"
  },
  {
    "code": "BGN",
    "name": "Bulgarian Lev",
    "symbol": "BGN",
    "symbolNative": "лв.",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Bulgarian leva"
  },
  {
    "code": "BHD",
    "name": "Bahraini Dinar",
    "symbol": "BD",
    "symbolNative": "د.ب.‏",
    "decimalDigits": 3,
    "rounding": 0,
    "namePlural": "Bahraini dinars"
  },
  {
    "code": "BIF",
    "name": "Burundian Franc",
    "symbol": "FBu",
    "symbolNative": "FBu",
    "decimalDigits": 0,
    "rounding": 0,
    "namePlural": "Burundian francs"
  },
  {
    "code": "BND",
    "name": "Brunei Dollar",
    "symbol": "BN$",
    "symbolNative": "$",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Brunei dollars"
  },
  {
    "code": "BOB",
    "name": "Bolivian Boliviano",
    "symbol": "Bs",
    "symbolNative": "Bs",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Bolivian bolivianos"
  },
  {
    "code": "BRL",
    "name": "Brazilian Real",
    "symbol": "R$",
    "symbolNative": "R$",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Brazilian reals"
  },
  {
    "code": "BWP",
    "name": "Botswanan Pula",
    "symbol": "BWP",
    "symbolNative": "P",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Botswanan pulas"
  },
  {
    "code": "BYR",
    "name": "Belarusian Ruble",
    "symbol": "BYR",
    "symbolNative": "BYR",
    "decimalDigits": 0,
    "rounding": 0,
    "namePlural": "Belarusian rubles"
  },
  {
    "code": "BZD",
    "name": "Belize Dollar",
    "symbol": "BZ$",
    "symbolNative": "$",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Belize dollars"
  },
  {
    "code": "CDF",
    "name": "Congolese Franc",
    "symbol": "CDF",
    "symbolNative": "FrCD",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Congolese francs"
  },
  {
    "code": "CHF",
    "name": "Swiss Franc",
    "symbol": "CHF",
    "symbolNative": "CHF",
    "decimalDigits": 2,
    "rounding": 0.05,
    "namePlural": "Swiss francs"
  },
  {
    "code": "CLP",
    "name": "Chilean Peso",
    "symbol": "CL$",
    "symbolNative": "$",
    "decimalDigits": 0,
    "rounding": 0,
    "namePlural": "Chilean pesos"
  },
  {
    "code": "CNY",
    "name": "Chinese Yuan",
    "symbol": "CN¥",
    "symbolNative": "CN¥",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Chinese yuan"
  },
  {
    "code": "COP",
    "name": "Colombian Peso",
    "symbol": "CO$",
    "symbolNative": "$",
    "decimalDigits": 0,
    "rounding": 0,
    "namePlural": "Colombian pesos"
  },
  {
    "code": "CRC",
    "name": "Costa Rican Colón",
    "symbol": "₡",
    "symbolNative": "₡",
    "decimalDigits": 0,
    "rounding": 0,
    "namePlural": "Costa Rican colóns"
  },
  {
    "code": "CVE",
    "name": "Cape Verdean Escudo",
    "symbol": "CV$",
    "symbolNative": "CV$",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Cape Verdean escudos"
  },
  {
    "code": "CZK",
    "name": "Czech Republic Koruna",
    "symbol": "Kč",
    "symbolNative": "Kč",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Czech Republic korunas"
  },
  {
    "code": "DJF",
    "name": "Djiboutian Franc",
    "symbol": "Fdj",
    "symbolNative": "Fdj",
    "decimalDigits": 0,
    "rounding": 0,
    "namePlural": "Djiboutian francs"
  },
  {
    "code": "DKK",
    "name": "Danish Krone",
    "symbol": "Dkr",
    "symbolNative": "kr",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Danish kroner"
  },
  {
    "code": "DOP",
    "name": "Dominican Peso",
    "symbol": "RD$",
    "symbolNative": "RD$",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Dominican pesos"
  },
  {
    "code": "DZD",
    "name": "Algerian Dinar",
    "symbol": "DA",
    "symbolNative": "د.ج.‏",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Algerian dinars"
  },
  {
    "code": "EEK",
    "name": "Estonian Kroon",
    "symbol": "Ekr",
    "symbolNative": "kr",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Estonian kroons"
  },
  {
    "code": "EGP",
    "name": "Egyptian Pound",
    "symbol": "EGP",
    "symbolNative": "ج.م.‏",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Egyptian pounds"
  },
  {
    "code": "ERN",
    "name": "Eritrean Nakfa",
    "symbol": "Nfk",
    "symbolNative": "Nfk",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Eritrean nakfas"
  },
  {
    "code": "ETB",
    "name": "Ethiopian Birr",
    "symbol": "Br",
    "symbolNative": "Br",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Ethiopian birrs"
  },
  {
    "code": "GBP",
    "name": "British Pound Sterling",
    "symbol": "£",
    "symbolNative": "£",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "British pounds sterling"
  },
  {
    "code": "GEL",
    "name": "Georgian Lari",
    "symbol": "GEL",
    "symbolNative": "GEL",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Georgian laris"
  },
  {
    "code": "GHS",
    "name": "Ghanaian Cedi",
    "symbol": "GH₵",
    "symbolNative": "GH₵",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Ghanaian cedis"
  },
  {
    "code": "GNF",
    "name": "Guinean Franc",
    "symbol": "FG",
    "symbolNative": "FG",
    "decimalDigits": 0,
    "rounding": 0,
    "namePlural": "Guinean francs"
  },
  {
    "code": "GTQ",
    "name": "Guatemalan Quetzal",
    "symbol": "GTQ",
    "symbolNative": "Q",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Guatemalan quetzals"
  },
  {
    "code": "HKD",
    "name": "Hong Kong Dollar",
    "symbol": "HK$",
    "symbolNative": "$",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Hong Kong dollars"
  },
  {
    "code": "HNL",
    "name": "Honduran Lempira",
    "symbol": "HNL",
    "symbolNative": "L",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Honduran lempiras"
  },
  {
    "code": "HRK",
    "name": "Croatian Kuna",
    "symbol": "kn",
    "symbolNative": "kn",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Croatian kunas"
  },
  {
    "code": "HUF",
    "name": "Hungarian Forint",
    "symbol": "Ft",
    "symbolNative": "Ft",
    "decimalDigits": 0,
    "rounding": 0,
    "namePlural": "Hungarian forints"
  },
  {
    "code": "IDR",
    "name": "Indonesian Rupiah",
    "symbol": "Rp",
    "symbolNative": "Rp",
    "decimalDigits": 0,
    "rounding": 0,
    "namePlural": "Indonesian rupiahs"
  },
  {
    "code": "ILS",
    "name": "Israeli New Sheqel",
    "symbol": "₪",
    "symbolNative": "₪",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Israeli new sheqels"
  },
  {
    "code": "INR",
    "name": "Indian Rupee",
    "symbol": "Rs",
    "symbolNative": "টকা",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Indian rupees"
  },
  {
    "code": "IQD",
    "name": "Iraqi Dinar",
    "symbol": "IQD",
    "symbolNative": "د.ع.‏",
    "decimalDigits": 0,
    "rounding": 0,
    "namePlural": "Iraqi dinars"
  },
  {
    "code": "IRR",
    "name": "Iranian Rial",
    "symbol": "IRR",
    "symbolNative": "﷼",
    "decimalDigits": 0,
    "rounding": 0,
    "namePlural": "Iranian rials"
  },
  {
    "code": "ISK",
    "name": "Icelandic Króna",
    "symbol": "Ikr",
    "symbolNative": "kr",
    "decimalDigits": 0,
    "rounding": 0,
    "namePlural": "Icelandic krónur"
  },
  {
    "code": "JMD",
    "name": "Jamaican Dollar",
    "symbol": "J$",
    "symbolNative": "$",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Jamaican dollars"
  },
  {
    "code": "JOD",
    "name": "Jordanian Dinar",
    "symbol": "JD",
    "symbolNative": "د.أ.‏",
    "decimalDigits": 3,
    "rounding": 0,
    "namePlural": "Jordanian dinars"
  },
  {
    "code": "JPY",
    "name": "Japanese Yen",
    "symbol": "¥",
    "symbolNative": "￥",
    "decimalDigits": 0,
    "rounding": 0,
    "namePlural": "Japanese yen"
  },
  {
    "code": "KES",
    "name": "Kenyan Shilling",
    "symbol": "Ksh",
    "symbolNative": "Ksh",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Kenyan shillings"
  },
  {
    "code": "KHR",
    "name": "Cambodian Riel",
    "symbol": "KHR",
    "symbolNative": "៛",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Cambodian riels"
  },
  {
    "code": "KMF",
    "name": "Comorian Franc",
    "symbol": "CF",
    "symbolNative": "FC",
    "decimalDigits": 0,
    "rounding": 0,
    "namePlural": "Comorian francs"
  },
  {
    "code": "KRW",
    "name": "South Korean Won",
    "symbol": "₩",
    "symbolNative": "₩",
    "decimalDigits": 0,
    "rounding": 0,
    "namePlural": "South Korean won"
  },
  {
    "code": "KWD",
    "name": "Kuwaiti Dinar",
    "symbol": "KD",
    "symbolNative": "د.ك.‏",
    "decimalDigits": 3,
    "rounding": 0,
    "namePlural": "Kuwaiti dinars"
  },
  {
    "code": "KZT",
    "name": "Kazakhstani Tenge",
    "symbol": "KZT",
    "symbolNative": "тңг.",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Kazakhstani tenges"
  },
  {
    "code": "LBP",
    "name": "Lebanese Pound",
    "symbol": "LB£",
    "symbolNative": "ل.ل.‏",
    "decimalDigits": 0,
    "rounding": 0,
    "namePlural": "Lebanese pounds"
  },
  {
    "code": "LKR",
    "name": "Sri Lankan Rupee",
    "symbol": "SLRs",
    "symbolNative": "SL Re",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Sri Lankan rupees"
  },
  {
    "code": "LTL",
    "name": "Lithuanian Litas",
    "symbol": "Lt",
    "symbolNative": "Lt",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Lithuanian litai"
  },
  {
    "code": "LVL",
    "name": "Latvian Lats",
    "symbol": "Ls",
    "symbolNative": "Ls",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Latvian lati"
  },
  {
    "code": "LYD",
    "name": "Libyan Dinar",
    "symbol": "LD",
    "symbolNative": "د.ل.‏",
    "decimalDigits": 3,
    "rounding": 0,
    "namePlural": "Libyan dinars"
  },
  {
    "code": "MAD",
    "name": "Moroccan Dirham",
    "symbol": "MAD",
    "symbolNative": "د.م.‏",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Moroccan dirhams"
  },
  {
    "code": "MDL",
    "name": "Moldovan Leu",
    "symbol": "MDL",
    "symbolNative": "MDL",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Moldovan lei"
  },
  {
    "code": "MGA",
    "name": "Malagasy Ariary",
    "symbol": "MGA",
    "symbolNative": "MGA",
    "decimalDigits": 0,
    "rounding": 0,
    "namePlural": "Malagasy Ariaries"
  },
  {
    "code": "MKD",
    "name": "Macedonian Denar",
    "symbol": "MKD",
    "symbolNative": "MKD",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Macedonian denari"
  },
  {
    "code": "MMK",
    "name": "Myanma Kyat",
    "symbol": "MMK",
    "symbolNative": "K",
    "decimalDigits": 0,
    "rounding": 0,
    "namePlural": "Myanma kyats"
  },
  {
    "code": "MOP",
    "name": "Macanese Pataca",
    "symbol": "MOP$",
    "symbolNative": "MOP$",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Macanese patacas"
  },
  {
    "code": "MUR",
    "name": "Mauritian Rupee",
    "symbol": "MURs",
    "symbolNative": "MURs",
    "decimalDigits": 0,
    "rounding": 0,
    "namePlural": "Mauritian rupees"
  },
  {
    "code": "MXN",
    "name": "Mexican Peso",
    "symbol": "MX$",
    "symbolNative": "$",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Mexican pesos"
  },
  {
    "code": "MYR",
    "name": "Malaysian Ringgit",
    "symbol": "RM",
    "symbolNative": "RM",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Malaysian ringgits"
  },
  {
    "code": "MZN",
    "name": "Mozambican Metical",
    "symbol": "MTn",
    "symbolNative": "MTn",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Mozambican meticals"
  },
  {
    "code": "NAD",
    "name": "Namibian Dollar",
    "symbol": "N$",
    "symbolNative": "N$",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Namibian dollars"
  },
  {
    "code": "NGN",
    "name": "Nigerian Naira",
    "symbol": "₦",
    "symbolNative": "₦",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Nigerian nairas"
  },
  {
    "code": "NIO",
    "name": "Nicaraguan Córdoba",
    "symbol": "C$",
    "symbolNative": "C$",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Nicaraguan córdobas"
  },
  {
    "code": "NOK",
    "name": "Norwegian Krone",
    "symbol": "Nkr",
    "symbolNative": "kr",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Norwegian kroner"
  },
  {
    "code": "NPR",
    "name": "Nepalese Rupee",
    "symbol": "NPRs",
    "symbolNative": "नेरू",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Nepalese rupees"
  },
  {
    "code": "NZD",
    "name": "New Zealand Dollar",
    "symbol": "NZ$",
    "symbolNative": "$",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "New Zealand dollars"
  },
  {
    "code": "OMR",
    "name": "Omani Rial",
    "symbol": "OMR",
    "symbolNative": "ر.ع.‏",
    "decimalDigits": 3,
    "rounding": 0,
    "namePlural": "Omani rials"
  },
  {
    "code": "PAB",
    "name": "Panamanian Balboa",
    "symbol": "B/.",
    "symbolNative": "B/.",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Panamanian balboas"
  },
  {
    "code": "PEN",
    "name": "Peruvian Nuevo Sol",
    "symbol": "S/.",
    "symbolNative": "S/.",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Peruvian nuevos soles"
  },
  {
    "code": "PHP",
    "name": "Philippine Peso",
    "symbol": "₱",
    "symbolNative": "₱",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Philippine pesos"
  },
  {
    "code": "PKR",
    "name": "Pakistani Rupee",
    "symbol": "PKRs",
    "symbolNative": "₨",
    "decimalDigits": 0,
    "rounding": 0,
    "namePlural": "Pakistani rupees"
  },
  {
    "code": "PLN",
    "name": "Polish Zloty",
    "symbol": "zł",
    "symbolNative": "zł",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Polish zlotys"
  },
  {
    "code": "PYG",
    "name": "Paraguayan Guarani",
    "symbol": "₲",
    "symbolNative": "₲",
    "decimalDigits": 0,
    "rounding": 0,
    "namePlural": "Paraguayan guaranis"
  },
  {
    "code": "QAR",
    "name": "Qatari Rial",
    "symbol": "QR",
    "symbolNative": "ر.ق.‏",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Qatari rials"
  },
  {
    "code": "RON",
    "name": "Romanian Leu",
    "symbol": "RON",
    "symbolNative": "RON",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Romanian lei"
  },
  {
    "code": "RSD",
    "name": "Serbian Dinar",
    "symbol": "din.",
    "symbolNative": "дин.",
    "decimalDigits": 0,
    "rounding": 0,
    "namePlural": "Serbian dinars"
  },
  {
    "code": "RUB",
    "name": "Russian Ruble",
    "symbol": "RUB",
    "symbolNative": "руб.",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Russian rubles"
  },
  {
    "code": "RWF",
    "name": "Rwandan Franc",
    "symbol": "RWF",
    "symbolNative": "FR",
    "decimalDigits": 0,
    "rounding": 0,
    "namePlural": "Rwandan francs"
  },
  {
    "code": "SAR",
    "name": "Saudi Riyal",
    "symbol": "SR",
    "symbolNative": "ر.س.‏",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Saudi riyals"
  },
  {
    "code": "SDG",
    "name": "Sudanese Pound",
    "symbol": "SDG",
    "symbolNative": "SDG",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Sudanese pounds"
  },
  {
    "code": "SEK",
    "name": "Swedish Krona",
    "symbol": "Skr",
    "symbolNative": "kr",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Swedish kronor"
  },
  {
    "code": "SGD",
    "name": "Singapore Dollar",
    "symbol": "S$",
    "symbolNative": "$",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Singapore dollars"
  },
  {
    "code": "SOS",
    "name": "Somali Shilling",
    "symbol": "Ssh",
    "symbolNative": "Ssh",
    "decimalDigits": 0,
    "rounding": 0,
    "namePlural": "Somali shillings"
  },
  {
    "code": "SYP",
    "name": "Syrian Pound",
    "symbol": "SY£",
    "symbolNative": "ل.س.‏",
    "decimalDigits": 0,
    "rounding": 0,
    "namePlural": "Syrian pounds"
  },
  {
    "code": "THB",
    "name": "Thai Baht",
    "symbol": "฿",
    "symbolNative": "฿",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Thai baht"
  },
  {
    "code": "TND",
    "name": "Tunisian Dinar",
    "symbol": "DT",
    "symbolNative": "د.ت.‏",
    "decimalDigits": 3,
    "rounding": 0,
    "namePlural": "Tunisian dinars"
  },
  {
    "code": "TOP",
    "name": "Tongan Paʻanga",
    "symbol": "T$",
    "symbolNative": "T$",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Tongan paʻanga"
  },
  {
    "code": "TRY",
    "name": "Turkish Lira",
    "symbol": "TL",
    "symbolNative": "TL",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Turkish Lira"
  },
  {
    "code": "TTD",
    "name": "Trinidad and Tobago Dollar",
    "symbol": "TT$",
    "symbolNative": "$",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Trinidad and Tobago dollars"
  },
  {
    "code": "TWD",
    "name": "New Taiwan Dollar",
    "symbol": "NT$",
    "symbolNative": "NT$",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "New Taiwan dollars"
  },
  {
    "code": "TZS",
    "name": "Tanzanian Shilling",
    "symbol": "TSh",
    "symbolNative": "TSh",
    "decimalDigits": 0,
    "rounding": 0,
    "namePlural": "Tanzanian shillings"
  },
  {
    "code": "UAH",
    "name": "Ukrainian Hryvnia",
    "symbol": "₴",
    "symbolNative": "₴",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Ukrainian hryvnias"
  },
  {
    "code": "UGX",
    "name": "Ugandan Shilling",
    "symbol": "USh",
    "symbolNative": "USh",
    "decimalDigits": 0,
    "rounding": 0,
    "namePlural": "Ugandan shillings"
  },
  {
    "code": "UYU",
    "name": "Uruguayan Peso",
    "symbol": "$U",
    "symbolNative": "$",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Uruguayan pesos"
  },
  {
    "code": "UZS",
    "name": "Uzbekistan Som",
    "symbol": "UZS",
    "symbolNative": "UZS",
    "decimalDigits": 0,
    "rounding": 0,
    "namePlural": "Uzbekistan som"
  },
  {
    "code": "VEF",
    "name": "Venezuelan Bolívar",
    "symbol": "Bs.F.",
    "symbolNative": "Bs.F.",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "Venezuelan bolívars"
  },
  {
    "code": "VND",
    "name": "Vietnamese Dong",
    "symbol": "₫",
    "symbolNative": "₫",
    "decimalDigits": 0,
    "rounding": 0,
    "namePlural": "Vietnamese dong"
  },
  {
    "code": "XAF",
    "name": "CFA Franc BEAC",
    "symbol": "FCFA",
    "symbolNative": "FCFA",
    "decimalDigits": 0,
    "rounding": 0,
    "namePlural": "CFA francs BEAC"
  },
  {
    "code": "XOF",
    "name": "CFA Franc BCEAO",
    "symbol": "CFA",
    "symbolNative": "CFA",
    "decimalDigits": 0,
    "rounding": 0,
    "namePlural": "CFA francs BCEAO"
  },
  {
    "code": "YER",
    "name": "Yemeni Rial",
    "symbol": "YR",
    "symbolNative": "ر.ي.‏",
    "decimalDigits": 0,
    "rounding": 0,
    "namePlural": "Yemeni rials"
  },
  {
    "code": "ZAR",
    "name": "South African Rand",
    "symbol": "R",
    "symbolNative": "R",
    "decimalDigits": 2,
    "rounding": 0,
    "namePlural": "South African rand"
  },
  {
    "code": "ZMK",
    "name": "Zambian Kwacha",
    "symbol": "ZK",
    "symbolNative": "ZK",
    "decimalDigits": 0,
    "rounding": 0,
    "namePlural": "Zambian kwachas"
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
          .into(CurrencyEntity)
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
    @InjectRepository(CurrencyEntity) repo: Repository<CurrencyEntity>,
    @InjectPinoLogger(RefCurrenciesSeed.name) logger: PinoLogger,
  ) {
    super(dataSource, repo, logger);
  }

  protected equalityCheck(x: Partial<CurrencyEntity>, y: Partial<CurrencyEntity>): boolean {
    return (x as any).id ? x.id === y.id : (x as any).code === (y as any).code;
  }
  protected createFilter(): FindOptionsWhere<CurrencyEntity> { return {}; }
}
