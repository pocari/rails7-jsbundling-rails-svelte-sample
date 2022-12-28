export const startSvelteComponentWithAppData = (
  component: any,
  targetSelector: string
) => {
  console.log("-----------------");
  console.log(component);
  const dom = document.querySelector(targetSelector)
  const props = JSON.parse(dom.getAttribute('app-data'))
  new component({
    target: dom,
    props: props,
  });
}
