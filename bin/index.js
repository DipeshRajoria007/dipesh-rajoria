#!/usr/bin/env node

console.clear();
const figlet = require("figlet");
const gradient = require("gradient-string");
const inquirer = require("inquirer");
const chalk = require("chalk");
const boxen = require("boxen").default;
const ora = require("ora").default;

// Detect theme
const isDarkMode = process.env.TERM_THEME === "light" ? false : true;

// Define theme styles
const theme = isDarkMode
  ? {
      primary: chalk.cyanBright,
      secondary: chalk.white,
      accent: chalk.magentaBright,
      gradient: gradient.pastel,
      boxBorder: "cyan",
    }
  : {
      primary: chalk.blue,
      secondary: chalk.black,
      accent: chalk.magenta,
      gradient: gradient.rainbow,
      boxBorder: "blue",
    };

const args = process.argv.slice(2);
if (args.includes("--help") || args.includes("-h")) {
  showHelp();
  process.exit(0);
}

if (args.includes("--about") || args.includes("-a")) {
  printAboutMe();
  process.exit(0);
}

if (args.includes("--message") || args.includes("-m")) {
  printContactInfo();
  process.exit(0);
}

if (args.includes("--collab") || args.includes("-c")) {
  printCollaborationInfo();
  process.exit(0);
}
function showHelp() {
  const helpText = `
${chalk.bold("Dipesh Rajoria CLI Portfolio")}

${chalk.cyan("Usage:")} npx dipesh-rajoria [options]

${chalk.cyan("Options:")}
  -h, --help           Show this help message
  -a, --about          Display 'About Me' section
  -m, --message        Show contact information
  -c, --collab         Show GitHub/LinkedIn collaboration info (same as -m)

If no options are passed, you'll get an interactive menu 🎛️

${chalk.cyan("Examples:")}
  npx dipesh-rajoria
  npx dipesh-rajoria --about
  npx dipesh-rajoria -m
  npx dipesh-rajoria -c
`;
  console.log(helpText);
}

const dipesh = {
  pronouns: "He | Him",
  code: ["TypeScript", "Javascript", "Python"],
  askMeAbout: [
    "frontend engineering",
    "system design",
    "performance optimization",
    "fitness",
  ],
  technologies: {
    frontEnd: {
      js: ["React", "Next.js"],
      css: ["Sass", "Tailwind", "Styled Components"],
      uiLibraries: [
        "shadcn",
        "grauity (design and developed in house)",
        "Material UI",
        "Ant Design",
        "Chakra UI",
      ],
    },
    backEnd: {
      js: ["Node", "Express", "NestJS"],
      python: ["Django"],
      go: ["Gin"],
    },
    mobileApp: {
      crossPlatform: ["React Native"],
    },
    cloudServices: {
      aws: ["EC2", "SMS", "S3", "Lambda", "CloudFront"],
    },
    databases: ["PostgreSQL", "MongoDB", "Firebase Realtime DB", "redis"],
    misc: ["Socket.IO", "REST APIs", "WebSockets", "Cloud Functions"],
    generativeAI: ["OpenAI", "Prompt Engineering"],
  },
  architecture: {
    frontEnd: ["SPA", "SSR"],
    backEnd: ["microservices", "monolithic", "serverless"],
  },
  currentFocus: "Open source contribution and learning new technologies",
  funFact:
    "I once debugged a memory leak that saved 8+ re-renders per keystroke!",
};

function displayTitle() {
  console.log("\n");
  figlet("Dipesh Rajoria", (err, data) => {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(theme.gradient.multiline(data));
    console.log("\n");
    showMenu();
  });
}

async function printAboutMe() {
  const spinner = ora(theme.primary("Loading profile...")).start();
  await new Promise((r) => setTimeout(r, 600));
  spinner.stop();

  console.log(
    boxen(theme.primary.bold("👋 Hey there! I'm Dipesh Rajoria"), {
      padding: 1,
      borderStyle: "round",
      borderColor: theme.boxBorder,
    })
  );

  console.log(
    theme.primary("\n📛 Pronouns: ") + theme.secondary(dipesh.pronouns)
  );
  console.log(
    theme.primary("💻 Languages: ") + theme.secondary(dipesh.code.join(", "))
  );

  console.log(
    theme.primary("💬 Ask Me About:\n") +
      dipesh.askMeAbout
        .map((t) => theme.accent("  • ") + theme.secondary(t))
        .join("\n")
  );

  console.log(theme.primary("\n🧩 Technologies:"));

  const printNestedTech = (title, obj) => {
    console.log(theme.accent(`\n  📂 ${title}`));
    for (const key in obj) {
      const val = Array.isArray(obj[key])
        ? obj[key].filter(Boolean).join(", ")
        : obj[key];
      console.log(theme.primary(`    ${key}: `) + theme.secondary(val));
    }
  };

  printNestedTech("Front-End", dipesh.technologies.frontEnd);
  printNestedTech("Back-End", dipesh.technologies.backEnd);
  printNestedTech("Mobile App", dipesh.technologies.mobileApp);
  printNestedTech("Cloud Services", dipesh.technologies.cloudServices);

  console.log(
    theme.primary("\n  🗃️ Databases: ") +
      theme.secondary(dipesh.technologies.databases.join(", "))
  );
  console.log(
    theme.primary("  🔌 Misc: ") +
      theme.secondary(dipesh.technologies.misc.join(", "))
  );
  console.log(
    theme.primary("  🤖 Generative AI: ") +
      theme.secondary(dipesh.technologies.generativeAI.join(", "))
  );

  console.log(theme.primary("\n🏗️ Architecture:"));
  console.log(
    theme.primary("  Front-End: ") +
      theme.secondary(dipesh.architecture.frontEnd.join(", "))
  );
  console.log(
    theme.primary("  Back-End: ") +
      theme.secondary(dipesh.architecture.backEnd.join(", "))
  );

  console.log(
    theme.primary("\n🎯 Current Focus: ") + theme.secondary(dipesh.currentFocus)
  );
  console.log(
    theme.primary("😂 Fun Fact: ") + theme.secondary(dipesh.funFact) + "\n"
  );
}

function printCollaborationInfo() {
  console.log(
    boxen(theme.primary.bold("🤝 Let's Collaborate!"), {
      padding: 1,
      borderStyle: "round",
      borderColor: theme.boxBorder,
    })
  );

  console.log(
    theme.primary("🔗 GitHub: ") +
      theme.secondary("https://github.com/DipeshRajoria007")
  );
  console.log(
    theme.primary("🔗 LinkedIn: ") +
      theme.secondary("https://www.linkedin.com/in/dipeshrajoria/")
  );
}

function printContactInfo() {
  console.log(
    boxen(theme.accent.bold("💬 Leave a Message"), {
      padding: 1,
      borderStyle: "round",
      borderColor: theme.boxBorder,
    })
  );

  console.log(
    theme.primary("📧 Email: ") + theme.secondary("dipeshrajoria45@gmail.com")
  );
  console.log(
    theme.primary("📅 Book a Call: ") +
      theme.secondary("https://calendly.com/dipeshrajoria")
  );
}

function showMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: theme.primary("What would you like to know?"),
        choices: [
          "🧑‍💻 About Me",
          "🤝 Let's Collaborate",
          "💬 Leave a Message",
          "❌ Exit",
        ],
      },
    ])
    .then(async (answers) => {
      switch (answers.action) {
        case "🧑‍💻 About Me":
          await printAboutMe();
          showMenu();
          break;
        case "🤝 Let's Collaborate":
          printCollaborationInfo();
          showMenu();
          break;
        case "💬 Leave a Message":
          printContactInfo();
          showMenu();
          break;
        case "❌ Exit":
          console.log(
            theme.accent(
              "\n👋 I hope you enjoyed exploring my CLI portfolio! If you liked it, star me on GitHub: https://github.com/DipeshRajoria007/dipesh-rajoria 🚀\n"
            )
          );
          process.exit(0);
      }
    });
}

displayTitle();
