<template>
  <div>
    <indexlist>
      <index-section model="select" v-for="(item, index) in alphabet" :index="item.initial" :cells="item.cells" :key="index">
      </index-section>
    </indexlist>
  </div>
</template>

<script>
  import { Indexlist, IndexSection } from '../../ui/components/indexlist'

  const NAMES = ['Aaron', 'Alden', 'Austin', 'Baldwin', 'Braden', 'Carl', 'Chandler', 'Clyde', 'David', 'Edgar', 'Elton', 'Floyd', 'Freeman', 'Gavin', 'Hector', 'Henry', 'Ian', 'Jason', 'Joshua', 'Kane', 'Lambert', 'Matthew', 'Morgan', 'Neville', 'Oliver', 'Oscar', 'Perry', 'Quinn', 'Ramsey', 'Scott', 'Seth', 'Spencer', 'Timothy', 'Todd', 'Trevor', 'Udolf', 'Victor', 'Vincent', 'Walton', 'Willis', 'Xavier', 'Yvonne', 'Zack', 'Zane'];

  export default{
    components:{
      Indexlist,
      IndexSection
    },
    data(){
      return {
        alphabet: []
      }
    },
    mounted(){

    },
    created(){
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(initial => {
        let cells = NAMES.filter(name => name[0] === initial);
        this.alphabet.push({
          initial,
          cells
        });
      });
    }
  }
</script>

<style>
</style>
