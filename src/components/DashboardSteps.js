import React from "react";
import Dashboard from "../containers/Dashboard";
import Patches from "../containers/Patches";
import NewPatches from "../containers/NewPatches";
import PatchDetails from "../containers/PatchDetails";
import Payments from "../containers/Payments";
import Settings from "../containers/Settings";

const HomeStep = {
  id: "dashboard",
  step: {
    id: "dashboard",
    path: "/dashboard/home",
    label: "Dashboard",
    Component: (props) => <Dashboard {...props} />,
  },
};
const PatchesStep = {
  id: "patches",
  step: {
    id: "patches",
    path: "/dashboard/patches",
    label: "Patches",
    Component: (props) => <Patches {...props} />,
  },
};
const NewPatchesStep = {
  id: "newPatches",
  step: {
    id: "newPatches",
    path: "/dashboard/patches/new",
    label: "New Patches",
    Component: (props) => <NewPatches {...props} />,
  },
};

const PatchDetailsStep = {
  id: "patchesDetails",
  step: {
    id: "patchesDetails",
    path: "/dashboard/patch/details",
    label: "Patches Details",
    Component: (props) => <PatchDetails {...props} />,
  },
};
const PaymentsStep = {
  id: "payments",
  step: {
    id: "payments",
    path: "/dashboard/payments",
    label: "Payments",
    Component: (props) => <Payments {...props} />,
  },
};
const SettingsStep = {
  id: "settings",
  step: {
    id: "settings",
    path: "/dashboard/settings",
    label: "Settings",
    Component: (props) => <Settings {...props} />,
  },
};

const AllSteps = [
  HomeStep,
  PatchesStep,
  NewPatchesStep,
  PaymentsStep,
  SettingsStep,
  PatchDetailsStep,
];

export default AllSteps;
