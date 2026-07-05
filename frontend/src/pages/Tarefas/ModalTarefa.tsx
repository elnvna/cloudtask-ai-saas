import { useEffect, useState } from "react";

import {

    Dialog,

    DialogTitle,

    DialogContent,

    DialogActions,

    Button,

    TextField,

    MenuItem

} from "@mui/material";

import {

    criarTarefa,

    atualizarTarefa

} from "../../services/tarefaService";

import type { Tarefa } from "../../types/tarefa";

interface Props{

    open:boolean;

    onClose:()=>void;

    atualizarLista:()=>void;

    tarefa?:Tarefa|null;

}

export default function ModalTarefa({

    open,

    onClose,

    atualizarLista,

    tarefa

}:Props){

    const[titulo,setTitulo]=useState("");

    const[descricao,setDescricao]=useState("");

    const[prioridade,setPrioridade]=useState<"Baixa"|"Media"|"Alta">("Media");

    useEffect(()=>{

        if(tarefa){

            setTitulo(tarefa.titulo);

            setDescricao(tarefa.descricao);

            setPrioridade(tarefa.prioridade);

        }else{

            setTitulo("");

            setDescricao("");

            setPrioridade("Media");

        }

    },[tarefa,open]);

    async function salvar(){

        if(tarefa){

            await atualizarTarefa(

                tarefa.id,

                {

                    titulo,

                    descricao,

                    prioridade

                }

            );

        }else{

            await criarTarefa({

                titulo,

                descricao,

                prioridade

            });

        }

        atualizarLista();

        onClose();

    }

    return(

        <Dialog

            open={open}

            onClose={onClose}

            fullWidth

            maxWidth="sm"

        >

            <DialogTitle>

                {tarefa ? "Editar tarefa" : "Nova tarefa"}

            </DialogTitle>

            <DialogContent>

                <TextField

                    margin="normal"

                    label="Título"

                    fullWidth

                    value={titulo}

                    onChange={(e)=>setTitulo(e.target.value)}

                />

                <TextField

                    margin="normal"

                    label="Descrição"

                    multiline

                    rows={4}

                    fullWidth

                    value={descricao}

                    onChange={(e)=>setDescricao(e.target.value)}

                />

                <TextField

                    margin="normal"

                    select

                    fullWidth

                    label="Prioridade"

                    value={prioridade}

                    onChange={(e)=>

                        setPrioridade(

                            e.target.value as "Baixa"|"Media"|"Alta"

                        )

                    }

                >

                    <MenuItem value="Baixa">

                        Baixa

                    </MenuItem>

                    <MenuItem value="Media">

                        Média

                    </MenuItem>

                    <MenuItem value="Alta">

                        Alta

                    </MenuItem>

                </TextField>

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>

                    Cancelar

                </Button>

                <Button

                    variant="contained"

                    onClick={salvar}

                >

                    {tarefa ? "Salvar" : "Criar"}

                </Button>

            </DialogActions>

        </Dialog>

    );

}