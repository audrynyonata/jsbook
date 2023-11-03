export const demo = [
  {
    id: 'demo-1',
    type: 'text',
    content:
      '# JSBook\nWelcome to JSBook!\n\nThis is an interactive coding environment. You can write Javascript, see it executed, and write comprehensive documentation using markdown.\n- Click any text cell (including this one) to edit it\n- The code in each code editor is all joined together into one file. If you define a variable in cell #1, you can refer to it in any following cell!\n- You can show any React component, string, number, or anything else by calling the `print` function. This is a function built into this environment. Call `print` multiple times to show multiple values\n- Re-order or delete cells using the buttons on the top right\n- Add new cells by hovering on the divider between each cell\nIf installed with the cli, you can get all of your changes saved into a file. As example, try running `npx jsbook-audrynyonata serve example.js`. All the text and code you write will be saved to the `<your-dir>/example.js` file."',
  },
  {
    id: 'demo-2',
    type: 'code',
    content:
      "import { useState } from 'react';\n\nconst Counter = () => {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <button onClick={() => setCount(count + 1)}>Click</button>\n      <h3>Count: {count}</h3>\n    </div>\n  );\n};",
  },
  {
    id: 'demo-4',
    type: 'code',
    content:
      '// Display any variable or React Component by calling print\nprint(<Counter />);',
  },
  {
    id: 'demo-5',
    type: 'code',
    content:
      '// print list\nconst fruits = ["Banana", "Orange", "Mango", "Apple"];\nprint(fruits);\n\n// print each entry into a new line\nprint("-----------------------------------------");\nfruits.forEach(fruit => print(fruit));\n\n// print (w/ custom delimiter)\nprint("-----------------------------------------");\nfruits.forEach(fruit => print(fruit, end=". "));',
  },
  {
    id: 'demo-3',
    type: 'text',
    content:
      'Visit our GitHub: [https://github.com/audrynyonata/jsbook](https://github.com/audrynyonata/jsbook)  \nAlso available for download via [NPM](https://www.npmjs.com/package/jsbook-audrynyonata).  ',
  },
];
