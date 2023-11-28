class Produto {
    constructor() {
        this.id = 0;
        this.disciplina = '';
        this.data = '';
        this.sala = '';
        this.horario = '';
        this.arrayProdutos = [];
    }

    salvar() {
        let produto = this.lerDados();

        if (this.validaCampos(produto)) {
            this.adicionar(produto);
            this.listaTabela();
        }
    }

    listaTabela() {
        let tbody = document.getElementById('tbody');
        let tabela = document.getElementById('tabela');
        let boxCalendario2 = document.querySelector('.box-calendario2');

        tbody.innerHTML = '';

        if (this.arrayProdutos.length > 0) {
            tabela.classList.remove('hidden');

            for (let i = 0; i < this.arrayProdutos.length; i++) {
                let tr = tbody.insertRow();

                let td_status = tr.insertCell();
                let td_button = tr.insertCell();

                td_status.className = 'quadrado';
                td_status.innerHTML = `
                    <p class="textgreen"><b>Agendado</b></p>
                    <p class="textodata"><strong><b>Data:</b> ${this.arrayProdutos[i].data}<br><b>Sala desejada:</b> ${this.arrayProdutos[i].sala}<br><b>Disciplina:</b> ${this.arrayProdutos[i].disciplina}</strong></p>
                `;

                td_button.className = 'button-column';
                td_button.innerHTML = `
                    <p class="textohora"><strong>${this.arrayProdutos[i].horario}</strong></p>
                    <button type="button" class="btn btn-danger" onclick="produto.cancelarItem(${i})">Cancelar</button>
                `;
            }

            boxCalendario2.innerHTML = '';
            boxCalendario2.appendChild(tabela);
        } else {
            tabela.classList.add('hidden');
            boxCalendario2.innerHTML = '';
            boxCalendario2.appendChild(tabela);
        }

        this.atualizarHorariosDisponiveis();
    }

    atualizarHorariosDisponiveis() {
        let horarioSelect = document.getElementById('horario');
        let horarioAgendadas = this.arrayProdutos
            .filter(produto => produto.data === document.getElementById('ddd').value)
            .map(produto => produto.horario);

        // Adicionar todos os horários de volta
        for (let i = 0; i < horariosDisponiveis.length; i++) {
            let option = document.createElement('option');
            option.value = horariosDisponiveis[i];
            option.text = horariosDisponiveis[i];
            horarioSelect.add(option);
        }

        // Remover horários já agendados para a data selecionada
        for (let i = horarioSelect.options.length - 1; i >= 0; i--) {
            if (horarioAgendadas.includes(horarioSelect.options[i].value)) {
                horarioSelect.remove(i);
            }
        }
    }

    cancelarItem(index) {
        const confirmado = window.confirm('Tem certeza que deseja cancelar este agendamento?');
    
        if (confirmado) {
            let salaCancelada = this.arrayProdutos[index].sala;
            this.arrayProdutos.splice(index, 1);
            this.listaTabela();

            let salaSelect = document.getElementById('sala');
            let option = document.createElement('option');
            option.value = salaCancelada;
            option.text = salaCancelada;

            let salaExists = Array.from(salaSelect.options).some(opt => opt.value === salaCancelada);
            if (!salaExists) {
                salaSelect.appendChild(option);
            }

            alert('Agendamento cancelado com sucesso!');
        } else {
            alert('Cancelamento do agendamento foi recusado.');
        }
    }

    adicionar(produto) {
        this.arrayProdutos.push(produto);
    }

    lerDados() {
        let produto = {}

        produto.id = this.id;
        produto.disciplina = document.getElementById('disc').value;
        produto.data = document.getElementById('ddd').value;
        produto.sala = document.getElementById('sala').value;
        produto.horario = document.getElementById('horario').value;

        return produto;
    }

    validaCampos(produto) {
        let msg = '';

        if (produto.disciplina == '') {
            msg += '- Informe a disciplina desejada\n';
        }
        if (produto.horario == '') {
            msg += '- Informe o horário desejado\n';
        }
        if (produto.sala == '') {
            msg += '- Informe a sala desejada \n';
        }
        if (produto.data == '') {
            msg += '- Informe a data desejada \n';
        }

        // Verificar se o horário já está agendado para a data selecionada com a mesma sala ou disciplina
        if (this.horarioJaAgendadoComMesmaSalaOuDisciplina(produto.data, produto.horario, produto.sala, produto.disciplina)) {
            msg += '- Este horário já está agendado para a data selecionada com a mesma sala ou disciplina\n';
        }

        if (msg != '') {
            alert(msg);
            return false;
        }

        return true;
    }

    horarioJaAgendadoComMesmaSalaOuDisciplina(data, horario, sala, disciplina) {
        return this.arrayProdutos.some(produto =>
            produto.data === data &&
            produto.horario === horario &&
            (produto.sala === sala || produto.disciplina === disciplina)
        );
    }
}

var produto = new Produto();
