import type { Quote } from '../types';

// Daily quotes about money, finance, and wisdom
// Paste your 365 quotes array here in the format:
// const dailyQuotes: Quote[] = [
//   {
//     id: "1",
//     text: "Your first quote here",
//     author: "Author Name"
//   },
//   {
//     id: "2", 
//     text: "Your second quote here",
//     author: "Author Name"
//   },
//   // ... continue for all 365 quotes
// ];

// Placeholder array - replace with your actual quotes
const dailyQuotes: Quote[] = [
    {
        id: "1",
        text: "A penny saved is a penny earned.",
        author: "Benjamin Franklin"
    },
    {
        id: "2",
        text: "The plans of the diligent lead to profit as surely as haste leads to poverty.",
        author: "Proverbs 21:5"
    },
    {
        id: "3",
        text: "Every coin saved is a seed planted for tomorrow’s freedom.",
        author: "Inspired Thought"
    },
    {
        id: "4",
        text: "True wealth is measured not by what you consume, but by what you steward well.",
        author: "Inspired Thought"
    },
    {
        id: "5",
        text: "He who buys what he does not need, steals from himself.",
        author: "Swedish Proverb"
    },
    {
        id: "6",
        text: "The borrower is servant to the lender.",
        author: "Proverbs 22:7"
    },
    {
        id: "7",
        text: "Small savings today grow into great security tomorrow.",
        author: "Inspired Thought"
    },
    {
        id: "8",
        text: "Riches do not profit in the day of wrath, but righteousness delivers from death.",
        author: "Proverbs 11:4"
    },
    {
        id: "9",
        text: "Do not save what is left after spending, but spend what is left after saving.",
        author: "Warren Buffett"
    },
    {
        id: "10",
        text: "A faithful man will abound with blessings, but whoever hastens to be rich will not go unpunished.",
        author: "Proverbs 28:20"
    },
    {
        id: "11",
        text: "The art is not in making money, but in keeping it.",
        author: "Proverb"
    },
    {
        id: "12",
        text: "Discipline today creates freedom tomorrow.",
        author: "Inspired Thought"
    },
    {
        id: "13",
        text: "Whoever loves pleasure will become poor; whoever loves wine and olive oil will never be rich.",
        author: "Proverbs 21:17"
    },
    {
        id: "14",
        text: "It is not the man who has too little, but the man who craves more, that is poor.",
        author: "Seneca"
    },
    {
        id: "15",
        text: "Money is a wonderful servant but a terrible master.",
        author: "Proverb"
    },
    {
        id: "16",
        text: "Stewardship is not about what you own, but about how faithfully you manage what God has given.",
        author: "Inspired Thought"
    },
    {
        id: "17",
        text: "Lazy hands make for poverty, but diligent hands bring wealth.",
        author: "Proverbs 10:4"
    },
    {
        id: "18",
        text: "The goal is not to live rich, but to live free.",
        author: "Inspired Thought"
    },
    {
        id: "19",
        text: "Do not wear yourself out to get rich; do not trust your own cleverness.",
        author: "Proverbs 23:4"
    },
    {
        id: "20",
        text: "If you buy things you don’t need, soon you will have to sell things you do need.",
        author: "Warren Buffett"
    },
    {
        id: "21",
        text: "Money grows where it is respected and managed with care.",
        author: "Inspired Thought"
    },
    {
        id: "22",
        text: "The wise store up choice food and olive oil, but fools gulp theirs down.",
        author: "Proverbs 21:20"
    },
    {
        id: "23",
        text: "Do not despise small beginnings; every fortune starts with a single saved coin.",
        author: "Inspired Thought"
    },
    {
        id: "24",
        text: "Empty pockets never held anyone back. Only empty heads and empty hearts can do that.",
        author: "Norman Vincent Peale"
    },
    {
        id: "25",
        text: "An investment in knowledge pays the best interest.",
        author: "Benjamin Franklin"
    },
    {
        id: "26",
        text: "Wealth not earned is soon spent; wealth earned with labor endures.",
        author: "Inspired Thought"
    },
    {
        id: "27",
        text: "The sluggard does not plow in season; so at harvest time he looks but finds nothing.",
        author: "Proverbs 20:4"
    },
    {
        id: "28",
        text: "The first rule of compounding: never interrupt it unnecessarily.",
        author: "Charlie Munger"
    },
    {
        id: "29",
        text: "Saving is a sign of wisdom; wasting is a sign of weakness.",
        author: "Inspired Thought"
    },
    {
        id: "30",
        text: "Honor the Lord with your wealth, with the firstfruits of all your crops.",
        author: "Proverbs 3:9"
    },
    {
        id: "31",
        text: "Wealth consists not in having great possessions, but in having few wants.",
        author: "Epictetus"
    },
    {
        id: "32",
        text: "Small steps of discipline lead to giant leaps of financial freedom.",
        author: "Inspired Thought"
    },
    {
        id: "33",
        text: "For where your treasure is, there your heart will be also.",
        author: "Matthew 6:21"
    },
    {
        id: "34",
        text: "Frugality includes all the other virtues.",
        author: "Cicero"
    },
    {
        id: "35",
        text: "Wealth is not evil; waste is.",
        author: "Inspired Thought"
    },
    {
        id: "36",
        text: "Go to the ant, you sluggard; consider its ways and be wise!",
        author: "Proverbs 6:6"
    },
    {
        id: "37",
        text: "Riches are not an end in themselves but a tool for greater service.",
        author: "Inspired Thought"
    },
    {
        id: "38",
        text: "The habit of saving is itself an education; it fosters every virtue.",
        author: "T.T. Munger"
    },
    {
        id: "39",
        text: "Better a little with the fear of the Lord than great wealth with turmoil.",
        author: "Proverbs 15:16"
    },
    {
        id: "40",
        text: "Financial peace isn’t the absence of money problems, but the presence of wise habits.",
        author: "Inspired Thought"
    },
    {
        id: "41",
        text: "He who will not economize will have to agonize.",
        author: "Confucius"
    },
    {
        id: "42",
        text: "Money saved is time bought back later.",
        author: "Inspired Thought"
    },
    {
        id: "43",
        text: "In the house of the wise are stores of choice food and oil, but a foolish man devours all he has.",
        author: "Proverbs 21:20"
    },
    {
        id: "44",
        text: "Spend less than you earn, and you will never know chains.",
        author: "Inspired Thought"
    },
    {
        id: "45",
        text: "Wealth gained hastily will dwindle, but whoever gathers little by little will increase it.",
        author: "Proverbs 13:11"
    },
    {
        id: "46",
        text: "The richest man is not he who has the most, but he who needs the least.",
        author: "Unknown"
    },
    {
        id: "47",
        text: "Savings are silent servants that speak loudly in times of need.",
        author: "Inspired Thought"
    },
    {
        id: "48",
        text: "A good man leaves an inheritance to his children’s children.",
        author: "Proverbs 13:22"
    },
    {
        id: "49",
        text: "Money is like fire: it can warm or it can destroy, depending on how it is managed.",
        author: "Inspired Thought"
    },
    {
        id: "50",
        text: "Beware of little expenses; a small leak will sink a great ship.",
        author: "Benjamin Franklin"
    },
    {
        id: "51",
        text: "The fool spends all he has, but the wise save for tomorrow.",
        author: "Inspired Thought"
    },
    {
        id: "52",
        text: "Contentment with little is true wealth.",
        author: "Inspired Thought"
    },
    {
        id: "53",
        text: "The best time to plant a tree was 20 years ago. The second best time is now.",
        author: "Chinese Proverb"
    },
    {
        id: "54",
        text: "Owe nothing to anyone except to love one another.",
        author: "Romans 13:8"
    },
    {
        id: "55",
        text: "Money in the bank is like oil in the lamp—it keeps the flame alive.",
        author: "Inspired Thought"
    },
    {
        id: "56",
        text: "A wise person saves for the future, but a foolish person spends whatever he gets.",
        author: "Proverbs 21:20"
    },
    {
        id: "57",
        text: "Savings are wages kept on duty while you sleep.",
        author: "Inspired Thought"
    },
    {
        id: "58",
        text: "He who gathers money little by little makes it grow.",
        author: "Proverbs 13:11"
    },
    {
        id: "59",
        text: "If you cannot control your money, you cannot control your future.",
        author: "Inspired Thought"
    },
    {
        id: "60",
        text: "Do not toil to acquire wealth; be discerning enough to desist.",
        author: "Proverbs 23:4"
    },
    {
        id: "61",
        text: "A budget is the backbone of financial freedom.",
        author: "Inspired Thought"
    },
    {
        id: "62",
        text: "The ants are not strong, yet they store up their food in the summer.",
        author: "Proverbs 30:25"
    },
    {
        id: "63",
        text: "Save when you can, not when you must.",
        author: "Inspired Thought"
    },
    {
        id: "64",
        text: "Diligence is the mother of good fortune.",
        author: "Miguel de Cervantes"
    },
    {
        id: "65",
        text: "A fool and his money are soon parted.",
        author: "English Proverb"
    },
    {
        id: "66",
        text: "Live like no one else now, so later you can live and give like no one else.",
        author: "Dave Ramsey"
    },
    {
        id: "67",
        text: "Saving a little every day builds a fortress over time.",
        author: "Inspired Thought"
    },
    {
        id: "68",
        text: "Better is a poor man who walks in integrity than a rich man who is crooked in his ways.",
        author: "Proverbs 28:6"
    },
    {
        id: "69",
        text: "Money flows toward order and away from chaos.",
        author: "Inspired Thought"
    },
    {
        id: "70",
        text: "The diligent find freedom; the wasteful find chains.",
        author: "Inspired Thought"
    },
    {
        id: "71",
        text: "A man who is stingy with his money is often generous with his excuses.",
        author: "Inspired Thought"
    },
    {
        id: "72",
        text: "The rich rule over the poor, and the borrower is slave to the lender.",
        author: "Proverbs 22:7"
    },
    {
        id: "73",
        text: "Wealth without wisdom is wasted opportunity.",
        author: "Inspired Thought"
    },
    {
        id: "74",
        text: "Do not despise the day of small savings; great things are built with patience.",
        author: "Inspired Thought"
    },
    {
        id: "75",
        text: "Time is more valuable than money. You can get more money, but you cannot get more time.",
        author: "Jim Rohn"
    },
    {
        id: "76",
        text: "Financial health begins with gratitude for what you already have.",
        author: "Inspired Thought"
    },
    {
        id: "77",
        text: "Dishonest money dwindles away, but whoever gathers money little by little makes it grow.",
        author: "Proverbs 13:11"
    },
    {
        id: "78",
        text: "The hand of the diligent will rule, while the slothful will be put to forced labor.",
        author: "Proverbs 12:24"
    },
    {
        id: "79",
        text: "Never spend your money before you have it.",
        author: "Thomas Jefferson"
    },
    {
        id: "80",
        text: "Contentment makes a poor man rich; discontent makes a rich man poor.",
        author: "Benjamin Franklin"
    },
    {
        id: "81",
        text: "Stewardship means making every dollar a tool for purpose, not a toy for impulse.",
        author: "Inspired Thought"
    },
    {
        id: "82",
        text: "Ill-gotten treasures have no lasting value, but righteousness delivers from death.",
        author: "Proverbs 10:2"
    },
    {
        id: "83",
        text: "Don’t let small leaks sink your ship. Watch the details.",
        author: "Inspired Thought"
    },
    {
        id: "84",
        text: "Industry, thrift, and self-control are not just economic virtues but spiritual ones.",
        author: "Inspired Thought"
    },
    {
        id: "85",
        text: "He who is faithful in little will be faithful in much.",
        author: "Luke 16:10"
    },
    {
        id: "86",
        text: "The habit of saving is more important than the amount saved.",
        author: "Inspired Thought"
    },
    {
        id: "87",
        text: "Wealth and honor come from you; you are the ruler of all things.",
        author: "1 Chronicles 29:12"
    },
    {
        id: "88",
        text: "Wealth built on lies and shortcuts cannot stand.",
        author: "Inspired Thought"
    },
    {
        id: "89",
        text: "The man who chases two rabbits catches neither; the man who chases too many luxuries saves nothing.",
        author: "Inspired Thought"
    },
    {
        id: "90",
        text: "Money is a terrible master but an excellent servant.",
        author: "P.T. Barnum"
    },
    {
        id: "91",
        text: "Store up treasures in heaven, where moth and rust do not destroy.",
        author: "Matthew 6:20"
    },
    {
        id: "92",
        text: "A well-ordered wallet reflects a well-ordered heart.",
        author: "Inspired Thought"
    },
    {
        id: "93",
        text: "The wealth of the wise is their crown, but the folly of fools yields folly.",
        author: "Proverbs 14:24"
    },
    {
        id: "94",
        text: "Don’t confuse wants with needs. Your savings depend on the difference.",
        author: "Inspired Thought"
    },
    {
        id: "95",
        text: "Riches obtained quickly will vanish, but patient labor brings growth.",
        author: "Inspired Thought"
    },
    {
        id: "96",
        text: "Do not wear yourself out trying to get rich. Be wise enough to know when to stop.",
        author: "Proverbs 23:4"
    },
    {
        id: "97",
        text: "Save for the future, for you do not know what tomorrow may bring.",
        author: "Inspired Thought"
    },
    {
        id: "98",
        text: "Better is little with righteousness than great revenues with injustice.",
        author: "Proverbs 16:8"
    },
    {
        id: "99",
        text: "Discipline with money is discipline with life itself.",
        author: "Inspired Thought"
    },
    {
        id: "100",
        text: "Money is multiplied in the hands of the disciplined.",
        author: "Inspired Thought"
    },
    {
        id: "101",
        text: "Financial freedom is not about having more, but about needing less.",
        author: "Inspired Thought"
    },
    {
        id: "102",
        text: "The crown of the wise is their wealth, but the folly of fools brings folly.",
        author: "Proverbs 14:24"
    },
    {
        id: "103",
        text: "The safest way to double your money is to fold it over once and put it in your pocket.",
        author: "Kin Hubbard"
    },
    {
        id: "104",
        text: "Every dollar saved is a soldier prepared for the battles of tomorrow.",
        author: "Inspired Thought"
    },
    {
        id: "105",
        text: "Do not trust in riches, but in Him who richly provides.",
        author: "1 Timothy 6:17"
    },
    {
        id: "106",
        text: "Money grows best in the soil of patience.",
        author: "Inspired Thought"
    },
    {
        id: "107",
        text: "A slack hand causes poverty, but the hand of the diligent makes rich.",
        author: "Proverbs 10:4"
    },
    {
        id: "108",
        text: "To be rich is not what you have in your bank, but what you have in your habits.",
        author: "Inspired Thought"
    },
    {
        id: "109",
        text: "Wealth is not his who has it, but his who enjoys it.",
        author: "Benjamin Franklin"
    },
    {
        id: "110",
        text: "If your outgo exceeds your income, your upkeep will be your downfall.",
        author: "Proverb"
    },
    {
        id: "111",
        text: "Good planning and hard work lead to prosperity, but hasty shortcuts lead to poverty.",
        author: "Proverbs 21:5"
    },
    {
        id: "112",
        text: "Every coin you save is a lesson in self-control.",
        author: "Inspired Thought"
    },
    {
        id: "113",
        text: "Do not hoard for greed, but save for stewardship.",
        author: "Inspired Thought"
    },
    {
        id: "114",
        text: "Wealth obtained by vanity shall be diminished, but he who gathers by labor shall increase.",
        author: "Proverbs 13:11"
    },
    {
        id: "115",
        text: "It is not the man who has little, but the man who desires more, that is poor.",
        author: "Seneca"
    },
    {
        id: "116",
        text: "Savings are invisible at first, but one day they speak loudly.",
        author: "Inspired Thought"
    },
    {
        id: "117",
        text: "The rich man is wise in his own eyes, but the poor who has understanding sees through him.",
        author: "Proverbs 28:11"
    },
    {
        id: "118",
        text: "A budget is more about values than about numbers.",
        author: "Dave Ramsey"
    },
    {
        id: "119",
        text: "Money, like emotions, is something you must control to keep your life on track.",
        author: "Inspired Thought"
    },
    {
        id: "120",
        text: "Whoever oppresses the poor to increase his own wealth, or gives to the rich, will only come to poverty.",
        author: "Proverbs 22:16"
    },
    {
        id: "121",
        text: "Frugality isn’t deprivation; it’s direction.",
        author: "Inspired Thought"
    },
    {
        id: "122",
        text: "The wealth of the wise grows slowly, the wealth of the foolish disappears quickly.",
        author: "Inspired Thought"
    },
    {
        id: "123",
        text: "Do not let your money manage you; manage your money instead.",
        author: "Inspired Thought"
    },
    {
        id: "124",
        text: "The love of money is the root of all kinds of evil.",
        author: "1 Timothy 6:10"
    },
    {
        id: "125",
        text: "When you save, you are paying your future self.",
        author: "Inspired Thought"
    },
    {
        id: "126",
        text: "If you cannot save on a small income, you will not save on a large one.",
        author: "Inspired Thought"
    },
    {
        id: "127",
        text: "The integrity of the upright guides them, but the unfaithful are destroyed by their duplicity.",
        author: "Proverbs 11:3"
    },
    {
        id: "128",
        text: "Wealth is not just what you accumulate, but what you cultivate.",
        author: "Inspired Thought"
    },
    {
        id: "129",
        text: "Do not let greed choke your savings; let gratitude fuel them.",
        author: "Inspired Thought"
    },
    {
        id: "130",
        text: "Lazy hands make a man poor, but diligent hands bring wealth.",
        author: "Proverbs 10:4"
    },
    {
        id: "131",
        text: "Money saved in silence speaks volumes in crises.",
        author: "Inspired Thought"
    },
    {
        id: "132",
        text: "A fortune may be lost by one foolish purchase.",
        author: "Inspired Thought"
    },
    {
        id: "133",
        text: "True wealth is not in what we keep, but in what we give.",
        author: "Inspired Thought"
    },
    {
        id: "134",
        text: "Riches are fleeting, but wisdom in handling money endures.",
        author: "Inspired Thought"
    },
    {
        id: "135",
        text: "The rich think of tomorrow; the poor only of today.",
        author: "Inspired Thought"
    },
    {
        id: "136",
        text: "A simple life often leads to greater financial peace.",
        author: "Inspired Thought"
    },
    {
        id: "137",
        text: "Those who trust in their riches will fall, but the righteous will thrive like a green leaf.",
        author: "Proverbs 11:28"
    },
    {
        id: "138",
        text: "An ounce of prevention in spending is worth a pound of cure in debt.",
        author: "Inspired Thought"
    },
    {
        id: "139",
        text: "The wise man saves for winter while the fool spends in summer.",
        author: "Inspired Thought"
    },
    {
        id: "140",
        text: "To acquire wealth dishonestly is to build a house on sand.",
        author: "Inspired Thought"
    },
    {
        id: "141",
        text: "The blessing of the Lord brings wealth, without painful toil for it.",
        author: "Proverbs 10:22"
    },
    {
        id: "142",
        text: "Do not compare your wallet with others; compare it with your responsibilities.",
        author: "Inspired Thought"
    },
    {
        id: "143",
        text: "Saving is not about what you can’t have, but about what you can build.",
        author: "Inspired Thought"
    },
    {
        id: "144",
        text: "Wealth gained by injustice will be lost; only righteous gain will endure.",
        author: "Inspired Thought"
    },
    {
        id: "145",
        text: "The sluggard’s craving will be the death of him, because his hands refuse to work.",
        author: "Proverbs 21:25"
    },
    {
        id: "146",
        text: "The money you waste today is the opportunity you lose tomorrow.",
        author: "Inspired Thought"
    },
    {
        id: "147",
        text: "To be wise with money is to be wise with life itself.",
        author: "Inspired Thought"
    },
    {
        id: "148",
        text: "A house built on debt will not stand in the storm.",
        author: "Inspired Thought"
    },
    {
        id: "149",
        text: "The secret to wealth is simple: spend less than you earn and invest the rest.",
        author: "Inspired Thought"
    },
    {
        id: "150",
        text: "The fruit of the righteous is a tree of life, and he who wins souls is wise.",
        author: "Proverbs 11:30"
    },
    {
        id: "151",
        text: "When you spend less than you earn, you buy peace for tomorrow.",
        author: "Inspired Thought"
    },
    {
        id: "152",
        text: "The borrower is servant to the lender.",
        author: "Proverbs 22:7"
    },
    {
        id: "153",
        text: "Discipline with money today becomes freedom with choices tomorrow.",
        author: "Inspired Thought"
    },
    {
        id: "154",
        text: "Do not despise small beginnings; every fortune was once a single coin.",
        author: "Inspired Thought"
    },
    {
        id: "155",
        text: "Money is a great servant but a terrible master.",
        author: "Francis Bacon"
    },
    {
        id: "156",
        text: "Save for a rainy day; storms always come unannounced.",
        author: "Inspired Thought"
    },
    {
        id: "157",
        text: "An inheritance quickly gained at the beginning will not be blessed at the end.",
        author: "Proverbs 20:21"
    },
    {
        id: "158",
        text: "When you learn to manage the little, you are preparing for the much.",
        author: "Inspired Thought"
    },
    {
        id: "159",
        text: "He that goes a-borrowing, goes a-sorrowing.",
        author: "Benjamin Franklin"
    },
    {
        id: "160",
        text: "A clear plan is the compass of wise finances.",
        author: "Inspired Thought"
    },
    {
        id: "161",
        text: "Better is a little with righteousness than great revenues without justice.",
        author: "Proverbs 16:8"
    },
    {
        id: "162",
        text: "Don’t chase wealth—chase wisdom, and wealth will follow.",
        author: "Inspired Thought"
    },
    {
        id: "163",
        text: "Small leaks sink great ships; small expenses ruin great incomes.",
        author: "Benjamin Franklin"
    },
    {
        id: "164",
        text: "A saver today is a giver tomorrow.",
        author: "Inspired Thought"
    },
    {
        id: "165",
        text: "Lazy hands make for poverty, but diligent hands bring wealth.",
        author: "Proverbs 10:4"
    },
    {
        id: "166",
        text: "Every unnecessary expense is a chain you place on your own future.",
        author: "Inspired Thought"
    },
    {
        id: "167",
        text: "Beware of little expenses; a small leak will sink a great ship.",
        author: "Benjamin Franklin"
    },
    {
        id: "168",
        text: "Give freely, and you will gain even more; withhold unduly, and you come to poverty.",
        author: "Proverbs 11:24"
    },
    {
        id: "169",
        text: "The path to financial freedom is paved with daily choices.",
        author: "Inspired Thought"
    },
    {
        id: "170",
        text: "Do not spend the money you hope to have tomorrow.",
        author: "Inspired Thought"
    },
    {
        id: "171",
        text: "He who is faithful in little will also be faithful in much.",
        author: "Luke 16:10"
    },
    {
        id: "172",
        text: "Wealth is built not in sudden windfalls but in patient seasons.",
        author: "Inspired Thought"
    },
    {
        id: "173",
        text: "Creditors have better memories than debtors.",
        author: "Benjamin Franklin"
    },
    {
        id: "174",
        text: "The wise save for the future, but the foolish spend whatever they get.",
        author: "Proverbs 21:20"
    },
    {
        id: "175",
        text: "Money saved is a tool; money wasted is a trap.",
        author: "Inspired Thought"
    },
    {
        id: "176",
        text: "An investment in knowledge pays the best interest.",
        author: "Benjamin Franklin"
    },
    {
        id: "177",
        text: "Every budget is a vision written in numbers.",
        author: "Inspired Thought"
    },
    {
        id: "178",
        text: "The crown of the wise is their wealth, but the folly of fools brings folly.",
        author: "Proverbs 14:24"
    },
    {
        id: "179",
        text: "Wealth comes from consistency, not convenience.",
        author: "Inspired Thought"
    },
    {
        id: "180",
        text: "Be not made a beggar by banqueting on borrowing.",
        author: "Ecclesiasticus 18:33"
    },
    {
        id: "181",
        text: "Stewardship is the art of managing what isn’t really ours.",
        author: "Inspired Thought"
    },
    {
        id: "182",
        text: "Industry, frugality, and prudence are the foundation of fortune.",
        author: "Benjamin Franklin"
    },
    {
        id: "183",
        text: "Greed brings grief to the whole family, but those who hate bribes will live.",
        author: "Proverbs 15:27"
    },
    {
        id: "184",
        text: "The habit of saving transforms coins into castles.",
        author: "Inspired Thought"
    },
    {
        id: "185",
        text: "Rather go to bed without dinner than to rise in debt.",
        author: "Benjamin Franklin"
    },
    {
        id: "186",
        text: "An honest day’s work brings more peace than ill-gotten gain.",
        author: "Inspired Thought"
    },
    {
        id: "187",
        text: "The wise man saves for the future, but the foolish man spends whatever he gets.",
        author: "Proverbs 21:20"
    },
    {
        id: "188",
        text: "Money is multiplied by patience and diminished by haste.",
        author: "Inspired Thought"
    },
    {
        id: "189",
        text: "Wealth consists not in having great possessions, but in having few wants.",
        author: "Epictetus"
    },
    {
        id: "190",
        text: "Do not eat the seed you were meant to plant.",
        author: "Inspired Thought"
    },
    {
        id: "191",
        text: "Honor the Lord with your wealth and with the firstfruits of all your produce.",
        author: "Proverbs 3:9"
    },
    {
        id: "192",
        text: "When you master money, you master only one tool; when money masters you, you lose yourself.",
        author: "Inspired Thought"
    },
    {
        id: "193",
        text: "The diligent hand brings wealth, but idleness leads to forced labor.",
        author: "Proverbs 12:24"
    },
    {
        id: "194",
        text: "Live simply today so you can live securely tomorrow.",
        author: "Inspired Thought"
    },
    {
        id: "195",
        text: "Beware of pride in riches; they can vanish like the morning mist.",
        author: "Inspired Thought"
    },
    {
        id: "196",
        text: "The love of money is the root of all kinds of evil.",
        author: "1 Timothy 6:10"
    },
    {
        id: "197",
        text: "Money is like fire: it can warm your house or burn it down.",
        author: "Inspired Thought"
    },
    {
        id: "198",
        text: "Whoever loves pleasure will become poor; whoever loves wine and oil will never be rich.",
        author: "Proverbs 21:17"
    },
    {
        id: "199",
        text: "Generosity multiplies what selfishness diminishes.",
        author: "Inspired Thought"
    },
    {
        id: "200",
        text: "Do not spend your treasure to gain another’s approval.",
        author: "Inspired Thought"
    }, {
        id: "201",
        text: "A wise person thinks ahead; a fool doesn’t, and even brags about it.",
        author: "Proverbs 13:16"
    },
    {
        id: "202",
        text: "Money is a tool—use it well and it builds, use it poorly and it breaks.",
        author: "Inspired Thought"
    },
    {
        id: "203",
        text: "Wealth gained hastily will dwindle, but whoever gathers little by little will increase it.",
        author: "Proverbs 13:11"
    },
    {
        id: "204",
        text: "Do not let lifestyle rise faster than income.",
        author: "Inspired Thought"
    },
    {
        id: "205",
        text: "Money grows where self-control is planted.",
        author: "Inspired Thought"
    },
    {
        id: "206",
        text: "Owe no one anything, except to love each other.",
        author: "Romans 13:8"
    },
    {
        id: "207",
        text: "Wealth is the result of habits, not windfalls.",
        author: "Inspired Thought"
    },
    {
        id: "208",
        text: "Don’t store up treasures on earth, where moths eat and rust destroys.",
        author: "Matthew 6:19"
    },
    {
        id: "209",
        text: "Budgeting is the art of living on purpose, not by accident.",
        author: "Inspired Thought"
    },
    {
        id: "210",
        text: "The glory of young men is their strength, but the splendor of old men is their gray hair.",
        author: "Proverbs 20:29"
    },
    {
        id: "211",
        text: "Every purchase is a trade: today’s comfort for tomorrow’s freedom.",
        author: "Inspired Thought"
    },
    {
        id: "212",
        text: "In the house of the wise are stores of choice food and oil, but a foolish man devours all he has.",
        author: "Proverbs 21:20"
    },
    {
        id: "213",
        text: "He that cannot obey cannot command—even his own wallet.",
        author: "Benjamin Franklin"
    },
    {
        id: "214",
        text: "Live with margin: life is lighter without the burden of debt.",
        author: "Inspired Thought"
    },
    {
        id: "215",
        text: "Better a dry crust with peace and quiet than a house full of feasting, with strife.",
        author: "Proverbs 17:1"
    },
    {
        id: "216",
        text: "Do not let money slip through your fingers unnoticed; count it, guard it, guide it.",
        author: "Inspired Thought"
    },
    {
        id: "217",
        text: "He who loves money will not be satisfied with money.",
        author: "Ecclesiastes 5:10"
    },
    {
        id: "218",
        text: "The strongest financial strategy is consistency over time.",
        author: "Inspired Thought"
    },
    {
        id: "219",
        text: "Riches do not profit in the day of wrath, but righteousness delivers from death.",
        author: "Proverbs 11:4"
    },
    {
        id: "220",
        text: "Spend less than you earn, and you will always walk in freedom.",
        author: "Inspired Thought"
    },
    {
        id: "221",
        text: "Wealth is not his that has it, but his that enjoys it rightly.",
        author: "Benjamin Franklin"
    },
    {
        id: "222",
        text: "Money magnifies character: it makes the generous more generous and the selfish more selfish.",
        author: "Inspired Thought"
    },
    {
        id: "223",
        text: "Honor the Lord with your wealth, then your barns will be filled to overflowing.",
        author: "Proverbs 3:9-10"
    },
    {
        id: "224",
        text: "Your financial future is hidden in today’s decisions.",
        author: "Inspired Thought"
    },
    {
        id: "225",
        text: "The fool and his money are soon parted.",
        author: "Thomas Tusser"
    },
    {
        id: "226",
        text: "Debt promises freedom today but steals it tomorrow.",
        author: "Inspired Thought"
    },
    {
        id: "227",
        text: "Good planning and hard work lead to prosperity, but hasty shortcuts lead to poverty.",
        author: "Proverbs 21:5"
    },
    {
        id: "228",
        text: "Frugality is not deprivation, it is direction.",
        author: "Inspired Thought"
    },
    {
        id: "229",
        text: "Contentment makes a poor man rich; discontent makes a rich man poor.",
        author: "Benjamin Franklin"
    },
    {
        id: "230",
        text: "You can’t manage what you don’t measure; write it down, track it, master it.",
        author: "Inspired Thought"
    },
    {
        id: "231",
        text: "The righteous give generously; their children will be a blessing after them.",
        author: "Proverbs 37:26"
    },
    {
        id: "232",
        text: "Guard against impulse, for it spends your future before it arrives.",
        author: "Inspired Thought"
    },
    {
        id: "233",
        text: "He that would live in peace and at ease, must not speak all he knows or spend all he has.",
        author: "Benjamin Franklin"
    },
    {
        id: "234",
        text: "Do not envy the spender’s appearance; envy the saver’s foundation.",
        author: "Inspired Thought"
    },
    {
        id: "235",
        text: "Those who work their land will have abundant food, but those who chase fantasies will have their fill of poverty.",
        author: "Proverbs 28:19"
    },
    {
        id: "236",
        text: "Savings are silent victories; they prepare you for loud storms.",
        author: "Inspired Thought"
    },
    {
        id: "237",
        text: "The diligent find freedom; the lazy find chains.",
        author: "Inspired Thought"
    },
    {
        id: "238",
        text: "The ants are not strong, yet they store up their food in the summer.",
        author: "Proverbs 30:25"
    },
    {
        id: "239",
        text: "If you buy what you don’t need, soon you’ll sell what you do.",
        author: "Inspired Thought"
    },
    {
        id: "240",
        text: "Sloth makes all things difficult, but industry all things easy.",
        author: "Benjamin Franklin"
    },
    {
        id: "241",
        text: "Money cannot buy wisdom, but wisdom can protect your money.",
        author: "Inspired Thought"
    },
    {
        id: "242",
        text: "The fear of the Lord leads to life; then one rests content, untouched by trouble.",
        author: "Proverbs 19:23"
    },
    {
        id: "243",
        text: "Riches may vanish, but character compounds forever.",
        author: "Inspired Thought"
    },
    {
        id: "244",
        text: "Prosperity is not just having money; it’s managing it well.",
        author: "Inspired Thought"
    },
    {
        id: "245",
        text: "Money makes a good servant but a bad master.",
        author: "Inspired Thought"
    },
    {
        id: "246",
        text: "Whoever loves discipline loves knowledge, but whoever hates correction is stupid.",
        author: "Proverbs 12:1"
    },
    {
        id: "247",
        text: "Contentment is the foundation of true wealth.",
        author: "Inspired Thought"
    },
    {
        id: "248",
        text: "Wealth is not to feed our egos, but to feed the hungry.",
        author: "Inspired Thought"
    },
    {
        id: "249",
        text: "Diligence today writes tomorrow’s abundance.",
        author: "Inspired Thought"
    },
    {
        id: "250",
        text: "The rich rule over the poor, and the borrower is slave to the lender.",
        author: "Proverbs 22:7"
    }, {
        id: "251",
        text: "Save today what you can, so you will have tomorrow what you need.",
        author: "Inspired Thought"
    },
    {
        id: "252",
        text: "Do not wear yourself out to get rich; be wise enough to know when to stop.",
        author: "Proverbs 23:4"
    },
    {
        id: "253",
        text: "The man who gathers little by little increases it steadily.",
        author: "Proverbs 13:11"
    },
    {
        id: "254",
        text: "Beware of debt: it is a trap disguised as convenience.",
        author: "Inspired Thought"
    },
    {
        id: "255",
        text: "Wealth comes from effort, patience, and wise decisions, not luck.",
        author: "Inspired Thought"
    },
    {
        id: "256",
        text: "Do not hoard out of fear; save out of wisdom.",
        author: "Inspired Thought"
    },
    {
        id: "257",
        text: "The prudent see danger and take refuge, but the simple keep going and pay the price.",
        author: "Proverbs 22:3"
    },
    {
        id: "258",
        text: "Financial discipline is the bridge between dreams and reality.",
        author: "Inspired Thought"
    },
    {
        id: "259",
        text: "The lazy man does not roast his game, but the diligent man prizes every gain.",
        author: "Proverbs 12:27"
    },
    {
        id: "260",
        text: "Contentment with what you have is real wealth.",
        author: "Inspired Thought"
    },
    {
        id: "261",
        text: "He who oppresses the poor to increase his wealth will come to poverty.",
        author: "Proverbs 22:16"
    },
    {
        id: "262",
        text: "Money is a good servant but a terrible master.",
        author: "Francis Bacon"
    },
    {
        id: "263",
        text: "A budget tells your money where to go instead of wondering where it went.",
        author: "Inspired Thought"
    },
    {
        id: "264",
        text: "Better a little with righteousness than much gain with injustice.",
        author: "Proverbs 16:8"
    },
    {
        id: "265",
        text: "Save consistently, even in small amounts, for compounding works wonders.",
        author: "Inspired Thought"
    },
    {
        id: "266",
        text: "A wise man stores up knowledge, a wiser man stores up savings.",
        author: "Inspired Thought"
    },
    {
        id: "267",
        text: "The diligent find freedom, the wasteful find chains.",
        author: "Inspired Thought"
    },
    {
        id: "268",
        text: "The blessing of the Lord brings wealth without painful toil.",
        author: "Proverbs 10:22"
    },
    {
        id: "269",
        text: "Spending without purpose is like planting seeds in the wind.",
        author: "Inspired Thought"
    },
    {
        id: "270",
        text: "A fool and his money are soon parted.",
        author: "English Proverb"
    },
    {
        id: "271",
        text: "Whoever is faithful with little will be faithful with much.",
        author: "Luke 16:10"
    },
    {
        id: "272",
        text: "The wise man saves for the future; the fool spends as fast as he earns.",
        author: "Inspired Thought"
    },
    {
        id: "273",
        text: "Money is a tool; use it wisely and it builds, misuse it and it destroys.",
        author: "Inspired Thought"
    },
    {
        id: "274",
        text: "Better a dry crust with peace than a house full of feasting with strife.",
        author: "Proverbs 17:1"
    },
    {
        id: "275",
        text: "The way to wealth is to learn to control your desires.",
        author: "Inspired Thought"
    },
    {
        id: "276",
        text: "A penny saved is a penny earned.",
        author: "Benjamin Franklin"
    },
    {
        id: "277",
        text: "Do not be greedy for gain; be diligent and righteous.",
        author: "Proverbs 28:20"
    },
    {
        id: "278",
        text: "Financial wisdom is learned in the small choices every day.",
        author: "Inspired Thought"
    },
    {
        id: "279",
        text: "Do not store up earthly treasures, store up treasures in heaven.",
        author: "Matthew 6:20"
    },
    {
        id: "280",
        text: "The diligent hand brings wealth; the lazy hand leads to poverty.",
        author: "Proverbs 10:4"
    },
    {
        id: "281",
        text: "Money is a servant that multiplies when managed, a master that destroys when worshiped.",
        author: "Inspired Thought"
    },
    {
        id: "282",
        text: "Every coin saved today is a shield against uncertainty tomorrow.",
        author: "Inspired Thought"
    },
    {
        id: "283",
        text: "Debt is a leash; the borrower is servant to the lender.",
        author: "Proverbs 22:7"
    },
    {
        id: "284",
        text: "Wealth is built in seasons, not in a day.",
        author: "Inspired Thought"
    },
    {
        id: "285",
        text: "The love of money leads to destruction; the love of wisdom leads to life.",
        author: "Inspired Thought"
    },
    {
        id: "286",
        text: "Whoever trusts in riches will fall, but the righteous will flourish.",
        author: "Proverbs 11:28"
    },
    {
        id: "287",
        text: "Financial freedom is achieved one disciplined choice at a time.",
        author: "Inspired Thought"
    },
    {
        id: "288",
        text: "Better a little with righteousness than abundant gains with injustice.",
        author: "Proverbs 16:8"
    },
    {
        id: "289",
        text: "Frugality is not limitation; it is the path to liberty.",
        author: "Inspired Thought"
    },
    {
        id: "290",
        text: "Save early, save often, and let time multiply your efforts.",
        author: "Inspired Thought"
    },
    {
        id: "291",
        text: "The sluggard craves, yet has nothing; the diligent is richly supplied.",
        author: "Proverbs 13:4"
    },
    {
        id: "292",
        text: "Financial stewardship is the reflection of character.",
        author: "Inspired Thought"
    },
    {
        id: "293",
        text: "Better a little with integrity than great wealth with dishonesty.",
        author: "Proverbs 28:6"
    },
    {
        id: "294",
        text: "A budget is freedom disguised as numbers.",
        author: "Inspired Thought"
    },
    {
        id: "295",
        text: "Do not chase riches; chase wisdom and riches will follow.",
        author: "Inspired Thought"
    },
    {
        id: "296",
        text: "Money multiplies when patience and diligence are applied.",
        author: "Inspired Thought"
    },
    {
        id: "297",
        text: "The wise saves for the future; the fool spends in haste.",
        author: "Inspired Thought"
    },
    {
        id: "298",
        text: "A disciplined hand brings prosperity, a lazy hand brings want.",
        author: "Proverbs 10:4"
    },
    {
        id: "299",
        text: "Debt is the chains of tomorrow; savings is the freedom of tomorrow.",
        author: "Inspired Thought"
    },
    {
        id: "300",
        text: "A good name is more desirable than great riches; to be esteemed is better than silver or gold.",
        author: "Proverbs 22:1"
    }, {
        id: "301",
        text: "A man’s wealth may ransom his life, but a poor man hears no threat.",
        author: "Proverbs 13:8"
    },
    {
        id: "302",
        text: "The wise save in times of plenty for times of need.",
        author: "Inspired Thought"
    },
    {
        id: "303",
        text: "He who loves money will never have enough; he who loves contentment will always be rich.",
        author: "Inspired Thought"
    },
    {
        id: "304",
        text: "Money is only a tool; it will take you wherever you wish, but it will not replace you as the driver.",
        author: "Ayn Rand"
    },
    {
        id: "305",
        text: "The diligent have plenty, but those who chase fantasies have nothing.",
        author: "Proverbs 28:19"
    },
    {
        id: "306",
        text: "Give generously and you will be enriched; hold back and you will come to poverty.",
        author: "Proverbs 11:24"
    },
    {
        id: "307",
        text: "A penny saved is a victory over tomorrow’s uncertainty.",
        author: "Inspired Thought"
    },
    {
        id: "308",
        text: "Be content with what you have; this is the true wealth.",
        author: "Hebrews 13:5"
    },
    {
        id: "309",
        text: "Wealth is not in what you have, but in what you can do without.",
        author: "Inspired Thought"
    },
    {
        id: "310",
        text: "Do not be misled: bad company ruins good finances.",
        author: "1 Corinthians 15:33"
    },
    {
        id: "311",
        text: "The best investment you can make is in your own wisdom and self-discipline.",
        author: "Inspired Thought"
    },
    {
        id: "312",
        text: "Wise people save for the future; fools spend for the moment.",
        author: "Inspired Thought"
    },
    {
        id: "313",
        text: "The sluggard craves, yet has nothing; the diligent is richly supplied.",
        author: "Proverbs 13:4"
    },
    {
        id: "314",
        text: "Financial freedom is built one disciplined choice at a time.",
        author: "Inspired Thought"
    },
    {
        id: "315",
        text: "Better to have little with fear of the Lord than great treasure with trouble.",
        author: "Proverbs 15:16"
    },
    {
        id: "316",
        text: "Do not spend what you don’t have; save what you do.",
        author: "Inspired Thought"
    },
    {
        id: "317",
        text: "Wealth is preserved through patience, diligence, and discipline.",
        author: "Inspired Thought"
    },
    {
        id: "318",
        text: "Riches may vanish, but wisdom endures forever.",
        author: "Inspired Thought"
    },
    {
        id: "319",
        text: "A good steward of little will be trusted with much.",
        author: "Luke 16:10"
    },
    {
        id: "320",
        text: "He who oppresses the poor for gain brings ruin upon himself.",
        author: "Proverbs 22:16"
    },
    {
        id: "321",
        text: "Financial wisdom is applying knowledge consistently.",
        author: "Inspired Thought"
    },
    {
        id: "322",
        text: "Do not chase wealth for its own sake; pursue integrity, and wealth will follow.",
        author: "Inspired Thought"
    },
    {
        id: "323",
        text: "A frugal life brings peace; extravagance brings anxiety.",
        author: "Inspired Thought"
    },
    {
        id: "324",
        text: "The prudent save for tomorrow; the fool wastes today.",
        author: "Inspired Thought"
    },
    {
        id: "325",
        text: "Give, and it will be given to you; generosity is the currency of blessing.",
        author: "Luke 6:38"
    },
    {
        id: "326",
        text: "The rich rule over the poor, but wisdom lifts the humble.",
        author: "Proverbs 28:16"
    },
    {
        id: "327",
        text: "Debt is bondage; freedom comes from saving and self-control.",
        author: "Inspired Thought"
    },
    {
        id: "328",
        text: "Do not store up treasures for yourself alone; help others along the way.",
        author: "Inspired Thought"
    },
    {
        id: "329",
        text: "Financial discipline is a form of self-respect.",
        author: "Inspired Thought"
    },
    {
        id: "330",
        text: "Money is a magnifier of character, not a creator of it.",
        author: "Inspired Thought"
    },
    {
        id: "331",
        text: "He who is faithful in small matters will be trusted with greater.",
        author: "Luke 16:10"
    },
    {
        id: "332",
        text: "The wise see danger and take refuge; fools continue and pay the price.",
        author: "Proverbs 22:3"
    },
    {
        id: "333",
        text: "True wealth is the ability to meet needs without worry.",
        author: "Inspired Thought"
    },
    {
        id: "334",
        text: "He who gathers little by little will increase it steadily.",
        author: "Proverbs 13:11"
    },
    {
        id: "335",
        text: "The diligent hand brings wealth; the lazy hand brings want.",
        author: "Proverbs 10:4"
    },
    {
        id: "336",
        text: "A man who oppresses the poor to increase his wealth will come to poverty.",
        author: "Proverbs 22:16"
    },
    {
        id: "337",
        text: "Financial freedom is the result of daily choices, not luck.",
        author: "Inspired Thought"
    },
    {
        id: "338",
        text: "Better a little with righteousness than abundant gain with injustice.",
        author: "Proverbs 16:8"
    },
    {
        id: "339",
        text: "The sluggard craves, yet has nothing; the diligent is richly supplied.",
        author: "Proverbs 13:4"
    },
    {
        id: "340",
        text: "Save early, save consistently, and let time multiply your efforts.",
        author: "Inspired Thought"
    },
    {
        id: "341",
        text: "Wealth consists not in having great possessions, but in having few wants.",
        author: "Epictetus"
    },
    {
        id: "342",
        text: "Money saved is a tool; money wasted is a trap.",
        author: "Inspired Thought"
    },
    {
        id: "343",
        text: "The blessing of the Lord brings wealth without painful toil.",
        author: "Proverbs 10:22"
    },
    {
        id: "344",
        text: "Do not be greedy for gain; be diligent and righteous.",
        author: "Proverbs 28:20"
    },
    {
        id: "345",
        text: "Debt promises freedom today but steals it tomorrow.",
        author: "Inspired Thought"
    },
    {
        id: "346",
        text: "Contentment is the foundation of true wealth.",
        author: "Inspired Thought"
    },
    {
        id: "347",
        text: "Financial wisdom is learned in the small choices every day.",
        author: "Inspired Thought"
    },
    {
        id: "348",
        text: "The prudent save for tomorrow; the fool wastes today.",
        author: "Inspired Thought"
    },
    {
        id: "349",
        text: "A good steward of little will be trusted with much.",
        author: "Luke 16:10"
    },
    {
        id: "350",
        text: "Wealth is preserved through patience, diligence, and discipline.",
        author: "Inspired Thought"
    },
    {
        id: "351",
        text: "A budget is freedom disguised as numbers.",
        author: "Inspired Thought"
    },
    {
        id: "352",
        text: "Do not chase wealth for its own sake; pursue integrity, and wealth will follow.",
        author: "Inspired Thought"
    },
    {
        id: "353",
        text: "Financial stewardship is the reflection of character.",
        author: "Inspired Thought"
    },
    {
        id: "354",
        text: "Better a little with integrity than great wealth with dishonesty.",
        author: "Proverbs 28:6"
    },
    {
        id: "355",
        text: "Give generously and you will be enriched; hold back and you will come to poverty.",
        author: "Proverbs 11:24"
    },
    {
        id: "356",
        text: "A penny saved is a victory over tomorrow’s uncertainty.",
        author: "Inspired Thought"
    },
    {
        id: "357",
        text: "Be content with what you have; this is the true wealth.",
        author: "Hebrews 13:5"
    },
    {
        id: "358",
        text: "Debt is bondage; freedom comes from saving and self-control.",
        author: "Inspired Thought"
    },
    {
        id: "359",
        text: "Do not store up treasures for yourself alone; help others along the way.",
        author: "Inspired Thought"
    },
    {
        id: "360",
        text: "Money multiplies when patience and diligence are applied.",
        author: "Inspired Thought"
    },
    {
        id: "361",
        text: "He who is faithful in small matters will be trusted with greater.",
        author: "Luke 16:10"
    },
    {
        id: "362",
        text: "The wise see danger and take refuge; fools continue and pay the price.",
        author: "Proverbs 22:3"
    },
    {
        id: "363",
        text: "True wealth is the ability to meet needs without worry.",
        author: "Inspired Thought"
    },
    {
        id: "364",
        text: "He who gathers little by little will increase it steadily.",
        author: "Proverbs 13:11"
    },
    {
        id: "365",
        text: "A good name is more desirable than great riches; to be esteemed is better than silver or gold.",
        author: "Proverbs 22:1"
    }

];


export default dailyQuotes;
