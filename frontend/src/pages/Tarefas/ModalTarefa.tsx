import { useEffect, useState } from "react";

import {

    Dialog,

    DialogTitle,

    DialogContent,

    DialogActions,

    Button,

    TextField,

    MenuItem,

    Tabs,

    Tab,

    Box,

    Typography

} from "@mui/material";

import {

    criarTarefa,

    atualizarTarefa

} from "../../services/tarefaService";

import { useNotification } from "../../hooks/useNotification";

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

    const[loading,setLoading]=useState(false);

    const[tabAtiva,setTabAtiva]=useState(0);

    const { showNotification } = useNotification();

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

        if(!titulo || !descricao){

            showNotification("Preencha todos os campos", "warning");

            return;

        }

        setLoading(true);

        try {

            if(tarefa){

                await atualizarTarefa(

                    tarefa.id,

                    {

                        titulo,

                        descricao,

                        prioridade

                    }

                );

                showNotification("Tarefa atualizada com sucesso!", "success");

            }else{

                await criarTarefa({

                    titulo,

                    descricao,

                    prioridade

                });

                showNotification("Tarefa criada com sucesso!", "success");

            }

            atualizarLista();

            onClose();

        } catch (error) {

            showNotification("Erro ao salvar tarefa", "error");

        } finally {

            setLoading(false);

        }

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

            {tarefa && (

                <Tabs

                    value={tabAtiva}

                    onChange={(_, novaAba) => setTabAtiva(novaAba)}

                    sx={{ borderBottom: 1, borderColor: "divider" }}

                >

                    <Tab label="Informações" />

                    <Tab label="Arquivos" />

                </Tabs>

            )}

            <DialogContent>

                {tabAtiva === 0 && (

                    <Box>

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

                    </Box>

                )}

                {/* {tabAtiva === 1 && tarefa && (

                    <Box sx={{ mt: 2 }}>

                        <FileUpload 

                            tarefaId={tarefa.id}

                            onUploadSuccess={() => {

                                // Opcional: fazer algo após upload

                            }}

                        />

                    </Box>

                )}

                {tabAtiva === 1 && !tarefa && (

                    <Typography sx={{ py: 4, textAlign: "center", color: "text.secondary" }}>

                        Salve a tarefa primeiro para adicionar arquivos

                    </Typography>

                )} */}

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>

                    Cancelar

                </Button>

                {tabAtiva === 0 && (

                    <Button

                        variant="contained"

                        onClick={salvar}

                        disabled={loading}

                    >

                        {loading ? (tarefa ? "Salvando..." : "Criando...") : (tarefa ? "Salvar" : "Criar")}

                    </Button>

                )}

            </DialogActions>

        </Dialog>

    );

}