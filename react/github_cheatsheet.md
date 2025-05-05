
### **Git Command Cheat Sheet**  

#### **1. Getting Help**  
1.1 `git help` - Shows help for commonly used Git commands  
1.2 `git help <command-name>` - Displays detailed help for a specific command  

---  

#### **2. Staging Files**  
2.1 **Stage all changes:**  
   ```bash  
   git add --a  
   ```  
2.2 **Unstage all files:**  
   ```bash  
   git restore --staged .  
   ```  
2.3 **Unstage a specific file:**  
   ```bash  
   git restore --staged <filename>  
   # Example:  
   git restore --staged src/App.css  
   ```  

---  

#### **3. Committing Changes**  
3.1 **Commit staged files to local repository:**  
   ```bash  
   git commit -m "Initial Commit message"  
   ```  
3.2 **Undo a commit while preserving changes (Keep changes in file):**  
   - **Option 1:**  
     ```bash  
     git reset --soft HEAD~1  
     ```  
     **NOTE:** Removes last commit but keeps all changes staged  
   - **Option 2:**  
     ```bash  
     git reset HEAD~1  
     ```  
     **NOTE:** Removes commit and unstages changes, but preserves files in working directory  
   - **[❌] Option 3:** **Danger!** Completely remove changes (Doesn't preserve changes in file):  
     ```bash  
     git reset --hard HEAD~1  
     ```  
     **NOTE:** Permanently deletes last commit AND all changes (use with extreme caution!)  

---  

#### **4. Committed and Pushed Changes in Remote**  
*(reset is to remove local, revert is for central)*  
4.1 **Push changes to remote repository:**  
   ```bash  
   git push origin main  
   ```  
4.2 **Revert already pushed changes:**  
   - **Option 1:** Revert the commit (safe for shared branches):  
     ```bash  
     git revert af86f27  
     git push  
     ```  
     **NOTE:** Creates a new commit that undoes the changes while preserving history (original commit remains in history)  
   - **[❌] Option 2:** Reset and force push (use with extreme caution!):  
     ```bash  
     git reset HEAD~1  
     ```  
     **NOTE:** Removes the commit entirely (no history preserved)  
     **NOTE:** Undoes commit locally but keeps changes in working directory  
     **WARNING:** Requires force push: `git push -f origin main`  

---  

#### **5. Checking Out Commits**  
5.1 **Check out a specific commit:**  
   ```bash  
   git checkout 2e44fbc  
   ```  
5.2 **Create a new branch at that commit:**  
   ```bash  
   git checkout -b new-branch-name 2e44fbc  
   ```  
5.3 **Revert the revert (if you want to keep history):**  
   ```bash  
   # Go back to 'main'  
   git checkout main  

   # Undo the revert commit (1610f91)  
   git revert 1610f91  
   ```  
5.4 **Force the 'main' branch to point to your current commit (2e44fbc):**  
   ```bash  
   git branch -f main  
   ```  

---  

#### **6. Undoing Changes**  
6.1 **Discard local changes in a file:**  
   ```bash  
   git checkout -- test.java  
   ```  
6.2 **Discard changes in all files:**  
   ```bash  
   git checkout -- *  
   ```  

---  

#### **7. Commit History & Updates**  
7.1 **View commit history:**  
   ```bash  
   git log  
   ```  
7.2 **Pull latest changes before working:**  
   ```bash  
   git pull  
   ```  

---  

#### **8. Stashing Changes**  
8.1 **Temporarily save changes:**  
   ```bash  
   git stash  
   ```  
8.2 **Reapply stashed changes:**  
   ```bash  
   git stash apply  
   ```  
8.3 **Stash with a message:**  
   ```bash  
   git stash push -m "WIP: fix navbar styling"  
   ```  
8.4 **Clear all stashes:**  
   ```bash  
   git stash clear  
   ```  

---  

#### **9. Branching**  
9.1 **Create a feature branch from `develop`:**  
   ```bash  
   git checkout develop         # Switch to develop  
   git pull origin develop     # Pull latest changes  
   git checkout -b feature/SDP-100  # Create and switch to new branch  
   ```  

---  

#### **10. Merge Strategy via Pull Request**  
**STEPS TO MERGE A BRANCH (AVOIDING CONFLICTS):**  
1. **Switch to the feature branch:**  
   ```bash  
   git checkout SDP100  
   ```  
2. **Commit pending changes:**  
   ```bash  
   git add .  
   git commit -m "Add changes for SDP-100"  
   ```  
3. **Update feature branch with latest master:**  
   ```bash  
   git checkout master       # Switch to master  
   git pull origin master    # Pull latest master  
   git checkout SDP100      # Switch back to feature branch  
   git merge master         # Merge master into feature branch (being in feature branch)  
   ```  
4. **Resolve conflicts (if any), then commit:**  
   ```bash  
   git add .  
   git commit -m "Merge master into SDP100 to avoid conflicts"  
   ```  
5. **Push updated feature branch:**  
   ```bash  
   git push origin SDP100  
   ```  
6. **Create a Pull Request (PR) on GitHub/GitLab:**  
   - Go to repository → **"Pull Requests"** → **"New PR"**  
   - Select `SDP100` (feature) as **source** and `master` as **target**  
   - Add description, assign reviewers, and merge  

---  

## Scenerio Questions:

### **1. What is a Hotfix?**  
A **hotfix** is an urgent bug fix applied directly to the production environment. It bypasses the usual development cycle to address critical issues quickly.  

### **2. How to Perform a Hotfix? (Step-by-Step with Diagram)**  
The hotfix branch lifecycle follows these steps:  

1. **Create a hotfix branch** (from `master`).  
2. **Fix the bug** in the hotfix branch.  
3. **Merge hotfix into `master`**.  
4. **Tag `master`** (with a new minor version, e.g., `v1.0.1`).  
5. **Update production** with the latest `master`.  
6. **Merge hotfix into `develop`** to keep branches synchronized.  
7. **Delete the hotfix branch** (cleanup).  

*(A simple diagram would show branches `master` and `develop`, with the hotfix branch merging into both before deletion.)*  

---

### **3. What is a Git Conflict?**  
A **Git conflict** occurs when two developers modify the **same file and the same line(s)**. Git cannot auto-merge, so manual resolution is required.  

#### **How to Resolve Conflicts?**  
1. Pull the latest changes (`git pull`).  
2. Identify conflicting files (marked by `<<<<<<<`, `=======`, `>>>>>>>`).  
3. Edit the file to keep the correct changes.  
4. Stage the resolved file (`git add <file>`).  
5. Commit and push (`git commit -m "Resolved conflict"` + `git push`).  

#### **Best Practice:**  
- **Use separate branches per team** to allow parallel work without constant conflicts.  

---

### **4. How to Remove Local Git Commits?**  
#### **Option 1: Soft Reset (Keep Changes in Staging)**  
```bash  
git reset --soft HEAD~1  
```  
- Removes the **last commit** but keeps file changes in the staging area.  

#### **Option 2: Hard Reset (Discard All Changes)**  
```bash  
git reset --hard HEAD~1  
```  
- **Deletes the last commit AND all file changes** from the working tree.  

**Note:** `1` refers to the number of commits to undo (e.g., `HEAD~2` removes the last two commits).  

---

### **5. How to Revert Changes in the Central Repository?**  
Use `git revert` to undo commits **without rewriting history** (safer for shared repos).  

#### **Steps:**  
1. Find the commit ID:  
   ```bash  
   git log --oneline  
   ```  
2. Revert the commit:  
   ```bash  
   git revert <commit-id>  
   ```  
3. Push the revert:  
   ```bash  
   git push  
   ```  

**Key Difference:**  
- `git reset` → Removes **local** commits.  
- `git revert` → Safely undoes **remote** commits.  

---

### **6. What is Git Cherry-Pick?**  
**Purpose:** Merge a **specific commit** from one branch to another (instead of merging all commits).  

#### **Command:**  
```bash  
git cherry-pick <commit-id>  
```  

#### **Use Case:**  
- You only need **one fix** from a feature branch, not the entire branch.  

---

### **7. Git Pull vs. Git Fetch**  

| **Git Pull** | **Git Fetch** |  
|--------------|---------------|  
| Downloads changes **directly to working tree** (auto-merge). | Downloads changes **only to local repo** (no auto-merge). |  
| **Risky:** May cause unexpected conflicts. | **Safer:** Lets you review changes before merging. |  
| `git pull = git fetch + git merge` | Requires manual merge (`git merge` after fetch). |  

#### **Workflow Example:**  
1. Check for updates **without merging**:  
   ```bash  
   git fetch origin  
   ```  
2. Review changes, then merge manually:  
   ```bash  
   git merge origin/main  
   ```  

---

### **8. Git Merge vs. Git Rebase**  

| **Git Merge** | **Git Rebase** |  
|--------------|---------------|  
| Preserves **full history** (creates a merge commit). | Rewrites history for a **linear timeline**. |  
| Safe for **shared branches**. | Risky for **public commits** (rewrites commit IDs). |  
| Command: `git merge feature` | Command: `git rebase main` |  

**Best Practice:**  
- Use **merge** for `master`/`main` branches.  
- Use **rebase** for feature branches (to keep history clean).  

---

### **9. Git Revert: Undoing Multiple Commits**  
**Scenario:** You have commits `a → b → c → d → e → f` but want to revert to `c`.  

#### **Steps:**  
1. Revert commits **in reverse order** (newest first):  
   ```bash  
   git revert f  
   git revert e  
   git revert d  
   ```  
2. Push the reverts:  
   ```bash  
   git push  
   ```  

**Result:**  
```  
a → b → c → d → e → f → revert_f → revert_e → revert_d  
```  
- Code matches `c`, but history remains intact.  

---
