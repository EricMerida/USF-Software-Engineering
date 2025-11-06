const items = [];

export const addItem = (item) =>
{
	items.push(item);
	console.log(`Item added: ${item}`);
};
export const removeItem = (item) =>
{
	let isRemoved = false;

	for (let i = 0; i < items.length; i++)
	{
		if (items[i] === item)
		{
			isRemoved = true;
			items.splice(i, 1);
			i--;
		}
	}

	if (isRemoved)
	{
		console.log(`Item removed: ${item}`);
	}
	else
	{
		console.log(`Item not exist: ${item}`);
	}
};
export const listItems = () =>
{
	console.log(`Listing all items:`);

	for (const item of items)
	{
		console.log(`* ${item}`);
	}
};
//Manager
import {addItem, removeItem, listItems} from "./inventory.mjs";

addItem("Book");
addItem("Pen");
addItem("Pencil");
listItems();

removeItem("Pen");
listItems();

//exercise #2
import Post from "./Post.mjs";

const myPost = new Post("Hello World", "This is my first post.");
myPost.publish();

export default class Post
{
	constructor (title, content)
	{
		this.title = title;
		this.content = content;
	}

	publish ()
	{
		console.log(`Publishing post: ${this.title}`);
	}
}

//exercise #3
import {capitalize, square} from "./utils/index.mjs";

console.log(capitalize("hello"));
console.log(square(4));

//exerise #4
async function loadConfig ()
{
	const themeModule = await import("./theme.mjs");

	const currentHour = new Date().getHours();

	if (currentHour < 18)
	{
		themeModule.setLightTheme();
	}
	else
	{
		themeModule.setDarkTheme();
	}
}

// Execute the function
loadConfig();
let theme = null;

export const setLightTheme = () =>
{
	console.log("Setting light theme.");
	theme = "light";
};

export const setDarkTheme = () =>
{
	console.log("Setting dark theme.");
	theme = "dark";
};

//exercise #5
import './globalConfig.mjs';
console.log("Welcome to the application! Initializing...");