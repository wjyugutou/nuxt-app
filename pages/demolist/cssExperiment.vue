<script lang='ts' setup>
const bg_img_1 = `linear-gradient(to top,#000 0%,#000 50%,transparent 50%,transparent 100%),
  linear-gradient(to right,transparent 0%,transparent 55%,#000 50%,#000 100%)`
const bg_img_2 = `linear-gradient(to right,red 0%,red 50%,#000 50%,#000 100%),
  linear-gradient(to top,#000 0%,#000 50%,transparent 50%,transparent 100%)`
const bg_img_3 = `linear-gradient(to top,#000 0%,#000 50%,transparent 50%,transparent 100%),
  linear-gradient(to right,transparent 0%,transparent 25%,#000 50%,#000 100%)`

const bgImgCode = `background-image: ${bg_img_1};

background-image: ${bg_img_2};

background-image: ${bg_img_3};
`

const attrCode = `.text-fallen {
  filter: drop-shadow( 0 0 25px var(--color));
}
`
</script>

<template>
  <div class="m-x-auto w-fit">
    <div class="p-5">
      <h1 class="font-bold">
        background-image
      </h1>
      <p>多个参数时前面的 颜色层级高</p>
      <div class="flex gap-8">
        <div class="bg-img" :style="{ backgroundImage: bg_img_1 }" />
        <div class="bg-img" :style="{ backgroundImage: bg_img_2 }" />
        <div class="bg-img" :style="{ backgroundImage: bg_img_3 }" />
      </div>

      <CodeView
        class="m-t-2"
        title="background-image(linear-gradient)"
        lang="css" :code="bgImgCode"
      />
    </div>

    <div class="p-5">
      <h1 class="font-bold">
        <a class="" target="_blank" href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/attr">css attr()</a>
      </h1>
      <p>css attr()函数 暂时只能用于为元素的content属性</p>
      <p>text-transform: capitalize; 元素首字母大写</p>
      <div class="flex gap-8">
        <TextFallenStreet text="home" />
        <TextFallenStreet text="about" />
      </div>

      <CodeView
        class="m-t-2"
        title="css attr()函数1"
        lang="css" :code="attrCode"
      />
    </div>

    <div class="p-5">
      <h1 class="font-bold">
        <a class="" target="_blank" href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/content-visibility">content-visibility</a>
      </h1>
      <p>content-visibility css实现虚拟列表</p>

      <CodeView
        class="m-t-2"
        title="css attr()函数1"
        lang="css" code="content-visibility: auto;"
      />
    </div>

    <div class="p-5">
      <p>css counter</p>
      <p>好像只能用在 ::after/::before/::marker等为元素的content属性中，跟attr()函数一样</p>
      <ol>
        <li>01</li>
        <li>02</li>
        <li>03</li>
        <li>04</li>
        <li>05</li>
      </ol>
      <CodeView
        lang="css" title="css counter" code="ol {
  counter-reset: markerCounter 1 customCounter 2;

  & li {
    background-color: counter(customCounter);
    counter-increment: customCounter markerCounter 1;

    &::marker {
      color: red;
      content: counters(markerCounter, '-') '-'';
    }

    &::after {
      color: counter(customCounter);
      content: ' --' counter(customCounter) '--1 ';
    }
  }
}

@counter-style customCounter {
  system: cyclic ;
  symbols: #000 #fff red ;
}"
      />
    </div>
  </div>
</template>

<style scoped>
.bg-img {
  margin-top: 10px;
  width: 100px;
  height: 100px;
  background-repeat: no-repeat;
  background-size: 100px;
}

ol {
  counter-reset: markerCounter 1 customCounter 2;

  & li {
    background-color: counter(customCounter);
    counter-increment: customCounter markerCounter 1;

    &::marker {
      color: red;
      content: counters(markerCounter, '-') "-";
    }

    &::after {
      color: counter(customCounter);
      content: ' --' counter(customCounter) "--1 ";
    }
  }
}

@counter-style customCounter {
  system: cyclic ;
  symbols: #000 #fff red ;
}
</style>
