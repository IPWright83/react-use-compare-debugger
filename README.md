# react-use-compare-debugger

This React hook enables you to compare two different sets of props/state between re-renders. It's designed to aid with debugging to help determine why React components are re-rendering by offering a redux style console output.

![image](https://user-images.githubusercontent.com/1374775/102222521-6e0c6c80-3edb-11eb-994b-2ebff367f135.png)

## Installation

`npm install --save-dev react-use-compare-debugger`

## Usage

To use simply call the `useCompareDebugger` hook from a component where you want to log changes. For example:

```
import useCompareDebugger from "react-use-compare-debugger";

const myHelloWorldComponent = (props) => {

    useCompareDebugger("myHelloWorldComponent", props, ["deepNestedObject"])

    return (<div>Hello World</div>);
}
```

## Parameters

| Parameter  | Type          | Required | Description                                                                                                 |
| ---------- | ------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| component  | String        | ✔        | Should be the name of the component. This is used to group your logs together and help you know the source. |
| value      | Object        | ✔        | This is the object from this render, that you'd like to compare against the previous render.                |
| ignoreKeys | Array<String> |          | An array of key names, used to ignore diving into deep/complex nested objects.                              |
