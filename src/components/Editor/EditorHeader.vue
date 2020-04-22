<template lang="pug">
  header.noteHeader
    div.noteBurgerButton(@click="$emit('toogleSidebar')")
      img(src="../../assets/BurgerButton.svg" alt="Меню")
    div.addTaskButton(@click="$emit('addTask')")
      span Добавить задачу
    div.undoRedoSaveContainer
      div.undoButton.menuButton(@click="$emit('undoChange')")
        img(src="../../assets/UndoButton.svg" alt="Отменить")
        span Отменить
      div.redoButton.menuButton(@click="$emit('redoChange')")
        img(src="../../assets/RedoButton.svg" alt="Вернуть")
        span Вернуть
      div.saveButton.menuButton(@click="$emit('saveChanges')")
        img(src="../../assets/SaveButton.svg")
        span Сохранить
    div.cancelDeleteContainer
      div.deleteButton.menuButton(@click="$emit('deleteNote')")
        img(src="../../assets/DeleteButton.svg")
        span Удалить
      div.cancelButton.menuButton(@click="$emit('leaveEditor')")
        img(src="../../assets/CancelButton.svg")
        span Выйти
    
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.noteHeader {
	position: fixed;
	top: 0;
	left: 0;
	height: 45px;
	background: #fff;
	width: 100%;
	display: flex;
	align-items: center;
	border: 1px solid #d8d8d8;
	z-index: 55;
}

.noteBurgerButton {
	cursor: pointer;
	padding: 10px;
	&:hover {
		background: rgba(0, 0, 0, 0.027);
	}
	@media (min-width: 768px) {
		margin-right: 15px;
	}
}

.addTaskButton {
	@include plusButton;
	margin-left: 5px;
	cursor: pointer;
	min-width: 25px;
	span {
		color: $green_main;
		font-family: "Montserrat Alternates";
		position: absolute;
		display: block;
		white-space: nowrap;
		top: 10px;
		left: 35px;
		font-size: 12px;
		font-weight: 500;
	}
	@media (min-width: 640px) {
		width: 190px;
		height: 35px;
		overflow: hidden;
		background: transparent;
		border: 1px solid $green_main;
		transition: all 0.3s ease-in-out;
		span {
			display: block;
		}
		&::before,
		&::after {
			background: $green_main;
			width: 20px;
			height: 2px;
			top: 17px;
			left: 8px;
		}
	}
	@media (min-width: 768px) {
		&:hover {
			width: 190px;
			overflow: hidden;
			background: transparent;
			border: 1px solid $green_main;
			transition: all 0.3s ease-in-out;
			&::before,
			&::after {
				background: $green_main;
				animation: spin1 1s ease-in-out;
			}
			&::after {
				animation: spin2 1s ease-in-out;
			}
			span {
				display: block;
			}
		}
	}
}

.undoRedoSaveContainer {
	display: flex;
	.undoButton {
		span {
			display: none;
		}
		@media (min-width: 1280px) {
			span {
				display: block;
			}
		}
	}
	.redoButton {
		span {
			display: none;
		}
		@media (min-width: 1280px) {
			span {
				display: block;
			}
		}
	}
}

.saveButton {
	span {
		display: none;
	}
	@media (min-width: 610px) {
		span {
			display: block;
		}
	}
}

.menuButton {
	display: flex;
	align-items: center;
	cursor: pointer;
	margin-left: 5px;
	padding: 10px;
	span {
		margin-left: 12px;
	}
	&:hover {
		background: rgba(0, 0, 0, 0.027);
	}
	@media (min-width: 610px) {
		margin-left: 15px;
	}
	@media (min-width: 1280px) {
		margin-left: 30px;
	}
}

.cancelDeleteContainer {
	display: flex;
	margin-left: auto;
	.deleteButton {
		span {
			display: none;
		}
		@media (min-width: 1024px) {
			span {
				display: block;
			}
		}
	}
	.cancelButton {
		span {
			display: none;
		}
		@media (min-width: 1024px) {
			span {
				display: block;
			}
		}
	}
}
</style>