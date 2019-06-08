export default (state={entries: []}, action) => {
    switch(action.type){
        case 'HOME_PAGE_LOADED':
            return {
                ...state,
                entries: action.data.entries,
            };
        case 'SUBMIT_ENTRY':
            return {
                ...state,
                entries: ([action.data.entry]).concat(state.entries),
            };
        case 'DELETE_ENTRY':
            return {
                ...state,
                entries: state.entries.filter((entry) => entry._id !== action.id),
            };
        case 'SET_EDIT':
            return {
                ...state,
                entryToEdit: action.entry,
            };
        case 'EDIT_ENTRY':
            return {
                ...state,
                entries: state.entries.map((entry) => {
                    if(entry._id === action.data.entry._id){
                        return {
                            ...action.data.entry,
                        }
                    }
                    return entry;
                }),
                entryToEdit: undefined,
            }
        default:
            return state;
    }
}