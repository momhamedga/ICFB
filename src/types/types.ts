export type Event = {
  id: string;
  title: string;
  category: string;
  date: string | Date;
  created_at?: string;
};

export type EventsState = {
  events: Event[];
  isEditorOpen: boolean;
  isSyncing: boolean;
};

export type EventsAction =
  | { type: "ADD_EVENT"; payload: Event }
  | { type: "DELETE_EVENT"; id: string }
  | { type: "UPDATE_EVENT"; payload: Event } // إضافة أكشن التعديل
  | { type: "TOGGLE_EDITOR" }
  | { type: "CLOSE_EDITOR" }
  | { type: "SET_SYNCING"; status: boolean };

export const eventsReducer = (state: EventsState, action: EventsAction): EventsState => {
  switch (action.type) {
    case "ADD_EVENT":
      return {
        ...state,
        events: [action.payload, ...state.events],
      };

    case "DELETE_EVENT":
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.id),
      };

case "UPDATE_EVENT":
  return {
    ...state,
    events: state.events.map((event) =>
      event.id === action.payload.id 
        ? { ...event, ...action.payload } // دمج البيانات القديمة مع التحديث لضمان عدم فقدان الـ created_at
        : event
    ),
  };
    case "TOGGLE_EDITOR":
      return {
        ...state,
        isEditorOpen: !state.isEditorOpen,
      };

    case "CLOSE_EDITOR":
      return {
        ...state,
        isEditorOpen: false,
      };

    case "SET_SYNCING":
      return {
        ...state,
        isSyncing: action.status,
      };

    default:
      return state;
  }
};