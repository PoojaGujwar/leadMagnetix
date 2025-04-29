import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from 'axios'

export const fetchLead = createAsyncThunk("leads/fetchLead",async()=>{
    const response = await axios.get('https://ganesh-git-main-pooja-gujwars-projects.vercel.app/leads')
    return response.data
})

export const filterdLead = createAsyncThunk("leads/filterdLead",async(obj)=>{
    const response = await axios.get(`https://ganesh-git-main-pooja-gujwars-projects.vercel.app/leads?status=${obj}`)
    return response.data
})
export const addLeadAsync = createAsyncThunk("leads/addLead",async(lead)=>{
    const response = await axios.post(`https://ganesh-git-main-pooja-gujwars-projects.vercel.app/leads`,lead)
    console.log("New Lead",response.data)
return response.data
})
export const editLeadAsync = createAsyncThunk("leads/editLead",async({id,updatedData})=>{
    const response = await axios.put(`https://ganesh-git-main-pooja-gujwars-projects.vercel.app/leads/${id}`,updatedData)
    return response.data
})
export const leadCommentAsync  = createAsyncThunk("leads/leadCommentAsync",async(id)=>{
    const response = await axios.get(`https://ganesh-git-main-pooja-gujwars-projects.vercel.app/leads/${id}/comments`)
    //console.log(response)
    return response.data

})
export const addComment = createAsyncThunk("leads/addComment",async({id,author,commentText})=>{
   console.log(id,commentText,author)
    const response = await axios.post(`https://ganesh-git-main-pooja-gujwars-projects.vercel.app/leads/${id}/comments`,{author,commentText})
    console.log(response)
    console.log(author, commentText)
    return response.data.populatedComment
    
})

export const salesAgentsAsync = createAsyncThunk("leads/agents",async()=>{
    const response = await axios.get(`https://ganesh-git-main-pooja-gujwars-projects.vercel.app/agents`)
    //console.log(response)
    return response.data
})
export const newSalesAgentAsync = createAsyncThunk("leads/agents",async(formData)=>{
    console.log(formData)
    const response = await axios.post(`https://ganesh-git-main-pooja-gujwars-projects.vercel.app/agents`,formData)
    console.log(response)
    return response.data
})
export const reportAsync = createAsyncThunk("leads/report",async()=>{
    const response = await axios.get(`https://ganesh-git-main-pooja-gujwars-projects.vercel.app/report/pipeline`)
console.log(response)
    return response.data
})

export const leadSlice = createSlice({
    name:"Leads",
    initialState:{
        leads:[],
        filteredLeads: [],
        leadComments: [],
        totalLeadsInPipeline:0,
        agents:[],
        status:'idle',
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchLead.pending,(state)=>{
            state.status ="Loading"
        })
        builder.addCase(fetchLead.fulfilled,(state,action)=>{
            state.status ='Success';
            state.leads = action.payload.data;
        })
        builder.addCase(fetchLead.rejected,(state,action)=>{
            state.status ="error";
            state.error = action.payload
        })
        builder.addCase(filterdLead.pending,(state)=>{
            state.status ="Loading"
        })
        builder.addCase(filterdLead.fulfilled,(state,action)=>{
            state.status ='Success';
            state.filteredLeads = action.payload.data
        })
        builder.addCase(filterdLead.rejected,(state,action)=>{
            state.status ="error";
            state.error = action.payload
        })
        builder.addCase(leadCommentAsync.pending,(state)=>{
            state.status ="Loading"
        })
        builder.addCase(leadCommentAsync.fulfilled,(state,action)=>{
            state.status ='Success';
            state.leadComments = action.payload.findedLead
        })
        builder.addCase(leadCommentAsync.rejected,(state,action)=>{
            state.status ="error";
            state.error = action.payload
        })
        builder.addCase(addComment.fulfilled, (state, action) => {
            state.leadComments.push(action.payload); 
          });
        builder.addCase(salesAgentsAsync.pending,(state)=>{
            state.status="Loading"
        })
        builder.addCase(salesAgentsAsync.fulfilled,(state,action)=>{
            state.status ="Success";
            state.agents = action.payload
        })
        builder.addCase(salesAgentsAsync.rejected,(state,action)=>{
            state.status ="error";
            state.error = action.payload;
        }) 
        builder.addCase(reportAsync.pending,(state)=>{
            state.status="Loading"
        })
        builder.addCase(reportAsync.fulfilled,(state,action)=>{
            state.status ="Success";
            console.log(action.payload)
            state.totalLeadsInPipeline = action.payload.totalLeadsInPipeline
        })
        builder.addCase(reportAsync.rejected,(state,action)=>{
            state.status ="error";
            state.error = action.payload;
        })
        
        
    }
})
export default leadSlice.reducer;