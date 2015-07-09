import java.io.*;
import java.util.*;

public class CmdProcessBuilder {

    public static boolean stringContainsItemFromList(String inputString, String[] items) {
       for (int i = 0; i < items.length; i++) {
           if (inputString.contains(items[i])) {
               return true;
           }
       }
       return false;
   }

    public static void main(String args[])
    throws InterruptedException, IOException {
        try {
            ProcessBuilder builder = new ProcessBuilder("pwd");
            System.out.println("Directory : ");
            final Process process = builder.start();
            InputStream is = process.getInputStream();
            InputStreamReader isr = new InputStreamReader(is);
            BufferedReader br = new BufferedReader(isr);
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}

import java.io.Console;
import java.util.Arrays;
import java.io.IOException;

public class Password {

    public static void main (String args[]) throws IOException {

        Console c = System.console();
        if (c == null) {
            System.err.println("No console.");
            System.exit(1);
        }

        String login = c.readLine("Enter your login: ");
        char [] oldPassword = c.readPassword("Enter your old password: ");

        if (verify(login, oldPassword)) {
            boolean noMatch;
            do {
                char [] newPassword1 = c.readPassword("Enter your new password: ");
                char [] newPassword2 = c.readPassword("Enter new password again: ");
                noMatch = ! Arrays.equals(newPassword1, newPassword2);
                if (noMatch) {
                    c.format("Passwords don't match. Try again.%n");
                } else {
                    change(login, newPassword1);
                    c.format("Password for %s changed.%n", login);
                }
                Arrays.fill(newPassword1, ' ');
                Arrays.fill(newPassword2, ' ');
            } while (noMatch);
        }

        Arrays.fill(oldPassword, ' ');
    }

    // Dummy change method.
    static boolean verify(String login, char[] password) {
        // This method always returns
        // true in this example.
        // Modify this method to verify
        // password according to your rules.
        return true;
    }

    // Dummy change method.
    static void change(String login, char[] password) {
        // Modify this method to change
        // password according to your rules.
    }
}

"alias",
"apropos",
"apt-get",
"aptitude",
"aspell",
"awk",
"basename",
"bash",
"bc",
"bg",
"break",
"builtin",
"bzip2",
"cal",
"case",
"cat",
"cd",
"cfdisk",
"chgrp",
"chmod",
"chown",
"chroot",
"chkconfig",
"cksum",
"clear",
"cmp",
"comm",
"command",
"continue",
"cp",
"cron",
"crontab",
"csplit",
"cut",
"date",
"dc",
"dd",
"ddrescue",
"declare",
"df",
"diff",
"diff3",
"dig",
"dir",
"dircolors",
"dirname",
"dirs",
"dmesg",
"du",
"echo",
"egrep",
"eject",
"enable",
"env",
"ethtool",
"eval",
"exec",
"exit",
"expect",
"expand",
"export",
"expr",
"false",
"fdformat",
"fdisk",
"fg",
"fgrep",
"file",
"find",
"fmt",
"fold",
"for",
"format",
"free",
"fsck",
"ftp",
"function",
"fuser",
"gawk",
"getopts",
"grep",
"groupadd",
"groupdel",
"groupmod",
"groups",
"gzip",
"hash",
"head",
"help",
"history",
"hostname",
"iconv",
"id",
"if",
"ifconfig",
"ifdown",
"ifup",
"import",
"install",
"jobs",
"join",
"kill",
"killall",
"less",
"let",
"link",
"ln",
"local",
"locate",
"logname",
"logout",
"look",
"lpc",
"lpr",
"lprint",
"lprintd",
"lprintq",
"lprm",
"ls",
"lsof",
"make",
"man",
"mkdir",
"mkfifo",
"mkisofs",
"mknod",
"more",
"most",
"mount",
"mtools",
"mtr",
"mv",
"mmv",
"netstat",
"nice",
"nl",
"nohup",
"notify-se",
"nslookup",
"open",
"op",
"passwd",
"paste",
"pathchk",
"ping",
"pkill",
"popd",
"pr",
"printcap",
"printenv",
"printf",
"ps",
"pushd",
"pv",
"pwd",
"quota",
"quotachec",
"quotactl",
"ram",
"rar",
"rcp",
"read",
"readarray",
"readonly",
"reboot",
"rename",
"renice",
"remsync",
"return",
"rev",
"rm",
"rmdir",
"rsync",
"screen",
"scp",
"sdiff",
"sed",
"select",
"seq",
"set",
"sftp",
"shift",
"shopt",
"shutdown",
"sleep",
"slocate",
"sort",
"source",
"split",
"ssh",
"stat",
"strace",
"su",
"sudo",
"sum",
"suspend",
"sync",
"tail",
"tar",
"tee",
"test",
"time",
"timeout",
"times",
"touch",
"top",
"tput",
"tracerout",
"trap",
"tr",
"true",
"tsort",
"tty",
"type",
"ulimit",
"umask",
"umount",
"unalias",
"uname",
"unexpand",
"uniq",
"units",
"unrar",
"unset",
"unshar",
"until",
"uptime",
"useradd",
"userdel",
"usermod",
"users",
"uuencode",
"uudecode",
"v",
"vdir",
"vi",
"vmstat",
"wait",
"watch",
"wc",
"whereis",
"which",
"while",
"who",
"whoami",
"wget",
"write",
"xargs",
"xdg-open",
"yes",
"zip",
".",
"!!",
"###"