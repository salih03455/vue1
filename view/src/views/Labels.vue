<template>
	<div class="labels">
		
		<form @submit="checkForm" action="/labels" method="post">
			
			<div v-if="errors.length">
				<b>Please correct the following error(s):</b>
				<ul>
					<li v-for="error in errors">{{ error }}</li>
				</ul>
			</div>
			
			<div v-for="field in fields" class="form-group">
				<label for="name">{{ field.type }}</label>
				<input type="text" name="name" id="name">
			</div>

			<div>
				<input type="submit" value="KAYDET">
			</div>

		</form>

		<span class="and">ya da</span>
			
		<a @click="addNewField" class="addNewField">YENİ ALAN EKLE</a>

		<div v-if="addField" class="newField">
			<input type="text" @keyup.enter="saveNewField" ref="saveNewField" v-model="newFieldValue">
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				errors: [],
				newFieldValue: '',
				fields: [
					{ type: 'İsim', required: true },
					{ type: 'Soyisim', required: true },
					{ type: 'Kütük', required: true },
					{ type: 'Tevellüt', required: true }
				],
				addField: false
			}
		},
		methods: {
			addNewField() {
				this.addField = ! this.addField;
				this.$nextTick(() => {
					if (this.addField) this.$refs.saveNewField.focus();
				});
			},
			saveNewField() {
				this.addField = false;
				this.fields.push({ type: this.newFieldValue, required: true });
				this.newFieldValue = '';
			},
			checkForm:function(e) {
				if(this.name && this.age) return true;
				this.errors = [];
				if(!this.name) this.errors.push("Name required.");
				//if(!this.age) this.errors.push("Age required.");
				e.preventDefault();
			}
		}
	}
</script>

<style lang="less">
.labels {
	width: 600px;
	margin: auto;
	text-align: left;
	.form-group {
		margin-bottom: 15px;
		background-color: #f1f1f1;
		padding: 10px;
		border-radius: 3px;
	}
	.and {
		display: block;
		text-align: center;
		padding: 10px;
	}
	.addNewField {
		display: block;
		width: 100%;
		background: #92b01a;
		color: #fff;
		border: none;
		padding: 20px 10px;
		font-size: 16px;
		border-radius: 3px;
		font-weight: 700;
		letter-spacing: 1px;
		outline: none;
		text-align: center;
		cursor: pointer;
	}
}
</style>
