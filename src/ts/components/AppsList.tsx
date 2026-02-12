/** biome-ignore-all lint/style/noNonNullAssertion: because */
import AstalApps from "gi://AstalApps";
import AstalHyprland from "gi://AstalHyprland";
import { Accessor, createBinding, createComputed, For } from "ags";
import AppButton from "./button/AppButton";

const hyprland = AstalHyprland.get_default();
const application = new AstalApps.Apps();

const apps: string[] = [
  "dev.zed.Zed",
  "discord",
  "kitty",
  "slack",
  "steam",
  "zen-beta",
];

export default function AppsList() {
  const pinnedApps = new Accessor(() =>
    apps
      .map((term) => ({
        app: application.list.find(
          (e) => e.entry.split(".desktop")[0] === term,
        ),
        term,
      }))
      .filter(({ app }) => app),
  );

  const clients = createBinding(hyprland, "clients");
  const filteredClients = createComputed(() => {
    return clients()
      .reverse()
      .filter(
        (c) =>
          !apps.map((e) => e.toLowerCase()).includes(c.class.toLowerCase()),
      );
  });

  return (
    <box>
      <box>
        <For each={pinnedApps}>
          {({ app, term }) => (
            <AppButton
              app={app!}
              term={term}
              pinned={true}
              onClicked={() => {
                for (const client of hyprland.get_clients()) {
                  if (client.class.toLowerCase().includes(term.toLowerCase())) {
                    return client.focus();
                  }
                }
                app!.launch();
              }}
            />
          )}
        </For>
      </box>
      <box>
        <For each={filteredClients}>
          {(client: AstalHyprland.Client) => {
            const app = application.list.find((e) =>
              e.entry
                .split(".desktop")[0]
                .toLowerCase()
                .match(client.class.toLowerCase()),
            );
            if (!app) {
              // biome-ignore lint/complexity/noUselessFragments: because
              return <></>;
            }
            return (
              <AppButton
                app={app}
                onClicked={() => {
                  client.focus();
                }}
                term={client.class}
                client={client}
              />
            );
          }}
        </For>
      </box>
    </box>
  );
}
