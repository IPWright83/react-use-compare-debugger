# react-use-compare-debugger

This React hook enables you to compare two different sets of props/state between re-renders. It's designed to aid with debugging to help determine why React components are re-rendering by offering a redux style console output.

![image](https://user-images.githubusercontent.com/1374775/102356757-85b02780-3fa5-11eb-8d29-8ec03511526e.png)

It logs the name of the property, followed by both the `previous` and `current` values.
Finally it renders a flag indicating whether the two values are referentially equal which is important to prevent un-necessary React re-renders.

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

## Thanks

Thanks to LogRocket - this was inspired by their blog post https://blog.logrocket.com/how-to-get-previous-props-state-with-react-hooks/ and a need for some debugging.
