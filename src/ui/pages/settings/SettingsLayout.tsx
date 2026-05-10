import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useEffect, useMemo } from "react";
import {
  Cpu,
  EthernetPort,
  Shield,
  RotateCcw,
  BookOpen,
  BarChart3,
  FileText,
  Wrench,
  ScrollText,
  Sliders,
  HardDrive,
  FileCode,
  RefreshCw,
  Volume2,
  Accessibility,
  Mic,
  HelpCircle,
  ArrowLeftRight,
  Image as ImageIcon,
  Info,
} from "lucide-react";
import { typography, cn } from "../../design-tokens";
import { useI18n } from "../../../core/i18n/context";
import { useSettingsSummary } from "./hooks/useSettingsSummary";
import { useNavigationManager } from "../../navigation";
import { isDevelopmentMode } from "../../../core/utils/env";

interface NavItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  /** Used to determine active state via pathname match. */
  matchPath: string;
  /** Action when clicked — navigation, modelsList helper, or external link. */
  onSelect: () => void;
  count?: number;
  danger?: boolean;
}

interface NavGroup {
  key: string;
  items: NavItem[];
}

function NavButton({
  item,
  active,
}: {
  item: NavItem;
  active: boolean;
}) {
  return (
    <button
      onClick={item.onSelect}
      className={cn(
        "group flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-left",
        "transition-colors duration-150",
        "focus:outline-none focus:bg-fg/[0.06]",
        active
          ? "bg-fg/[0.08] text-fg"
          : item.danger
            ? "text-danger/75 hover:bg-danger/10 hover:text-danger"
            : "text-fg/65 hover:bg-fg/[0.04] hover:text-fg",
      )}
    >
      <span
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center [&_svg]:h-[15px] [&_svg]:w-[15px]",
          active ? "text-fg" : "",
        )}
      >
        {item.icon}
      </span>
      <span className={cn("flex-1 truncate", typography.body.size, "font-medium")}>
        {item.label}
      </span>
      {typeof item.count === "number" && (
        <span
          className={cn(
            "shrink-0 tabular-nums",
            typography.caption.size,
            active ? "text-fg/70" : "text-fg/35",
          )}
        >
          {item.count}
        </span>
      )}
    </button>
  );
}

export function SettingsLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useI18n();
  const { toModelsList } = useNavigationManager();
  const {
    state: { providers, models },
  } = useSettingsSummary();

  const providerCount = providers.length;
  const modelCount = models.length;

  const groups = useMemo<NavGroup[]>(() => {
    const main: NavItem[] = [
      {
        key: "providers",
        icon: <EthernetPort />,
        label: t("settings.items.providers.title"),
        matchPath: "/settings/providers",
        count: providerCount,
        onSelect: () => navigate("/settings/providers"),
      },
      {
        key: "models",
        icon: <Cpu />,
        label: t("settings.items.models.title"),
        matchPath: "/settings/models",
        count: modelCount,
        onSelect: () => toModelsList(),
      },
      {
        key: "imageGeneration",
        icon: <ImageIcon />,
        label: t("settings.items.imageGeneration.title"),
        matchPath: "/settings/image-generation",
        onSelect: () => navigate("/settings/image-generation"),
      },
      {
        key: "prompts",
        icon: <FileText />,
        label: t("settings.items.prompts.title"),
        matchPath: "/settings/prompts",
        onSelect: () => navigate("/settings/prompts"),
      },
      {
        key: "voices",
        icon: <Volume2 />,
        label: t("settings.items.voices.title"),
        matchPath: "/settings/voices",
        onSelect: () => navigate("/settings/providers?tab=audio"),
      },
      {
        key: "accessibility",
        icon: <Accessibility />,
        label: t("settings.items.accessibility.title"),
        matchPath: "/settings/accessibility",
        onSelect: () => navigate("/settings/accessibility"),
      },
      {
        key: "speechRecognition",
        icon: <Mic />,
        label: "Speech Recognition",
        matchPath: "/settings/speech-recognition",
        onSelect: () => navigate("/settings/speech-recognition"),
      },
      {
        key: "sync",
        icon: <RefreshCw />,
        label: t("settings.items.sync.title"),
        matchPath: "/settings/sync",
        onSelect: () => navigate("/settings/sync"),
      },
      {
        key: "backup",
        icon: <HardDrive />,
        label: t("settings.items.backup.title"),
        matchPath: "/settings/backup",
        onSelect: () => navigate("/settings/backup"),
      },
      {
        key: "convert",
        icon: <ArrowLeftRight />,
        label: t("settings.items.convert.title"),
        matchPath: "/settings/convert",
        onSelect: () => navigate("/settings/convert"),
      },
      {
        key: "security",
        icon: <Shield />,
        label: t("settings.items.security.title"),
        matchPath: "/settings/security",
        onSelect: () => navigate("/settings/security"),
      },
      {
        key: "usage",
        icon: <BarChart3 />,
        label: t("settings.items.usage.title"),
        matchPath: "/settings/usage",
        onSelect: () => navigate("/settings/usage"),
      },
      {
        key: "advanced",
        icon: <Sliders />,
        label: t("settings.items.advanced.title"),
        matchPath: "/settings/advanced",
        onSelect: () => navigate("/settings/advanced"),
      },
    ];

    const support: NavItem[] = [
      {
        key: "about",
        icon: <Info />,
        label: t("settings.items.about.title"),
        matchPath: "/settings/about",
        onSelect: () => navigate("/settings/about"),
      },
      {
        key: "changelog",
        icon: <ScrollText />,
        label: t("settings.items.changelog.title"),
        matchPath: "/settings/changelog",
        onSelect: async () => {
          try {
            const { openUrl } = await import("@tauri-apps/plugin-opener");
            await openUrl("https://www.lettuceai.app/changelog");
          } catch (error) {
            console.error("Failed to open URL:", error);
            window.open("https://www.lettuceai.app/changelog", "_blank");
          }
        },
      },
      {
        key: "docs",
        icon: <HelpCircle />,
        label: t("settings.items.docs.title"),
        matchPath: "__never__",
        onSelect: async () => {
          try {
            const { openUrl } = await import("@tauri-apps/plugin-opener");
            await openUrl("https://www.lettuceai.app/docs");
          } catch (error) {
            console.error("Failed to open URL:", error);
            window.open("https://www.lettuceai.app/docs", "_blank");
          }
        },
      },
      {
        key: "logs",
        icon: <FileCode />,
        label: t("settings.items.logs.title"),
        matchPath: "/settings/logs",
        onSelect: () => navigate("/settings/logs"),
      },
      {
        key: "guide",
        icon: <BookOpen />,
        label: t("settings.items.guide.title"),
        matchPath: "/welcome",
        onSelect: () => navigate("/welcome"),
      },
    ];

    const danger: NavItem[] = [
      {
        key: "reset",
        icon: <RotateCcw />,
        label: t("settings.items.reset.title"),
        matchPath: "/settings/reset",
        danger: true,
        onSelect: () => navigate("/settings/reset"),
      },
      ...(isDevelopmentMode()
        ? [
            {
              key: "developer",
              icon: <Wrench />,
              label: t("settings.items.developer.title"),
              matchPath: "/settings/developer",
              onSelect: () => navigate("/settings/developer"),
            },
          ]
        : []),
    ];

    return [
      { key: "main", items: main },
      { key: "support", items: support },
      { key: "danger", items: danger },
    ];
  }, [providerCount, modelCount, navigate, toModelsList, t]);

  const allItems = groups.flatMap((g) => g.items);

  // Auto-redirect from bare /settings to About on desktop only.
  useEffect(() => {
    if (location.pathname !== "/settings") return;
    const lg = window.matchMedia("(min-width: 1024px)").matches;
    if (lg) {
      navigate("/settings/about", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const activeKey = useMemo(() => {
    const path = location.pathname;
    // Find the longest matchPath prefix.
    let best: NavItem | undefined;
    for (const item of allItems) {
      if (item.matchPath === "__never__") continue;
      if (path === item.matchPath || path.startsWith(item.matchPath + "/")) {
        if (!best || item.matchPath.length > best.matchPath.length) {
          best = item;
        }
      }
    }
    return best?.key;
  }, [location.pathname, allItems]);

  return (
    <div
      className="flex h-full flex-col text-fg/90 lg:flex-row"
      style={{ ["--settings-sidebar-w" as string]: "15rem" }}
    >
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden lg:flex lg:w-[var(--settings-sidebar-w)] lg:shrink-0 lg:flex-col",
          "lg:border-r lg:border-fg/10",
          "lg:overflow-y-auto",
        )}
      >
        <nav className="flex flex-col gap-3 p-3">
          {groups.map((group, idx) => (
            <div key={group.key} className="flex flex-col gap-0.5">
              {idx > 0 && <div className="my-1 mx-2.5 h-px bg-fg/[0.06]" />}
              {group.items.map((item) => (
                <NavButton key={item.key} item={item} active={item.key === activeKey} />
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="min-w-0 flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
