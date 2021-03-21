import mixpanel from "mixpanel-browser";

mixpanel.init("27b71f7f3c1295c628837f425d4558eb");

const envCheck = process.env.NODE_ENV === "development";

const actions = {
  identify: (id) => {
    if (envCheck) mixpanel.identify(id);
  },
  alias: (id) => {
    if (envCheck) mixpanel.alias(id);
  },
  track: (name, props) => {
    if (envCheck) mixpanel.track(name, props);
  },
  people: {
    set: (props) => {
      if (envCheck) mixpanel.people.set(props);
    },
  },
};

export const Mixpanel = actions;
