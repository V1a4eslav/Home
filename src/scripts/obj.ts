// 1.Составьте алгоритм, который считает, сколько времени вам нужно на
// приготовление яиц. Правила:
// -Яйца варить 5 минут
// -Вместительность емкости не более 5 яиц одновременно
function getCookingTime(eggsAmount: number) {
    return Math.ceil(eggsAmount / 5) * 5;
}

// 2.Получая массив чисел.Все они либо нечетные, либо четные, кроме
// одного.Тебе нужно его найти.
function getNumber(array: number[]) {
    let evenArray = array.filter(el => el % 2 === 0);
    return (evenArray.length === 1) ? evenArray[0] : array.find(el => el % 2 !== 0);
}

// 3. Принимая массив объектов и случайную строку.У объектов может
// быть ключ: «title» с разными значениями.Создайте алгоритм, который
// фильтрует массив, заданный как первый параметр, и возвращает
// массив объектов, которые содержат в своих заголовках заданную строку
// в качестве второго параметра(без учета регистра).

type TTitle = {
    title?: string,
    user?: string
}

const arr = [
    { title: "Some title1" },
    { Title: " like JS!" },
    { user: "This obj doesn’t have key title js" },
    { title: "Js - is the best!" },
];
const newArr: unknown[] = [];

function filterTitle(array: TTitle[], subString: string) {
    array.forEach(element => {
        const arrEntries = Object.entries(element);
        for (const [key, value] of arrEntries) {
            if (key === 'title' && value.toLowerCase().includes(subString.toLowerCase())) {
                newArr.push(arrEntries);
            }
        }
        return newArr;
    });
}

// 4. Принимая строку, ваша функция должна вернуть обьект, в котором
// ключи – символы строки, значение – количество повторений символов в
// строке
function countCharacters(string: string) {
    const result = {};
    const arrString = string.split('');
    arrString.forEach(element => {
        result[element] = (arrString.filter(item => item === element).length);
    });
    return result;
}

// 5. Принимая число, ваша функция должна найти следующий
// положительный палиндром большего размера.
function getNextPalindrome(number: number): number {
    let result = ++number;
    while (isNotPalindrome(result)) {
        result++;
    }
    return result;
}

function isNotPalindrome(number: number): boolean {
    const numberString = String(number);
    const reversedArgument = numberString.split('').reverse().join('');
    return numberString !== reversedArgument ? true : false;
}

// 6. Создать структуру данных Set, используя объект, создать методы add, remove, has
export type TSet = {
    add(value: any): any,
    has(value: any): boolean,
    delete(value: any): void,
    generateKey(): number,
    isEqual(element: any, value: any): boolean
};

const objSet: TSet = {
    add(value: any) {
        if (!Object.values(this).includes(value)) {
            this[this.genereteKey()] = value;
        }
        return this;
    },
    has(value: any) {
        let result = false;
        Object.values(this).forEach((element) => {
            if (typeof value === 'object') {
                if (this.isEqual(JSON.stringify(element), JSON.stringify(value))) {
                    result = true;
                }
            } else {
                if (this.isEqual(element, value)) result = true;
            }
        });
        return result;
    },
    delete(value: any) {
        Object.entries(this).forEach(element => {
            if (JSON.stringify(element[1]) === JSON.stringify(value)) {
                delete this[+element[0]];
            }
        });
    },
    generateKey(): number {
        return Object.keys(this).length;
    },
    isEqual(element, value) {
        return element === value;
    },
};
const set: Set<TSet> = Object.create(objSet);