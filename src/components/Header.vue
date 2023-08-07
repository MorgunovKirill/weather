<template>
  <header class="header">
    <div class="container">
      <h2 class="header__title">Документы</h2>
      <ul class="header__options">
          <li class="header__option">
            <button class="header__btn" type="button">
              <img src="../assets/img/icon-bookmark.svg" alt="закладки"/>
            </button>              
          </li>
          <li class="header__option">
              <button class="header__btn" type="button">
                  <img src="../assets/img/icon-plus.svg" alt="иконка плюс"/>
                  <span>Новый тип</span>              
            </button>            
          </li>
          <li class="header__option">
              <button class="header__btn" type="button">
                <img src="../assets/img/icon-plus.svg" alt="иконка плюс"/>
                <span>Новый документ</span>              
            </button>           
          </li>
      </ul>
    </div>    
  </header>
</template>
<script>
export default {
  name: 'HeaderComponent',
}
</script>

<style lang="scss" scoped>
@import "../assets/sass/vars";

.header {
  padding-top: 38px;
  margin-bottom: 30px;

  .container {
    display: flex;    
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    margin: 0;
  }

  &__options {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
  }


  &__option {
    margin-right: 10px;
  }


  &__btn {
    background-color: $color-transparent;
    border: 1px solid #D3D8DF;
    border-radius: 50px;
    padding: 9px 10px;
    cursor: pointer;
    display: flex;
    align-items: center;

    img + span {
      margin-left: 10px;
    }
  }
}
</style>
