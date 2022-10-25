import { IconSun, IconMoonStars } from "@tabler/icons";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";

function Toggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
      {colorScheme === "dark" ? (
        <IconSun size={16} />
      ) : (
        <IconMoonStars size={16} />
      )}
    </ActionIcon>
  );
}

export default Toggle;
