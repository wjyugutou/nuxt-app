<script lang="ts" setup>
const dialogCode = `
<dialog :open="dialogOpen" class="z-1 bg-red p-3">
  <div>
    nihao
  </div>
  asdsad
</dialog>
`
const dialogOpen = ref(false)
</script>

<template>
  <div class="m-x-auto w-fit">
    <div class="p-5">
      <button class="basic-btn" @click="dialogOpen = !dialogOpen">dialog</button>

      <dialog :open="dialogOpen" class="z-1 bg-red p-3">
        <div>nihao</div>
        asdsad
      </dialog>
      <CodeView title="dialog标签" lang="html" :code="dialogCode" />
    </div>

    <div class="p-5">
      <p>css tree组件</p>
      <p>到时候::marker color transparent 就行</p>
      <div class="tree">
        <details class="tree-details">
          <summary class="tree-summary">
            <span class="tree-item" title="项目1" data-id="2">项目1</span>
          </summary>
          <details>
            <summary class="tree-summary">
              <span class="tree-item" title="文件夹" data-id="8">文件夹</span>
            </summary>
            <details>
              <summary class="tree-summary">
                <span class="tree-item" title="sdd" data-id="137">sdd</span>
              </summary>
            </details>
          </details>
          <details>
            <summary class="tree-summary">
              <span class="tree-item" title="chrome test" data-id="221">chrome test</span>
            </summary>
          </details>
        </details>
      </div>
      <CodeView
        lang="html" code="<div class='tree'>
  <details class='tree-details'>
    <summary class='tree-summary'>
      <span class='tree-item' title='项目1' data-id='2'>项目1</span>
    </summary>
    <details>
      <summary class='tree-summary'>
        <span class='tree-item' title='文件夹' data-id='8'>文件夹</span>
      </summary>
      <details>
        <summary class='tree-summary'>
          <span class='tree-item' title='sdd' data-id='137'>sdd</span>
        </summary>
      </details>
    </details>
    <details>
      <summary class='tree-summary'>
        <span class='tree-item' title='chrome test' data-id='221'>chrome test</span>
      </summary>
    </details>
  </details>
</div>"
      />
    </div>
  </div>
</template>

<style>
.tree details {
  counter-reset: treeCounter a;

  & summary {
    counter-increment: treeCounter a;

    &::before {
      color: red;
      content: counters(treeCounter, '-');
    }
  }
}
</style>
